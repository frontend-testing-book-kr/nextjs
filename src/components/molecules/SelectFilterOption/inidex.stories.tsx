import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { SelectFilterOption } from "./";

export default {
  component: SelectFilterOption,
} as ComponentMeta<typeof SelectFilterOption>;

type Story = ComponentStoryObj<typeof SelectFilterOption>;

export const Default: Story = {
  args: {
    title: "공개 여부",
    options: [
      { value: "all", label: "모두" },
      { value: "public", label: "공개" },
      { value: "private", label: "비공개" },
    ],
  },
};
