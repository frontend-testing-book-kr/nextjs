import { expect, Page } from "@playwright/test";
import { UserName, usersFixture } from "../prisma/fixtures/user";

export function url(path: string) {
  return `http://localhost:3000${path}`;
}

export const getUser = (name: string) =>
  usersFixture().find((user) => user.name === name);

export async function login({
  page,
  userName = "Bae Eonsu",
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
  userName = "Bae Eonsu",
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
  await page.goto(url(path));
  await page.waitForURL(url("/login"));
  await expect(page).toHaveTitle("로그인 | Tech Posts");
}
