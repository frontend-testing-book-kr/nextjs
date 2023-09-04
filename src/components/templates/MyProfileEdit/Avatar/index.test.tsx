import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PutInput } from "@/pages/api/my/profile/edit";
import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { Avatar } from ".";

function TestComponent() {
  const { register, setValue } = useForm<PutInput>();
  return BasicLayout(
    <Avatar register={register} setValue={setValue} name="imageUrl" />
  );
}

setupMockServer(handleGetMyProfile());

test("'이미지 변경하기'버튼이 있다", async () => {
  render(<TestComponent />);
  expect(
    await screen.findByRole("button", { name: "이미지 변경하기" })
  ).toBeInTheDocument();
});

test("이미지 업로드에 성공하면 이미지의 src속성이 변경된다", async () => {
  // 이미지 업로드가 성공하도록 설정한다
  mockUploadImage();
  // 컴포넌트를 렌더링한다
  render(<TestComponent />);
  // 이미지의 src 속성이 비어있는지 확인한다
  expect(screen.getByRole("img").getAttribute("src")).toBeFalsy();
  // 이미지를 선택한다
  const { selectImage } = selectImageFile();
  await selectImage();
  // 이미지의 src 속성이 채워져있는지 확인한다
  await waitFor(() =>
    expect(screen.getByRole("img").getAttribute("src")).toBeTruthy()
  );
});

test("이미지 업로드에 실패하면 경고창이 표시된다", async () => {
  // 이미지 업로드가 실패하도록 설정한다
  mockUploadImage(500);
  // 컴포넌트를 렌더링한다
  render(<TestComponent />);
  // 이미지를 선택한다
  const { selectImage } = selectImageFile();
  await selectImage();
  // 지정한 문자열이 포함된 Toast가 나타나는지 검증한다
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "이미지 업로드에 실패했습니다"
    )
  );
});
