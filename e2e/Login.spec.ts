import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { login, logout, url } from "./util";

test.describe("로그인 페이지", () => {
  const path = "/login";

  test("로그인 상태이면 로그아웃할 수 있다", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page });
    await expect(page).toHaveURL(url("/"));
    await logout({ page });
    await expect(page).toHaveURL(url("/"));
    const buttonLogin = page.getByRole("link", { name: "로그인" });
    await expect(buttonLogin).toBeVisible();
  });

  test("로그인 성공 시 리다이렉트 이전 페이지로 돌아간다", async ({ page }) => {
    await page.goto(url("/my/posts"));
    await expect(page).toHaveURL(url(path));
    await login({ page });
    await expect(page).toHaveURL(url("/my/posts"));
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
