import { SelectFilterOption } from "@/components/molecules/SelectFilterOption";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

export const OrderBy = () => {
  const { query, push } = useRouter();
  const orderBy = typeof query.orderBy === "string" ? query.orderBy : "";
  return (
    <SelectFilterOption
      title="정렬"
      className={styles.module}
      selectProps={{
        defaultValue: orderBy,
        onChange: (event) => {
          push({ query: { ...query, orderBy: event.currentTarget.value } });
        },
      }}
      options={[
        { value: "updatedAt", label: "수정일순" },
        { value: "starCount", label: "인기순" },
      ]}
    />
  );
};
