import { expect, Page } from "@playwright/test";
import { UserName, usersFixture } from "../prisma/fixtures/user";

export function url(path: string) {
  return `http://localhost:3000${path}`;
}

export const getUser = (name: string) =>
  usersFixture().find((user) => user.name === name);

export async function login({
  page,
  userName = "JPub",
}: {
  page: Page;
  userName?: UserName;
}) {
  const user = getUser(userName)!;
  await page.getByRole("textbox", { name: "메일주소" }).fill(user.email);
  await page.getByRole("textbox", { name: "비밀번호" }).fill(user.password);
  await page.getByRole("button", { name: "로그인" }).click();
}

export async function logout({
  page,
  userName = "JPub",
}: {
  page: Page;
  userName?: UserName;
}) {
  const user = getUser(userName)!;
  const loginUser = page
    .locator("[aria-label='로그인한 사용자']")
    .getByText(user.name);
  await loginUser.hover();
  await page.getByText("로그아웃").click();
}

export async function assertUnauthorizedRedirect({
  page,
  path,
}: {
  page: Page;
  path: string;
}) {
  // 지정된 페이지에 접근한다.
  await page.goto(url(path));
  // 리다이렉트될 때까지 기다린다.
  await page.waitForURL(url("/login"));
  // 로그인 페이지로 이동했는지 확인한다.
  await expect(page).toHaveTitle("로그인 | Tech Posts");
}
