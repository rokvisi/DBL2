import { Lenta } from "@/types/database";
import { runQuery } from "@/utils/database";
import { Field, Form, Formik } from "formik";

const TABLENAME = "lentos";

export async function getServerSideProps({ query }: any) {
  const [entries] = await runQuery(`SELECT * FROM ${TABLENAME} WHERE id = ${query.id}`);

  return {
    props: {
      entry: entries[0],
    },
  };
}

export default function EditLenta({ entry }: { entry: Lenta }) {
  async function onFormSubmit(values: Lenta, { setSubmitting }: any) {
    await runQuery(
      `UPDATE ${TABLENAME} SET pavadinimas = '${values.pavadinimas}', baneris = '${values.baneris}', aprasymas = '${values.aprasymas}', dienosZinute = '${values.dienosZinute}', sriftas = '${values.sriftas}' WHERE id = '${values.id}'`
    );

    setSubmitting(false);
  }

  return (
    <Formik initialValues={entry} onSubmit={onFormSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="id">ID</label>
          <Field className="block w-full p-1 mb-4 bg-gray-200 border border-gray-500" name="id" type="number" disabled={true} />

          <label htmlFor="pavadinimas">Pavadinimas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="pavadinimas" type="text" />

          <label htmlFor="baneris">Baneris</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="baneris" type="text" />

          <label htmlFor="aprasymas">Aprašymas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="aprasymas" type="text" />

          <label htmlFor="dienosZinute">Dienos žinutė</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="dienosZinute" type="text" />

          <label htmlFor="sriftas">Šriftas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="sriftas" type="text" />

          <button
            className={`p-2 font-bold text-black bg-gray-400 hover:bg-gray-300 ${isSubmitting && "cursor-not-allowed bg-gray-900 text-white hover:bg-gray-900"}`}
            type="submit"
          >
            {isSubmitting ? "Saugoma..." : "Išsaugoti"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
