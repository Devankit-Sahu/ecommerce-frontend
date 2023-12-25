import React from "react";
import { useTable } from "react-table";
import { Avatar } from "@mui/material";

const MyTable = ({ columns, data }) => {
  const getStatusCellStyle = (status) => {
    if (status === "delivered")
      return "text-green-500";
    else if (status === "cancelled")
      return "text-red-600";
    else return "text-[#FFA500] ";
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
    
  return (
    <div>
      <table
        className="w-full rounded-md"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.204)" }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className=" text-left bg-blue-500 text-white p-2 first-of-type:rounded-tl-md last-of-type:rounded-tr-md"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="cursor-pointer hover:bg-[rgb(246,243,243)]"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className={`p-2 ${
                      cell.column.id === "status"
                        ? getStatusCellStyle(cell.value)
                        : ""
                    }`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === "photo" ? (
                      <Avatar src={cell.value} alt="Image" />
                    ) : cell.column.id === "status" ? (
                      cell.value
                    ) : (
                      cell.render("Cell")
                    )}
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

export default MyTable;
