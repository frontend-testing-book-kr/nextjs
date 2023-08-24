import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(flag: boolean): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { "aria-current": "page" };
}

type Props = { onCloseMenu: () => void };

export const Nav = ({ onCloseMenu }: Props) => {
  const { pathname } = useRouter();
  return (
    // "네비게이션"을 "메뉴"로 변경하고 테스트 실행기를 실행(리스트 8-31)
    <nav aria-label="네비게이션" className={styles.nav}>
      <button
        aria-label="메뉴 닫기"
        className={styles.closeMenu}
        onClick={onCloseMenu}
      ></button>
      <ul className={styles.list}>
        <li>
          <Link href={`/my/posts`} legacyBehavior>
            <a
              {...isCurrent(
                pathname.startsWith("/my/posts") &&
                  pathname !== "/my/posts/create"
              )}
            >
              My Posts
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/my/posts/create`} legacyBehavior>
            <a {...isCurrent(pathname === "/my/posts/create")}>Create Post</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
