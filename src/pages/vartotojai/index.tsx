import React, { useState } from "react";
import { Vartotojas } from "@/types/database";
import { runQuery } from "@/utils/database";
import { deleteVartotojas, normalizeVartotojas } from "@/utils/database";
import DataTable from "@/components/datatable";

const TABLENAME = "vartotojai";

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  let [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Vartotojas[]).map(normalizeVartotojas),
    },
  };
}

export default function Vartotojai({ columns, initialEntries }: { columns: string[]; initialEntries: Vartotojas[] }) {
  const [entries, setEntries] = useState<Vartotojas[]>(initialEntries);

  async function removeFromTable(slapyvardis: string) {
    //* Delete the entry.
    await deleteVartotojas(slapyvardis);

    //* Reload the table.
    await runQuery(`SELECT * FROM ${TABLENAME}`).then((result) => setEntries(result[0].map(normalizeVartotojas)));
  }

  return <DataTable table={TABLENAME} pk="slapyvardis" columns={columns} entries={entries} removeFromTable={removeFromTable} insertable={true} />;
}
