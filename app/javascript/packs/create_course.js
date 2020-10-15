import React from "react";
import ReactDOM from "react-dom";
import CreateCourse from "../components/CreateCourse"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <CreateCourse />,
    document.getElementById("create-course")
  );
});