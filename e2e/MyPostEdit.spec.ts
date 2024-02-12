import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
  gotoEditPostPage,
} from "./postUtil";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("기사 편집 페이지", () => {
  const path = "/my/posts/1/edit";
  const userName: UserName = "JPub";

  test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("비공개 기사를 편집할 수 있다", async ({ page }) => {
    const title = "비공개 편집 테스트";
    const newTitle = "비공개 편집 테스트 갱신 완료";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByRole("textbox", { name: "제목" }).fill(newTitle);
    await page.getByRole("button", { name: "비공개 상태로 저장" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(newTitle);
  });

  test("비공개 기사를 공개할 수 있다", async ({ page }) => {
    const title = "비공개 기사 공개 테스트";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("공개 여부").click();
    await page.getByRole("button", { name: "공개하기" }).click();
    await page.getByRole("button", { name: "네" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
  });

  test("공개된 기사를 비공개할 수 있다", async ({ page }) => {
    const title = "기사 비공개 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("공개 여부").click();
    await page.getByRole("button", { name: "비공개 상태로 저장" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
  });

  test("공개된 기사를 삭제할 수 있다", async ({ page }) => {
    const title = "기사 삭제 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByRole("button", { name: "삭제하기" }).click();
    await page.getByRole("button", { name: "네" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(`${userName}님의 기사 목록`);
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
