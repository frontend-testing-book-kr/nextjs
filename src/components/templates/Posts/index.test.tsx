import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Posts } from "./";

test("제목 표시", async () => {
  render(<Posts {...getPostsData} />);
  expect(
    screen.getByRole("heading", { name: "최신 기사 목록" })
  ).toBeInTheDocument();
});

test("주요 컨텐츠 표시", async () => {
  render(<Posts {...getPostsData} />);
  expect(screen.getByRole("region", { name: "기사 목록" })).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: "페이지네이션" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "표시중인 목록" })
  ).toBeInTheDocument();
});
