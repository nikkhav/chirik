import Post, { PostProps } from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [posts, setPosts] = useState<[]>([]);
  useEffect(() => {
    axios
      .get(`http://${window.location.hostname}:4000/api/v1/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, []);
  return (
    <div className={"feed page"}>
      <h1 className={"page__title"}>Welcome to feed</h1>
      {posts.map((post: PostProps) => (
        <Post
          title={post["title"]}
          body={post["body"]}
          author={post["author"]}
          createdAt={
            post["createdAt"].split("T")[0] +
            " at " +
            post["createdAt"].split("T")[1].split(".")[0].split(":")[0] +
            ":" +
            post["createdAt"].split("T")[1].split(".")[0].split(":")[1]
          }
          key={post["_id"]}
        />
      ))}
    </div>
  );
};

export default MainPage;
