import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { OrderBy } from "./";

const user = userEvent.setup();

function setup(asPath = "/posts") {
  mockRouter.setCurrentUrl(asPath);
  render(<OrderBy />);
  const combobox = screen.getByRole("combobox");
  return { combobox };
}

test("초기화면에서 query.orderBy가 지정되어 있지 않으면 '수정일순'이 선택되어 있다", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("수정일순");
});

test("지정되어 있으면 query.orderBy가 설정된다", async () => {
  const { combobox } = setup();
  await user.selectOptions(combobox, "starCount");
  expect(combobox).toHaveDisplayValue("인기순");
  expect(mockRouter).toMatchObject({
    pathname: "/posts",
    query: { orderBy: "starCount" },
  });
});
