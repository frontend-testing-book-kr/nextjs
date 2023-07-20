import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { FullProps } = composeStories(stories);

test("TextareaWithInfo", async () => {
  render(<FullProps />);
  expect(screen.getByRole("textbox")).toHaveAccessibleName("본문");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "영문과 숫자를 조합하여 64자 이내로 입력해주세요"
  );
  expect(screen.getByRole("textbox")).toHaveErrorMessage(
    "유효하지 않은 문자가 포함되어 있습니다"
  );
});
