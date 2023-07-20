import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Login } from "@/components/templates/Login";
import { NextPageWithLayout } from "@/lib/next/type";

const Page: NextPageWithLayout = () => {
  return <Login />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(() => "로그인 | Tech Posts");

export default Page;
