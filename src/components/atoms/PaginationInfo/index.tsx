import styles from "./styles.module.css";

export const PaginationInfo = ({
  start,
  end,
  hitCount,
}: {
  start: number;
  end: number;
  hitCount: number;
}) => {
  return (
    <section aria-label="표시중인 목록" className={styles.module}>
      <p>{`${hitCount}건 중`}</p>
      <p role="presentation">/</p>
      <p>{`${start}〜${end}`}</p>
    </section>
  );
};
