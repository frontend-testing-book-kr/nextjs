import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { gotoAndCreatePostAsPublish, gotoEditPostPage } from "./postUtil";
import { login, url } from "./util";

test.describe("메인 페이지", () => {
  const path = "/";
  const userName: UserName = "JPub";

  test("로그인 상태가 아니면 로그인 버튼이 표시된다", async ({ page }) => {
    await page.goto(url(path));
    const buttonLogin = page.getByRole("link", { name: "로그인" });
    await expect(buttonLogin).toBeVisible();
  });

  test("로그인한 사용자 정보가 표시된다", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page });
    await expect(page).toHaveURL(url(path));
    const loginUser = page.locator("[aria-label='로그인한 사용자']");
    await expect(loginUser).toContainText("JPub");
  });

  test("신규 기사를 공개 상태로 저장하면 최신 기사 목록에 표시된다", async ({
    page,
  }) => {
    const title = "공개 저장 후 최신 기사 목록 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("공개된 기사를 비공개하면 최신 기사 목록에 표시되지 않는다", async ({
    page,
  }) => {
    const title = "비공개 후 최신 기사 목록 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("공개 여부").click();
    await page.getByRole("button", { name: "비공개 상태로 저장" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
    await page.goto(url(path));
    await expect(page.getByText(title)).not.toBeVisible();
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
