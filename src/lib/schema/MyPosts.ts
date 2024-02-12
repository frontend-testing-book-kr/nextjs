import * as z from "zod";

export const createMyPostInputSchema = z.object({
  title: z.string().min(1, "한 글자 이상의 문자를 입력해주세요"),
  description: z.string().nullable(),
  body: z.string().nullable(),
  published: z.boolean(),
  imageUrl: z
    .string({ required_error: "이미지를 선택해주세요" })
    .nullable(),
});
export type CreateMyPostInput = z.infer<typeof createMyPostInputSchema>;
