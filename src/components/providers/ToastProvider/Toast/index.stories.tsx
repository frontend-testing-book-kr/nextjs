import { ToastProvider, ToastState } from "@/components/providers/ToastProvider";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Toast } from ".";

function createDecorator(defaultState?: Partial<ToastState>) {
  return function Decorator() {
    return (
      <ToastProvider defaultState={{ ...defaultState, isShown: true }}>
        {null}
      </ToastProvider>
    );
  };
}

export default {
  component: Toast,
} as ComponentMeta<typeof Toast>;

type Story = ComponentStoryObj<typeof Toast>;

export const Succeed: Story = {
  decorators: [createDecorator({ message: "성공했습니다", style: "succeed" })],
};

export const Failed: Story = {
  decorators: [createDecorator({ message: "실패했습니다", style: "failed" })],
};

export const Busy: Story = {
  decorators: [createDecorator({ message: "통신 중입니다", style: "busy" })],
};
