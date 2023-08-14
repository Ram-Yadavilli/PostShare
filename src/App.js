import { Route, Routes } from "react-router-dom";

import Home from "./Home";

import Profile from "./Profile";

import Login from "./Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/home" Component={Home} />
      <Route path="/profile" Component={Profile} />
    </Routes>
  );
};

export default App;
