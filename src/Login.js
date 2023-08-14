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
      setX({ ...x, isErr2: !x.isErr2 });
    } else {
      setX({ ...x, isErr2: !x.isErr2 });
    }
  };

  const mailBlur = (event) => {
    if (x.email.includes("@gmail.com") === false) {
      setX({ ...x, isErr1: !x.isErr1 });
    } else {
      setX({ ...x, isErr1: !x.isErr1 });
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
      if (x.userName === "") {
        const obj = { ...x };
        x.isErr2 = true;
        setX(obj);
      }

      if (!x.email.includes("@gmail.com")) {
        setX({ ...x, isErr1: true });
      }
    }
    console.log(localStorage.getItem("currentUser"));
    console.log(localStorage.getItem("posts"));
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="UserName"
          onChange={name}
          onBlur={nameBlur}
        />
        <br />

        {x.isErr2 && <p className="err">*UserName required Min 4 Characters</p>}

        <input
          type="email"
          placeholder="Email_Id"
          onChange={ph}
          onBlur={mailBlur}
        />
        <br />

        {x.isErr1 && <p className="err">*Mail_Id Incorrect</p>}

        <button type="button" onClick={f}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
