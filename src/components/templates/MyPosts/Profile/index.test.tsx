import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Profile } from "./";

const user = userEvent.setup();

test("'프로필'이라는 접근 가능한 이름을 식별할 수 있다", () => {
  render(<Profile {...getMyProfileData} />);
  expect(
    screen.getByRole("region", { name: "프로필" })
  ).toBeInTheDocument();
});

test("'수정'이라는 링크를 클릭하면 화면이 이동된다", async () => {
  render(<Profile {...getMyProfileData} />);
  await user.click(screen.getByRole("link", { name: "수정" }));
  expect(mockRouter).toMatchObject({ pathname: "/my/profile/edit" });
});
