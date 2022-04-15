import { Irasas } from "@/types/irasas";
import { fetchDB, ISODateToNormalDate } from "@/utils/common";
import { Field, Form, Formik } from "formik";
import router from "next/router";
import { ImArrowLeft2 } from "react-icons/im";

export async function getServerSideProps({ query }: any) {
  const databaseResponse = await fetchDB(`SELECT * FROM irasai WHERE id = ${query.id}`);

  return {
    props: {
      entry: databaseResponse.error || databaseResponse.result.length !== 1 ? null : databaseResponse.result[0],
    },
  };
}

function EditForm({ selectedEntry }: { selectedEntry: Irasas }) {
  return (
    <Formik
      initialValues={{
        id: selectedEntry.id,
        pavadinimas: selectedEntry.pavadinimas,
        tekstas: selectedEntry.tekstas,
        sukurimoData: ISODateToNormalDate(selectedEntry.sukurimoData),
        redaguota: selectedEntry.redaguota,
        teigiamiTaskai: selectedEntry.teigiamiTaskai,
        neigiamiTaskai: selectedEntry.neigiamiTaskai,
        fk_Lentaid: selectedEntry.fk_Lentaid,
        fk_Vartotojasslapyvardis: selectedEntry.fk_Vartotojasslapyvardis,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await fetchDB(
          `UPDATE irasai SET pavadinimas = '${values.pavadinimas}', tekstas = '${values.tekstas}', sukurimoData = '${values.sukurimoData}', redaguota = '${values.redaguota}', teigiamiTaskai = '${values.teigiamiTaskai}', neigiamiTaskai = '${values.neigiamiTaskai}', fk_Lentaid = '${values.fk_Lentaid}', fk_Vartotojasslapyvardis = '${values.fk_Vartotojasslapyvardis}' WHERE id = '${values.id}'`
        );

        setSubmitting(false);
      }}
    >
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
        <Field className="block p-1 mb-4 border" name="fk_Lentaid" type="text" />

        <label htmlFor="fk_Vartotojasslapyvardis">fk_VartotojasSlapyvardis</label>
        <Field className="block p-1 mb-4 border" name="fk_Vartotojasslapyvardis" type="text" />

        <button className="p-2 font-bold text-black bg-gray-400 hover:bg-gray-300" type="submit">
          Išsaugoti
        </button>
      </Form>
    </Formik>
  );
}

export default function EditIrasas({ entry }: { entry: Irasas }) {
  return (
    <div className="mx-40 my-20">
      <h1 className="flex items-center mb-10 text-2xl">
        <ImArrowLeft2 className="inline-block mr-4 cursor-pointer" onClick={() => router.push("/irasai")} />
        Redaguoti
      </h1>
      {entry ? <EditForm selectedEntry={entry} /> : <p>Nepavyko gauti atsakymo is duomenų bazės.</p>}
    </div>
  );
}
