import { IrasasSuKomentarais, IrasasSuKomentaraisDefaults, Komentaras, KomentarasDefaults } from "@/types/database";
import { runQuery } from "@/utils/database";
import { Field, Formik, Form, FieldArray } from "formik";

export async function getServerSideProps() {
  const [lentosIds] = await runQuery(`SELECT id FROM lentos`);
  const [slapyvardziai] = await runQuery(`SELECT slapyvardis FROM vartotojai`);

  return {
    props: {
      lentosPKs: lentosIds.map((o: any) => o.id).sort(),
      vartotojaiPKs: slapyvardziai.map((o: any) => o.slapyvardis).sort((lhs: string, rhs: string) => lhs.localeCompare(rhs)),
    },
  };
}

export default function InsertIrasas({ lentosPKs, vartotojaiPKs }: { lentosPKs: string[]; vartotojaiPKs: string[] }) {
  async function onFormSubmit(values: IrasasSuKomentarais, { setSubmitting }: any) {
    console.log(values);

    const [, error] = await runQuery(
      `INSERT INTO irasai VALUES ('${values.id}', '${values.pavadinimas}', '${values.tekstas}', '${values.sukurimoData}', '${values.redaguota}', '${values.teigiamiTaskai}', '${values.neigiamiTaskai}', '${values.fk_Lentaid}', '${values.fk_Vartotojasslapyvardis}')`
    );

    if (error) return;

    for (const komentaras of values.komentarai) {
      await runQuery(
        `INSERT INTO komentarai VALUES ('${komentaras.id}', '${komentaras.tekstas}', '${komentaras.teigiamiTaskai}', '${komentaras.neigiamiTaskai}', '${komentaras.redaguota}', '${values.id}', '${komentaras.fk_Vartotojasslapyvardis}', NULL)`
      );
    }

    setSubmitting(false);
  }

  return (
    <>
      <p className="italic">
        SPva su komentarais - Ir pagrindinė, ir detalizuojanti formos lentelės yra priklausomos nuo kitų lentelių, todėl formoje realizuoti atitinkami duomenų pasirinkimas iš
        lentelių.
      </p>
      <hr className="my-4" />
      <Formik initialValues={IrasasSuKomentaraisDefaults} onSubmit={onFormSubmit}>
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

            <label htmlFor="teigiamiTaskai">Teigiami taškai</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="teigiamiTaskai" type="text" />

            <label htmlFor="neigiamiTaskai">Neigiami taškai</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" name="neigiamiTaskai" type="text" />

            <label htmlFor="fk_Lentaid">Lentos ID</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" as="select" name="fk_Lentaid">
              <option value={undefined}>-</option>
              {lentosPKs.map((lentaPK) => (
                <option key={`irasas-lenta-${lentaPK}`} value={lentaPK}>
                  {lentaPK}
                </option>
              ))}
            </Field>

            <label htmlFor="fk_Vartotojasslapyvardis">Vartotojo slapyvardis</label>
            <Field className="block w-full p-1 mb-4 border border-gray-500" as="select" name="fk_Vartotojasslapyvardis">
              <option value={undefined}>-</option>
              {vartotojaiPKs.map((vartotojasPK) => (
                <option key={`irasas-vartotojas-${vartotojasPK}`} value={vartotojasPK}>
                  {vartotojasPK}
                </option>
              ))}
            </Field>

            <p className="my-2 mt-4 text-lg">Komentarai:</p>
            <hr className="my-4" />

            <FieldArray name="komentarai">
              {({ push, remove, form }) => {
                return (
                  <>
                    {form.values.komentarai.map((_: Komentaras, index: number) => (
                      <div key={index} className="grid grid-cols-[repeat(7,minmax(80px,max-content))] items-end gap-4 mb-4">
                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].id`}>
                            ID
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`komentarai[${index}].id`} type="number" />
                        </span>

                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].tekstas`}>
                            Tekstas
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`komentarai[${index}].tekstas`} type="text" />
                        </span>

                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].teigiamiTaskai`}>
                            Teigiami taškai
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`komentarai[${index}].teigiamiTaskai`} type="text" />
                        </span>
                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].neigiamiTaskai`}>
                            Neigiami taškai
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`komentarai[${index}].neigiamiTaskai`} type="text" />
                        </span>
                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].redaguota`}>
                            Redaguota?
                          </label>
                          <Field className="p-1 border border-gray-500 " name={`komentarai[${index}].redaguota`} type="text" />
                        </span>
                        <span>
                          <label className="block" htmlFor={`komentarai[${index}].fk_Vartotojasslapyvardis`}>
                            Vartotojo slapyvardis
                          </label>
                          <Field className="block w-full p-1 border border-gray-500" as="select" name={`komentarai[${index}].fk_Vartotojasslapyvardis`}>
                            <option value={undefined}>-</option>
                            {vartotojaiPKs.map((vartotojasPK) => (
                              <option key={`komentaras-${vartotojasPK}`} value={vartotojasPK}>
                                {vartotojasPK}
                              </option>
                            ))}
                          </Field>
                        </span>

                        <button type="button" className="px-8 py-1 text-lg bg-gray-400 rounded text-bold" onClick={() => remove(index)}>
                          -
                        </button>
                      </div>
                    ))}
                    <button type="button" className="px-8 py-2 my-8 text-lg bg-gray-400 rounded text-bold" onClick={() => push(KomentarasDefaults)}>
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
