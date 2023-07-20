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
  mockUploadImage();
  render(<TestComponent />);
  expect(screen.getByRole("img").getAttribute("src")).toBeFalsy();
  const { selectImage } = selectImageFile();
  await selectImage();
  await waitFor(() =>
    expect(screen.getByRole("img").getAttribute("src")).toBeTruthy()
  );
});

test("이미지 업로드에 실패하면 경고창이 표시된다", async () => {
  mockUploadImage(500);
  render(<TestComponent />);
  const { selectImage } = selectImageFile();
  await selectImage();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "이미지 업로드에 실패했습니다"
    )
  );
});
