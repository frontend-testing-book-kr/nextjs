import { ToastProvider } from "@/components/providers/ToastProvider";
import {
  mockPostLikeRejected,
  mockPostLikeResolved,
} from "@/services/client/Like/__mock__/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LikeButton } from "./";

const user = userEvent.setup();

const defaultArgs = {
  likeCount: 0,
  liked: false,
  isMyPost: false,
  isLoggedIn: true,
};

const setup = ({ likeCount, liked, isMyPost, isLoggedIn } = defaultArgs) => {
  render(
    <ToastProvider>
      <LikeButton
        likeCount={likeCount}
        liked={liked}
        isMyPost={isMyPost}
        isLoggedIn={isLoggedIn}
      />
    </ToastProvider>
  );
  const button = screen.getByRole("button");
  const click = () => user.click(button);
  return { click, button };
};

test("이미 Like한 경우에 버튼은 비활성화된다", async () => {
  const { button } = setup({ ...defaultArgs, liked: true });
  expect(button).toBeDisabled();
});

test("내가 쓴 기사에는 버튼이 비활성화된다", async () => {
  const { button } = setup({ ...defaultArgs, isMyPost: true });
  expect(button).toBeDisabled();
});

test("로그인 되어있지 않으면 버튼은 비활성화된다", async () => {
  const { button } = setup({ ...defaultArgs, isLoggedIn: false });
  expect(button).toBeDisabled();
});

test("Like를 클릭해서 요청이 성공하면 Like수가 1 증가하고 버튼이 비활성화된다", async () => {
  mockPostLikeResolved();
  const { click, button } = setup();
  expect(screen.getByText("Like")).toBeInTheDocument();
  expect(button).toHaveTextContent("0");
  expect(button).toBeEnabled();
  await click();
  expect(await screen.findByText("Liked")).toBeInTheDocument();
  expect(button).toHaveTextContent("1");
  expect(button).toBeDisabled();
});

test("Like를 클릭해서 요청이 실패하면 Like수가 증가하지 않고 버튼은 비활성화되지 않는다", async () => {
  mockPostLikeRejected();
  const { click, button } = setup();
  expect(button).toHaveTextContent("0");
  expect(button).toBeEnabled();
  await click();
  expect(button).toHaveTextContent("0");
  expect(button).not.toBeDisabled();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("에러가 발생했습니다")
  );
});
