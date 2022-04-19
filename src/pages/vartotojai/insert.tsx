import { Saukimas, SaukimasDefaults, VartotojasSuSaukimais, VartotojasSuSaukimaisDefaults } from "@/types/database";
import { runQuery } from "@/utils/database";
import { Field, Formik, Form, FieldArray } from "formik";

export default function InsertVartotojas() {
  async function onFormSubmit(values: VartotojasSuSaukimais, { setSubmitting }: any) {
    console.log(values);

    const [, error] = await runQuery(
      `INSERT INTO vartotojai VALUES ('${values.slapyvardis}', '${values.vardas}', '${values.pavarde}', '${values.pastas}', '${values.gimimoData}', '${values.lytis}', '${values.salis}', '${values.parasas}', '${values.paskutiniKartaMatytas}', '${values.slaptazodis}', '${values.taskai}', '${values.ispejimai}', '${values.nuotrauka}')`
    );

    if (error) return;

    for (const saukimas of values.saukimai) {
      await runQuery(`INSERT INTO saukimai VALUES ('${saukimas.id}', '${saukimas.tekstas}', '${values.slapyvardis}')`);
    }

    setSubmitting(false);
  }

  return (
    <>
      <p className="italic">
        SPn su šaukimais - Ir pagrindinė, ir detalizuojanti formos lentelės nėra priklausomos nuo kitų lentelių, todėl formoje nėra realizuoti duomenų pasirinkimai.
      </p>
      <hr className="my-4" />
      <Formik initialValues={VartotojasSuSaukimaisDefaults} onSubmit={onFormSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="slapyvardis">Slapyvardis</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="slapyvardis" type="text" />

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
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="taskai" type="number" />

            <label htmlFor="ispejimai">Įspėjimai</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="ispejimai" type="number" />

            <label htmlFor="nuotrauka">Nuotrauka</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="nuotrauka" type="text" />

            <p className="my-2 mt-4 text-lg">Šaukimai:</p>
            <hr className="my-4" />

            <FieldArray name="saukimai">
              {({ push, remove, form }) => {
                return (
                  <>
                    {form.values.saukimai.map((_: Saukimas, index: number) => (
                      <div key={index} className="grid grid-cols-[repeat(3,minmax(80px,max-content))] items-end gap-4">
                        <span>
                          <label className="block" htmlFor={`saukimai[${index}].id`}>
                            ID
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`saukimai[${index}].id`} type="number" />
                        </span>

                        <span>
                          <label className="block" htmlFor={`saukimai[${index}].tekstas`}>
                            Tekstas
                          </label>
                          <Field className="p-1 border border-gray-500" name={`saukimai[${index}].tekstas`} type="text" />
                        </span>

                        <button type="button" className="px-8 py-1 text-lg bg-gray-400 rounded text-bold" onClick={() => remove(index)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="px-8 py-2 my-8 text-lg bg-gray-400 rounded text-bold" onClick={() => push(SaukimasDefaults)}>
                      +
                    </button>
                  </>
                );
              }}
            </FieldArray>

            <button
              className={`p-2 w-full font-bold text-black bg-gray-400 hover:bg-gray-300 rounded ${isSubmitting && "cursor-not-allowed bg-gray-900 text-white hover:bg-gray-900"}`}
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
