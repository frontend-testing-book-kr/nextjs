import { useLoginUserInfoAction } from "@/components/providers/LoginUserInfo";
import { useToastAction } from "@/components/providers/ToastProvider";
import { PutInput } from "@/pages/api/my/profile/edit";
import { updateMyProfileEdit } from "@/services/client/MyProfileEdit";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Props } from ".";

export function useMyProfileEdit({ profile }: Props) {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PutInput>({
    defaultValues: profile,
  });
  const { showToast } = useToastAction();
  const { updateProfile } = useLoginUserInfoAction();
  const onSubmit = handleSubmit(async (input) => {
    try {
      showToast({ message: "저장중입니다...", style: "busy" });
      await updateMyProfileEdit({ input });
      await router.push("/my/posts");
      showToast({ message: "저장됐습니다", style: "succeed" });
      updateProfile();
    } catch (err) {
      showToast({ message: "저장에 실패했습니다", style: "failed" });
    }
  });
  return { register, setValue, onSubmit, control, errors };
}
