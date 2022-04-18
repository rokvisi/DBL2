export async function runQuery(query: string) {
  //* Fetch the local api to access the database.
  const databaseResponse = await fetch("http://localhost:3000/api/database", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
  }).then((response) => response.json());

  //? One of these will be undefined.
  const {result, error} = databaseResponse;

  if (error !== undefined) {
    console.log(`Query failed: '${query}'`, error);
    return [null, error];
  }

  console.log(`Query suceeded: '${query}'`);
  return [result, null];
}

export function ISODateToNormalDate(dateStr: string) {
  const date = new Date(dateStr);

  let day: number | string = date.getDay();
  if (day + 1 < 10) day = `0${day+1}`;

  let month: number | string = date.getMonth();
  if (month + 1 < 10) month = `0${month+1}`;

  return `${date.getFullYear()}-${month}-${day}`;
}
