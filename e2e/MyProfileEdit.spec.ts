import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { assertUnauthorizedRedirect, login, url } from "./util";

test.describe("프로필 편집 페이지", () => {
  const path = "/my/profile/edit";
  const userName: UserName = "User-MyProfileEdit";
  const newName = "NewName";

  test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("프로필을 편집하면 프로필에 반영된다", async ({
    page,
  }) => {
    await page.goto(url(path));
    await login({ page, userName });
    // 여기서부터 프로필 편집화면
    await expect(page).toHaveURL(url(path));
    await expect(page).toHaveTitle(`${userName}님의 프로필 편집`);
    await page.getByRole("textbox", { name: "사용자명" }).fill(newName);
    await page.getByRole("button", { name: "프로필 변경하기" }).click();
    await page.waitForURL(url("/my/posts"));
    // 페이지 제목에 방금 입력한 이름이 포함돼 있다.
    await expect(page).toHaveTitle(`${newName}님의 기사 목록`);
    await expect(
      page.getByRole("region", { name: "프로필" })
    ).toContainText(newName);
    await expect(page.locator("[aria-label='로그인한 사용자']")).toContainText(
      newName
    );
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
