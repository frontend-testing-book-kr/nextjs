import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("게재된 기사 페이지", () => {
  const path = "/my/posts/1";

  test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
