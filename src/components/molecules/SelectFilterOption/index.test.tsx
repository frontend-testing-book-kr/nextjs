import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectFilterOption } from "./";

const user = userEvent.setup();

function setup() {
  const title = "공개 여부";
  const options = [
    { value: "all", label: "모두" },
    { value: "public", label: "공개" },
    { value: "private", label: "비공개" },
  ];
  render(
    <SelectFilterOption
      title={title}
      selectProps={{ name: "status" }}
      options={options}
    />
  );
  const combobox = screen.getByRole("combobox");
  const select = (index: number) =>
    user.selectOptions(combobox, options[index].label);
  return { title, options, combobox, select };
}

test("select요소는 title을 접근 가능한 이름으로 참조한다", async () => {
  const { title, combobox } = setup();
  expect(combobox).toHaveAccessibleName(title);
});

test("select요소를 변경하면 값이 변한다", async () => {
  const { combobox, options, select } = setup();
  expect(combobox).toHaveDisplayValue(options[0].label);
  await select(1);
  expect(combobox).toHaveDisplayValue(options[1].label);
});
