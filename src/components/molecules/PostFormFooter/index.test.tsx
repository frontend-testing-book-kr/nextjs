import { PutInput } from "@/pages/api/my/posts/[postId]";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { PostFormFooter } from "./";

const user = userEvent.setup();

function TestComponent(
  props: Omit<
    ComponentPropsWithoutRef<typeof PostFormFooter>,
    "register" | "control"
  >
) {
  const { register, control } = useForm<PutInput>();
  return <PostFormFooter {...props} register={register} control={control} />;
}

const setup = (isSubmitting = false) => {
  const onClickSave = jest.fn();
  const onClickDelete = jest.fn();
  const { getByRole, queryByRole } = render(
    <TestComponent
      isSubmitting={isSubmitting}
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
    />
  );
  const clickSwitch = () =>
    user.click(getByRole("switch", { name: "공개 여부" }));
  const clickSaveButton = () =>
    user.click(
      queryByRole("button", { name: "공개하기" }) ||
        getByRole("button", { name: "비공개 상태로 저장" })
    );
  const clickDeleteButton = () =>
    user.click(getByRole("button", { name: "삭제하기" }));
  return {
    getByRole,
    clickSwitch,
    clickSaveButton,
    clickDeleteButton,
    onClickSave,
    onClickDelete,
  };
};

test("'비공개 상태로 저장'버튼을 클릭하면 이벤트 핸들러가 실행된다", async () => {
  const { getByRole, clickSaveButton, onClickSave } = setup();
  await clickSaveButton();
  expect(getByRole("button", { name: "비공개 상태로 저장" })).toBeInTheDocument();
  expect(onClickSave).toHaveBeenCalled();
});

test("'공개하기'버튼을 클릭하면 이벤트 핸들러가 실행된다", async () => {
  const { getByRole, clickSwitch, clickSaveButton, onClickSave } = setup();
  await clickSwitch();
  expect(getByRole("button", { name: "공개하기" })).toBeInTheDocument();
  await clickSaveButton();
  expect(onClickSave).toHaveBeenCalled();
});

test("'삭제하기'버튼을 클릭하면 이벤트 핸들러가 실행된다", async () => {
  const { clickDeleteButton, onClickDelete } = setup();
  await clickDeleteButton();
  expect(onClickDelete).toHaveBeenCalled();
});

test("제출중에는 모든 컨트롤러가 비활성화된다", async () => {
  const { getByRole } = setup(true);
  expect(getByRole("switch", { name: "공개 여부" })).toBeDisabled();
  expect(getByRole("button", { name: "삭제하기" })).toBeDisabled();
  expect(getByRole("button", { name: "비공개 상태로 저장" })).toBeDisabled();
});
