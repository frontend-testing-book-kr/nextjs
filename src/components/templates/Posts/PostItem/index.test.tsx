import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { PostItem } from "./";

const user = userEvent.setup();

const setup = (published = true) => {
  const post = getPostsData.posts[0];
  render(<PostItem post={{ ...post, published }} />);
  const link = screen.getByRole("link");
  const click = () => user.click(link);
  return { post, link, click };
};

test("링크의 접근 가능한 이름은 제목을 참조한다", async () => {
  const { post, link } = setup();
  expect(link).toHaveAccessibleName(post.title);
});

test("링크를 클릭하면 화면을 이동한다", async () => {
  const { post, click } = setup();
  await click();
  expect(mockRouter).toMatchObject({ pathname: `/posts/${post.id}` });
});
