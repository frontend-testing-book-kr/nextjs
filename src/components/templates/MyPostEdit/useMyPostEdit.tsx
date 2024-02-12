import { useAlertDialogAction } from "@/components/organisms/AlertDialog/hooks";
import { useToastAction } from "@/components/providers/ToastProvider";
import * as ApiMyPost from "@/pages/api/my/posts/[postId]";
import { deleteMyPost, updateMyPost } from "@/services/client/MyPost";
import { useRouter } from "next/router";
import { useState } from "react";

export function useMyPostEdit({ id }: { id: number }) {
  const router = useRouter();
  const [action, setAction] = useState<"delete" | "save">();
  const { showToast } = useToastAction();
  const { showAlertDialog, hideAlertDialog } = useAlertDialogAction();

  const onClickSave = (isPublish: boolean) => {
    if (!isPublish) return;
    setAction("save");
    showAlertDialog({ message: "기사를 공개합니다. 진행하시겠습니까?" });
  };

  const onClickDelete = () => {
    setAction("delete");
    showAlertDialog({ message: "기사를 삭제합니다. 진행하시겠습니까?" });
  };

  const handleSave = async (input: ApiMyPost.PutInput) => {
    const status = input.published ? "공개" : "저장";
    try {
      showToast({ message: "저장중입니다...", style: "busy" });
      await updateMyPost({ id, input });
      await router.push(`/my/posts/${id}`);
      showToast({ message: `${status}됐습니다`, style: "succeed" });
    } catch (err) {
      showToast({ message: `${status}에 실패했습니다`, style: "failed" });
    }
  };

  const handleDelete = async () => {
    try {
      showToast({ message: "삭제중...", style: "busy" });
      await deleteMyPost({ id });
      await router.push(`/my/posts`);
      showToast({ message: "삭제됐습니다", style: "succeed" });
    } catch (err) {
      showToast({ message: "삭제에 실패했습니다", style: "failed" });
    }
  };

  const onValid = async (input: ApiMyPost.PutInput) => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        await handleDelete();
        break;
      case "save":
        await handleSave(input);
        break;
      default:
        if (!input.published) {
          await handleSave(input);
        }
        break;
    }
  };

  const onInvalid = async () => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        await handleDelete();
        break;
      case "save":
        hideAlertDialog();
        break;
    }
  };

  return {
    onClickSave,
    onClickDelete,
    onValid,
    onInvalid,
  };
}
