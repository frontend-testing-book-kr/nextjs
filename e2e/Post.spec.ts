import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { login, url } from "./util";

test.describe("글쓰기 페이지", () => {
  const path = "/posts/1";

  test("로그인 상태가 아니면 로그인 버튼이 표시된다", async ({ page }) => {
    await page.goto(url(path));
    const buttonLogin = page.getByRole("link", { name: "로그인" });
    await expect(buttonLogin).toBeVisible();
  });

  test("다른 사람의 기사에는 Like할 수 있다", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page, userName: "JPub" });
    await expect(page).toHaveURL(url("/"));
    // 여기서부터 ID가 10인 기사의 페이지
    await page.goto(url("/posts/10"));
    const buttonLike = page.getByRole("button", { name: "Like" });
    const buttonText = page.getByTestId("likeStatus");
    // [Like] 버튼이 활성화되고, 현재 Like 수는 0이다.
    await expect(buttonLike).toBeEnabled();
    await expect(buttonLike).toHaveText("0");
    await expect(buttonText).toHaveText("Like");
    await buttonLike.click();
    // [Like]를 클릭하면 카운트가 1 증가하고, 이미 [Like] 버튼을 누른 상태가 된다.
    await expect(buttonLike).toHaveText("1");
    await expect(buttonText).toHaveText("Liked");
  });

  test("자신의 기사에는 Like할 수 없다", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page, userName: "JPub" });
    await expect(page).toHaveURL(url("/"));
    // 여기서부터 ID가 90인 기사의 페이지
    await page.goto(url("/posts/90"));
    const buttonLike = page.getByRole("button", { name: "Like" });
    const buttonText = page.getByTestId("likeStatus");
    // [Like] 버튼이 비활성화되고, Like라는 문자도 사라진다.
    await expect(buttonLike).toBeDisabled();
    await expect(buttonText).not.toHaveText("Like");
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
