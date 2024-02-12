import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { MyProfileEdit } from "@/components/templates/MyProfileEdit";
import { withLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import {
  getMyProfileEdit,
  GetMyProfileEditReturn,
} from "@/services/server/MyProfileEdit";

export type Props = {
  profile: GetMyProfileEditReturn;
  authorName: string;
};

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <MyProfileEdit {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(
  ({ data }) => `${data?.authorName}님의 프로필 편집`
);

// 로그인 상태 확인을 포함한 getServerSideProps
export const getServerSideProps = withLogin<Props>(async ({ user }) => {
  return {
    // Prisma Client를 래핑한 함수를 통해 데이터베이스에서 데이터를 취득한다.
    profile: await getMyProfileEdit({ id: user.id }),
    authorName: user.name, // 제목에 사용할 유저명을 Props에 포함시킨다.
  };
});

export default Page;
