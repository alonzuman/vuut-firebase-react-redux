export const calculateHours = (duration) => {
  let seconds = (duration / 1000);
  let minutes = parseInt(seconds / 60, 10);
  seconds = seconds % 60;
  let hours = parseInt(minutes / 60, 10);
  minutes = minutes % 60;
  return (hours + minutes / 60)
}

export const setDateString = (date) => {
  const splDate = date.toString().split(' ');
  return `${splDate[0]}, ${splDate[1]} ${splDate[2]}`
}
