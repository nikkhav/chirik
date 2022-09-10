import Post from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [posts, setPosts] = useState<[]>([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }, []);
  return (
    <div className={"feed"}>
      <h1>Main page</h1>
      {posts.map((post) => (
        <Post
          title={post["title"]}
          body={post["body"]}
          author={post["author"]}
          createdAt={post["createdAt"]}
          key={post["_id"]}
        />
      ))}
    </div>
  );
};

export default MainPage;
