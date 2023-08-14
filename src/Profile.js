import { useState } from "react";
import { Link } from "react-router-dom";
import UserPost from "./UserPost";

import "./Profile.css";

const Profile = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("posts")));
  const currentUser = localStorage.getItem("currentUser");

  const userData = data.filter((i) => i.UserId === currentUser);
  const likedPost = (id) => {
    console.log("like", { id });
    let post_in = -1;
    let postLikedArr = data.filter((i, index) => {
      if (i.id === id) {
        post_in = index;
        return 1;
      }
    });

    if (postLikedArr[0].liked.includes(currentUser)) {
      let index = postLikedArr[0].liked.indexOf(currentUser);
      postLikedArr[0].liked.splice(index, 1);
    } else {
      postLikedArr[0].liked.push(currentUser);
    }
    postLikedArr[0].count = postLikedArr[0].liked.length;
    let n_data = [...data];
    n_data[post_in] = postLikedArr[0];
    setData(n_data);

    localStorage.setItem("posts", JSON.stringify(n_data));
  };

  const UserPostEmpty = () => {
    return (
      <div className="name1">
        <center>
          <h1>No Post Yet....</h1>
        </center>
      </div>
    );
  };

  const del = (id) => {
    const r = userData.filter((i) => i.id !== id);
    localStorage.setItem("posts", JSON.stringify(r));
    setData(r);
  };

  const UserPostData = () => {
    return (
      <ul>
        {userData.map((i, index) => (
          <UserPost
            detail={i}
            key={i.id}
            likedPost={likedPost}
            currentUser={currentUser}
            del={del}
            data={data}
            setData={setData}
          />
        ))}
      </ul>
    );
  };

  const res = userData.length === 0;

  return (
    <div>
      <div className="profileHeader">
        <div className="nc1">
          <p className="n">{currentUser[0].toUpperCase()}</p>
          <h3>{currentUser.toUpperCase()}</h3>
        </div>
        <Link to="/">Home</Link>
      </div>

      {res ? UserPostEmpty() : UserPostData()}
    </div>
  );
};

export default Profile;
