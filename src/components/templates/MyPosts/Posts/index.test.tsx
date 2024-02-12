import {
  getMyPostsData,
  getMyPostsEmptyData,
} from "@/services/server/MyPosts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Posts } from "./";

const setup = (empty = false) => {
  render(<Posts {...(empty ? getMyPostsEmptyData : getMyPostsData)} />);
  const PostList = screen.queryByRole("region", {
    name: "기사 목록",
  });
  const pagination = screen.queryByRole("navigation", {
    name: "페이지네이션",
  });
  const paginationInfo = screen.queryByRole("region", {
    name: "표시중인 목록",
  });
  const noItems = screen.queryByRole("heading", {
    name: "게재된 기사가 없습니다",
  });
  return { PostList, pagination, paginationInfo, noItems };
};

test("'기사 목록'이라는 접근 가능한 이름을 식별할 수 있다", async () => {
  setup();
  expect(
    screen.getByRole("region", { name: "기사 목록" })
  ).toBeInTheDocument();
});

test("기사 목록이 있으면 컨텐츠가 표시된다", async () => {
  const { PostList, pagination, paginationInfo, noItems } = setup();
  expect(PostList).toBeInTheDocument();
  expect(pagination).toBeInTheDocument();
  expect(paginationInfo).toBeInTheDocument();
  expect(noItems).not.toBeInTheDocument();
});

test("기사 목록이 없으면 게재된 기사가 없다는 안내가 표시된다", async () => {
  const { PostList, pagination, paginationInfo, noItems } = setup(true);
  expect(PostList).not.toBeInTheDocument();
  expect(pagination).not.toBeInTheDocument();
  expect(paginationInfo).not.toBeInTheDocument();
  expect(noItems).toBeInTheDocument();
});
