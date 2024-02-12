import { getSession } from "@/lib/next-session";
import { ApiHandler, handleNotAllowed, withLogin } from "@/lib/next/api";
import {
  UpdateMyProfileEditInput,
  updateMyProfileEditInputSchema,
} from "@/lib/schema/MyProfileEdit";
import { validate } from "@/lib/util";
import type { UpdateMyProfileEditReturn } from "@/services/server/MyProfileEdit";
import { updateMyProfileEdit } from "@/services/server/MyProfileEdit";

export type PutInput = UpdateMyProfileEditInput;
export type PutReturn = UpdateMyProfileEditReturn;

const handlePut = withLogin<UpdateMyProfileEditReturn>(async (req, res) => {
  // 입력값이 유효한지 유효성 검사를 실시한다.
  // 유효성 검사에 에러가 발생하면 withLogin 함수에 내장된 에러 핸들러에서 처리한다.
  validate(req.body, updateMyProfileEditInputSchema);
  // Prisma Client를 래핑한 함수를 통해 데이터베이스의 데이터를 갱신한다.
  // 에러가 발생하면 withLogin 함수에 내장된 에러 핸들러에서 처리한다.
  const user = await updateMyProfileEdit({
    id: req.user.id,
    input: req.body,
  });
  // 세션에 저장된 사용자 정보를 갱신한다.
  const session = await getSession(req, res);
  session.user = { ...session.user, name: user.name, imageUrl: user.imageUrl };
  res.status(200).json(user);
});

const handler: ApiHandler<UpdateMyProfileEditReturn> = async (req, res) => {
  switch (req.method) {
    case "PUT":
      return handlePut(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
