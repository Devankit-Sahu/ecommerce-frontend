import { Skeleton, Stack } from "@mui/material";

const AdminDashboardLoader = () => {
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        rowGap={4}
        columnGap={4}
      >
        {Array.from(
          [1, 2, 3, 4].map((_, index) => (
            <Skeleton
              variant="rectangular"
              key={index}
              width={220}
              height={120}
            />
          ))
        )}
      </Stack>
      <div className="flex flex-col md:flex-row gap-2 mt-10">
        <div className="w-full md:w-[50%]">
          <Skeleton
            variant="rectangular"
            width={200}
            height={20}
            className="mb-3"
          />
          <Skeleton variant="rectangular" height={300} />
        </div>
        <div className="w-full md:w-[50%]">
          <Skeleton
            variant="rectangular"
            width={200}
            height={20}
            className="mb-3"
          />
          <Skeleton variant="rectangular" height={300} />
        </div>
      </div>
      <div className="mt-10">
        <Skeleton
          variant="rectangular"
          width={400}
          height={20}
          className="mb-3 mx-auto"
        />
        <Skeleton
          variant="circular"
          width={350}
          height={350}
          className="mb-3 mx-auto"
        />
      </div>
      <div className="my-10">
        <Skeleton
          variant="rectangular"
          width={200}
          height={20}
          className="mb-3"
        />
        <Skeleton variant="rectangular" height={200} />
      </div>
    </>
  );
};

export default AdminDashboardLoader;
