import { BasicLayoutDecorator, PCStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { PostForm } from "./";

export default {
  component: PostForm,
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCStory.parameters,
    nextRouter: { pathname: "/my/posts" },
  },
  args: {
    title: "신규 기사",
    description: "공개 여부가 변경될 때까지 기사는 공개되지 않는다",
    onClickSave: () => {},
    onClickDelete: () => {},
  },
} as ComponentMeta<typeof PostForm>;

type Story = ComponentStoryObj<typeof PostForm>;

export const Default: Story = {};

export const SucceedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "제목" }),
      "나의 기사"
    );
  },
};

export const FailedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.click(canvas.getByRole("button", { name: "비공개 상태로 저장" }));
    const textbox = canvas.getByRole("textbox", { name: "제목" });
    await waitFor(() =>
      expect(textbox).toHaveErrorMessage("한 글자 이상의 문자를 입력해주세요")
    );
  },
};

export const SavePublish: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "제목" }),
      "나의 기사"
    );
    await user.click(canvas.getByRole("switch", { name: "공개 여부" }));
    await expect(
      canvas.getByRole("button", { name: "공개하기" })
    ).toBeInTheDocument();
  },
};
