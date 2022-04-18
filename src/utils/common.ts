import moment from "moment";

export function ISODateToNormalDate(dateStr: string) {
  return moment(dateStr, 'YYYY-MM-DD HH:mm').add(1, "days").format("YYYY-MM-DD");
}
