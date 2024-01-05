import React, { useEffect, useState } from "react";
import { acceptBookingById, declineBookingById, getAllBookings } from "../../../services/BookingService";
import { getAllTypesOfPhotography, getTypeOfPhotographyById } from "../../../services/PhototypeService";
import classes from "./Bookings.module.scss";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  BasicCalendar,
  ConditionalRender,
  NotFound,
} from "../../../components";
import BookingTable from "./BookingTable"; 
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Booking = () => {
  const [futureDeclinedBookingList, setFutureDeclinedBookingList] = useState([]);
  const [futureAcceptedBookingList, setFutureAcceptedBookingList] = useState([]);
  const [isLoadedFutureBooking, setIsLoadedFutureBooking] = useState(false);
  const [previousBookingList, setPreviousBookingList] = useState([]);
  const [isLoadedPreviousBooking, setIsLoadedPreviousBooking] = useState(false);
  const [isLoadedTypes, setIsLoadedTypes] = useState(false);

  const fetchBookingsData = async () => {
    try {
      const bookingData = await getAllBookings();
      const today = new Date();
      const allBookings = bookingData.data;

      const futureBookings = allBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate > today;
      });

      const previousBookings = allBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate <= today;
      });

      const futureDeclinedBookings = futureBookings.filter((booking) => {
        return booking.status === "declined";
      });

      const futureAcceptedBookings = futureBookings.filter((booking) => {
        return booking.status === "accepted";
      });

      const updatedDeclinedBookingList = await Promise.all(
        futureDeclinedBookings.map(async (booking) => {
          const typeOfPhotographyList = await getTypeOfPhotographyById(booking.photoTypeId);
          console.log(typeOfPhotographyList)
          return {
            ...booking,
            photoType: typeOfPhotographyList?.data?.typeOfPhotography,
          };
        })
      );

      const previousBookingList = await Promise.all(
        previousBookings.map(async (booking) => {
          const typeOfPhotographyList = await getTypeOfPhotographyById(booking.photoTypeId);
          return {
            ...booking,
            photoType: typeOfPhotographyList?.data?.typeOfPhotography,
          };
        })
      );
      const futureAcceptedBookingList = await Promise.all(
        futureAcceptedBookings.map(async (booking) => {
          const typeOfPhotographyList = await getTypeOfPhotographyById(booking.photoTypeId);
          return {
            ...booking,
            photoType: typeOfPhotographyList?.data?.typeOfPhotography,
          };
        })
      );

      setPreviousBookingList(previousBookingList);
      setFutureDeclinedBookingList(updatedDeclinedBookingList);
      setFutureAcceptedBookingList(futureAcceptedBookingList);

      setIsLoadedFutureBooking(true);
      setIsLoadedPreviousBooking(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
    }
  };
  
  const fetchData = async () => {
    try {
       await fetchBookingsData();
       await getAllTypesOfPhotography();
       setIsLoadedTypes(true);
    } catch (error) {
       console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const declinePhotoshoot = (booking) => {
    confirmAlert({
      title: 'Confirm decline',
      message: `Are you sure you want to decline this booking?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleConfirmDecline(booking),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  const handleConfirmDecline = async (booking) => {
    try {
      await declineBookingById(booking._id);
      // setFutureAcceptedBookingList((prevList) => prevList.filter((x) => x.id !== booking._id));
      toast.success(`Booking was declined`);
      await fetchBookingsData();
      console.log("declined",futureDeclinedBookingList)
      console.log("accepted",futureAcceptedBookingList)
   } catch (error) {
      console.error("Error handling decline:", error);
   }
  };

  const acceptPhotoshoot = (booking) => {
    confirmAlert({
      title: 'Confirm acceptance',
      message: `Are you sure you want to accept this booking?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleConfirmAccept(booking),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  const handleConfirmAccept = (booking) => {
    acceptBookingById(booking._id).then(() => {
      // setFutureDeclinedBookingList((prevList) => prevList.filter((x) => x.id !== booking._id));
      toast.success(`Booking was accepted`);
    });
    fetchBookingsData();
    console.log("declined",futureDeclinedBookingList)
    console.log("accepted",futureAcceptedBookingList)

  };

  const columns = React.useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
        Cell: ({ row }) => <p>{row.original.name}</p>,
      },
      {
        Header: "EMAIL",
        accessor: "email",
        Cell: ({ row }) => <p>{row.original.email}</p>,
      },
      {
        Header: "PHONE",
        accessor: "phone",
        Cell: ({ row }) => <p>{row.original.phone}</p>,
      },
      {
        Header: "MESSAGE",
        accessor: "message",
        Cell: ({ row }) => <p>{row.original.message!=="" ? (<>{row.original.message}</>) : (<>-</>)}</p>,
      },
      {
        Header: "CONFIRMED",
        accessor: "confirmed",
        Cell: ({ row }) => <p>{row.original.isValid ? (<>true</>) : (<>false</>)}</p>,
      },
      {
        Header: "STATUS",
        accessor: "status",
        Cell: ({ row }) => <p>{row.original.status}</p>,
      },
      {
        Header: "PHOTOSHOOT",
        accessor: "photoType",
        Cell: ({ row }) => <p>{row.original.photoType}</p>,
      },
      {
        Header: "DATE",
        accessor: "date",
        Cell: ({ row }) => <p>{row.original.date}</p>,
      },
      {
        Header: "TIME",
        accessor: "time",
        Cell: ({ row }) => <p>{row.original.startTime}</p>,
      },
      {
        Header: "",
        accessor: "decline",
        Cell: ({ row }) => (
          new Date(row.original.date) > new Date() ? (
            row.original.status==="accepted" ? (<span className={classes.decline} onClick={() => declinePhotoshoot(row.original)}>
            <TiDeleteOutline />
          </span>)
             : (<span className={classes.accept} onClick={() => acceptPhotoshoot(row.original)}>
             <IoIosCheckmarkCircleOutline />
           </span>)
          ) : null
        ),
      }
    ],
    []
  );

  return (
    <ConditionalRender
      conditions={[
        isLoadedFutureBooking,
        isLoadedPreviousBooking,
        isLoadedTypes,
      ]}
      content={
        <div className={classes.booking}>
          <ToastContainer/>
          <h2>Future accepted photoshoots</h2>
          {futureAcceptedBookingList.length === 0 ? (
            <div>
              <NotFound />
            </div>
          ) : (
            <BookingTable
              columns={columns}
              data={futureAcceptedBookingList}
            />
          )}

          <h2>Declined future photoshoots</h2>
          {futureDeclinedBookingList.length === 0 ? (
            <div>
              <NotFound />
            </div>
          ) : (
            <BookingTable
              columns={columns}
              data={futureDeclinedBookingList}
            />
          )}

          <h2>Previous photoshoots</h2>
          {previousBookingList.length === 0 ? (
            <div>
              <NotFound />
            </div>
          ) : (
            <BookingTable
              columns={columns}
              data={previousBookingList}
              headerClassName={classes.header}
              bodyClassName={classes.body}
            />
          )}

          <BasicCalendar />
        </div>
      }
    />
  );
};

export default Booking;
