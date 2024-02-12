import { NotFoundError } from "@/lib/error";
import { UpdateMyPostInput } from "@/lib/schema/MyPost";
import { handlePrismaError, prisma } from "..";

export async function getMyPost({
  id,
  authorId,
}: {
  id: number;
  authorId: number;
}) {
  try {
    // 요청한 ID와 일치하는 기사 데이터를 반환한다.
    const data = await prisma.post.findUnique({ where: { id } });
    // 데이터가 없거나 미로그인 상태이면 Not Found 오류가 발생한다.
    if (!data || data?.authorId !== authorId) throw new NotFoundError();
    const { createdAt, updatedAt, ...res } = data;
    // 타입 추론이 마지막까지 적용되어 있다.
    return res;
  } catch (err) {
    handlePrismaError(err);
  }
}
export type GetMyPostReturn = Awaited<ReturnType<typeof getMyPost>>;

export async function updateMyPost({
  id,
  input,
}: {
  id: number;
  input: UpdateMyPostInput;
}) {
  try {
    const data = await prisma.post.update({ where: { id }, data: input });
    return { id: data.id };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type UpdateMyPostReturn = Awaited<ReturnType<typeof updateMyPost>>;

export async function deleteMyPost({ id }: { id: number }) {
  try {
    const data = await prisma.post.delete({ where: { id } });
    return { id: data.id };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type DeleteMyPostReturn = Awaited<ReturnType<typeof deleteMyPost>>;
