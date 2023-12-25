import Pagination from "@mui/material/Pagination";

const PaginationComp = ({
  page,
  filteredProductsCount,
  productPerPage,
  setPage,
  totalPage,
}) => {
  return (
    <div className="mt-10 flex justify-start">
      {productPerPage < filteredProductsCount && (
        <Pagination
          page={page}
          count={totalPage}
          shape="rounded"
          defaultPage={1}
          color="secondary"
          onChange={(e, newpage) => setPage(newpage)}
        />
      )}
    </div>
  );
};

export default PaginationComp;
