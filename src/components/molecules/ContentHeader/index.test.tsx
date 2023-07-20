import { render, screen } from "@testing-library/react";
import { ContentHeader } from "./";

test("[role=banner]", () => {
  render(<ContentHeader title="제목" />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
});

test("title 지정", async () => {
  render(<ContentHeader title="제목" />);
  expect(
    screen.getByRole("heading", { name: "제목" })
  ).toBeInTheDocument();
});

test("description 지정", async () => {
  render(<ContentHeader title="제목" description="요약" />);
  expect(screen.getByText("요약")).toBeInTheDocument();
});
