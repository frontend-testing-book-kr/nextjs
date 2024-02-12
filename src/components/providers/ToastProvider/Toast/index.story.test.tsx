import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Succeed, Failed, Busy } = composeStories(stories);

test("Succeed", () => {
  render(<Succeed />);
  expect(screen.getByRole("alert")).toHaveTextContent("성공했습니다");
});

test("Failed", () => {
  render(<Failed />);
  expect(screen.getByRole("alert")).toHaveTextContent("실패했습니다");
});

test("Busy", () => {
  render(<Busy />);
  expect(screen.getByRole("alert")).toHaveTextContent("통신 중입니다");
});
