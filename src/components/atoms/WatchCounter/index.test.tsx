import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestComponent } from "./index.stories";

const user = userEvent.setup();

test("입력된 문자수만큼 카운트가 증가한다", async () => {
  render(<TestComponent />);
  expect(screen.getByText("0 / 10")).toBeInTheDocument();
  await user.type(screen.getByRole("textbox"), "123");
  expect(screen.getByText("3 / 10")).toBeInTheDocument();
});

test("최대 문자수를 초과하면 [data-invalid='true']가 된다", async () => {
  render(<TestComponent />);
  await user.type(screen.getByRole("textbox"), "01234567890");
  expect(screen.getByText("11 / 10")).toHaveAttribute("data-invalid", "true");
});
