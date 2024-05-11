import Pagination from "@mui/material/Pagination";

const PaginationComp = ({
  page,
  setPage,
  productsCount,
  productPerPage,
  totalPages,
}) => {
  return (
    <div className="mt-10">
      {productPerPage < productsCount && (
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
