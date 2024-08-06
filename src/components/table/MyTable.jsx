import React from "react";
import { useTable, usePagination } from "react-table";
import { Avatar } from "@mui/material";

const MyTable = ({ columns, data }) => {
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
      initialState: { pageIndex: 0, pageSize: 8 },
    },
    usePagination
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="min-w-full"
          style={{ boxShadow: "0 0 10px rgba(0,0,0,0.204)" }}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="text-left bg-blue-500 text-white text-xs md:text-sm lg:text-base p-1 md:p-2"
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
                  className="cursor-pointer border-b-[1px] border-solid border-b-[#ced0d5] hover:bg-slate-100"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="text-xs md:text-sm lg:text-base p-1 md:p-2 text-left"
                      {...cell.getCellProps()}
                    >
                      {cell.column.id === "photo" ? (
                        <Avatar
                          sx={{
                            width: {
                              xs: "20px",
                              sm: "30px",
                              md: "40px",
                              lg: "50px",
                            },
                            height: {
                              xs: "20px",
                              sm: "30px",
                              md: "40px",
                              lg: "50px",
                            },
                          }}
                          src={cell.value}
                          alt="Image"
                        />
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
      <div className="mt-5 flex gap-3 items-center justify-center md:justify-start">
        <button
          className={`bg-emerald-600 px-3 py-2 text-sm md:text-base rounded text-white ${
            !canPreviousPage ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className={`bg-emerald-600 px-3 py-2 text-sm md:text-base rounded text-white cursor-pointer ${
            !canNextPage ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MyTable;
