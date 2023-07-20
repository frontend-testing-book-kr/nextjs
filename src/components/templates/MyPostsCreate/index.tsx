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
      title="신규기사"
      onClickSave={(isPublish) => {
        if (!isPublish) return;
        showAlertDialog({ message: "기사를 공개합니다. 진행하시겠습니까?" });
      }}
      onValid={async (input) => {
        const status = input.published ? "공개" : "저장";
        if (input.published) {
          hideAlertDialog();
        }
        try {
          showToast({ message: "저장중입니다...", style: "busy" });
          const { id } = await createMyPosts({ input });
          await router.push(`/my/posts/${id}`);
          showToast({ message: `${status}되었습니다`, style: "succeed" });
        } catch (err) {
          showToast({ message: `${status}에 실패했습니다`, style: "failed" });
        }
      }}
      onInvalid={() => {
        hideAlertDialog();
      }}
    >
      <AlertDialog />
    </PostForm>
  );
};
