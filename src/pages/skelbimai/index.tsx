import React, { useState } from "react";
import { Skelbimas } from "@/types/database";
import { runQuery } from "@/utils/database";
import { deleteSkelbimas, normalizeSkelbimas } from "@/utils/database";
import DataTable from "@/components/datatable";

const TABLENAME = "skelbimai";

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  let [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Skelbimas[]).map(normalizeSkelbimas),
    },
  };
}

export default function Skelbimai({ columns, initialEntries }: { columns: string[]; initialEntries: Skelbimas[] }) {
  const [entries, setEntries] = useState<Skelbimas[]>(initialEntries);

  async function removeFromTable(id: number) {
    //* Delete the entry.
    await deleteSkelbimas(id);

    //* Reload the table.
    await runQuery(`SELECT * FROM ${TABLENAME}`).then((result) => setEntries(result[0].map(normalizeSkelbimas)));
  }

  return <DataTable table={TABLENAME} pk="id" columns={columns} entries={entries} removeFromTable={removeFromTable} insertable={true} />
}