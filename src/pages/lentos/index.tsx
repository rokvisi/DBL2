import React, { useState } from "react";
import { Lenta } from "@/types/database";
import { runQuery } from "@/utils/database";
import { deleteLenta } from "@/utils/database";
import DataTable from "@/components/datatable";

const TABLENAME = "lentos";

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  let [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Lenta[]),
    },
  };
}

export default function Lentos({ columns, initialEntries }: { columns: string[]; initialEntries: Lenta[] }) {
  const [entries, setEntries] = useState<Lenta[]>(initialEntries);

  async function removeFromTable(id: number) {
    //* Delete the entry.
    await deleteLenta(id);

    //* Reload the table.
    await runQuery(`SELECT * FROM ${TABLENAME}`).then((result) => setEntries(result[0]));
  }

  return <DataTable table={TABLENAME} pk="id" columns={columns} entries={entries} removeFromTable={removeFromTable} insertable={true} />
}