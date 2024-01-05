import React, { useEffect, useState, useCallback } from "react";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./Booking.module.scss";
import { LiaTelegram } from "react-icons/lia";
import { FaViber } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { createBooking, getAllBookings } from "../../services/BookingService";
import { getPhotographers } from "../../services/BioService";
import {
  getAllTypesOfPhotography,
  getTypeOfPhotographyById,
} from "../../services/PhototypeService";
import { telegramURL, viberURL } from "../../constants.js";
import CalendarForBooking from "./CalendarForBooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


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

  const [phone, setPhone] = useState();

  const [isBioLoaded, setIsBioLoaded] = useState(false);
  const [isPhotoTypesLoaded, setIsPhotoTypesLoaded] = useState(false);
  const [isBookingsLoaded, setIsBookingsLoaded] = useState(false);

  const [photoshootDuration, setPhotoshootDuration] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [filteredTimeOptions, setFilteredTimeOptions] = useState([]);
  const [date, setDate] = useState(null);

  const [nameError, setNameError] = useState("Name is required");
  const [phoneError, setPhoneError] = useState("Phone number is required");
  const [emailError, setEmailError] = useState("Email address is required");
  const [photoTypeIdError, setPhotoTypeIdError] = useState(
    "Type of photo shoot is required"
  );
  const [dateError, setDateError] = useState("Date is required");
  const [selectedTimeError, setSelectedTimeError] =
    useState("Time is required");

  const timeOptions = [];
  const currentTime = new Date("2000-01-01T08:30:00");
  const endTime = new Date("2000-01-01T20:00:00");

  const { REACT_APP_WEDDING_PHOTOTYPE_ID } = process.env;

  useEffect(() => {
    fetchPhotographersData();
  }, [bio]);

  const fetchPhotographersData = () => {
    getPhotographers().then((data) => {
      setBio(data?.data[0]);
      setIsBioLoaded(true);
    });
  };

  useEffect(() => {
    getAllPhotoTypesName();
  }, [allPhotoTypesName]);

  const getAllPhotoTypesName = () => {
    getAllTypesOfPhotography().then((data) => {
      setAllPhotoTypesName(() =>
        data?.data?.map((item) => ({
          id: item._id,
          name: item.typeOfPhotography,
        }))
      );
      setIsPhotoTypesLoaded(true);
    });
  };

  useEffect(() => {
    fetchTypeOfPhotographyData();
  }, [photoTypeId]);

  const fetchTypeOfPhotographyData = () => {
    if (photoTypeId) {
      getTypeOfPhotographyById(photoTypeId).then((data) => {
        setPhotoshootDuration(data?.data?.shootingDuration);
      });
    }
  };

  useEffect(() => {
    getBookings();
  }, [allBookings]);

  const equalData = (weddingDate, date) => {
    return (
      weddingDate.getDate() === date.getDate() &&
      weddingDate.getMonth() === date.getMonth() &&
      weddingDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateDisabled = useCallback(
    ({ date }) => {
      const today = new Date();
      const existingWeddingBookings = allBookings.filter((booking) => {
        return (
          formatDate(new Date(booking.date)) === formatDate(date) &&
          booking.photoTypeId === REACT_APP_WEDDING_PHOTOTYPE_ID
        );
      });

      return existingWeddingBookings.length > 0 || date < today;
    },
    [allBookings, REACT_APP_WEDDING_PHOTOTYPE_ID]
  );

  const isDateDisabledForWedding = useCallback(
    ({ date }) => {
      const today = new Date();
      const existingBookings = allBookings.filter((booking) => {
        return formatDate(new Date(booking.date)) === formatDate(date);
      });

      return existingBookings.length > 0 || date < today;
    },
    [allBookings]
  );

  const getBookings = useCallback(() => {
    getAllBookings().then((data) => {
      setAllBookings(data?.data);
      setIsBookingsLoaded(true);
    });
  }, []);

  while (currentTime <= endTime) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeOptions.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

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

  const handleDateChange = useCallback(
    (value) => {
      setDate(value);
      setIsDateSelected(true);

      validateDate(value);

      const bookingsForSelectedDate = allBookings.filter((booking) => {
        return formatDate(new Date(booking.date)) === formatDate(value);
      });
      setAllBookingsByDate(bookingsForSelectedDate);
    },
    [allBookings, formatDate]
  );

  useEffect(() => {
    getTimeOptions();
  }, [date, allBookingsByDate, photoTypeId]);

  const getTimeOptions = () => {
    const indicesToDelete = new Set();

    if (date && allBookingsByDate.length > 0 && photoTypeId) {
      if (photoTypeId !== REACT_APP_WEDDING_PHOTOTYPE_ID) {
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
    const formattedEndDate = `${endHour}:${endMinutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedEndDate;
  };

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email address is required");
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.match(emailRegex)) {
        setEmailError("Invalid email address");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    }
  };

  const validatePhone = (value) => {
    if (!value ) {
      setPhoneError("Phone number is required");
      return false;
    } else if(value.length < 7){
      setPhoneError("The phone number must be at least 7 characters.");
    } else {
      setPhoneError("");
      return true;
    }
  };

  const validatePhotoTypeId = (value) => {
    if (!value) {
      setPhotoTypeIdError("Type of photo shoot is required");
      return false;
    } else {
      setPhotoTypeIdError("");
      return true;
    }
  };

  const validateDate = (value) => {
    if (!value) {
      setDateError("Date is required");
      return false;
    } else {
      setDateError("");
      return true;
    }
  };

  const validateSelectedTime = (value) => {
    if (!value) {
      setSelectedTimeError("Time is required");
      return false;
    } else {
      setSelectedTimeError("");
      return true;
    }
  };

  const handleNameBlur = () => {
    validateName(name);
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePhotoTypeIdBlur = () => {
    validatePhotoTypeId(photoTypeId);
  };

  const handleDateBlur = () => {
    validateDate(date);
  };

  const handleTimeBlur = () => {
    validateSelectedTime(selectedTime);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePhoneChange = (value) => {
    console.log(value);
    setPhone(value);
    validatePhone(value);
  };

  const handlePhotoTypeIdChange = (event) => {
    const value = event.target.value;
    setPhotoTypeId(value);
    validatePhotoTypeId(value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setSelectedTime(value);
    validateSelectedTime(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPhotoTypeIdValid = validatePhotoTypeId(photoTypeId);
    const isDateValid = validateDate(date);
    const isSelectedTimeValid = validateSelectedTime(selectedTime);

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPhotoTypeIdValid &&
      isDateValid &&
      isSelectedTimeValid
    ) {
      const endTimePhotoshoot = addDurationToTime(
        selectedTime,
        photoshootDuration
      );
      try {
        const response = await createBooking(
          name,
          email,
          phone,
          message,
          photoTypeId,
          formatDate(date),
          selectedTime,
          endTimePhotoshoot
        );
        if (response.success) {
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setPhotoTypeId("");
          setDate(null);
          setSelectedTime("");
          setIsDateSelected(false);
          toast.success("Booking submitted successfully!");
        } else {
          toast.error("Failed to create the question. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Your fields are not valid. Try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <ConditionalRender
        conditions={[isBioLoaded, isPhotoTypesLoaded, isBookingsLoaded]}
        content={
          <div>
            <div className={classes.booking}>
              <div className={classes.image}>
                <Header />
              </div>
              <div className={classes.content}>
                <p>Ksenia Tripak</p>
                <p>
                  If you want to contact with me {bio?.phoneNumber} or you can
                  find me in the Telegram/Viber/WhatsApp:
                </p>
                <ul>
                  <li>
                    <a href={viberURL}>
                      <FaViber className={classes.icons__viber} />{" "}
                    </a>
                  </li>
                  <li>
                    <a href={telegramURL}>
                      <LiaTelegram className={classes.icons__telegram} />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <BsWhatsapp className={classes.icons__whatsapp} />
                    </a>
                  </li>
                </ul>
                <p>Also you can fill out the form below:</p>
              </div>
              <div className={classes.contactForm}>
                <form onSubmit={handleSubmit}>
                  <div className={classes.commonBlock}>
                    <div className={classes.formGroup__input}>
                      <label htmlFor="name">Name:
                      <br />
                      {nameError && (
                        <span className={classes.error}>{nameError}</span>
                      )}
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                      />
                      </label>
                    </div>
                    <div className={classes.formGroup__input}>
                      <label htmlFor="email">Email:
                      <br />
                      {emailError && (
                        <span className={classes.error}>{emailError}</span>
                      )}
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                      />
                      </label>
                    </div>
                  </div>
                  <div className={classes.formGroup__input}>
                      <label htmlFor="tel">Phone number:
                      <br />
                      {phoneError && (
                        <span className={classes.error}>{phoneError}</span>
                      )}
                       <PhoneInput
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </label>
                      {console.log(phone)}
                    </div>
                  <div className={classes.formGroup__type}>
                    <label htmlFor="typeNames">Type of photo shoot
                    <br />
                    {photoTypeIdError && (
                      <span className={classes.error}>{photoTypeIdError}</span>
                    )}
                    <br />
                    <select
                      name="typeNames"
                      id="typeNames"
                      value={photoTypeId}
                      onChange={handlePhotoTypeIdChange}
                      onBlur={handlePhotoTypeIdBlur}
                    >
                      <option value="" disabled>
                        Choose a name
                      </option>
                      {allPhotoTypesName.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    </label>
                  </div>

                  {photoTypeId ? (
                    <div className={classes.calendarBlock}>
                      <p>Please, choose the date and time of the photoshoot</p>
                      <div className={classes.calendarWithSelect}>
                        <div>
                          {dateError && (
                            <span className={classes.error}>{dateError}</span>
                          )}
                          {photoTypeId !== REACT_APP_WEDDING_PHOTOTYPE_ID ? (
                            <CalendarForBooking
                              handleDateChange={handleDateChange}
                              date={date}
                              isDateDisabled={isDateDisabled}
                              onBlur={handleDateBlur}
                            />
                          ) : (
                            <>
                              <CalendarForBooking
                                handleDateChange={handleDateChange}
                                date={date}
                                isDateDisabled={isDateDisabledForWedding}
                                onBlur={handleDateBlur}
                              />
                            </>
                          )}
                          {date !== null && (
                            <span>
                              You chose {formatDate(date)}{" "}
                              {selectedTime !== null && (
                                <span>{selectedTime}</span>
                              )}
                            </span>
                          )}
                        </div>
                        <div>
                          {selectedTimeError && (
                            <span className={classes.error}>
                              {selectedTimeError}
                            </span>
                          )}
                          {isDateSelected && photoTypeId && (
                            <select
                              value={selectedTime}
                              onChange={handleTimeChange}
                              onBlur={handleTimeBlur}
                              className={classes.select}
                              name="time"
                            >
                              <option
                                value=""
                                disabled
                                className={classes.default}
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
                    </div>
                  ) : (
                    <div className={classes.withoutPhotoshootType}>
                      <p>
                        Please, choose the type of photo shoot and you will have
                        an opportunity to choose the date and time!
                      </p>
                    </div>
                  )}
                  <div className={classes.textarea}>
                    <label htmlFor="message">Additional message:
                    <br />
                    <textarea value={message} onChange={handleMessageChange} 
                      id="message"
                      name="message" />
                      </label>
                  </div>
                  <button className={classes.button} type="submit">
                    Send
                  </button>
                </form>
              </div>
              <Footer />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Booking;
