import { Button } from "@/components/atoms/Button";
import { useToastAction } from "@/components/providers/ToastProvider";
import { postLogout } from "@/services/client/Logout";
import { GetMyProfileReturn } from "@/services/server/MyProfile";
import styles from "./styles.module.css";

type Props = GetMyProfileReturn;

export const LoginUser = ({ name, imageUrl }: Props) => {
  const { showToast } = useToastAction();
  return (
    <section
      role="region"
      aria-label="로그인한 사용자"
      className={styles.user}
    >
      <p className={styles.userName}>{name}</p>
      <p
        className={styles.thumbnail}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></p>
      <div className={styles.logout}>
        <div className={styles.logoutInner}>
          <div className={styles.logoutBox}>
            <Button
              theme="transparent"
              variant="small"
              onClick={async () => {
                try {
                  await postLogout();
                  window.location.reload();
                } catch {
                  showToast({
                    message: "로그아웃에 실패했습니다",
                    style: "failed",
                  });
                }
              }}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
