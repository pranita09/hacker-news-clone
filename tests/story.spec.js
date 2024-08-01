const { test, expect } = require("@playwright/test");

test.describe("Hacker News App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://hackernews-clone-01.netlify.app");
  });

  test("loads initial stories", async ({ page }) => {
    const stories = await page.locator(".storyContainer");
    await expect(stories).toHaveCount(5);
  });

  test('loads more stories when clicking "Load More"', async ({ page }) => {
    test.setTimeout(3000);
    await page.locator("//button[contains(@class='btn loadMoreBtn')]").click();
    test.setTimeout(3000);
    const stories = await page.locator(".storyContainer");
    await expect(stories).toHaveCount(10);
  });

  test("sorts stories by new and past", async ({ page }) => {
    await page.locator("//button[contains(@class,'btn newBtn')]").click();
    const firstStoryTime = await page
      .locator("(//div[@class='storyContainer'])[1]")
      .locator("(//div[@class='metaData']//p)[1]")
      .textContent();
    await page.locator("//button[normalize-space(text())='Past']").click();
    const firstStoryTimeNew = await page
      .locator("(//div[@class='storyContainer'])[1]")
      .locator("(//div[@class='metaData']//p)[1]")
      .textContent();
    expect(firstStoryTime).not.toBe(firstStoryTimeNew);
  });
});
