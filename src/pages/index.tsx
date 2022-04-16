import Link from "next/link";

const TABLES = [
  "apdovanimas_tipas",
  "apdovanojimai",
  "irasai",
  "komentarai",
  "lentos",
  "lentosrodoreklamos",
  "reklamos",
  "roles",
  "saukimai",
  "skelbimai",
  "vartotojai",
  "vartotojaidraugaujavartotojai",
  "vartotojaituriroles",
].sort();

export default function Index() {
  return (
    <ul>
      {TABLES.map((table) => {
        return (
          <Link key={table} href={`/${table}`} passHref>
            <li className="inline-block w-[300px] p-5 m-4 bg-gray-400 cursor-pointer text-center rounded hover:bg-gray-300">{table}</li>
          </Link>
        );
      })}
    </ul>
  );
}
