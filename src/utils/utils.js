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
