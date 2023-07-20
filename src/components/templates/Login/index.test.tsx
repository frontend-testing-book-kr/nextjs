import { Input } from "@/services/client/Login";
import * as Login from "@/services/client/Login/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

export async function setup(injectValues?: Partial<Input>) {
  render(<Default />);
  const input: Input = {
    email: "test@example.com",
    password: "abcd1234",
    ...injectValues,
  };
  const email = screen.getByRole("textbox", { name: "메일주소" });
  const password = screen.getByPlaceholderText("8자 이상");
  const button = screen.getByRole("button", { name: "로그인" });
  await user.type(email, input.email);
  await user.type(password, input.password);
  await user.click(button);
}

setupMockServer(...Login.handlers, ...MyProfile.handlers);

test("로그인에 성공하면 redirectUrl로 이동한다", async () => {
  await setup();
  await waitFor(() => expect(window.location.pathname).toEqual("/"));
});

test("로그인에 실패하면 실패했다는 알림이 뜬다", async () => {
  await setup({ email: "500@example.com" });
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("로그인에 실패했습니다");
});

test("유효성 검사 에러가 발생하면 에러 메시지가 표시된다", async () => {
  await setup({ email: "test", password: "1234" });
  const email = screen.getByRole("textbox", { name: "메일주소" });
  const password = screen.getByPlaceholderText("8자 이상");
  await waitFor(() =>
    expect(email).toHaveErrorMessage("유효하지 않은 메일주소입니다")
  );
  expect(password).toHaveErrorMessage("8개 이상의 문자를 입력해주세요");
});
