import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
} from "./postUtil";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("신규 기사 페이지", () => {
  const path = "/my/posts/create";
  const userName: UserName = "JPub";

  test("로그인 상태가 아니면 로그인 화면으로 리다이렉트된다", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("신규 기사를 비공개 상태로 저장할 수 있다", async ({ page }) => {
    const title = "비공개 상태로 저장하기 테스트";
    await gotoAndCreatePostAsDraft({ page, title, userName });
  });

  test("신규 기사를 공개할 수 있다", async ({ page }) => {
    const title = "공개하기 테스트";
    await gotoAndCreatePostAsPublish({ page, title, userName });
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
