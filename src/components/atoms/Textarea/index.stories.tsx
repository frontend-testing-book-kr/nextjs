import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Textarea } from "./";

export default {
  component: Textarea,
  args: { placeholder: "문자를 입력해주세요" },
} as ComponentMeta<typeof Textarea>;

type Story = ComponentStoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
