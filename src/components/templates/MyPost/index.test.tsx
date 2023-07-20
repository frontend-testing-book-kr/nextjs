import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MyPost } from "./";

const user = userEvent.setup();

test("heading이 표시된다", async () => {
  render(<MyPost post={getMyPostData} />);
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" })
  ).toBeInTheDocument();
});

test("'편집하기'링크를 클릭하면 편집 페이지로 이동한다", async () => {
  render(<MyPost post={getMyPostData} />);
  await user.click(screen.getByRole("link", { name: "편집하기" }));
  await waitFor(() =>
    expect(mockRouter).toMatchObject({ pathname: "/my/posts/1/edit" })
  );
});
