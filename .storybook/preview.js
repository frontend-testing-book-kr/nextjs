import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { withScreenshot } from "storycap";

/* 코드 8-14
export const parameters = {
  // 기타 설정 생략
  msw: {
    handlers: [
      rest.get("/api/my/profile", async (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            id: 1,
            name: "EonsuBae",
            bio: "프런트엔드 엔지니어. 타입스크립트와 UI 컴포넌트 테스트에 관심이 있습니다.",
            twitterAccount: "eonsu-bae",
            githubAccount: "eonsu-bae",
            imageUrl: "/__mocks__/images/img01.jpg",
            email: "eonsubae@example.com",
            likeCount: 1,
          })
        );
      }),
    ],
  },
};
*/

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  msw: { handlers: [handleGetMyProfile()] },
  layout: "fullscreen",
};

export const decorators = [mswDecorator, withScreenshot];

initialize();
