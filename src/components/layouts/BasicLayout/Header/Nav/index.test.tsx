import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from "./";

/* 코드 7-9
test("현재 위치는 'My Posts'이다", () => {
  mockRouter.setCurrentUrl("/my/posts");
});
*/

test("현재 위치는 'My Posts'이다", () => {
  mockRouter.setCurrentUrl("/my/posts");
  render(<Nav onCloseMenu={() => {}} />);
  const link = screen.getByRole("link", { name: "My Posts" });
  expect(link).toHaveAttribute("aria-current", "page");
});

test("현재 위치는 'Create Post'이다", () => {
  mockRouter.setCurrentUrl("/my/posts/create");
  render(<Nav onCloseMenu={() => {}} />);
  const link = screen.getByRole("link", { name: "Create Post" });
  expect(link).toHaveAttribute("aria-current", "page");
});

test.each([
  { url: "/my/posts", name: "My Posts" },
  { url: "/my/posts/123", name: "My Posts" },
  { url: "/my/posts/create", name: "Create Post" },
])("$url의 현재 위치는 $name이다", ({ url, name }) => {
  mockRouter.setCurrentUrl(url);
  render(<Nav onCloseMenu={() => {}} />);
  const link = screen.getByRole("link", { name });
  expect(link).toHaveAttribute("aria-current", "page");
});
