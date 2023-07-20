import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { TextboxWithInfo } from ".";
import * as stories from "./index.stories";
const { FullProps } = composeStories(stories);

test("TextboxWithInfo", async () => {
  render(<FullProps />);
  expect(screen.getByRole("textbox")).toHaveAccessibleName("제목");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "영문과 숫자를 조합하여 64자 이내로 입력해주세요"
  );
  expect(screen.getByRole("textbox")).toHaveErrorMessage(
    "유효하지 않은 문자가 포함되어 있습니다"
  );
});

test("TextboxWithInfo", async () => {
  const args = {
    title: "제목",
    info: "0 / 64",
    description: "영문과 숫자를 조합하여 64자 이내로 입력해주세요",
    error: "유효하지 않은 문자가 포함되어 있습니다",
  };
  render(<TextboxWithInfo {...args} />);
  const textbox = screen.getByRole("textbox");
  // label의 htmlFor와 연관되어 있다
  expect(textbox).toHaveAccessibleName(args.title);
  // aria-describedby와 연관되어 있다
  expect(textbox).toHaveAccessibleDescription(args.description);
  // aria-errormessage와 연관되어 있다
  expect(textbox).toHaveErrorMessage(args.error);
});
