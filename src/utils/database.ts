import { Irasas, Skelbimas, Vartotojas } from "@/types/database";
import { ISODateToNormalDate } from "./common";

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

export function normalizeIrasas(irasas: Irasas) {
  return {...irasas, sukurimoData: ISODateToNormalDate(irasas.sukurimoData)}
}

export function normalizeSkelbimas(skelbimas: Skelbimas) {
  return {...skelbimas, sukurimoData: ISODateToNormalDate(skelbimas.sukurimoData)}
}

export function normalizeVartotojas(vartotojas: Vartotojas) {
  return {...vartotojas, gimimoData: ISODateToNormalDate(vartotojas.gimimoData), paskutiniKartaMatytas: ISODateToNormalDate(vartotojas.paskutiniKartaMatytas)}
}
