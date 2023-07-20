import { render, screen } from "@testing-library/react";
import { TextboxWithError } from "./";

describe("TextboxWithError", () => {
  test("에러 메시지가 없다", async () => {
    render(<TextboxWithError name="title" />);
    expect(screen.getByRole("textbox")).toBeValid();
    expect(screen.getByRole("textbox")).not.toHaveErrorMessage();
  });

  test("에러 메시지가 있다", async () => {
    const error = "에러가 발생했습니다";
    render(<TextboxWithError name="title" error={error} />);
    expect(screen.getByRole("textbox")).toBeInvalid();
    expect(screen.getByRole("textbox")).toHaveErrorMessage(error);
  });
});
