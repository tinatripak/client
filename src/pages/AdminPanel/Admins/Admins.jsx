import React, { useEffect, useState, useCallback } from "react";
import { deleteAdminById, getAdminById, getAllAdmins } from "../../../services/AdminService";
import { useTable } from "react-table";
import classes from "./Admins.module.scss";
import { IoAddCircle } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  adminDashboardLink,
  adminLink,
  createLink,
  darkColor,
  editLink,
} from "../../../constants";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const Admins = () => {
  const [adminList, setAdminList] = useState([]);
  const navigate = useNavigate();

  const [cookies] = useCookies([]);
  const [currentAdmin, setCurrentAdmin] = useState([]);
  const decoded = cookies?.token !== 'undefined' ? jwtDecode(cookies.token) : null;

  useEffect(() => {
    fetchAdminsData();
  }, [adminList]);

  const fetchAdminsData = () => {
    getAllAdmins().then((response) => {
      setAdminList(response.data);
    });
  };

  const getAdmin = useCallback(() => {
    getAdminById(decoded?.id).then((data) => {
      setCurrentAdmin(data?.data);
    });
  }, [decoded?.id]);

  useEffect(() => {
    if (cookies?.token !== 'undefined') {
      getAdmin();
    }
  }, [getAdmin]);

  const handleEdit = useCallback(
    (admin) => {
      if (currentAdmin === 'chief admin'){
      navigate(`${adminDashboardLink}${adminLink}${editLink}/${admin._id}`);
    } else{
      alert("You dont have any permissions for it")
    }
    },
    [navigate]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "FULL NAME",
        accessor: "username",
        Cell: ({ row }) => <p>{row.original.username}</p>,
      },
      {
        Header: "EMAIL",
        accessor: "email",
        Cell: ({ row }) => <p>{row.original.email}</p>,
      },
      {
        Header: "PHOTO",
        accessor: "photo",
        Cell: ({ row }) =>
          row.original.photo ? (
            <img
              className={classes.photo}
              src={row.original.photo}
              alt="Admin"
            />
          ) : (
            <p className={classes.text}>No photo</p>
          ),
      },
      {
        Header: "ADDED",
        accessor: "createdAt",
        Cell: ({ row }) => <p>{row.original.createdAt}</p>,
      },
      {
        Header: "",
        accessor: "edit",
        Cell: ({ row }) => (
          <span
            onClick={() => handleEdit(row.original)}
            className={classes.edit_button}
          >
            <FiEdit2 color="#616161" size={20} />
          </span>
        ),
      },
      {
        Header: "",
        accessor: "delete",
        Cell: ({ row }) => (
          <span
            onClick={() => handleDelete(row.original)}
            className={classes.delete_button}
          >
            <BsTrashFill color="#616161" size={20} />
          </span>
        ),
      },
    ],
    [handleEdit]
  );

  const data = React.useMemo(() => adminList, [adminList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleDelete = (admin) => {
    if (currentAdmin === 'chief admin'){
      deleteAdminById(admin._id).then(() => {
        setAdminList((prevList) => prevList.filter((x) => x.id !== admin._id));
        alert(`Admin ${admin.username} was deleted`);
      });
    } else{
      alert("You dont have any permissions for it")
    }
  };
  const handleCreate = () => {
    if (currentAdmin === 'chief admin'){
    navigate(`${adminDashboardLink}${adminLink}${createLink}`);
  } else{
    alert("You dont have any permissions for it")
  }
  };

  return (
    <div className={classes.admin}>
      <div className={classes.add}>
        {}
        <p>Add an admin</p>
        <IoAddCircle
          className={classes.icon}
          color={darkColor}
          size={35}
          onClick={handleCreate}
        />
      </div>
      <table {...getTableProps()} className={classes.admin_table}>
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
                    className={classes.cell}
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
  );
};

export default Admins;
