import { PaginationInfo } from "@/components/atoms/PaginationInfo";
import { Pagination } from "@/components/molecules/Pagination";
import { GetPostsReturn } from "@/services/server/Posts";
import { Header } from "./Header";
import { PostItem } from "./PostItem";
import styles from "./styles.module.css";

const PostList = ({ posts }: { posts: GetPostsReturn["posts"] }) => {
  return (
    <section aria-label="기사 목록">
      <ul className={styles.list}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export const Posts = ({
  posts,
  pagination,
  paginationInfo,
}: GetPostsReturn) => {
  return (
    <section aria-label={"최신 기사 목록"} className={styles.module}>
      <Header />
      <PostList posts={posts} />
      <Pagination pagination={pagination} pathname="/" />
      <PaginationInfo {...paginationInfo} />
    </section>
  );
};
