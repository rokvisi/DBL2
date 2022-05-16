import React, { useState } from "react";
import { Irasas } from "@/types/database";
import { runQuery } from "@/utils/database";
import { normalizeIrasas } from "@/utils/database";
import DataTable from "@/components/datatable";
import { deleteIrasas } from "@/utils/database_delete";

const TABLENAME = "irasai";

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  const [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Irasas[]).map(normalizeIrasas),
    },
  };
}

export default function Irasai({ columns, initialEntries }: { columns: string[]; initialEntries: Irasas[] }) {
  const [entries, setEntries] = useState<Irasas[]>(initialEntries);

  async function removeFromTable(id: number) {
    //* Delete the entry.
    await deleteIrasas(id);

    //* Reload the table.
    await runQuery(`SELECT * FROM ${TABLENAME}`).then((result) => setEntries(result[0].map(normalizeIrasas)));
  }

  return <DataTable table={TABLENAME} pk="id" columns={columns} entries={entries} removeFromTable={removeFromTable} insertable={true} />
}
