import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./Booking.module.scss";
import { LiaTelegram } from "react-icons/lia";
import { FaViber } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

import { createBooking,
  getAllBookings } from '../../services/BookingService'
import { getPhotographers } from '../../services/BioService'
import { getAllTypesOfPhotography, getTypeOfPhotographyById } from '../../services/PhototypeService'

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "./CalendarForBooking.css";
import Spinner from "../../components/Spinner/Spinner";
import {bookingBgImage, telegramURL, viberURL} from '../../constants.js'

const Booking = () => {
  const [bio, setBio] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [allPhotoTypesName, setAllPhotoTypesName] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allBookingsByDate, setAllBookingsByDate] = useState([]);
  const [photoTypeId, setPhotoTypeId] = useState("");
  const [backgroundImageLoading, setBackgroundImageLoading] = useState(true);

  //const [isLoaded, setIsLoaded] = useState(false)

  const [photoshootDuration, setPhotoshootDuration] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [filteredTimeOptions, setFilteredTimeOptions] = useState([]);
  const [date, setDate] = useState(null);
  

  let timeOptions = [];
  let currentTime = new Date("2000-01-01T08:30:00");
  const endTime = new Date("2000-01-01T20:00:00");

  const { WEDDING_PHOTOTYPEID } = process.env;


  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = bookingBgImage
    backgroundImage.onload = () => {
      setBackgroundImageLoading(false);
    };
    backgroundImage.onerror = () => {
      setBackgroundImageLoading(false);
    };
  }, []);

  useEffect(() => {
    fetchPhotographersData()
  }, [bio]);

  const fetchPhotographersData = () => {
    getPhotographers()
      .then((data) => {
        setBio(data?.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllPhotoTypesName();
  }, [allPhotoTypesName]);

  const getAllPhotoTypesName = () => {
    getAllTypesOfPhotography()
      .then((data) => {
        setAllPhotoTypesName(() =>
          data?.data?.map((item) => ({
            id: item._id,
            name: item.typeOfPhotography,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTypeOfPhotographyData();
  }, [photoTypeId]);

  const fetchTypeOfPhotographyData = () => {
    if (photoTypeId) {
      getTypeOfPhotographyById(photoTypeId)
        .then((data) => {
          console.log(data?.data);
          setPhotoshootDuration(data?.data?.shootingDuration);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getBookings();
  }, [allBookings]);

  const isDateDisabled = ({ date }) => {
    const today = new Date();
    const weddingBookings = allBookings.find(
      (x) => x.photoTypeId === WEDDING_PHOTOTYPEID
    );

    if (weddingBookings instanceof Array) {
      return weddingBookings.some((booking) => {
        const weddingDateObject = new Date(booking.date);
        return equalData(weddingDateObject, date)
      });
    } else if (weddingBookings) {
      const weddingDateObject = new Date(weddingBookings.date);
      return equalData(weddingDateObject, date)

    }
    return date < today;
  };

  const equalData = (weddingDate, date) => {
    return (
      weddingDate.getDate() === date.getDate() &&
      weddingDate.getMonth() === date.getMonth() &&
      weddingDate.getFullYear() === date.getFullYear()
    )
  }

  const isDateDisabledForWedding = ({ date }) => {
    const today = new Date();
    if (photoTypeId) {
      if (allBookings instanceof Array) {
        return allBookings.some((booking) => {
          const bookingDateObject = new Date(booking.date);
          return (
            bookingDateObject.getDate() === date.getDate() &&
            bookingDateObject.getMonth() === date.getMonth() &&
            bookingDateObject.getFullYear() === date.getFullYear()
          );
        });
      } else if (allBookings) {
        const bookingDateObject = new Date(allBookings.date);
        return (
          bookingDateObject.getDate() === date.getDate() &&
          bookingDateObject.getMonth() === date.getMonth() &&
          bookingDateObject.getFullYear() === date.getFullYear() 
        );
      }
      return date < today;
    }
  };

  const getBookings = () => {
    getAllBookings()
      .then((data) => {
        setAllBookings(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  while (currentTime <= endTime) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeOptions.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    }
    return "";
  };

  const handleDateChange = (value) => {
    setDate(value);
    setIsDateSelected(true);

    const bookingsForSelectedDate = allBookings.filter((booking) => {
      return formatDate(new Date(booking.date)) == formatDate(value);
    });
    setAllBookingsByDate(bookingsForSelectedDate);
  };

  useEffect(() => {
    getTimeOptions();
  }, [date, allBookingsByDate, photoTypeId]);

  const getTimeOptions = () => {
    const indicesToDelete = new Set();

    if (date && allBookingsByDate.length > 0 && photoTypeId) {
      if (photoTypeId !== WEDDING_PHOTOTYPEID) {
        const bookedTimes = allBookingsByDate.map(
          (booking) => booking.startTime
        );

        const bookedTimeIndices = bookedTimes.map((bookedTime) =>
          timeOptions.indexOf(bookedTime)
        );

        const matches = photoshootDuration.match(/\d+/);

        if (matches) {
          const number = parseInt(matches[0], 10);
          const range = number * 2 + 1;

          bookedTimeIndices.forEach((index) => {
            for (let i = -1; i <= range; i++) {
              indicesToDelete.add(index + i);
            }
          });
        }
        const availableTimes = timeOptions.filter(
          (_, index) => !indicesToDelete.has(index)
        );
        setFilteredTimeOptions(availableTimes);
      }
    } else {
      setFilteredTimeOptions(timeOptions);
    }
  };

  const addDurationToTime = (start, duration) => {
    const [startHour, startPeriod] = start.split(" ");
  const [startHourNumeric, startMinutes] = startHour.split(":");
  let hours = parseInt(startHourNumeric, 10);

  if (startPeriod === "PM" && hours < 12) {
    hours += 12;
  }

  const startDateObj = new Date();
  startDateObj.setHours(hours, parseInt(startMinutes, 10), 0, 0);

  const durationHours = parseInt(duration, 10);

  const endDate = new Date(startDateObj);
  endDate.setHours(startDateObj.getHours() + durationHours);

  const endHour = endDate.getHours() % 12 || 12;

  const endMinutes = endDate.getMinutes();
  const period = endDate.getHours() < 12 ? "AM" : "PM";
  const formattedEndDate = `${endHour}:${endMinutes.toString().padStart(2, "0")} ${period}`;

  return formattedEndDate;
  };
  const handleSubmit = () => {
    const endTimePhotoshoot = addDurationToTime(
      selectedTime,
      photoshootDuration
    );
    createBooking(
      name,
      email,
      message,
      photoTypeId,
      formatDate(date),
      selectedTime,
      endTimePhotoshoot
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div style={{ display: backgroundImageLoading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div style={{ display: backgroundImageLoading ? "none" : "block" }}>
        <div className={classes.booking}>
          <div
            className={classes.booking__image}
          >
            <Header />
          </div>
          <div className={classes.booking__content}>
            <p>Ksenia Tripak</p>
            <p>
              If you want to contact with me {bio?.phoneNumber} or you can find
              me in the Telegram/Viber/WhatsApp:
            </p>
            <ul>
              <li>
                <a href={viberURL}>
                  <FaViber className={classes.booking__content__icons__viber} />{" "}
                </a>
              </li>
              <li>
                <a href={telegramURL}>
                  <LiaTelegram
                    className={classes.booking__content__icons__telegram}
                  />
                </a>
              </li>
              <li>
                <a href="">
                  <BsWhatsapp
                    className={classes.booking__content__icons__whatsapp}
                  />
                </a>
              </li>
            </ul>
            <p>Also you can fill out the form bellow:</p>
          </div>

          <div className={classes.booking__contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={classes.booking__contactForm__commonBlock}>
                <div
                  className={
                    classes.booking__contactForm__commonBlock__formGroup__input
                  }
                >
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className={
                    classes.booking__contactForm__commonBlock__formGroup__input
                  }
                >
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div
                className={
                  classes.booking__contactForm__commonBlock__formGroup__type
                }
              >
                <label htmlFor="title">Type of photo shoot</label>
                <br />

                <select
                  value={photoTypeId}
                  onChange={(e) => setPhotoTypeId(e.target.value)}
                >
                  <option
                    value=""
                    disabled
                    className={
                      classes.createPhotography__photoType__defaultOption
                    }
                  >
                    Choose a name
                  </option>
                  {allPhotoTypesName.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              {photoTypeId ? (
                <div className={classes.booking__contactForm__calendarBlock}>
                  <p>Please, choose the date and time of the photoshoot</p>
                  <div
                    className={
                      classes.booking__contactForm__calendarBlock__calendarWithSelect
                    }
                  >
                    <div>
                      {photoTypeId !== WEDDING_PHOTOTYPEID ? (
                        <Calendar
                          onChange={handleDateChange}
                          value={date}
                          locale="en-En"
                          minDate={new Date()}
                          tileDisabled={isDateDisabled}
                        />
                      ) : (
                        <Calendar
                          onChange={handleDateChange}
                          value={date}
                          locale="en-En"
                          minDate={new Date()}
                          tileDisabled={isDateDisabledForWedding}
                        />
                      )}
                      {date !== null && (
                        <span>
                          You chose {formatDate(date)}{" "}
                          {selectedTime !== null && <span>{selectedTime}</span>}
                        </span>
                      )}
                    </div>

                    {isDateSelected && photoTypeId && (
                      <select
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className={
                          classes.booking__contactForm__calendarBlock__calendarWithSelect__select
                        }
                      >
                        <option
                          value=""
                          disabled
                          className={
                            classes.booking__contactForm__calendarBlock__calendarWithSelect__select_default
                          }
                        >
                          Choose time
                        </option>
                        {filteredTimeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    classes.booking__contactForm__withoutPhotoshootType
                  }
                >
                  Please, choose the type of photo shoot and you will have an
                  opportunity to choose the date and time !
                </div>
              )}
              <div className={classes.booking__contactForm__textarea}>
                <label htmlFor="message">Additional message:</label>
                <br />
                <textarea
                  defaultValue={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                className={classes.booking__contactForm__button}
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Booking;
