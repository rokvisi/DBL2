import { Skelbimas, SkelbimasDefaults } from "@/types/database";
import { runQuery } from "@/utils/database";
import { Field, Formik, Form } from "formik";

export async function getServerSideProps() {
  const [lentosIds] = await runQuery(`SELECT id FROM lentos`);

  return {
    props: {
      lentosPKs: lentosIds.map((o: any) => o.id).sort(),
    },
  };
}

export default function InsertSkelbimas({ lentosPKs }: { lentosPKs: string[] }) {
  async function onFormSubmit(values: Skelbimas, { setSubmitting }: any) {
    console.log(values);

    await runQuery(
      `INSERT INTO skelbimai VALUES ('${values.id}', '${values.pavadinimas}', '${values.tekstas}', '${values.sukurimoData}', '${values.redaguota}', '${values.fk_Lentaid}')`
    );
    setSubmitting(false);
  }

  return (
    <>
      <p className="italic">PP1 - Paprasta priklausomos lentelės duomenų įvedimo forma – forma, skirta įvesti vieną įrašą į bent vieną išorinį raktą turinčią lentelę. </p>
      <hr className="my-4" />
      <Formik initialValues={SkelbimasDefaults} onSubmit={onFormSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="id">ID</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="id" type="number" />

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
              <option value={undefined}>-</option>
              {lentosPKs.map((lentaPK) => (
                <option key={lentaPK} value={lentaPK}>
                  {lentaPK}
                </option>
              ))}
            </Field>

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
