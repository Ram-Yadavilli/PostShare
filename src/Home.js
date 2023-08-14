import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { v4 } from "uuid";

import Post from "./Post";

import "./Home.css";

function Home() {
  const post = [
    {
      id: "fc0e5483-6d30-4201-a661-0ec209529fb2",
      UserId: "ravi",
      msg: "hi Frnd",
      liked: ["raju"],
      count: 1,
    },
    {
      id: "a351da39-9fb7-4136-b468-86292990c8ab",
      UserId: "raju",
      msg: "Happy Independence Day...",
      liked: [],
      count: 0,
    },
  ];

  localStorage.setItem("posts", JSON.stringify(post));

  const navigate = useNavigate();
  const r = localStorage.getItem("currentUser");
  if (r === null) {
    navigate("/login", { replace: true });
    console.log({ r });
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem("posts")));

  const [msg, setMsg] = useState("");
  const [searchPost, setSearchPost] = useState("");

  console.log({ r });
  const postData = (event) => {
    setMsg(event.target.value);
  };

  const createPost = () => {
    const postList = JSON.parse(localStorage.getItem("posts"));
    let postInfo = { id: v4(), UserId: r, msg, liked: [], count: 0 };

    let dataRes = [...postList, postInfo];
    setData(dataRes);
    setMsg("");
    localStorage.setItem("posts", JSON.stringify(dataRes));
  };

  const like = (id) => {
    console.log("like", { id });
    let post_in = -1;
    let postLikedArr = data.filter((i, index) => {
      if (i.id === id) {
        post_in = index;
        return 1;
      }
    });

    if (postLikedArr[0].liked.includes(r)) {
      let index = postLikedArr[0].liked.indexOf(r);
      postLikedArr[0].liked.splice(index, 1);
    } else {
      postLikedArr[0].liked.push(r);
    }
    postLikedArr[0].count = postLikedArr[0].liked.length;
    let n_data = [...data];
    n_data[post_in] = postLikedArr[0];
    setData(n_data);

    localStorage.setItem("posts", JSON.stringify(n_data));
  };

  const logout = () => {
    localStorage.setItem("currentUser", null);
    navigate("/login", { replace: true });
  };

  const search = (event) => {
    setSearchPost(event.target.value);
  };

  const searchResult = data.filter((i) =>
    i.UserId.toUpperCase().includes(searchPost.toUpperCase())
  );
  return (
    <div className="main">
      <div className="header">
        <input
          className="i"
          onChange={search}
          type="search"
          placeholder="Search..."
          width="100%"
        />

        <div className="profileCon">
          <Link to="/profile">Profile</Link>
          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <center>
        <div className="postContainer">
          <center>
            <h2>Publish Your Post Here....</h2>
            <textarea
              className="textarea"
              rows="4"
              cols="20"
              value={msg}
              onChange={postData}
            ></textarea>
            <br />
            <button type="button" className="createBtn" onClick={createPost}>
              +Create Post
            </button>
          </center>
        </div>
      </center>
      <ul>
        {searchResult.map((i) => (
          <Post detail={i} key={i.id} like={like} r={r} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
