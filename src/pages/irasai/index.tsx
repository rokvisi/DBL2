/* eslint-disable tailwindcss/classnames-order */
import React, { useState } from "react";
import { ImArrowLeft2, ImCross, ImPencil } from "react-icons/im";
import { Irasas } from "@/types/irasas";
import { fetchDB, ISODateToNormalDate } from "@/utils/common";
import router from "next/router";

const TABLENAME = "irasai"
const DEPS = ["apdovanojimai", "komentarai"];

export async function getServerSideProps() {
  const columnResponse = await fetchDB(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  const databaseResponse = await fetchDB(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnResponse.error ? [] : columnResponse.result.map((o: any) => o.COLUMN_NAME),
      initialEntries: databaseResponse.error ? [] : databaseResponse.result,
    },
  };
}

export default function Irasai({ columns, initialEntries }: { columns: string[]; initialEntries: Irasas[] }) {
  const [entries, setEntries] = useState<Irasas[]>(initialEntries);

  async function reloadTable() {
    const response = await fetchDB(`SELECT * FROM ${TABLENAME}`);
    if (response.error) return;

    setEntries(response.result);
  }

  async function removeFromTable(id: number) {
    //* Delete dependencies.
    for (const dep of DEPS) await fetchDB(`DELETE FROM ${dep} WHERE fk_Irasasid = ${id}`);

    //* Delete the post.
    await fetchDB(`DELETE FROM irasai WHERE id = ${id}`);

    //* Reload the table.
    await reloadTable();
  }

  return (
    <div className="mx-40 my-20">
      <h1 className="flex items-center mb-10 text-2xl">
        <ImArrowLeft2 className="inline-block mr-4 cursor-pointer" onClick={() => router.push("/")} />
        {TABLENAME}
      </h1>
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
    </div>
  );
}
