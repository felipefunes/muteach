import React from "react";
import ReactDOM from "react-dom";
import UsersHome from "../components/UsersHome"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <UsersHome />,
    document.getElementById("users-home")
  );
});