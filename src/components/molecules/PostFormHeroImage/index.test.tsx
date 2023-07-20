import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PutInput } from "@/pages/api/my/posts/[postId]";
import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { PostFormHeroImage } from "./";

function TestComponent({ error }: { error?: string }) {
  const { register, setValue } = useForm<PutInput>();
  return BasicLayout(
    <PostFormHeroImage
      register={register}
      setValue={setValue}
      name="imageUrl"
      error={error}
    />
  );
}

setupMockServer(handleGetMyProfile());

test("이미지가 선택되어 있지 않으면 버튼에 '이미지 선택하기'가 표시된다", async () => {
  render(<TestComponent />);
  expect(
    await screen.findByRole("button", { name: "이미지 선택하기" })
  ).toBeInTheDocument();
});

test("이미지가 선택되어 있으면 버튼에 '이미지 변경하기'가 표시된다", async () => {
  mockUploadImage();
  render(<TestComponent />);
  const { selectImage } = selectImageFile();
  await selectImage();
  expect(
    await screen.findByRole("button", { name: "이미지 변경하기" })
  ).toBeInTheDocument();
});

test("이미지 선택시 에러가 발생하면 버튼에 '에러'가 표시된다", async () => {
  render(<TestComponent error="에러" />);
  expect(
    await screen.findByRole("button", { name: "에러" })
  ).toBeInTheDocument();
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
