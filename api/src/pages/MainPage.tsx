import Post from "../components/Post";

//TESTING
const postProps = {
  title: "Super post about React.js",
  body: "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
  author: "niick",
};

const MainPage = () => {
  return (
    <div className={"feed"}>
      <h1>Main page</h1>
      <Post
        title={postProps.title}
        body={postProps.body}
        author={postProps.author}
      />
    </div>
  );
};

export default MainPage;
