import React from "react";
import ReactDOM from "react-dom";
import Course from "../components/Course"

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("course")
  const data = wrapper.dataset;
  const props = {
    name: data.name,
    id: data.id,
  }

  ReactDOM.render(
    <Course {...props} />,
    wrapper
  );
});