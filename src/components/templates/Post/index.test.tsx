import { getPostData } from "@/services/server/Post/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Post } from "./";

test("heading이 표시된다", async () => {
  render(<Post post={getPostData} user={null} />);
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" })
  ).toBeInTheDocument();
});

test("'Like'버튼이 표시된다", async () => {
  render(<Post post={getPostData} user={null} />);
  expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
});
