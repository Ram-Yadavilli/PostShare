import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const history = useNavigate();
  const [x, setX] = useState({
    userName: "",
    email: "",
    isErr2: false,
    isErr1: false,
  });

  const name = (event) => {
    setX({ ...x, userName: event.target.value });
  };

  const ph = (event) => {
    setX({ ...x, email: event.target.value });
  };

  const nameBlur = (event) => {
    if (event.target.value.length < 4) {
      setX({ ...x, isErr2: true });
    } else {
      setX({ ...x, isErr2: false });
    }
  };

  const mailBlur = (event) => {
    if (x.email.includes("@gmail.com")) {
      setX({ ...x, isErr1: false });
    } else {
      setX({ ...x, isErr1: true });
    }
  };

  const f = () => {
    if (x.userName.length >= 4 && x.email.includes("@gmail.com")) {
      localStorage.setItem("currentUser", x.userName);
      console.log("Running");
      if (localStorage.getItem("posts") === null) {
        localStorage.setItem("posts", JSON.stringify([]));
      }

      history("/", { replace: true });
    } else {
      if (x.userName.length < 4 && !x.email.includes("@gmail.com")) {
        const obj = { ...x };
        obj.isErr2 = true;
        obj.isErr1 = true;
        setX(obj);
      } else if (x.userName.length < 4) {
        console.log({ before: x }, "<4");
        const obj = { ...x };
        obj.isErr2 = true;
        setX(obj);
        console.log({ after: x });
      } else {
        setX({ ...x, isErr1: true });
      }
    }
    console.log(localStorage.getItem("currentUser"));
    console.log(localStorage.getItem("posts"));
  };

  return (
    <div className="inputCon">
      <form>
        <input
          type="text"
          placeholder="UserName"
          value={x.userName}
          onChange={name}
          onBlur={nameBlur}
        />

        {console.log({ 2: x.isErr2 })}
        {x.isErr2 && <p className="err">*UserName required Min 4 Characters</p>}

        <input
          type="email"
          placeholder="Email_Id"
          value={x.email}
          onChange={ph}
          onBlur={mailBlur}
        />

        {x.isErr1 && <p className="err">*Mail_Id Incorrect</p>}

        <button id="loginBtn" button type="button" onClick={f}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
