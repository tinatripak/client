import React, { useEffect, useState } from "react";
import { getAllBookings } from '../../../services/BookingService'
import { getAllTypesOfPhotography } from '../../../services/PhototypeService'
import { useTable } from "react-table";
import classes from "./Bookings.module.scss";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import NotFound from "../../../components/NotFound/NotFound";
import BasicCalendar from "../../../components/BasicCalendar/BasicCalendar";

const Booking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [arrayOfTypes, setArrayOfTypes] = useState([]);
  useEffect(() => {
    fetchBookingsData()
  }, [bookingList]);

  const fetchBookingsData = () => {
    getAllBookings()
      .then((res) => {
        setBookingList(res.data);
      })
  }

  const fetchTypesOfPhotographyData = () => {
    getAllTypesOfPhotography()
      .then((res) => {
        setArrayOfTypes(res.data);
      })
  }

  useEffect(() => {
    fetchTypesOfPhotographyData();
  }, [arrayOfTypes]);

  const findPhotoNameById = (photoTypeId) => {
    if (arrayOfTypes) {
      const type = arrayOfTypes.find((type) => type?._id === photoTypeId);
      return type?.typeOfPhotography;
    }
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
        Header: "MESSAGE",
        accessor: "message",
        Cell: ({ row }) => <p>{row.original.message}</p>,
      },
      {
        Header: "PHOTOSHOOT",
        accessor: "photoType",
        Cell: ({ row }) => <p>{row.original.photoTypeId}</p>,
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
        Header: "ACCEPT",
        accessor: "accept",
        Cell: ({ row }) => (
          <div
            onClick={() => handleAccept(row.original)}
            className={classes.booking__accept_button}
          >
            <BsCheckLg color="green" size={20} />
          </div>
        ),
      },
      {
        Header: "DECLINE",
        accessor: "decline",
        Cell: ({ row }) => (
          <div
            onClick={() => handleDecline(row.original)}
            className={classes.booking__decline_button}
          >
            <RxCross2 color="#red" size={20} />
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => bookingList, [bookingList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleAccept = (booking) => {
    console.log("accept");
  };

  const handleDecline = (booking) => {
    console.log("decline");
  };

  return (
    <div className={classes.booking}>
      {bookingList.length === 0 ? (
        <div>
          <NotFound />
        </div>
      ) : (
        <div>
          <table
            {...getTableProps()}
            className={classes.booking__booking_table}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className={classes.booking__booking_table__header}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={classes.booking__booking_table__header__cell}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className={classes.booking__booking_table__body}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={classes.booking__booking_table__body__row}
                    key={row.id}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={
                          classes.booking__booking_table__body__row__cell
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <BasicCalendar/>
    </div>
  );
};

export default Booking;
