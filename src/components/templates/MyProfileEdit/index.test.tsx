import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import * as MyProfileEdit from "@/services/client/MyProfileEdit/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

function setup() {
  const utils = render(<Default />);
  const name = utils.getByRole("textbox", { name: "사용자명" });
  const button = screen.getByRole("button", { name: "프로필 변경하기" });
  const clearName = () => user.clear(name);
  const typeName = (value: string) => user.type(name, value);
  const clickButton = () => user.click(button);
  return { clearName, typeName, clickButton };
}

async function setupValidInputs() {
  const { clearName, typeName, clickButton } = setup();
  await clearName();
  await typeName("User.200");
  return { clickButton };
}

async function setupInvalidInputs() {
  const { clearName, typeName, clickButton } = setup();
  await clearName();
  await typeName("User.500");
  return { clickButton };
}

setupMockServer(...MyProfileEdit.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockRouter.setCurrentUrl("/my/profile/edit");
});

test("통신에 성공하면 화면을 이동한다", async () => {
  const { clickButton } = await setupValidInputs();
  await clickButton();
  await waitFor(() =>
    expect(mockRouter).toMatchObject({ pathname: "/my/posts" })
  );
});

test("통신에 성공하면 '저장됐습니다'가 표시된다", async () => {
  const { clickButton } = await setupValidInputs();
  await clickButton();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("저장됐습니다")
  );
});

test("통신에 실패하면 '저장에 실패했습니다'가 표시된다", async () => {
  const { clickButton } = await setupInvalidInputs();
  await clickButton();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("저장에 실패했습니다")
  );
});
