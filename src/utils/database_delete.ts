import { runQuery } from "./database";

//? Get dependencies.
// select TABLE_NAME from INFORMATION_SCHEMA.COLUMNS
// where COLUMN_NAME like 'fk_Irasasid'
// order by TABLE_NAME;

// select TABLE_NAME from INFORMATION_SCHEMA.COLUMNS
// where COLUMN_NAME like 'fk_Lentaid'
// order by TABLE_NAME;

// select TABLE_NAME from INFORMATION_SCHEMA.COLUMNS
// where COLUMN_NAME like 'fk_Skelbimasid'
// order by TABLE_NAME;

// select TABLE_NAME from INFORMATION_SCHEMA.COLUMNS
// where COLUMN_NAME like 'fk_Vartotojasslapyvardis'
// order by TABLE_NAME;


//? - fk_Komentarasid stored in [apdovanojimai]
export async function deleteKomentaras(id: number) {
  //* Delete 'apdovanojimai' for 'komentaras'.
  await runQuery(`DELETE FROM apdovanojimai WHERE fk_Komentarasid = ${id}`);

  //* Delete 'komentaras'.
  await runQuery(`DELETE FROM komentarai WHERE id = ${id}`);
}

//? - fk_Irasasid stored in [apdovanojimai, komentarai]
export async function deleteIrasas(id: number) {
  //* Delete 'apdovanojimai' for 'irasas'.
  await runQuery(`DELETE FROM apdovanojimai WHERE fk_Irasasid = ${id}`);

  //* Delete 'komentarai' for 'irasas'.
  const [komentarai] = await runQuery(`SELECT id FROM komentarai WHERE fk_Irasasid = ${id}`);
  for (const komentaras of komentarai) await deleteKomentaras(komentaras.id)

  //* Delete 'irasas'.
  await runQuery(`DELETE FROM irasai WHERE id = ${id}`);
}

//? - fk_Lentaid stored in [irasai, lentosrodoreklamos, skelbimai]
export async function deleteLenta(id: number) {
  //* Delete 'irasai' for 'lenta'.
  const [irasai] = await runQuery(`SELECT id FROM irasai WHERE fk_Lentaid = ${id}`);
  for (const irasas of irasai) await deleteIrasas(irasas.id);

  //* Delete 'lentosrodoreklamos' for 'lenta'.
  await runQuery(`DELETE FROM lentosrodoreklamos WHERE fk_Lentaid = ${id}`);

  //* Delete 'skelbimai' for 'lenta'.
  const [skelbimai] = await runQuery(`SELECT id FROM skelbimai WHERE fk_Lentaid = ${id}`);
  for (const skelbimas of skelbimai) await deleteSkelbimas(skelbimas.id);

  //* Delete 'lenta'.
  await runQuery(`DELETE FROM lentos WHERE id = ${id}`);
}

//? - fk_Skelbimasid stored in [apdovanojimai, komentarai]
export async function deleteSkelbimas(id: number) {
  //* Delete 'apdovanojimai' for 'skelbimas'.
  await runQuery(`DELETE FROM apdovanojimai WHERE fk_Skelbimasid = ${id}`);

  //* Delete 'komentarai' for 'skelbimas'.
  const [komentarai] = await runQuery(`SELECT id FROM komentarai WHERE fk_Skelbimasid = ${id}`);
  for (const komentaras of komentarai) await deleteKomentaras(komentaras.id)

  //* Delete 'skelbimas'.
  await runQuery(`DELETE FROM skelbimai WHERE id = ${id}`);
}

//? - fk_Vartotojasslapyvardis stored in [apdovanojimai, irasai, komentarai, saukimai, vartotojaidraugaujavartotojai, vartotojaituriroles]
export async function deleteVartotojas(slapyvardis: string) {
  //* Delete 'apdovanojimai' for 'vartotojas'.
  await runQuery(`DELETE FROM apdovanojimai WHERE fk_Vartotojasslapyvardis = '${slapyvardis}'`);

  //* Delete 'irasai' for 'vartotojas'.
  const [irasai] = await runQuery(`SELECT id FROM irasai WHERE fk_Vartotojasslapyvardis = '${slapyvardis}'`);
  for (const irasas of irasai) await deleteIrasas(irasas.id);

  //* Delete 'komentarai' for 'vartotojas'.
  const [komentarai] = await runQuery(`SELECT id FROM komentarai WHERE fk_Vartotojasslapyvardis = '${slapyvardis}'`);
  for (const komentaras of komentarai) await deleteKomentaras(komentaras.id)

  //* Delete 'saukimai' for 'vartotojas'.
  await runQuery(`DELETE FROM saukimai WHERE fk_Vartotojasslapyvardis = '${slapyvardis}'`);

  //* Delete 'vartotojaidraugaujavartotojai' for 'vartotojas'.
  await runQuery(`DELETE FROM vartotojaidraugaujavartotojai WHERE (fk_Vartotojasslapyvardis = '${slapyvardis}' OR fk_Vartotojasslapyvardis1 = '${slapyvardis}')`);

  //* Delete 'vartotojaituriroles' for 'vartotojas'.
  await runQuery(`DELETE FROM vartotojaituriroles WHERE fk_Vartotojasslapyvardis = '${slapyvardis}'`);

  //* Delete 'vartotojas'.
  await runQuery(`DELETE FROM vartotojai WHERE slapyvardis = '${slapyvardis}'`);
}