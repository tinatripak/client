import React from "react";
import classes from "./BookingTable.module.scss";
import { useTable } from "react-table";

const BookingTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className={classes.booking_table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className={classes.header}
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={classes.cell}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={classes.body}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={classes.row} key={row.id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={classes.cell}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingTable;
