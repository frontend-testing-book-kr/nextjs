import { AlertDialog } from "@/components/organisms/AlertDialog";
import { useAlertDialogAction } from "@/components/organisms/AlertDialog/hooks";
import { useToastAction } from "@/components/providers/ToastProvider";
import { createMyPosts } from "@/services/client/MyPosts";
import { useRouter } from "next/router";
import { PostForm } from "./PostForm";

export const MyPostsCreate = () => {
  const router = useRouter();
  const { showToast } = useToastAction();
  const { showAlertDialog, hideAlertDialog } = useAlertDialogAction();
  return (
    <PostForm
      title="신규 기사"
      onClickSave={(isPublish) => {
        if (!isPublish) return;
        // 공개를 시도하면 AlertDialog를 띄운다.
        showAlertDialog({ message: "기사를 공개합니다. 진행하시겠습니까?" });
      }}
      onValid={async (input) => {
        // 유효한 내용으로 제출한 경우
        const status = input.published ? "공개" : "저장";
        if (input.published) {
          hideAlertDialog();
        }
        try {
          // API 통신을 시작하면 '저장 중입니다...'가 표시된다.
          showToast({ message: "저장 중입니다...", style: "busy" });
          const { id } = await createMyPosts({ input });
          // 공개(혹은 저장)에 성공하면 화면을 이동한다.
          await router.push(`/my/posts/${id}`);
          // 공개(혹은 저장)에 성공하면 '공개(혹은 저장)됐습니다'가 표시된다.
          showToast({ message: `${status}됐습니다`, style: "succeed" });
        } catch (err) {
          // 공개(혹은 저장)에 실패하면 '공개(혹은 저장)에 실패했습니다'가 표시된다.
          showToast({ message: `${status}에 실패했습니다`, style: "failed" });
        }
      }}
      onInvalid={() => {
        // 유효하지 않은 내용으로 제출하면 AlertDialog를 닫는다.
        hideAlertDialog();
      }}
    >
      <AlertDialog />
    </PostForm>
  );
};
