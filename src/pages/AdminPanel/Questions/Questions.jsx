import React, { useEffect, useState } from 'react'
import { useTable } from "react-table";
import { RiQuestionAnswerFill } from "react-icons/ri";
import classes from "./Questions.module.scss";
import { getAllQuestions } from '../../../api';


const Questions = () => {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  useEffect(() => {
    getAllQuestions()
      .then((data) => {
        setListOfQuestions(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [listOfQuestions]);


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
        Header: "ANSWER",
        accessor: "answer",
        Cell: ({ row }) => <div
          onClick={() => answerQuestion(row.original)}
            className={classes.question__answer_button}>
          <RiQuestionAnswerFill/>
        </div>
      }
    ], []
  );
  const answerQuestion = () => {
    console.log("answer")
  }

  const data = React.useMemo(() => listOfQuestions, [listOfQuestions]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  
  return (
    <div className={classes.question}>
      <table {...getTableProps()} className={classes.question__question_table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={classes.question__question_table__header}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={classes.question__question_table__header__cell}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className={classes.question__question_table__body}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={classes.question__question_table__body__row}
                key={row.id}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={classes.question__question_table__body__row__cell}
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
  )
}

export default Questions