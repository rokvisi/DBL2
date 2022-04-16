import { Irasas } from "@/types/database";
import { runQuery, ISODateToNormalDate } from "@/utils/common";
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
      entry: entries[0],
      lentos: lentosIds.map((o: any) => `${o.id}`).sort(),
      slapyvardziai: slapyvardziai.map((o: any) => o.slapyvardis).sort(),
    },
  };
}

export default function EditIrasas({ entry, lentos, slapyvardziai }: { entry: Irasas; lentos: string[]; slapyvardziai: string[] }) {
  const initialValues = {
    id: entry.id,
    pavadinimas: entry.pavadinimas,
    tekstas: entry.tekstas,
    sukurimoData: ISODateToNormalDate(entry.sukurimoData),
    redaguota: entry.redaguota,
    teigiamiTaskai: entry.teigiamiTaskai,
    neigiamiTaskai: entry.neigiamiTaskai,
    fk_Lentaid: entry.fk_Lentaid,
    fk_Vartotojasslapyvardis: entry.fk_Vartotojasslapyvardis,
  }

  async function onFormSubmit(values: any, { setSubmitting } : any) {
    const [updateResult, updateError] = await runQuery(
      `UPDATE ${TABLENAME} SET pavadinimas = '${values.pavadinimas}', tekstas = '${values.tekstas}', sukurimoData = '${values.sukurimoData}', redaguota = '${values.redaguota}', teigiamiTaskai = '${values.teigiamiTaskai}', neigiamiTaskai = '${values.neigiamiTaskai}', fk_Lentaid = '${values.fk_Lentaid}', fk_Vartotojasslapyvardis = '${values.fk_Vartotojasslapyvardis}' WHERE id = '${values.id}'`
    );

    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="id">ID</label>
          <Field className="block p-1 mb-4 bg-gray-200 border" name="id" type="text" disabled={true} />

          <label htmlFor="pavadinimas">Pavadinimas</label>
          <Field className="block p-1 mb-4 border" name="pavadinimas" type="text" />

          <label htmlFor="tekstas">Tekstas</label>
          <Field className="block p-1 mb-4 border" name="tekstas" type="text" />

          <label htmlFor="sukurimoData">Sukurimo Data</label>
          <Field className="block p-1 mb-4 border" name="sukurimoData" type="text" />

          <label htmlFor="redaguota">Redaguota</label>
          <Field className="block p-1 mb-4 border" name="redaguota" type="text" />

          <label htmlFor="teigiamiTaskai">Teigiami Taskai</label>
          <Field className="block p-1 mb-4 border" name="teigiamiTaskai" type="text" />

          <label htmlFor="neigiamiTaskai">Neigiami Taskai</label>
          <Field className="block p-1 mb-4 border" name="neigiamiTaskai" type="text" />

          <label htmlFor="fk_Lentaid">fk_LentaId</label>
          <Field className="block p-1 mb-4 border" as="select" name="fk_Lentaid">
            {lentos.map((lenta) => (
              <option value={lenta}>{lenta}</option>
            ))}
          </Field>

          <label htmlFor="fk_Vartotojasslapyvardis">fk_VartotojasSlapyvardis</label>
          <Field className="block p-1 mb-4 border" as="select" name="fk_Vartotojasslapyvardis">
            {slapyvardziai.map((slapyvardis) => (
              <option value={slapyvardis}>{slapyvardis}</option>
            ))}
          </Field>

          <button className={`p-2 font-bold text-black bg-gray-400 hover:bg-gray-300 ${isSubmitting && "cursor-not-allowed bg-gray-900 text-white hover:bg-gray-900"}`} type="submit">
            {isSubmitting ? "Saugoma...": "Išsaugoti"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
