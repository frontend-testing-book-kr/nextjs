import { render, screen } from "@testing-library/react";
import { Accounts } from "./";

test("props로 계정명을 넘기면 링크가 표시된다", async () => {
  render(<Accounts githubAccount="gh-test" twitterAccount="tw-user" />);
  expect(screen.getByRole("link", { name: "gh-test" })).toHaveAttribute(
    "href",
    "https://github.com/gh-test"
  );
  expect(screen.getByRole("link", { name: "tw-user" })).toHaveAttribute(
    "href",
    "https://twitter.com/tw-user"
  );
});

test("props로 계정명을 넘기지 않으면 링크가 표시되지 않는다", async () => {
  render(<Accounts />);
  expect(screen.queryAllByRole("link")).toHaveLength(0);
});
