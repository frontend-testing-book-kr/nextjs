import { generatePagination } from "@/lib/util/pagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Pagination } from ".";

const user = userEvent.setup();

const clickLink = (name: string) =>
  user.click(screen.getByRole("link", { name }));

const setup = (page: number, max = 9, pathname = "/posts") => {
  render(
    <Pagination
      pathname={pathname}
      pagination={generatePagination(page, max)}
    />
  );
};

const assertHasCurrent = (name: string) =>
  expect(screen.getByRole("link", { name })).toHaveAttribute(
    "aria-current",
    "page"
  );

test("현재 페이지값을 전달하지 않으면 렌더링되지 않는다", () => {
  setup(0);
  expect(
    screen.queryByRole("navigation", { name: "페이지네이션" })
  ).toBeNull();
});

test("현재 페이지값을 전달하면 렌더링된다", () => {
  setup(1);
  expect(
    screen.getByRole("navigation", { name: "페이지네이션" })
  ).toBeInTheDocument();
});

test("현재 기사가 변경된다", async () => {
  setup(1);
  assertHasCurrent("1");
  await clickLink("2");
  assertHasCurrent("2");
});

test("URL검색 쿼리가 변경된다", async () => {
  mockRouter.setCurrentUrl("/posts?page=1");
  setup(1);
  expect(mockRouter).toMatchObject({ query: { page: "1" } });
  await clickLink("2");
  expect(mockRouter).toMatchObject({ query: { page: "2" } });
});
