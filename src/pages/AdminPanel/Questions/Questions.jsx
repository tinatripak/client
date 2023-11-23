import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { RiQuestionAnswerFill } from "react-icons/ri";
import classes from "./Questions.module.scss";
import { getAllQuestions } from "../../../services/QuestionService";
import { ConditionalRender, NotFound } from "../../../components";
import { Link } from "react-router-dom";
import {
  adminDashboardLink,
  answerLink,
  questionLink,
} from "../../../constants";

const Questions = () => {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [isLoadedQuestions, setIsLoadedQuestions] = useState(false);

  useEffect(() => {
    fetchQuestionsData();
  }, [listOfQuestions]);

  const fetchQuestionsData = () => {
    getAllQuestions().then((data) => {
      setListOfQuestions(data?.data);
      setIsLoadedQuestions(true);
    });
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
        Header: "QUESTION",
        accessor: "question",
        Cell: ({ row }) => <p>{row.original.question}</p>,
      },
      {
        Header: "ANSWER",
        accessor: "answer",
        Cell: ({ row }) => (
          <div className={classes.answer_button}>
            <Link
              to={`${adminDashboardLink}${questionLink}${answerLink}/${row.original._id}`}
            >
              <RiQuestionAnswerFill size={30} />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => listOfQuestions, [listOfQuestions]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <ConditionalRender
      conditions={[isLoadedQuestions]}
      content={
        <div className={classes.question}>
          {listOfQuestions.length === 0 ? (
            <div>
              <NotFound />
            </div>
          ) : (
            <div>
              <table {...getTableProps()} className={classes.question_table}>
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
                <tbody {...getTableBodyProps()} className={classes.body}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={classes.row}
                        key={row.id}
                      >
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
            </div>
          )}
        </div>
      }
    />
  );
};

export default Questions;
