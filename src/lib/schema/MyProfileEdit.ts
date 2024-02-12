import * as z from "zod";

export const updateMyProfileEditInputSchema = z.object({
  name: z.string().min(1, "한 글자 이상의 문자를 입력해주세요"),
  bio: z.string().min(1, "한 글자 이상의 문자를 입력해주세요"),
  githubAccount: z.string().optional(),
  twitterAccount: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type UpdateMyProfileEditInput = z.infer<
  typeof updateMyProfileEditInputSchema
>;
