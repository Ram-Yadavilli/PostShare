import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import "./Post.css";

const Post = (props) => {
  const { detail, like, r } = props;
  const { UserId, msg, count, id, liked } = detail;
  let col = "";

  if (liked.includes(r)) {
    col = true;
  } else {
    col = false;
  }

  let c = count;

  const btn1 = () => {
    like(id);
  };

  return (
    <li>
      <div className="name">
        <p className="n">{UserId[0].toUpperCase()}</p>
        <h3>{UserId.toUpperCase()}</h3>
      </div>

      <center>
        <p className="msg">{msg}</p>
      </center>

      <div className="like_Con">
        {col ? (
          <AiFillHeart
            onClick={btn1}
            style={{
              marginTop: "20px",
              marginRight: "10px",
              color: "red",
              cursor: "pointer",
            }}
          />
        ) : (
          <AiOutlineHeart
            onClick={btn1}
            style={{
              marginTop: "20px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
        )}

        <p className="count">Likes:{c}</p>
      </div>
    </li>
  );
};

export default Post;
