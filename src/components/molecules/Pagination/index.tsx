import { parseAsPositiveInt } from "@/lib/util";
import { PaginationProps } from "@/lib/util/pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(
  a: number,
  b: number
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    "aria-current": (a == 0 && b == 1) || a == b ? "page" : undefined,
  };
}

export const Pagination = ({
  pathname,
  pagination,
}: {
  pathname: string;
  pagination: PaginationProps;
}) => {
  const router = useRouter();
  const page = parseAsPositiveInt(router.query.page) || 0;
  if (!pagination) return null;
  return (
    <nav aria-label="페이지네이션">
      <ul className={styles.pagination}>
        {pagination?.items.map((item, index) => (
          <li key={index}>
            {typeof item === "number" ? (
              <Link
                href={{ pathname, query: { ...router.query, page: item } }}
                legacyBehavior
              >
                {/* TODO: legacyBehavior가 없어도 aria 속성을 식별할 수 있게 되면 <a>는 삭제한다 */}
                <a {...isCurrent(page, item)}>{item.toString()}</a>
              </Link>
            ) : (
              <span>{item.toString()}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
