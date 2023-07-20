import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ContentHeader } from "./";

export default {
  component: ContentHeader,
} as ComponentMeta<typeof ContentHeader>;

type Story = ComponentStoryObj<typeof ContentHeader>;

export const Default: Story = {
  args: { title: "제목", description: "요약" },
};
