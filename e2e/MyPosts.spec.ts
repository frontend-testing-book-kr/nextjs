import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
} from "./postUtil";
import { assertUnauthorizedRedirect, login, url } from "./util";

/* 코드 10-15
test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
  const path = "/my/posts";
  await assertUnauthorizedRedirect({ page, path });
});
*/

test.describe("게재된 기사 목록 페이지", () => {
  const path = "/my/posts";
  const userName: UserName = "JPub";

  test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("자신의 프로필을 열람할 수 있다", async ({ page }) => {
    await page.goto(url(path));
    await login({ page });
    await expect(page).toHaveURL(url(path));
    const profile = page.getByRole("region", { name: "프로필" });
    await expect(profile).toContainText("JPub");
  });

  test("신규 기사를 비공개 상태로 저장하면 게재된 기사 목록에 기사가 추가된다", async ({
    page,
  }) => {
    const title = "비공개로 저장된 기사 목록 테스트";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("신규 기사를 공개 상태로 저장하면 게재된 기사 목록에 기사가 추가된다", async ({
    page,
  }) => {
    const title = "공개 상태로 저장된 기사 목록 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
