import { expect, test } from '@playwright/test';
import { site } from '../lib/site';

for (const width of [360, 390, 900, 1440]) {
  test(`WhatsApp permanece abajo a la izquierda al navegar a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const header = page.locator('.site-header');
    await expect(header.getByRole('link', { name: 'Reservar una sesión' })).toHaveCount(0);
    expect(await header.evaluate(element => getComputedStyle(element).backgroundImage)).toContain('linear-gradient');

    const headerWhatsApp = page.getByRole('link', { name: 'WhatsApp en la cabecera' });
    await expect(headerWhatsApp).toBeVisible();
    await expect(headerWhatsApp).toHaveAttribute('href', site.whatsappUrl);
    await expect(headerWhatsApp).toBeInViewport();
    const headerInstagram = page.getByRole('link', { name: 'Instagram en la cabecera' });
    const headerDoctoralia = page.getByRole('link', { name: 'Reservar en Doctoralia' });
    await expect(headerInstagram).toBeInViewport();
    await expect(headerInstagram).toHaveAttribute('href', site.instagramUrl);
    await expect(headerDoctoralia).toBeInViewport();
    await expect(headerDoctoralia).toHaveAttribute('href', site.bookingUrl);
    const brand = await page.getByRole('link', { name: 'Diana Loscos, ir al inicio' }).boundingBox();
    const firstLogo = await headerWhatsApp.boundingBox();
    const lastLogo = await headerDoctoralia.boundingBox();
    const menu = width <= 860 ? await page.getByRole('button', { name: 'Abrir menú' }).boundingBox() : null;
    expect(brand && firstLogo && lastLogo).toBeTruthy();
    expect(brand!.x + brand!.width).toBeLessThanOrEqual(firstLogo!.x + 1);
    if (menu) expect(lastLogo!.x + lastLogo!.width).toBeLessThanOrEqual(menu.x + 1);

    if (width === 1440) {
      await expect(page.getByRole('link', { name: 'Instagram', exact: true }).locator('svg')).toBeVisible();
      await expect(page.locator('.doctoralia-mark').locator('svg').first()).toBeVisible();
    }

    const whatsapp = page.getByRole('link', { name: 'Escribir a Diana por WhatsApp' });
    await expect(whatsapp).toHaveCount(1);
    await expect(whatsapp).toHaveAttribute('href', site.whatsappUrl);
    await expect(whatsapp).toHaveAttribute('target', '_blank');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(whatsapp).toBeInViewport();
    await expect(header.locator('.brand-descriptor')).toHaveCSS('opacity', '1');
    const box = await whatsapp.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(19);
    expect(box!.x).toBeLessThanOrEqual(25);
    expect(box!.y + box!.height).toBeLessThanOrEqual(824);

    await whatsapp.evaluate(element => { element.dataset.persistenceCheck = 'same-node'; });
    if (width <= 860) {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Contacto' }).click();
    } else {
      await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Contacto' }).click();
    }
    await expect(page).toHaveURL(/\/contacto\/$/);
    await expect(whatsapp).toHaveCount(1);
    await expect(whatsapp).toHaveAttribute('data-persistence-check', 'same-node');
    await expect(whatsapp).toBeInViewport();
    const contactOptions = page.locator('.contact-options');
    for (const [name, href] of [
      ['Doctoralia', site.bookingUrl],
      ['WhatsApp', site.whatsappUrl],
      ['Instagram', site.instagramUrl],
    ]) {
      const link = contactOptions.getByRole('link', { name: new RegExp(name) });
      await expect(link).toHaveAttribute('href', href);
      await expect(link.locator('svg')).toBeVisible();
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('el hover vuelve a destacar los enlaces del menú', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 844 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navegación principal' });
  const about = nav.getByRole('link', { name: 'Sobre mí' });
  await about.hover();
  await expect(about).toHaveCSS('color', 'rgb(11, 111, 106)');
  expect(await about.evaluate(element => getComputedStyle(element, '::after').height)).toBe('2px');

  const active = nav.getByRole('link', { name: 'Inicio' });
  await active.hover();
  await expect(active).toHaveCSS('color', 'rgb(11, 111, 106)');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  const mobileAbout = page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Sobre mí' });
  await mobileAbout.hover();
  await expect(mobileAbout).toHaveCSS('background-color', 'rgb(231, 238, 234)');
});

for (const width of [1440, 2560]) {
  test(`la ruta seleccionada anima y mantiene su subrayado a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1440 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    const about = nav.getByRole('link', { name: 'Sobre mí' });
    await page.evaluate(() => {
      const link = document.querySelector<HTMLAnchorElement>('.desktop-nav a[href="/sobre-mi/"]');
      if (!link) throw new Error('No se encontró el enlace de Sobre mí');
      const observer = new MutationObserver(() => {
        if (link.dataset.active !== 'true') return;
        observer.disconnect();
        const widths: number[] = [];
        let frames = 0;
        const sample = () => {
          widths.push(parseFloat(getComputedStyle(link, '::before').width));
          document.documentElement.dataset.navUnderlineWidths = widths.join(',');
          if (++frames < 42) requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      });
      observer.observe(link, { attributes: true, attributeFilter: ['data-active'] });
    });
    await about.click();
    await expect(page).toHaveURL(/\/sobre-mi\/$/);
    await expect(about).toHaveAttribute('aria-current', 'page');
    expect(await about.evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('nav-selected-underline');
    const fullWidth = (await about.boundingBox())!.width;
    await expect.poll(() => about.evaluate(element => parseFloat(getComputedStyle(element, '::before').width))).toBeCloseTo(fullWidth, 0);
    const widths = await page.evaluate(() => (document.documentElement.dataset.navUnderlineWidths ?? '').split(',').map(Number));
    expect(widths.some(width => width > 0 && width < fullWidth - 1)).toBe(true);
    expect(await about.evaluate(element => getComputedStyle(element, '::after').opacity)).toBe('0');

    const dropdown = nav.locator('.nav-dropdown-trigger');
    await dropdown.click();
    await nav.getByRole('link', { name: /Cambio profesional/ }).click();
    await expect(page).toHaveURL(/\/cambio-profesional\/$/);
    await expect(dropdown).toHaveAttribute('data-active', 'true');
    expect(await dropdown.evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('nav-selected-underline');
  });
}
