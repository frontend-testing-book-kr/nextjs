import { mockUseToastAction } from "@/components/providers/ToastProvider/__mock__/hooks";
import {
  mockPostLogoutRejected,
  mockPostLogoutResolved,
} from "@/services/client/Logout/__mock__/jest";
import { getMyProfileData } from "@/services/client/MyProfile/__mock__/fixture";
import { mockWindowLocationReload } from "@/tests/jest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginUser } from "./";

const user = userEvent.setup();

const setup = () => {
  mockWindowLocationReload();
  const { showToast } = mockUseToastAction();
  render(<LoginUser {...getMyProfileData} />);
  const clickLogout = async () => {
    const region = screen.getByRole("region", { name: "로그인한 사용자" });
    await user.hover(region);
    const button = screen.getByRole("button", { name: "로그아웃" });
    await user.click(button);
  };
  return { showToast, clickLogout };
};

test("로그아웃에 성공하면 새로고침된다", async () => {
  const mock = mockPostLogoutResolved();
  const { showToast, clickLogout } = setup();
  await clickLogout();
  expect(mock).toHaveBeenCalled();
  expect(showToast).not.toHaveBeenCalled();
  expect(window.location.reload).toHaveBeenCalled();
});

test("로그아웃에 실패하면 Toast가 표시된다", async () => {
  const mock = mockPostLogoutRejected();
  const { showToast, clickLogout } = setup();
  await clickLogout();
  expect(mock).toHaveBeenCalled();
  expect(showToast).toHaveBeenCalled();
  expect(window.location.reload).not.toHaveBeenCalled();
});
