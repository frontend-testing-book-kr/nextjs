import { expect, Page } from "@playwright/test";
import { UserName } from "../prisma/fixtures/user";
import { login, url } from "./util";

export async function gotoAndFillPostContents({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await page.goto(url("/login"));
  await login({ page, userName });
  await expect(page).toHaveURL(url("/"));
  await page.goto(url("/my/posts/create"));
  await page.setInputFiles("data-testid=file", [
    "public/__mocks__/images/img01.jpg",
  ]);
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  await page.getByRole("textbox", { name: "제목" }).fill(title);
}

export async function gotoAndCreatePostAsDraft({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await gotoAndFillPostContents({ page, title, userName });
  await page.getByRole("button", { name: "비공개 상태로 저장" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(title);
}

export async function gotoAndCreatePostAsPublish({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await gotoAndFillPostContents({ page, title, userName });
  await page.getByText("공개 여부").click();
  await page.getByRole("button", { name: "공개하기" }).click();
  await page.getByRole("button", { name: "네" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(title);
}

export async function gotoEditPostPage({
  page,
  title,
}: {
  page: Page;
  title: string;
}) {
  await page.getByRole("link", { name: "편집하기" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(`기사 편집 | ${title}`);
}
