import * as MyPost from "@/services/client/MyPost/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

async function setup() {
  render(<Default />);
  async function clearTitle() {
    await user.clear(screen.getByRole("textbox", { name: "제목" }));
  }
  async function saveAsPublished() {
    await user.click(screen.getByRole("button", { name: "공개하기" }));
    await screen.findByRole("alertdialog");
  }
  async function saveAsDraft() {
    await user.click(screen.getByRole("switch", { name: "공개 여부" }));
    await user.click(screen.getByRole("button", { name: "비공개 상태로 저장" }));
  }
  async function deletePost() {
    await user.click(screen.getByRole("button", { name: "삭제하기" }));
  }
  async function clickButton(name: "네" | "아니오") {
    await user.click(screen.getByRole("button", { name }));
  }
  return {
    clearTitle,
    saveAsPublished,
    saveAsDraft,
    deletePost,
    clickButton,
  };
}

const server = setupMockServer(...MyPost.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockRouter.setCurrentUrl("/my/posts/200/edit");
});

describe("AlertDialog", () => {
  test("[아니오] 버튼을 클릭하면 AlertDialog가 사라진다", async () => {
    const { saveAsPublished, clickButton } = await setup();
    await saveAsPublished();
    await clickButton("아니오");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  test("유효하지 않은 내용을 포함해 제출하면 AlertDialog가 사라진다", async () => {
    const { clearTitle, saveAsPublished, clickButton } = await setup();
    await clearTitle();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    );
  });
});

describe("Toast", () => {
  test("공개에 성공하면 '공개됐습니다'가 표시된다", async () => {
    const { saveAsPublished, clickButton } = await setup();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("공개됐습니다")
    );
  });

  test("공개에 실패하면 '공개에 실패했습니다'가 표시된다", async () => {
    server.use(MyPost.handlePutMyPost({ status: 500 }));
    const { saveAsPublished, clickButton } = await setup();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("공개에 실패했습니다")
    );
  });

  test("삭제에 성공하면 '삭제됐습니다'가 표시된다", async () => {
    const { deletePost, clickButton } = await setup();
    await deletePost();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("삭제됐습니다")
    );
  });

  test("삭제에 실패하면 '삭제에 실패했습니다'가 표시된다", async () => {
    server.use(MyPost.handleDeleteMyPost({ status: 500 }));
    const { deletePost, clickButton } = await setup();
    await deletePost();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("삭제에 실패했습니다")
    );
  });
});

describe("화면이동", () => {
  test("공개에 성공하면 화면을 이동한다", async () => {
    const { saveAsPublished, clickButton } = await setup();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: "/my/posts/1" })
    );
  });

  test("삭제에 성공하면 화면을 이동한다", async () => {
    const { deletePost, clickButton } = await setup();
    await deletePost();
    await clickButton("네");
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: "/my/posts" })
    );
  });
});
