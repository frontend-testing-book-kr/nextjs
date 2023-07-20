import { GetMyPostsReturn } from "@/services/server/MyPosts";
import clsx from "clsx";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

export const PostItem = ({ post }: { post: GetMyPostsReturn["posts"][0] }) => {
  const titleId = useId();
  return (
    <li className={clsx(styles.item, !post.published && styles.draft)}>
      <Link href={`/my/posts/${post.id}`} passHref legacyBehavior>
        {/* TODO: legacyBehavior가 없어도 aria 속성을 식별할 수 있게 되면 <a>는 삭제한다 */}
        <a aria-labelledby={titleId}>
          {post.imageUrl && <img src={post.imageUrl} alt="" />}
          <div className={styles.content}>
            <p className={styles.title} id={titleId}>
              {post.title}
            </p>
            <p className={styles.description}>{post.description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
