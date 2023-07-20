import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Combobox } from "./";

export default {
  component: Combobox,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
  args: {
    "aria-label": "정렬",
    children: (
      <>
        <option>최신순</option>
        <option>인기순</option>
      </>
    ),
  },
} as ComponentMeta<typeof Combobox>;

type Story = ComponentStoryObj<typeof Combobox>;

export const Default: Story = {};
