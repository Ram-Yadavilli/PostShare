import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") !== null &&
      localStorage.getItem("currentUser").length > 3
    ) {
      console.log("<3");
      history("/", { replace: true });
    }
  }, []);
  const post = [
    {
      id: "fc0e5483-6d30-4201-a661-0ec209529fb2",
      UserId: "ravi",
      msg: "I saw a beautiful sunrise in the early morning.",
      liked: ["raju"],
      count: 5,
    },
    {
      id: "a351da39-9fb7-4136-b468-86292990c8ab",
      UserId: "raju",
      msg: "Rajini looks fabulous in jaller movie.",
      liked: [],
      count: 0,
    },
    {
      id: "a351dg39-9fb7-4136-b968-86292990c8ab",
      UserId: "raju",
      msg: "Vande Bharat Trains inaugurated by our Prime Minister.",
      liked: [],
      count: 8,
    },
  ];
  const [x, setX] = useState({
    userName: "",
    email: "",
  });

  const name = (event) => {
    setX({ ...x, userName: event.target.value });
  };

  const ph = (event) => {
    setX({ ...x, email: event.target.value });
  };

  const nameBlur = (event) => {
    if (event.target.value.length < 4) {
      enqueueSnackbar("UserName must be minimum 4 Characters", {
        variant: "error",
      });
    }
  };

  const mailBlur = (event) => {
    if (!x.email.includes("@gmail.com")) {
      enqueueSnackbar("Email must be Valid Format", { variant: "error" });
    }
  };

  const f = () => {
    if (x.userName.length >= 4 && x.email.includes("@gmail.com")) {
      localStorage.setItem("currentUser", x.userName);
      console.log("Running");
      if (localStorage.getItem("posts") === null) {
        localStorage.setItem("posts", JSON.stringify(post));
      }
      enqueueSnackbar("Successfully LogIn", { variant: "success" });

      history("/", { replace: true });
    } else {
      if (x.userName.length < 4) {
        enqueueSnackbar("UserName must be minimum 4 Characters", {
          variant: "error",
        });
      } else if (!x.email.includes("@gmail.com")) {
        enqueueSnackbar("Email must be Valid Format", { variant: "error" });
      }
    }
    console.log(localStorage.getItem("currentUser"));
    console.log(localStorage.getItem("posts"));
  };

  return (
    <div className="inputCon">
      <h1>PostShare</h1>
      <form>
        <input
          type="text"
          placeholder="UserName"
          value={x.userName}
          onChange={name}
          onBlur={nameBlur}
        />

        {console.log({ 2: x.isErr2 })}

        <input
          type="email"
          placeholder="Email_Id"
          value={x.email}
          onChange={ph}
          onBlur={mailBlur}
        />

        <button id="loginBtn" button type="button" onClick={f}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
