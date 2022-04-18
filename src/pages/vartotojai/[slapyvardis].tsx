import { Irasas, Lenta, Skelbimas, Vartotojas } from "@/types/database";
import { runQuery, ISODateToNormalDate } from "@/utils/common";
import { Field, Form, Formik } from "formik";

const TABLENAME = "vartotojai";

export async function getServerSideProps({ query }: any) {
  //* Get the inspected entry.
  const [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME} WHERE slapyvardis = '${query.slapyvardis}'`);

  return {
    props: {
      entry: entries[0],
    },
  };
}

export default function EditSkelbimas({ entry }: { entry: Vartotojas }) {
  return <>Edit vartotojas {entry.slapyvardis}</>
}
