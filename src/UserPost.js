import { AiFillHeart, AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import { useState } from "react";

import "./UserPost.css";

const UserPost = (props) => {
  const { detail, likedPost, currentUser, del, data, setData } = props;
  let { UserId, msg, count, id, liked } = detail;

  let [edit, setEdit] = useState(false);
  let [newMsg, setNewMsg] = useState("");
  let col1 = "";
  let index = data.indexOf(detail);

  const delBtn = () => {
    del(id);
  };

  let mc = (event) => {
    setNewMsg(event.target.value);
  };

  const editBtn = () => {
    setEdit(true);
  };
  console.log({ edit });
  if (liked.includes(currentUser)) {
    col1 = true;
  } else {
    col1 = false;
  }

  let c = count;

  const likeBtn = () => {
    likedPost(id);
  };

  const ok = () => {
    let n_d = [...data];
    n_d[index].msg = newMsg;
    setEdit(false);
    setData(n_d);
    localStorage.setItem("posts", JSON.stringify(n_d));
  };
  console.log({ newMsg });

  return (
    <li>
      <div className="userNameCon">
        <p className="userName">{UserId[0].toUpperCase()}</p>
        <h3>{UserId.toUpperCase()}</h3>
      </div>

      <center>
        {edit ? (
          <div>
            <textarea onChange={mc}>{msg}</textarea>
            <button onClick={ok}>ok</button>
          </div>
        ) : (
          <p>{msg}</p>
        )}
      </center>
      <div className="postBottom">
        <div className="user_like_Con">
          {col1 ? (
            <AiFillHeart
              onClick={likeBtn}
              style={{
                marginTop: "20px",
                marginRight: "10px",
                color: "red",
                cursor: "pointer",
              }}
            />
          ) : (
            <AiOutlineHeart
              onClick={likeBtn}
              style={{
                marginTop: "20px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
          )}

          <p>Likes:{c}</p>
        </div>
        <div className="iconCon">
          <AiOutlineDelete
            onClick={delBtn}
            style={{ color: "red", cursor: "pointer" }}
          />
          <FaEdit onClick={editBtn} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </li>
  );
};

export default UserPost;
