import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { LoginUserInfoProviderDecorator, SPStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { Header } from "./";

/* 코드 8-15
export const NotLoggedIn: Story = {
  parameters: {
    msw: { 
      handlers: [
        rest.get("/api/my/profile", async (_, res, ctx) => {
          return res(ctx.status(401));
        }),
      ], 
    },
  },
};
*/

/* 코드 8-16
export const NotLoggedIn: Story = {
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
    // 요청 핸들러 내용은 다음과 같다.
    // msw: { 
    //   handlers: [
    //     rest.get("/api/my/profile", async (_, res, ctx) => {
    //       return res(ctx.status(401));
    //     }),
    //   ], 
    // },
  },
};
*/

export default {
  component: Header,
  decorators: [LoginUserInfoProviderDecorator],
} as ComponentMeta<typeof Header>;

type Story = ComponentStoryObj<typeof Header>;

export const NotLoggedIn: Story = {
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
};

export const LoggedIn: Story = {};

export const RouteMyPosts: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts" },
  },
};

export const RouteMyPostsCreate: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts/create" },
  },
};

export const SPNotLogIn: Story = {
  parameters: {
    ...SPStory.parameters,
    ...NotLoggedIn.parameters,
  },
};

export const SPLoggedIn: Story = {
  parameters: {
    ...SPStory.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.queryByRole("navigation", {
      name: "내비게이션",
    });
    await expect(navigation).not.toBeInTheDocument();
  },
};

export const SPLoggedInOpenedMenu: Story = {
  storyName: "SP 레이아웃에서 드로어 메뉴를 연다",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", {
      name: "메뉴 열기",
    });
    await user.click(button);
    const navigation = canvas.getByRole("navigation", {
      name: "내비게이션",
    });
    await expect(navigation).toBeInTheDocument();
  },
};

export const SPLoggedInClosedMenu: Story = {
  storyName: "SP 레이아웃에서 드로어 메뉴를 닫는다",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonOpen = await canvas.findByRole("button", {
      name: "메뉴 열기",
    });
    await user.click(buttonOpen);
    const buttonClose = await canvas.findByRole("button", {
      name: "메뉴 닫기",
    });
    await expect(buttonClose).toBeInTheDocument();
    await user.click(buttonClose);
  },
};

export const PCLoggedInNotHaveOpenMenu: Story = {
  storyName: "PC 레이아웃에서는 '메뉴 열기'를 표시하지 않는다",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", {
          name: "메뉴 열기",
        })
      ).toBeNull()
    );
  },
};
