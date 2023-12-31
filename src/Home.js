import { Link, useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";

import { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";

import { v4 } from "uuid";

import Post from "./Post";

import "./Home.css";

function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const r = localStorage.getItem("currentUser");
  console.log({ r }, r === null);

  let collection = r === null ? [] : JSON.parse(localStorage.getItem("posts"));
  const [data, setData] = useState(collection);
  console.log({ collection });

  const [msg, setMsg] = useState("");
  const [searchPost, setSearchPost] = useState("");
  useEffect(() => {
    if (r === null || r === "n") {
      navigate("/login", { replace: true });
    }
  }, []);
  console.log({ r });
  const postData = (event) => {
    setMsg(event.target.value);
  };

  const createPost = () => {
    if (msg === "") {
      enqueueSnackbar("Empty message Can't be Post", { variant: "error" });
    } else {
      const postList = JSON.parse(localStorage.getItem("posts"));
      let postInfo = { id: v4(), UserId: r, msg, liked: [], count: 0 };

      let dataRes = [...postList, postInfo];
      setData(dataRes);
      setMsg("");

      localStorage.setItem("posts", JSON.stringify(dataRes));
      enqueueSnackbar("Successfully Posted...", { variant: "success" });
    }
  };

  const like = (id) => {
    console.log("like", { id });
    let post_in = -1;
    console.log({ data });
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
    localStorage.setItem("currentUser", "n");
    navigate("/login", { replace: true });
    enqueueSnackbar("Successfully Logout...", { variant: "success" });
  };

  const search = (event) => {
    setSearchPost(event.target.value);
  };
  console.log({ data });
  const searchResult =
    data.length === 0
      ? []
      : data.filter(
          (i) =>
            i.UserId.toUpperCase().includes(searchPost.toUpperCase()) ||
            i.msg.toUpperCase().includes(searchPost.toUpperCase())
        );

  return (
    <div className="main">
      <div className="header">
        <div className="searchCon">
          <input
            className="i"
            onChange={search}
            type="search"
            placeholder="Search..."
            width="100%"
          />
          <MdSearch style={{ fontSize: "25px" }} />
        </div>

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
