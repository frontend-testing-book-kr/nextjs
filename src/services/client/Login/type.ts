import * as z from "zod";

export const InputSchema = z.object({
  email: z.string().email("유효하지 않은 메일주소입니다"),
  password: z.string().min(8, "8개 이상의 문자를 입력해주세요"),
});
export type Input = z.infer<typeof InputSchema>;
