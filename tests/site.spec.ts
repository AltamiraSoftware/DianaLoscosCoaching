import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const canonicalOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dianaloscoscoach.com').replace(/\/$/, '');
const pagePaths = [
  '/',
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

  for (const path of ['/', '/coaching-profesional/', '/contacto/']) {
    test('sin infracciones WCAG detectadas por axe en ' + path, async ({ page }) => {
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
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const toggle = page.getByRole('button', { name: 'Abrir menú' });
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    const firstLink = page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Coaching profesional' });
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();
  });

  test('el movimiento reducido muestra contenido de inmediato', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('main h1')).toBeVisible();
    const motion = await page.evaluate(() => {
      const heading = document.querySelector('main h1');
      const portrait = document.querySelector('.hero-portrait .portrait-frame');
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

test.describe('conversión', () => {
  test('las secciones visibles registran servicio, precio y opiniones', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset.analyticsEvents = '';
      window.addEventListener('diana:analytics', event => {
        document.documentElement.dataset.analyticsEvents += ',' + (event as CustomEvent<{ event: string }>).detail.event;
      });
    });
    for (const selector of ['.testimonial-grid', '.service-grid', '.pricing-panel']) {
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

  test('el formulario rechaza campos vacíos y email inválido', async ({ page }) => {
    await page.goto('/contacto/');
    const form = page.locator('form.contact-form');
    await expect(form).toBeVisible();
    const name = form.getByRole('textbox', { name: /^Nombre/i });
    const email = form.getByRole('textbox', { name: /Email|Correo/i });
    const message = form.getByRole('textbox', { name: /qué te gustaría trabajar/i });
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
    if (await phone.count()) await expect(phone).not.toHaveAttribute('required', '');
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
    await page.getByRole('textbox', { name: /qué te gustaría trabajar/i }).fill('Quiero aclarar mi siguiente paso profesional.');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /Enviar mensaje/i }).click();
    await expect(page).toHaveURL(/\/gracias\/$/);
    const events = (await page.locator('html').getAttribute('data-analytics-events'))?.split(',') || [];
    expect(events).toContain('contact_form_start');
    expect(events).toContain('contact_form_submit');
  });
});
