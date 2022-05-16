import DataTable from "@/components/datatable";
import { runQuery } from "@/utils/database";
import { useRef, useState } from "react";

function ReportSettingsForm({ setEntries }: any) {
  const editedFilterSelectRef = useRef<HTMLSelectElement>(null);
  const roleFilterSelectRef = useRef<HTMLSelectElement>(null);
  const sortSelectRef = useRef<HTMLSelectElement>(null);

  async function generateReport(settings: any) {
    let filters = settings.filters.length !== 0 ? `WHERE\n\t\t${settings.filters[0]}` : "";
    settings.filters.slice(1).forEach((filter: string) => {
      filters += ` AND ${filter}`;
    });

    const [entries] = await runQuery(`
      SELECT
        v.slapyvardis,
        r.pavadinimas as role,
        COUNT(k.id) as komentaru_skaicius,
        COUNT(IF(k.fk_Irasasid IS NULL, NULL, 1)) as komentarai_tik_ant_irasu,
        COUNT(IF(k.fk_Skelbimasid IS NULL, NULL, 1)) as komentarai_tik_ant_skelbimu,
        SUM(k.teigiamiTaskai - k.neigiamiTaskai) as NET_komentaru_taskai
      FROM
        vartotojai v
        INNER JOIN komentarai k ON k.fk_Vartotojasslapyvardis = v.slapyvardis
        INNER JOIN vartotojaituriroles vtr ON vtr.fk_Vartotojasslapyvardis = v.slapyvardis
        INNER JOIN roles r ON r.id = vtr.fk_Rolesid
      ${filters}
      GROUP BY
        v.slapyvardis
      ${settings.sort !== "undefined" ? `ORDER BY komentaru_skaicius ${settings.sort}` : ""}
    `);

    setEntries(entries);
  }

  return (
    <div className="mb-4 space-y-8">
      <h1 className="text-xl text-center">Ataskaitos formavimo nustatymai</h1>

      <div className="flex justify-center gap-20">
        <div>
          <span className="mr-2">Vartotojai tik:</span>
          <select className="bg-gray-400 rounded" ref={roleFilterSelectRef}>
            <option value="undefined">Visi</option>
            <option value="1">Paprastas</option>
            <option value="2">Moderatorius</option>
            <option value="3">Administratorius</option>
          </select>
        </div>
        <div>
          <span className="mr-2">Komentarai tik: </span>
          <select className="bg-gray-400 rounded" ref={editedFilterSelectRef}>
            <option value="undefined">Visi</option>
            <option value="true">Redaguoti</option>
            <option value="false">Neredaguoti</option>
          </select>
        </div>
        <div>
          <span className="mr-2">Rikiuoti pagal komentarų skaičių: </span>
          <select className="bg-gray-400 rounded" ref={sortSelectRef}>
            <option value="undefined">-</option>
            <option value="ASC">Didėjančiai</option>
            <option value="DESC">Mažėjančiai</option>
          </select>
        </div>
      </div>

      <button
        className="w-full p-2 font-bold text-black bg-gray-400 rounded hover:bg-gray-300"
        onClick={() =>
          generateReport({
            sort: sortSelectRef!.current!.value,
            filters: [
              ...(editedFilterSelectRef!.current!.value !== "undefined" ? [`k.redaguota = ${editedFilterSelectRef!.current!.value}`] : []),
              ...(roleFilterSelectRef!.current!.value !== "undefined" ? [`r.id = ${roleFilterSelectRef!.current!.value}`] : []),
            ],
          })
        }
      >
        Formuoti Ataskaitą
      </button>
    </div>
  );
}

export default function Ataskaita() {
  const [entries, setEntries] = useState();

  return (
    <>
      <ReportSettingsForm setEntries={setEntries} />
      {entries && (
        <DataTable
          table=""
          pk="slapyvardis"
          columns={["slapyvardis", "role", "komentaru kiekis", "komentarai tik ant irasu", "komentarai tik ant skelbimu", "NET komentaru taskai"]}
          entries={entries}
          removeFromTable={() => {}}
          insertable={false}
        />
      )}
    </>
  );
}
