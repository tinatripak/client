import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import classes from "./CustomCalendar.module.scss";

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CustomCalendar = (props) => {
  const minTime = new Date();
  minTime.setHours(8, 0, 0, 0);

  return (
    <div className={classes.calendar}>
      <Calendar {...props} localizer={localizer} min={minTime} />;
    </div>
  )
}

export default CustomCalendar;