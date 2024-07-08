import { useOutletContext } from "react-router-dom";
import NewPost from "../newPost/NewPost";
import Post from "../post/Post";

export default function Feed() {
  const [data] = useOutletContext();

  return (
    <>
      <NewPost profile={data.profile} />
      {/* <Post /> */}
      {data.posts.map((post) => {
        return (
          <Post
            key={post.id}
            content={post.content}
            image={post.image}
            postedAt={post.postedAt}
          />
        );
      })}
    </>
  );
}
