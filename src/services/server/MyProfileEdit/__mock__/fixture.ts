import { GetMyProfileEditReturn, UpdateMyProfileEditReturn } from "../";

export const getMyProfileData: GetMyProfileEditReturn = {
  id: 1,
  name: "EonsuBae",
  bio: "프런트엔드 엔지니어. 타입스크립트와 UI 컴포넌트 테스트에 관심이 있습니다.",
  twitterAccount: "eonsu-bae",
  githubAccount: "eonsu-bae",
  imageUrl: "/__mocks__/images/img01.jpg",
  email: "eonsubae@example.com",
};

export const updateMyProfileData: UpdateMyProfileEditReturn = {
  id: 1,
  name: "EonsuBae",
  imageUrl: "/__mocks__/images/img01.jpg",
};
