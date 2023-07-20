import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { NoItems } from "./";

const user = userEvent.setup();

test("제목 표시", async () => {
  render(<NoItems />);
  expect(
    screen.getByRole("heading", { name: "게재된 기사가 없습니다" })
  ).toBeInTheDocument();
});

test("링크 클릭", async () => {
  render(<NoItems />);
  await user.click(
    screen.getByRole("link", {
      name: "기사를 작성해주세요",
    })
  );
  expect(mockRouter).toMatchObject({ pathname: "/my/posts/create" });
});
