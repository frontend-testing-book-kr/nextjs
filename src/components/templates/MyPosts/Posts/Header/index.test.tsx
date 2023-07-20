import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Header } from "./";

const user = userEvent.setup();

/* 리스트 7-13
function setup(url = "/my/posts?page=1") {
  mockRouter.setCurrentUrl(url);
  render(<Header />);
  const combobox = screen.getByRole("combobox", { name: "공개여부" });
  return { combobox };
}
*/

function setup(url = "/my/posts?page=1") {
  mockRouter.setCurrentUrl(url);
  render(<Header />);
  const combobox = screen.getByRole("combobox", { name: "공개여부" });
  async function selectOption(label: string) {
    await user.selectOptions(combobox, label);
  }
  return { combobox, selectOption };
}

test("기본값으로 '모두'가 선택되어 있다", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("모두");
});

test("status?=public으로 접속하면 '공개'가 선택되어 있다", async () => {
  const { combobox } = setup("/my/posts?status=public");
  expect(combobox).toHaveDisplayValue("공개");
});

test("staus?=private으로 접속하면 '비공개'가 선택되어 있다", async () => {
  const { combobox } = setup("/my/posts?status=private");
  expect(combobox).toHaveDisplayValue("비공개");
});

test("공개여부를 변경하면 status가 변한다", async () => {
  // 기존의 page=1이 그대로 있는지도 함께 검증한다
  const { selectOption } = setup();
  expect(mockRouter).toMatchObject({ query: { page: "1" } });
  await selectOption("공개");
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "public" },
  });
  await selectOption("비공개");
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "private" },
  });
});
