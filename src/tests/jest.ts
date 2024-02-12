import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export function selectImageFile(
  inputTestId = "file",
  fileName = "hello.png",
  content = "hello"
) {
  // userEvent를 초기화한다.
  const user = userEvent.setup();
  // 더미 이미지 파일을 작성한다.
  const filePath = [`C:\\fakepath\\${fileName}`];
  const file = new File([content], fileName, { type: "image/png" });
  // render한 컴포넌트에서 data-testid="file"인 input을 취득한다.
  const fileInput = screen.getByTestId(inputTestId);
  // 이 함수를 실행하면 이미지 선택이 재현된다.
  const selectImage = () => user.upload(fileInput, file);
  return { fileInput, filePath, selectImage };
}

const original = window.location;

export function mockWindowLocationReload() {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
  const cleanup = () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: original,
    });
  };
  return cleanup;
}
