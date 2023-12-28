import moment from "moment";
import { getAllBookings } from "../../services/BookingService";
import { useEffect, useState, useCallback } from "react";
import Spinner from "../Spinner/Spinner";
import CustomCalendar from "../CustomCalendar/CustomCalendar";

const BasicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  const getVerifiedBookingData = () => {
    getAllBookings().then((data) => {
      const validData = data?.data.find((item) => item.isValid);
      if (validData) {
        setCalendarData(data?.data);
      }
      setIsLoadedData(true);
    });
  };

  const formatDateTime = (date, time) => {
    const dateObject = moment(date, "MM/DD/YYYY");
    const timeObject = moment(time, "h:mm A");

    const combinedDateTime = dateObject.set({
      hour: timeObject.hour(),
      minute: timeObject.minute(),
      second: 0,
    });

    return combinedDateTime.format("YYYY-MM-DDTHH:mm:ss");
  };

  const createEvents = useCallback(() => {
    const filteredData = calendarData.filter((item) => {
      const startDateTime = formatDateTime(item.date, item.startTime);
      return moment(startDateTime);
    });

    const eventArray = filteredData.map((item) => ({
      title: item.name,
      start: new Date(formatDateTime(item.date, item.startTime)),
      end: new Date(formatDateTime(item.date, item.endTime)),
    }));
    setEvents(eventArray);
  }, [calendarData]);

  useEffect(() => {
    getVerifiedBookingData();
  }, []);

  useEffect(() => {
    createEvents();
  }, [calendarData, createEvents]);

  return (
    <div>
      {!isLoadedData || !events ? (
        <Spinner />
      ) : (
        <CustomCalendar events={events} />
      )}
    </div>
  );
};

export default BasicCalendar;
