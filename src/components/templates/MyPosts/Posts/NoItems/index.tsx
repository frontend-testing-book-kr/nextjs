import { LinkButton } from "@/components/atoms/LinkButton";
import styles from "./styles.module.css";

export const NoItems = () => {
  return (
    <div className={styles.noitems}>
      <h3 className={styles.heading}>게재된 기사가 없습니다</h3>
      <p>
        <LinkButton href={"/my/posts/create"}>
          기사를 작성해주세요
        </LinkButton>
      </p>
    </div>
  );
};
