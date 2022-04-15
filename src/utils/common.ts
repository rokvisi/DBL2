export async function fetchDB(query: string) {
  return fetch('http://localhost:3000/api/database', {
    method: 'POST',
    body: JSON.stringify({
      query,
    }),
  }).then((response) => response.json());
}

export function ISODateToNormalDate(dateStr: string) {
  const date = new Date(dateStr);

  let day: number | string= date.getDay();
  if (day < 10) day = `0${day}`

  let month: number | string= date.getMonth();
  if (month < 10) month = `0${month}`

  return `${date.getFullYear()}-${month}-${day}`
}