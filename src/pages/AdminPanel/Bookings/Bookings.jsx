import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../../services/BookingService";
import { getAllTypesOfPhotography } from "../../../services/PhototypeService";
import { useTable } from "react-table";
import classes from "./Bookings.module.scss";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { BasicCalendar, NotFound } from "../../../components";

const Booking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [arrayOfTypes, setArrayOfTypes] = useState([]);
  useEffect(() => {
    fetchBookingsData();
  }, [bookingList]);

  const fetchBookingsData = () => {
    getAllBookings().then((res) => {
      setBookingList(res.data);
    });
  };

  const fetchTypesOfPhotographyData = () => {
    getAllTypesOfPhotography().then((res) => {
      setArrayOfTypes(res.data);
    });
  };

  useEffect(() => {
    fetchTypesOfPhotographyData();
  }, [arrayOfTypes]);

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
            className={classes.accept_button}
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
            className={classes.decline_button}
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
            className={classes.booking_table}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className={classes.header}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={classes.cell}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className={classes.body}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={classes.row}
                    key={row.id}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={
                          classes.cell
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
      <BasicCalendar />
    </div>
  );
};

export default Booking;
