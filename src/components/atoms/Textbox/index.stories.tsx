import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Textbox } from "./";

export default {
  component: Textbox,
  args: { placeholder: "문자를 입력해주세요" },
} as ComponentMeta<typeof Textbox>;

type Story = ComponentStoryObj<typeof Textbox>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
