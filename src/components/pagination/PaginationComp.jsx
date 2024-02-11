import Pagination from "@mui/material/Pagination";

const PaginationComp = ({
  page,
  filteredProductsCount,
  productPerPage,
  setPage,
  totalPages,
}) => {
  return (
    <div className="mt-10">
      {productPerPage < filteredProductsCount && (
        <Pagination
          page={page}
          count={totalPages}
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
