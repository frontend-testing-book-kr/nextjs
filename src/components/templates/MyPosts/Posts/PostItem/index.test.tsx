import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { PostItem } from "./";

const user = userEvent.setup();

const setup = (published = true) => {
  const post = getMyPostsData.posts[0];
  render(<PostItem post={{ ...post, published }} />);
  const link = screen.getByRole("link");
  const click = () => user.click(link);
  return { post, link, click };
};

test("링크의 접근 가능한 이름에는 제목을 사용한다", async () => {
  // <a>요소에 aria-label을 설정하지 않으면 <a>가 가진 문자열이 접근 가능한 이름이 된다.
  // aria-label에 post.title을 적용해서 직관적으로 이해할 수 있는 접근 가능한 이름이 됐다.
  const { post, link } = setup();
  expect(link).toHaveAccessibleName(post.title);
});

test("링크를 클릭하면 화면이 이동된다", async () => {
  // 링크 이동 확인은 목록에 표시된 내용을 검증하기 보다 가장 작은 컴포넌트로 검증하는 것이 보다 빠른 방법이다.
  const { post, click } = setup();
  await click();
  expect(mockRouter).toMatchObject({ pathname: `/my/posts/${post.id}` });
});

// jest-dom에서는 CSS 가상요소(pseudo-element)로 문자열이 있는지 확인할 수 없다
test.todo("'비공개'상태라면 'Draft'라는 레이블이 표시된다");
