import { Komentaras } from "@/types/database";
import { runQuery } from "@/utils/database";
import DataTable from "@/components/datatable";

const TABLENAME = "komentarai";

export async function getServerSideProps() {
  const [columns, columnsError] = await runQuery(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${TABLENAME}'`);
  let [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME}`);

  return {
    props: {
      columns: columnsError ? [] : columns.map((columnData: any) => columnData.COLUMN_NAME),
      initialEntries: entriesError ? [] : (entries as Komentaras[]),
    },
  };
}

export default function Skelbimai({ columns, initialEntries }: { columns: string[]; initialEntries: Komentaras[] }) {
  return <DataTable table={TABLENAME} pk="id" columns={columns} entries={initialEntries} removeFromTable={() => {}} insertable={false} />;
}
