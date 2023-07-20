import { PutInput } from "@/pages/api/my/posts/[postId]";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { PostFormInfo } from "./";

const user = userEvent.setup();

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PutInput>();
  return <PostFormInfo register={register} control={control} errors={errors} />;
}

const setup = () => {
  const { getByRole } = render(<TestComponent />);
  const title = getByRole("textbox", { name: "제목" });
  const description = getByRole("textbox", { name: "요약" });
  const typeTitle = (text: string) => user.type(title, text);
  const typeDescription = (text: string) => user.type(description, text);
  return { typeTitle, typeDescription };
};

test("'제목'에 문자를 입력하면 글자수가 증가한다", async () => {
  const { typeTitle } = setup();
  expect(screen.getByText("0 / 64")).toBeInTheDocument();
  await typeTitle("테스트");
  expect(screen.getByText("3 / 64")).toBeInTheDocument();
});

test("'요약'에 문자를 입력하면 글자수가 증가한다", async () => {
  const { typeDescription } = setup();
  expect(screen.getByText("0 / 128")).toBeInTheDocument();
  await typeDescription("가나다라마");
  expect(screen.getByText("5 / 128")).toBeInTheDocument();
});
