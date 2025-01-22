import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://predeploy.students-cda-js-2.wilders.dev/portal');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Pimp My Product/);
});

test("connect as Super Admin", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-2.wilders.dev/portal");


  await page.getByLabel('Email *').fill('admin@admin.com');
  await page.getByLabel('Mot de passe *').fill('GtH235kTBc!');


  await page.on("request", (request) => {
    console.log("Requête interceptée :", request.method(), request.url());
  });

  // Surveillez également les réponses
  await page.on("response", (response) => {
    console.log("Réponse reçue :", response.url(), response.status());
  });

  await page.getByRole('button', { name: 'Se connecter' }).click();

  await page.waitForLoadState("networkidle");

  await page.waitForTimeout(3000);

  const addButton = await page.getByRole('button', { name: 'Ajouter un utilisateur' });

  expect(addButton).toBeVisible();
});
