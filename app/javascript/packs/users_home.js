import React from "react";
import ReactDOM from "react-dom";
import UsersHome from "../components/UsersHome"

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("users-home");
  const currentUser = JSON.parse(wrapper.dataset.currentUser);
  ReactDOM.render(
    <UsersHome currentUser={currentUser} />,
    wrapper
  );
});