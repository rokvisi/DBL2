import { Vartotojas } from "@/types/database";
import { normalizeVartotojas, runQuery } from "@/utils/database";
import { Field, Form, Formik } from "formik";

const TABLENAME = "vartotojai";

export async function getServerSideProps({ query }: any) {
  //* Get the inspected entry.
  const [entries] = await runQuery(`SELECT * FROM ${TABLENAME} WHERE slapyvardis = '${query.slapyvardis}'`);

  return {
    props: {
      entry: normalizeVartotojas(entries[0]),
    },
  };
}

export default function EditVartotojas({ entry }: { entry: Vartotojas }) {
  async function onFormSubmit(values: Vartotojas, { setSubmitting }: any) {
    await runQuery(
      `UPDATE ${TABLENAME} SET slapyvardis = '${values.slapyvardis}', vardas = '${values.vardas}', pavarde = '${values.pavarde}', pastas = '${values.pastas}', gimimoData = '${values.gimimoData}', lytis = '${values.lytis}', salis = '${values.salis}', parasas = '${values.parasas}', paskutiniKartaMatytas = '${values.paskutiniKartaMatytas}', slaptazodis = '${values.slaptazodis}', taskai = '${values.taskai}', ispejimai = '${values.ispejimai}', nuotrauka = '${values.nuotrauka}' WHERE slapyvardis = '${values.slapyvardis}'`
    );

    setSubmitting(false);
  }

  return (
    <Formik initialValues={entry} onSubmit={onFormSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="slapyvardis">Slapyvardis</label>
          <Field className="block w-full p-1 mb-4 bg-gray-200 border border-gray-500" name="slapyvardis" type="text" disabled={true} />

          <label htmlFor="vardas">Vardas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="vardas" type="text" />

          <label htmlFor="pavarde">Pavardė</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="pavarde" type="text" />

          <label htmlFor="pastas">El. Paštas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="pastas" type="text" />

          <label htmlFor="gimimoData">Gimimo data</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="gimimoData" type="text" />

          <label htmlFor="lytis">Lytis</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="lytis" type="text" />

          <label htmlFor="salis">Šalis</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="salis" type="text" />

          <label htmlFor="parasas">Parašas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="parasas" type="text" />

          <label htmlFor="paskutiniKartaMatytas">Paskutinį kartą matytas</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="paskutiniKartaMatytas" type="text" />

          <label htmlFor="slaptazodis">Slaptažodis</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="slaptazodis" type="text" />

          <label htmlFor="taskai">Taškai</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="taskai" type="text" />

          <label htmlFor="ispejimai">Įspėjimai</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="ispejimai" type="text" />

          <label htmlFor="nuotrauka">Nuotrauka</label>
          <Field className="block w-full p-1 mb-4 border border-gray-500" name="nuotrauka" type="text" />

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
