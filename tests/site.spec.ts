import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }, info) => { if (!info.title.startsWith('consentimiento:')) await page.addInitScript(() => { localStorage.setItem('analytics-consent', 'rejected'); localStorage.setItem('external-content-consent', 'rejected'); }); });

const canonicalOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dianaloscoscoach.com').replace(/\/$/, '');
const pagePaths = [
  '/',
  '/coaching-personal-online/',
  '/coaching-profesional/',
  '/cambio-profesional/',
  '/liderazgo-nuevos-managers/',
  '/coaching-ejecutivo/',
  '/sobre-mi/',
  '/opiniones/',
  '/contacto/',
  '/preguntas-frecuentes/',
  '/aviso-legal/',
  '/privacidad/',
  '/cookies/',
] as const;
const servicePaths = new Set([
  '/coaching-personal-online/',
  '/coaching-profesional/',
  '/cambio-profesional/',
  '/liderazgo-nuevos-managers/',
  '/coaching-ejecutivo/',
]);

type SchemaNode = Record<string, unknown>;

async function schemaTypes(page: Page): Promise<string[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(scripts.length).toBeGreaterThan(0);
  const nodes: SchemaNode[] = scripts.flatMap((script) => {
    const parsed: unknown = JSON.parse(script);
    const topLevel = Array.isArray(parsed) ? parsed : [parsed];
    return topLevel.flatMap((node) => {
      if (!node || typeof node !== 'object') return [];
      const object = node as SchemaNode;
      return Array.isArray(object['@graph']) ? object['@graph'] as SchemaNode[] : [object];
    });
  });
  return nodes.flatMap((node) => {
    const type = node['@type'];
    return Array.isArray(type) ? type.filter((item): item is string => typeof item === 'string') : typeof type === 'string' ? [type] : [];
  });
}

test.describe('rutas y SEO', () => {
  for (const path of pagePaths) {
    test('ruta ' + path + ' tiene contenido indexable propio', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es');
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('main h1')).toBeVisible();
      expect((await page.title()).trim().length).toBeGreaterThan(15);
      await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', /.+/);

      const canonical = canonicalOrigin + path;
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', canonical);
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', canonical);
      await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

      const types = await schemaTypes(page);
      expect(types).toContain('Person');
      expect(types).toContain('WebSite');
      if (path !== '/') expect(types).toContain('BreadcrumbList');
      if (servicePaths.has(path)) expect(types).toContain('Service');
      expect(errors, path).toEqual([]);
    });
  }

  test('sitemap y robots publican las rutas canónicas', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).toContain('<urlset');
    for (const path of pagePaths) expect(xml).toContain('<loc>' + canonicalOrigin + path + '</loc>');

    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    const body = await robots.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).toContain('Sitemap: ' + canonicalOrigin + '/sitemap.xml');
  });

  test('el OG tipográfico usa imagen propia disponible', async ({ request }) => {
    const response = await request.get('/opengraph-image');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    expect((await response.body()).byteLength).toBeGreaterThan(10_000);
  });

  test('una ruta desconocida devuelve 404', async ({ page }) => {
    const response = await page.goto('/esta-ruta-no-existe/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
  });

  test('la URL histórica de agradecimiento redirige a la confirmación', async ({ request }) => {
    const response = await request.get('/gracias.html', { maxRedirects: 0 });
    expect([301, 308]).toContain(response.status());
    expect(response.headers().location).toContain('/gracias/');
  });

  test('enlaces internos de la home no llevan a rutas rotas', async ({ page, request }) => {
    await page.goto('/');
    const links = await page.locator('a[href^="/"]').evaluateAll(nodes => [...new Set(nodes.map(node => (node as HTMLAnchorElement).getAttribute('href')?.split('#')[0]).filter(Boolean))] as string[]);
    for (const href of links) {
      const response = await request.get(href);
      expect(response.status(), href).toBeLessThan(400);
    }
  });
});

test.describe('experiencia y accesibilidad', () => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    test('sin desbordamiento horizontal a ' + width + ' px', async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/contacto/']) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        }));
        expect(dimensions.content, path + ' a ' + width + ' px').toBeLessThanOrEqual(dimensions.viewport + 1);
      }
    });
  }

  for (const path of ['/', '/coaching-profesional/', '/contacto/', '/sobre-mi/']) {
    test('sin infracciones WCAG detectadas por axe en ' + path, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
    });
  }

  test('el enlace para saltar al contenido recibe foco visible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Saltar al contenido' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    const outline = await skip.evaluate((element) => getComputedStyle(element).outlineStyle);
    expect(outline).not.toBe('none');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('el menú móvil se puede abrir y recorrer con teclado', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Abrir menú' });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    const services = page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('button', { name: /Coaching profesional/ });
    await services.focus();
    await page.keyboard.press('Enter');
    await expect(services).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: /Liderazgo para nuevos managers/ })).toBeVisible();
  });

  test('el desplegable de coaching se cierra con Escape', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    const toggle = nav.getByRole('button', { name: /Coaching profesional/ });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link', { name: /Cambio profesional/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await toggle.click();
    await nav.getByRole('link', { name: /Cambio profesional/ }).click();
    await expect(page).toHaveURL(/\/cambio-profesional\/$/);
  });

  test('el formulario es la segunda sección de la home', async ({ page }) => {
    await page.goto('/');
    const sections = page.locator('main > section');
    await expect(sections.nth(0)).toHaveAttribute('id', 'inicio');
    await expect(sections.nth(1)).toHaveAttribute('id', 'contacto');
    await expect(sections.nth(1).locator('form')).toBeVisible();
    await expect(sections).toHaveCount(10);
    await expect(sections.nth(2)).toHaveAttribute('id', 'para-quien');
    await expect(page.getByRole('heading', { name: 'Un proceso centrado en tu situación' })).toHaveCount(0);
    await expect(sections.nth(3)).toContainText('¿Qué puedes llevarte de las sesiones?');
    await expect(sections.nth(4)).toHaveAttribute('id', 'sobre-mi');
    await expect(sections.nth(7)).toHaveAttribute('id', 'inversion');
    await expect(sections.nth(8)).toContainText('Respuestas claras antes de empezar.');
    await expect(sections.nth(9)).toHaveAttribute('id', 'hablemos');
  });

  test('la home presenta seis situaciones y un reel antes de cargarlo', async ({ page }) => {
    await page.goto('/');
    const situations = page.locator('#para-quien');
    await expect(situations.getByRole('link', { name: /Explorar esta situación/ })).toHaveCount(6);
    await expect(situations.getByRole('link', { name: /Quieres avanzar en tu trabajo/ })).toHaveAttribute('href', '/coaching-profesional/');
    const closing = page.locator('#hablemos');
    await expect(closing.getByRole('button', { name: /Cargar reel:/ })).toHaveCount(1);
    await expect(closing.locator('script[src*="instagram.com"]')).toHaveCount(0);
  });

  test('las preguntas frecuentes comparten ocho respuestas y son accesibles', async ({ page }) => {
    for (const path of ['/', '/preguntas-frecuentes/']) {
      await page.goto(path);
      const first = page.getByRole('button', { name: /¿Cómo son las sesiones\?/ });
      await expect(first).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('button', { name: /¿Es confidencial\?/ })).toBeVisible();
      await first.click();
      await expect(first).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('el contenido del cierre aparece al entrar en pantalla', async ({ page }) => {
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (keyframes, options) {
        if (this.getAttribute('data-scroll-reveal') === 'cta-copy') document.documentElement.dataset.ctaAnimation = JSON.stringify(keyframes);
        return animate.call(this, keyframes, options);
      };
    });
    await page.goto('/');
    await page.locator('[data-scroll-reveal="cta-copy"]').last().scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('html').getAttribute('data-cta-animation')).toMatch(/translateY\(\d+px\)/);
  });

  test('Sobre mí anima el retrato y el texto al entrar en pantalla', async ({ page }) => {
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (keyframes, options) {
        const name = this.getAttribute('data-scroll-reveal');
        if (name === 'about-portrait' || name === 'about-story') document.documentElement.dataset[name === 'about-portrait' ? 'portraitAnimated' : 'storyAnimated'] = 'yes';
        return animate.call(this, keyframes, options);
      };
    });
    await page.goto('/sobre-mi/');
    await page.locator('#diana').scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('html').getAttribute('data-portrait-animated')).toBe('yes');
    await expect.poll(() => page.locator('html').getAttribute('data-story-animated')).toBe('yes');
  });

  test('el movimiento reducido muestra contenido de inmediato', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('main h1')).toBeVisible();
    const motion = await page.evaluate(() => {
      const heading = document.querySelector('main h1');
      const portrait = document.querySelector('#inicio figure > div');
      const reveal = document.querySelector('.motion-reveal');
      if (!heading || !portrait || !reveal) return null;
      return {
        scroll: getComputedStyle(document.documentElement).scrollBehavior,
        opacity: getComputedStyle(heading).opacity,
        duration: parseFloat(getComputedStyle(heading).animationDuration),
        clip: getComputedStyle(portrait).clipPath,
        revealOpacity: getComputedStyle(reveal).opacity,
      };
    });
    expect(motion).not.toBeNull();
    expect(motion?.scroll).toBe('auto');
    expect(motion?.opacity).toBe('1');
    expect(motion?.duration).toBeLessThan(0.01);
    expect(motion?.clip).toBe('none');
    expect(motion?.revealOpacity).toBe('1');
  });
});

test('contacto presenta cuatro canales con destinos y formulario', async ({ page }) => {
  await page.goto('/contacto/');
  const cards = page.locator('[data-scroll-reveal="contact-channel"]');
  await expect(cards).toHaveCount(4);
  await expect(cards.nth(0)).toHaveAttribute('href', /doctoralia/);
  await expect(cards.nth(1)).toHaveAttribute('href', /wa\.me/);
  await expect(cards.nth(2)).toHaveAttribute('href', 'mailto:contacto@dianaloscoscoach.com');
  await expect(cards.nth(3)).toHaveAttribute('href', /instagram\.com/);
  await expect(page.locator('main > section').nth(1).locator('form')).toBeVisible();
});

test('contacto anima las tarjetas al entrar y respeta movimiento reducido', async ({ page }) => {
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (keyframes, options) {
      if (this.getAttribute('data-scroll-reveal') === 'contact-channel') document.documentElement.dataset.contactAnimated = 'yes';
      return animate.call(this, keyframes, options);
    };
  });
  await page.goto('/contacto/');
  await page.locator('[data-scroll-reveal="contact-channel"]').first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('html').getAttribute('data-contact-animated')).toBe('yes');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('[data-scroll-reveal="contact-channel"]').first()).toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-contact-animated', 'yes');
});

test.describe('conversión', () => {
  test('las secciones visibles registran servicio, precio y opiniones', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset.analyticsEvents = '';
      window.addEventListener('diana:analytics', event => {
        document.documentElement.dataset.analyticsEvents += ',' + (event as CustomEvent<{ event: string }>).detail.event;
      });
    });
    for (const selector of ['.testimonial-grid', '.service-grid', '#inversion']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
    }
    await expect.poll(async () => (await page.locator('html').getAttribute('data-analytics-events')) || '').toContain('pricing_view');
    const events = (await page.locator('html').getAttribute('data-analytics-events'))?.split(',') || [];
    expect(events).toContain('testimonial_view');
    expect(events).toContain('service_view');
  });
  test('la reserva lleva a Doctoralia y emite los eventos previstos', async ({ page }) => {
    await page.context().route('https://www.doctoralia.es/**', (route) => route.fulfill({ status: 200, body: '<html></html>' }));
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset.analyticsEvents = '';
      window.addEventListener('diana:analytics', (event) => {
        const name = (event as CustomEvent<{ event: string }>).detail.event;
        document.documentElement.dataset.analyticsEvents += ',' + name;
      });
    });
    const booking = page.getByRole('link', { name: 'Reservar una sesión' }).first();
    await expect(booking).toHaveAttribute('href', /^https:\/\/www\.doctoralia\.es\//);
    const popupPromise = page.waitForEvent('popup');
    await booking.click();
    const popup = await popupPromise;
    await popup.close();
    const events = (await page.locator('html').getAttribute('data-analytics-events'))?.split(',') || [];
    expect(events).toContain('cta_booking_click');
    expect(events).toContain('doctoralia_click');
  });

  for (const width of [390, 1024]) {
    test(`la cabecera permite reservar y registra el clic a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.context().route('https://www.doctoralia.es/**', route => route.fulfill({ status: 200, body: '<html></html>' }));
      await page.goto('/');
      await page.evaluate(() => {
        window.addEventListener('diana:analytics', event => {
          const detail = (event as CustomEvent<{ event: string; label: string }>).detail;
          if (detail.event === 'cta_booking_click') document.documentElement.dataset.headerEvent = detail.label;
        });
      });
      if (width < 861) await page.getByRole('button', { name: 'Abrir menú' }).click();
      const link = width < 861
        ? page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Reservar sesión' })
        : page.locator('.header-inner').getByRole('link', { name: 'Reservar sesión' });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await expect(popup).toHaveURL(/^https:\/\/www\.doctoralia\.es\//);
      await popup.close();
      await expect(page.locator('html')).toHaveAttribute('data-header-event', 'header');
    });
  }

  test('el formulario rechaza campos vacíos y email inválido', async ({ page }) => {
    await page.goto('/contacto/');
    const form = page.locator('form.contact-form');
    await expect(form).toBeVisible();
    const name = form.getByRole('textbox', { name: /^Nombre/i });
    const email = form.getByRole('textbox', { name: /Email|Correo/i });
    const message = form.getByRole('textbox', { name: /qué es lo que más te está removiendo/i });
    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
    await expect(message).toBeVisible();
    expect(await form.evaluate((node) => (node as HTMLFormElement).checkValidity())).toBe(false);
    await page.evaluate(() => {
      document.documentElement.dataset.formStartEvents = '0';
      window.addEventListener('diana:analytics', (event) => {
        if ((event as CustomEvent<{ event: string }>).detail.event === 'contact_form_start') {
          document.documentElement.dataset.formStartEvents = '1';
        }
      });
    });
    await name.fill('Ana');
    await expect(page.locator('html')).toHaveAttribute('data-form-start-events', '1');
    await email.fill('correo-invalido');
    await message.fill('Quiero aclarar mi siguiente paso profesional.');
    expect(await email.evaluate((node) => (node as HTMLInputElement).validity.typeMismatch)).toBe(true);
    expect(await form.evaluate((node) => (node as HTMLFormElement).checkValidity())).toBe(false);
    const phone = form.locator('input[type="tel"]');
    await expect(phone).toHaveAttribute('required', '');
  });

  test('el formulario de la home muestra errores por campo y de envío', async ({ page }) => {
    await page.route('**/api/contact', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"no disponible"}' }));
    await page.goto('/');
    const form = page.locator('#contacto form');
    await form.getByRole('button', { name: /Enviar mensaje/ }).click();
    const phone = form.getByRole('textbox', { name: /Teléfono/ });
    await expect(phone).toHaveAttribute('aria-invalid', 'true');
    const errorId = await phone.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    await expect(page.locator(`[id="${errorId}"]`)).toBeVisible();
    await form.getByRole('textbox', { name: /^Nombre/i }).fill('Ana');
    await form.getByRole('textbox', { name: /Email/i }).fill('ana@example.com');
    await phone.fill('600123456');
    await form.getByLabel(/hora te viene mejor/i).selectOption('tarde');
    await form.getByRole('textbox', { name: /qué es lo que más te está removiendo/i }).fill('Quiero aclarar mi siguiente paso.');
    await form.getByRole('checkbox').check();
    await form.getByRole('button', { name: /Enviar mensaje/ }).click();
    await expect(form.getByRole('alert')).toContainText('No se pudo enviar');
  });

  test('el formulario de la home envía el teléfono y la franja elegida', async ({ page }) => {
    let sent: Record<string, string> = {};
    await page.route('**/api/contact', route => { sent = route.request().postDataJSON(); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.goto('/');
    const form = page.locator('#contacto form');
    await form.getByRole('textbox', { name: /^Nombre/i }).fill('Ana');
    await form.getByRole('textbox', { name: /Email/i }).fill('ana@example.com');
    await form.getByRole('textbox', { name: /Teléfono/i }).fill('600123456');
    await form.getByLabel(/hora te viene mejor/i).selectOption('mediodia');
    await form.getByRole('textbox', { name: /qué es lo que más te está removiendo/i }).fill('Quiero aclarar mi siguiente paso.');
    await form.getByRole('checkbox').check();
    await form.getByRole('button', { name: /Enviar mensaje/i }).click();
    await expect(page).toHaveURL(/\/gracias\/$/);
    expect(sent.phone).toBe('600123456');
    expect(sent.callWindow).toBe('mediodia');
  });

  test('el envío correcto confirma y registra el evento', async ({ page }) => {
    await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    await page.goto('/contacto/');
    await page.evaluate(() => {
      document.documentElement.dataset.analyticsEvents = '';
      window.addEventListener('diana:analytics', event => {
        document.documentElement.dataset.analyticsEvents += ',' + (event as CustomEvent<{ event: string }>).detail.event;
      });
    });
    await page.getByRole('textbox', { name: /^Nombre/i }).fill('Ana');
    await page.getByRole('textbox', { name: /Email|Correo/i }).fill('ana@example.com');
    await page.getByRole('textbox', { name: /qué es lo que más te está removiendo/i }).fill('Quiero aclarar mi siguiente paso profesional.');
    await page.getByRole('textbox', { name: /Teléfono/i }).fill('+34 600 123 456');
    await page.getByLabel(/hora te viene mejor/i).selectOption('manana');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /Enviar mensaje/i }).click();
    await expect(page).toHaveURL(/\/gracias\/$/);
    const events = (await page.locator('html').getAttribute('data-analytics-events'))?.split(',') || [];
    expect(events).toContain('contact_form_start');
    expect(events).toContain('contact_form_submit');
  });
});


test('consentimiento: Instagram solo se carga al pulsar un reel', async ({ page }) => {
  let requests = 0;
  await page.route('**/*instagram.com/embed.js', route => { requests += 1; return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }); });
  await page.goto('/');
  const banner = page.getByRole('complementary', { name: 'Preferencias de privacidad' });
  await expect(banner).toBeVisible();
  await page.locator('#hablemos').scrollIntoViewIfNeeded();
  expect(requests).toBe(0);
  await banner.getByRole('button', { name: 'Rechazar todo' }).click();
  await page.locator('#hablemos').scrollIntoViewIfNeeded();
  expect(requests).toBe(0);
  await page.getByRole('button', { name: /Cargar reel:/ }).first().click();
  await expect.poll(() => requests).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem('external-content-consent'))).toBe('rejected');
});

test('consentimiento: se pueden aceptar los reels sin activar analítica', async ({ page }) => {
  let requests = 0;
  await page.route('**/*instagram.com/embed.js', route => { requests += 1; return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }); });
  await page.goto('/');
  const banner = page.getByRole('complementary', { name: 'Preferencias de privacidad' });
  await banner.getByLabel('Contenido externo').check();
  await banner.getByRole('button', { name: 'Guardar preferencias' }).click();
  await page.locator('#hablemos').scrollIntoViewIfNeeded();
  await expect.poll(() => requests).toBe(1);
  expect(await page.evaluate(() => [localStorage.getItem('analytics-consent'), localStorage.getItem('external-content-consent')])).toEqual(['rejected', 'accepted']);
});


test('consentimiento: el aviso es accesible con movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('complementary', { name: 'Preferencias de privacidad' })).toBeVisible();
  const result = await new AxeBuilder({ page }).include('aside[aria-label="Preferencias de privacidad"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
});


test('SEO: títulos, encabezados, servicios y enlaces corresponden a cada intención', async ({ page }) => {
  const entries = [
    ['/', 'Coaching personal y profesional online | Diana Loscos', 'Coaching personal y profesional online para tomar decisiones con claridad', ''],
    ['/coaching-personal-online/', 'Coaching personal online | Diana Loscos', 'Coaching personal online para aclarar lo que necesitas cambiar', 'Coaching personal online'],
    ['/coaching-profesional/', 'Coaching profesional online | Diana Loscos', 'Coaching profesional para tomar decisiones en el trabajo', 'Coaching profesional online'],
    ['/cambio-profesional/', 'Cambio profesional y coaching online | Diana Loscos', 'Cambio profesional: encuentra tu siguiente paso sin decidir a ciegas', 'Coaching para cambio profesional'],
    ['/liderazgo-nuevos-managers/', 'Coaching de liderazgo para nuevos managers | Diana Loscos', 'Coaching de liderazgo para nuevos managers', 'Coaching de liderazgo'],
    ['/coaching-ejecutivo/', 'Coaching ejecutivo | Sesiones online con Diana Loscos', 'Coaching ejecutivo para liderar y decidir con perspectiva', 'Coaching ejecutivo online'],
  ] as const;
  for (const [path, title, heading, serviceType] of entries) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('main h1')).toHaveText(heading);
    await expect(page.locator('main > section').nth(1).locator('form')).toHaveCount(1);
    if (serviceType) {
      const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(scripts.map(script => JSON.parse(script)).some(node => node['@type'] === 'Service' && node.serviceType === serviceType)).toBeTruthy();
    }
  }
  await page.goto('/');
  for (const [path] of entries.slice(1)) {
    await expect(page.locator(`.service-grid a[href="${path}"]`)).toHaveCount(1);
  }
});
