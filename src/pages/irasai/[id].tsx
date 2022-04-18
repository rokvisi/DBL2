import { Irasas } from "@/types/database";
import { runQuery } from "@/utils/common";
import { normalizeIrasas } from "@/utils/database";
import { Field, Form, Formik } from "formik";

const TABLENAME = "irasai";

export async function getServerSideProps({ query }: any) {
  //* Get the inspected entry.
  const [entries, entriesError] = await runQuery(`SELECT * FROM ${TABLENAME} WHERE id = ${query.id}`);

  //* Get all possible foreign keys for each dependency.
  const [lentosIds, lentosIdsError] = await runQuery(`SELECT id FROM lentos`);
  const [slapyvardziai, slapyvardziaiError] = await runQuery(`SELECT slapyvardis FROM vartotojai`);

  return {
    props: {
      entry: normalizeIrasas(entries[0]),
      lentosPKs: lentosIds.map((o: any) => `${o.id}`).sort(),
      vartotojaiPKs: slapyvardziai.map((o: any) => o.slapyvardis).sort(),
    },
  };
}

export default function EditIrasas({ entry, lentosPKs, vartotojaiPKs }: { entry: Irasas; lentosPKs: string[]; vartotojaiPKs: string[] }) {
  async function onFormSubmit(values: any, { setSubmitting }: any) {
    await runQuery(
      `UPDATE ${TABLENAME} SET pavadinimas = '${values.pavadinimas}', tekstas = '${values.tekstas}', sukurimoData = '${values.sukurimoData}', redaguota = '${values.redaguota}', teigiamiTaskai = '${values.teigiamiTaskai}', neigiamiTaskai = '${values.neigiamiTaskai}', fk_Lentaid = '${values.fk_Lentaid}', fk_Vartotojasslapyvardis = '${values.fk_Vartotojasslapyvardis}' WHERE id = '${values.id}'`
    );

    setSubmitting(false);
  }

  return (
    <Formik initialValues={entry} onSubmit={onFormSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="id">ID</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full bg-gray-200" name="id" type="text" disabled={true} />

          <label htmlFor="pavadinimas">Pavadinimas</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="pavadinimas" type="text" />

          <label htmlFor="tekstas">Tekstas</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="tekstas" type="text" />

          <label htmlFor="sukurimoData">Sukurimo Data</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="sukurimoData" type="text" />

          <label htmlFor="redaguota">Redaguota</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="redaguota" type="text" />

          <label htmlFor="teigiamiTaskai">Teigiami Taskai</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="teigiamiTaskai" type="text" />

          <label htmlFor="neigiamiTaskai">Neigiami Taskai</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" name="neigiamiTaskai" type="text" />

          <label htmlFor="fk_Lentaid">fk_LentaId</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" as="select" name="fk_Lentaid">
            {lentosPKs.map((lentaPK) => (
              <option value={lentaPK}>{lentaPK}</option>
            ))}
          </Field>

          <label htmlFor="fk_Vartotojasslapyvardis">fk_VartotojasSlapyvardis</label>
          <Field className="block p-1 mb-4 border border-gray-500 w-full" as="select" name="fk_Vartotojasslapyvardis">
            {vartotojaiPKs.map((vartotojasPK) => (
              <option value={vartotojasPK}>{vartotojasPK}</option>
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
