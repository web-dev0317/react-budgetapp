export const today = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const y = date.getFullYear();

  const d = Math.floor(day / 10) === 0 ? `0${day}` : `${day}`;
  const m = Math.floor(month / 10) === 0 ? `0${month}` : `${month}`;

  return `${d}/${m}/${y}`;
};

export const yyyyMMdd = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const y = date.getFullYear();

  const d = Math.floor(day / 10) === 0 ? `0${day}` : `${day}`;
  const m = Math.floor(month / 10) === 0 ? `0${month}` : `${month}`;

  return `${y}-${m}-${d}`;
};

export const yyyyMMddToddMMyyyy = (date) => {
  const args = date.split("-");
  return `${args[2]}/${args[1]}/${args[0]}`;
};

export const monthYear = () => {
  let serverTime = new Date();
  let currOffset = serverTime.getTimezoneOffset();
  let istOffset = 330;
  let date = new Date(serverTime.getTime() + (istOffset + currOffset) * 60000);
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  switch (m) {
    case 1:
      y -= 1;
      return "Dec " + y;
    case 2:
      return "Jan " + y;
    case 3:
      return "Feb " + y;
    case 4:
      return "Mar " + y;
    case 5:
      return "Apr " + y;
    case 6:
      return "May " + y;
    case 7:
      return "Jun " + y;
    case 8:
      return "Jul " + y;
    case 9:
      return "Aug " + y;
    case 10:
      return "Sep " + y;
    case 11:
      return "Oct " + y;
    case 12:
      return "Nov " + y;
    default:
      return "";
  }
};
