import { act, renderHook } from "@testing-library/react";
import { ToastStyle } from "./ToastContext";
import { useToastProvider } from "./useToastProvider";

test("showToast, hideToast로 화면에 표시하거나 숨긴다", () => {
  const { result } = renderHook(() => useToastProvider());
  expect(result.current).toMatchObject({ isShown: false });
  act(() => {
    result.current.showToast();
  });
  expect(result.current).toMatchObject({ isShown: true });
  act(() => {
    result.current.hideToast();
  });
  expect(result.current).toMatchObject({ isShown: false });
});

test("message, style로 외관을 변경한다", () => {
  const { result } = renderHook(() => useToastProvider());
  expect(result.current).toMatchObject({ message: "", style: "succeed" });
  const message = "...loading";
  const style: ToastStyle = "busy";
  act(() => {
    result.current.showToast({ message, style });
  });
  expect(result.current).toMatchObject({ message, style });
});
