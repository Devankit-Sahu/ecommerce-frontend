import React from "react";
import { useTable, usePagination } from "react-table";
import { Avatar } from "@mui/material";

const MyTable = ({ columns, data }) => {
  const getStatusCellStyle = (status) => {
    if (status === "delivered") return "text-green-500";
    else if (status === "cancelled") return "text-red-600";
    else return "text-[#FFA500] ";
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div>
      <table
        className="w-full"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.204)" }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="text-left bg-blue-500 text-white p-2"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="cursor-pointer border-b-[1px] border-solid border-b-[#ced0d5] hover:bg-[#9be5e5]"
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
      <div className="mt-5 flex gap-3 items-center">
        <button
          className={`bg-emerald-600 px-3 py-2 rounded-lg text-white cursor-pointer ${
            !canPreviousPage && "cursor-default"
          }`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>{" "}
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className={`bg-emerald-600 px-3 py-2 rounded-lg text-white cursor-pointer ${
            !canNextPage && "cursor-default"
          }`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>{" "}
      </div>
    </div>
  );
};

export default MyTable;
