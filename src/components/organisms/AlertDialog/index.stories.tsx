import { Args, PartialStoryFn } from "@storybook/csf";
import {
  ComponentMeta,
  ComponentStoryObj,
  ReactFramework,
} from "@storybook/react";
import { AlertDialog, AlertDialogProvider } from "./";
import { AlertDialogState } from "./AlertDialogContext";

// 스토리 등록용 함수
function createDecorator(defaultState?: Partial<AlertDialogState>) {
  return function Decorator(Story: PartialStoryFn<ReactFramework, Args>) {
    return (
      <AlertDialogProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </AlertDialogProvider>
    );
  };
}

export default {
  component: AlertDialog,
} as ComponentMeta<typeof AlertDialog>;

type Story = ComponentStoryObj<typeof AlertDialog>;

// 실제로 등록할 스토리
export const Default: Story = {
  decorators: [createDecorator({ message: "성공했습니다" })],
};

export const CustomButtonLabel: Story = {
  decorators: [
    createDecorator({
      message: "기사를 공개합니다. 진행하시겠습니까?",
      cancelButtonLabel: "CANCEL",
      okButtonLabel: "OK",
    }),
  ],
};

export const ExcludeCancel: Story = {
  decorators: [
    createDecorator({
      message: "제출됐습니다",
      cancelButtonLabel: undefined,
      okButtonLabel: "OK",
    }),
  ],
};
