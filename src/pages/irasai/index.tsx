import React, { useState } from "react";
import { ImCross, ImPencil } from "react-icons/im";
import { Irasas } from "@/types/database";
import { runQuery, ISODateToNormalDate } from "@/utils/common";
import router from "next/router";

const TABLENAME = "irasai";
const DELETE_DEPENDENCIES = ["apdovanojimai", "komentarai"];

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  const [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Irasas[]),
    },
  };
}


export default function Irasai({ columns, initialEntries }: { columns: string[]; initialEntries: Irasas[] }) {
  const [entries, setEntries] = useState<Irasas[]>(initialEntries);

  async function reloadTable() {
    const [refreshedEntries, _] = await runQuery(`SELECT * FROM ${TABLENAME}`);
    if (refreshedEntries) setEntries(refreshedEntries);
  }

  async function removeFromTable(id: number) {
    //* Delete dependencies.
    for (const dependant of DELETE_DEPENDENCIES) await runQuery(`DELETE FROM ${dependant} WHERE fk_Irasasid = ${id}`);

    //* Delete the post.
    await runQuery(`DELETE FROM irasai WHERE id = ${id}`);

    //* Reload the table.
    await reloadTable();
  }

  return (
    <div className="grid grid-cols-[repeat(9,auto)_repeat(2,minmax(80px,max-content))] gap-4 ">
      {columns.map((column) => (
        <span key={column} className="block font-medium text-gray-700">
          {column}
        </span>
      ))}
      <span className="block font-medium text-gray-700">Redaguoti</span>
      <span className="block font-medium text-gray-700">Ištrinti</span>
      <hr className="my-5 col-span-full"></hr>
      {entries.map((irasas) => (
        <React.Fragment key={irasas.id}>
          <span className="block">{irasas.id}</span>
          <span className="block">{irasas.pavadinimas}</span>
          <span className="block">{irasas.tekstas}</span>
          <span className="block">{ISODateToNormalDate(irasas.sukurimoData)}</span>
          <span className="block">{irasas.redaguota}</span>
          <span className="block">{irasas.teigiamiTaskai}</span>
          <span className="block">{irasas.neigiamiTaskai}</span>
          <span className="block">{irasas.fk_Lentaid}</span>
          <span className="block">{irasas.fk_Vartotojasslapyvardis}</span>
          <ImPencil className="my-auto ml-1 mr-auto cursor-pointer" onClick={() => router.push(`/irasai/${irasas.id}`)} />
          <ImCross className="my-auto ml-1 mr-auto cursor-pointer fill-red-500" onClick={() => removeFromTable(irasas.id)} />
          <hr className="col-span-full"></hr>
        </React.Fragment>
      ))}
    </div>
  );
}
