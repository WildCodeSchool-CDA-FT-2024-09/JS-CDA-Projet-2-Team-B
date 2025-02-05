import { test, expect } from '@playwright/test';

test("connect as Super Admin", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-2.wilders.dev/portal");


  await page.getByLabel('Email *').fill('admin@admin.com');
  await page.getByLabel('Mot de passe *').fill('GtH235kTBc!');

  await page.getByRole('button', { name: 'Se connecter' }).click();

  await page.on("request", (request) => {
    if (request.url().includes('/auth/users')) {
      console.log("Requête interceptée :", request.method(), request.url());
      expect(request.method()).toBe("GET")
    }
  });

  // Surveillez également les réponses
  await page.on("response", (response) => {
    if (response.url().includes('/auth')) {
      console.log("Réponse reçue :", response.url(), response.status());
      expect(response.status()).toBe(200)
    }
  });

});
