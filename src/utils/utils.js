export const getDatesWithLabels = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i <= 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    const formattedDate = futureDate.toISOString().split("T")[0];
    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else label = `In ${i} Days`;
    dates.push({ date: formattedDate, label });
  }
  return dates;
};

export const getStatusClass = (status) => {
  switch (status) {
    case "processing":
      return "text-green-600";
    case "shipped":
      return "text-red-600";
    case "delivered":
      return "text-orange-500";
    default:
      return "text-gray-400";
  }
};

export const getLastMonths = () => {
  const currentDate = new Date();
  const last6Months = [];

  currentDate.setDate(1);

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthName = monthDate.toLocaleString("default", { month: "long" });
    last6Months.unshift(monthName);
  }
  return last6Months;
};
