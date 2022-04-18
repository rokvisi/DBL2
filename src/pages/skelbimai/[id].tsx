import { Skelbimas } from "@/types/database";
import { runQuery } from "@/utils/database";
import { normalizeSkelbimas } from "@/utils/database";
import { Field, Form, Formik } from "formik";

const TABLENAME = "skelbimai";

export async function getServerSideProps({ query }: any) {
  //* Get the inspected entry.
  const [entries] = await runQuery(`SELECT * FROM ${TABLENAME} WHERE id = ${query.id}`);

  //* Get all possible foreign keys for each dependency.
  const [lentosIds] = await runQuery(`SELECT id FROM lentos`);

  return {
    props: {
      entry: normalizeSkelbimas(entries[0]),
      lentosPKs: lentosIds.map((o: any) => o.id).sort(),
    },
  };
}

export default function EditSkelbimas({ entry, lentosPKs }: { entry: Skelbimas; lentosPKs: string[] }) {
  async function onFormSubmit(values: Skelbimas, { setSubmitting }: any) {
    await runQuery(
      `UPDATE ${TABLENAME} SET pavadinimas = '${values.pavadinimas}', tekstas = '${values.tekstas}', sukurimoData = '${values.sukurimoData}', redaguota = '${values.redaguota}', fk_Lentaid = '${values.fk_Lentaid}' WHERE id = '${values.id}'`
    );

    setSubmitting(false);
  }

  return (
    <Formik initialValues={entry} onSubmit={onFormSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="id">ID</label>
          <Field className="block w-full p-1 mb-4 bg-gray-200 border border-gray-500" name="id" type="text" disabled={true} />

          <label htmlFor="pavadinimas">Pavadinimas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="pavadinimas" type="text" />

          <label htmlFor="tekstas">Tekstas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="tekstas" type="text" />

          <label htmlFor="sukurimoData">Sukūrimo data</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="sukurimoData" type="text" />

          <label htmlFor="redaguota">Redaguota?</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="redaguota" type="text" />

          <label htmlFor="fk_Lentaid">Lentos ID</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" as="select" name="fk_Lentaid">
            {lentosPKs.map((lentaPK) => (
              <option value={lentaPK}>{lentaPK}</option>
            ))}
          </Field>

          <button className={`p-2 font-bold text-black bg-gray-400 hover:bg-gray-300 ${isSubmitting && "cursor-not-allowed bg-gray-900 text-white hover:bg-gray-900"}`} type="submit">
            {isSubmitting ? "Saugoma..." : "Išsaugoti"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
