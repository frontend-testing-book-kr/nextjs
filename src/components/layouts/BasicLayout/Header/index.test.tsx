import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { NotLoggedIn } = composeStories(stories);
const server = setupMockServer();

test("[role=banner]", async () => {
  server.use(handleGetMyProfile({ status: 401 }));
  render(<NotLoggedIn />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
});

test("로그인 상태가 아니면 로그인 버튼이 표시된다", async () => {
  server.use(handleGetMyProfile({ status: 401 }));
  render(<NotLoggedIn />);
  expect(
    screen.getByRole("heading", { name: "Tech Posts" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "로그인" })).toBeInTheDocument();
});
