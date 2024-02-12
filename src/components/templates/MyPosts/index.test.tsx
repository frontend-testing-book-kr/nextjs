import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
setupMockServer(handleGetMyProfile());

test("주요 컨텐츠가 표시되어 있다", async () => {
  render(<Default posts={getMyPostsData} />);
  expect(
    await screen.findByRole("region", { name: "프로필" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "기사 목록" })
  ).toBeInTheDocument();
});
