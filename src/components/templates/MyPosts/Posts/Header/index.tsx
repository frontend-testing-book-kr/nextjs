import { SelectFilterOption } from "@/components/molecules/SelectFilterOption";
import { parseAsNonEmptyString } from "@/lib/util";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const options = [
  { value: "all", label: "모두" },
  { value: "public", label: "공개" },
  { value: "private", label: "비공개" },
];

export const Header = () => {
  const { query, push } = useRouter();
  const defaultValue = parseAsNonEmptyString(query.status) || "all";
  return (
    <header className={styles.header}>
      <h2 className={styles.heading}>기사 목록</h2>
      <SelectFilterOption
        title="공개 여부"
        options={options}
        selectProps={{
          defaultValue,
          onChange: (event) => {
            const status = event.target.value;
            push({ query: { ...query, status } });
          },
        }}
      />
    </header>
  );
};
