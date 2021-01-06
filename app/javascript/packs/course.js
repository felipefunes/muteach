import React from "react";
import ReactDOM from "react-dom";
import Course from "../components/Course"
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("course")
  const data = wrapper.dataset;
  const props = {
    name: data.name,
    id: data.id,
  }

  ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Course {...props} />
    </MuiPickersUtilsProvider>,
    wrapper
  );
});