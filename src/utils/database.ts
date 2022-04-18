import { Irasas, Skelbimas, Vartotojas } from "@/types/database";
import { ISODateToNormalDate, runQuery } from "./common";


export function normalizeIrasas(irasas: Irasas) {
  return {...irasas, sukurimoData: ISODateToNormalDate(irasas.sukurimoData)}
}

export async function deleteIrasas(id: number) {
  //* Delete all dependencies.
  for (const dependant of ["apdovanojimai", "komentarai"]) await runQuery(`DELETE FROM ${dependant} WHERE fk_Irasasid = ${id}`);

  //* Delete the post.
  await runQuery(`DELETE FROM irasai WHERE id = ${id}`);
}

// * -------------------------------------------

export async function deleteLenta(id: number) {
  //* Delete all posts that belong to the board.
  //? Edge case since deleting a post requires deleting it's dependencies.
  const [irasai, irasaiError] = await runQuery(`SELECT * FROM irasai WHERE fk_Lentaid = ${id}`);
  for (const irasas of irasai) await deleteIrasas(irasas.id);

  //* Delete all other dependencies.
  for (const dependant of ["lentosrodoreklamos", "skelbimai"]) await runQuery(`DELETE FROM ${dependant} WHERE fk_Lentaid = ${id}`);

  //* Delete the board.
  await runQuery(`DELETE FROM lentos WHERE id = ${id}`);
}

// * -------------------------------------------

export function normalizeSkelbimas(skelbimas: Skelbimas) {
  return {...skelbimas, sukurimoData: ISODateToNormalDate(skelbimas.sukurimoData)}
}

export async function deleteSkelbimas(id: number) {
  console.log("Deleting skelbimas.", id);
}

// * -------------------------------------------

export function normalizeVartotojas(vartotojas: Vartotojas) {
  return {...vartotojas, gimimoData: ISODateToNormalDate(vartotojas.gimimoData), paskutiniKartaMatytas: ISODateToNormalDate(vartotojas.paskutiniKartaMatytas)}
}

export async function deleteVartotojas(slapyvardis: string) {
  console.log("Deleting vartotojas.", slapyvardis);
}