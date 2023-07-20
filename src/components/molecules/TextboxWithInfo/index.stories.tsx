import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TextboxWithInfo } from "./";

export default {
  component: TextboxWithInfo,
  args: { title: "제목" },
} as ComponentMeta<typeof TextboxWithInfo>;

type Story = ComponentStoryObj<typeof TextboxWithInfo>;

export const Default: Story = {};

export const Info: Story = {
  args: { info: "0 / 64" },
};

export const Description: Story = {
  args: { description: "유효하지 않은 문자가 포함되어 있습니다" },
};

export const Error: Story = {
  args: { error: "유효하지 않은 문자가 포함되어 있습니다" },
};

export const FullProps: Story = {
  args: {
    info: "0 / 64",
    description: "영문과 숫자를 조합하여 64자 이내로 입력해주세요",
    error: "유효하지 않은 문자가 포함되어 있습니다",
  },
};
