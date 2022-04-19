import { Lenta, LentaDefaults } from "@/types/database";
import { runQuery } from "@/utils/database";
import { Field, Form, Formik } from "formik";

export default function InsertLenta() {
  async function onFormSubmit(values: Lenta, { setSubmitting }: any) {
    console.log(values);

    await runQuery(
      `INSERT INTO lentos VALUES ('${values.id}', '${values.pavadinimas}', '${values.baneris}', '${values.aprasymas}', '${values.dienosZinute}', '${values.sriftas}')`
    );
    setSubmitting(false);
  }

  return (
    <>
      <p className="italic">PN1 - Paprasta nepriklausomos lentelės duomenų įvedimo forma – forma, skirta įvesti vieną įrašą į išorinių raktų neturinčią lentelę.</p>
      <hr className="my-4" />
      <Formik initialValues={LentaDefaults} onSubmit={onFormSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="id">ID</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="id" type="number" />

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
    </>
  );
}
