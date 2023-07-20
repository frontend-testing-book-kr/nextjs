import { Err } from "@/lib/error";
import Caution from "./assets/caution.svg";
import styles from "./styles.module.css";

type Props = Err;

const messages = {
  400: { message: "유효하지 않은 요청입니다" },
  401: { message: "로그인이 필요합니다" },
  404: { message: "페이지를 찾을 수 없습니다" },
  405: { message: "허용되지 않은 요청입니다" },
  500: { message: "서버에 에러가 발생했습니다" },
};

export const Error = (props: Props) => {
  return (
    <div className={styles.module}>
      <Caution />
      <p>{messages[props.status].message}</p>
    </div>
  );
};
