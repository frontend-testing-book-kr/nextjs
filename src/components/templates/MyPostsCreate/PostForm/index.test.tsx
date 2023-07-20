import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from ".";

const user = userEvent.setup();

function setup() {
  const onClickSave = jest.fn();
  const onValid = jest.fn();
  const onInvalid = jest.fn();
  render(
    <PostForm
      title="신규기사"
      onClickSave={onClickSave}
      onValid={onValid}
      onInvalid={onInvalid}
    />
  );
  async function typeTitle(title: string) {
    const textbox = screen.getByRole("textbox", { name: "제목" });
    await user.type(textbox, title);
  }
  async function saveAsPublished() {
    await user.click(screen.getByRole("switch", { name: "공개여부" }));
    await user.click(screen.getByRole("button", { name: "공개하기" }));
  }
  async function saveAsDraft() {
    await user.click(screen.getByRole("button", { name: "비공개 상태로 저장" }));
  }
  return {
    typeTitle,
    saveAsDraft,
    saveAsPublished,
    onClickSave,
    onValid,
    onInvalid,
  };
}

setupMockServer(handleGetMyProfile());

test("유효하지 않은 내용을 포함한채로 '비공개 상태로 저장'을 시도하면 유효성 검사 에러가 표시된다", async () => {
  const { saveAsDraft } = setup();
  await saveAsDraft();
  await waitFor(() =>
    expect(
      screen.getByRole("textbox", { name: "제목" })
    ).toHaveErrorMessage("1개 이상의 문자를 입력해주세요")
  );
});

test("유효하지 않은 내용을 포함한채로 '비공개 상태로 저장'을 시도하면 onInvalid 이벤트 핸들러가 실행된다", async () => {
  const { saveAsDraft, onClickSave, onValid, onInvalid } = setup();
  await saveAsDraft();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).toHaveBeenCalled();
});

test("유효한 입력내용으로 '비공개 상태로 저장'을 시도하면 onValid 이벤트 핸들러가 실행된다", async () => {
  mockUploadImage();
  const { typeTitle, saveAsDraft, onClickSave, onValid, onInvalid } = setup();
  const { selectImage } = selectImageFile();
  await typeTitle("나의 기사");
  await selectImage();
  await saveAsDraft();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});

test("유효한 입력내용으로 '공개하기'를 시도하면 onClickSave 이벤트 핸들러만 실행된다", async () => {
  const { typeTitle, saveAsPublished, onClickSave, onValid, onInvalid } =
    setup();
  await typeTitle("나의 기사");
  await saveAsPublished();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});
