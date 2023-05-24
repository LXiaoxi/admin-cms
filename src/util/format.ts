import dayjs from "dayjs";
export function formatTime(
  data: string,
  format: string = "YYYY/MM/DD HH:mm:ss"
) {
  return dayjs(data).format(format);
}
