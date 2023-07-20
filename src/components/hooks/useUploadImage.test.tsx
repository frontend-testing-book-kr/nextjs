import { UploadImageData } from "@/services/client/UploadImage";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useUploadImage } from "./useUploadImage";

function TestComponent({
  onChange,
  onResolved,
  onRejected,
}: {
  onChange?: (path: string[]) => void;
  onResolved?: (data: UploadImageData) => void;
  onRejected?: (err: unknown) => void;
}) {
  const { register, setValue } = useForm();
  const { onChangeImage, imageUrl } = useUploadImage({
    register,
    setValue,
    onResolved,
    onRejected,
    name: "image",
  });
  return (
    <>
      {imageUrl && <p>selected</p>}
      <input
        type={"file"}
        data-testid="file"
        onChange={(event) => {
          onChangeImage(event);
          onChange?.([event.target.value]);
        }}
      />
    </>
  );
}

describe("useUploadImage", () => {
  test("이미지를 선택하면 imageUrl값이 truty가 된다", async () => {
    mockUploadImage();
    const mock = jest.fn();
    render(<TestComponent onChange={mock} />);
    const { filePath, selectImage } = selectImageFile();
    await selectImage();
    expect(mock).toHaveBeenCalledWith(filePath);

    await waitFor(() =>
      expect(screen.getByText("selected")).toBeInTheDocument()
    );
  });

  test("업로드에 성공하면 onResolved가 호출된다", async () => {
    mockUploadImage();
    const handleResolved = jest.fn();
    render(<TestComponent onResolved={handleResolved} />);
    const { selectImage } = selectImageFile();
    await selectImage();
    await waitFor(() => expect(handleResolved).toHaveBeenCalled());
  });

  test("업로드에 실패하면 onRejected가 호출된다", async () => {
    mockUploadImage(500);
    const handleRejected = jest.fn();
    render(<TestComponent onRejected={handleRejected} />);
    const { selectImage } = selectImageFile();
    await selectImage();
    await waitFor(() => expect(handleRejected).toHaveBeenCalled());
  });
});
