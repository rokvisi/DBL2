import Link from "next/link";
import router from "next/router";
import { ImPencil, ImCross } from "react-icons/im";

export default function DataTable({ table, pk, columns, entries, removeFromTable, insertable }: { table: string; pk: string, columns: any[]; entries: any[]; removeFromTable: any; insertable: boolean }) {
  return (
    <>
      {insertable && (
        <Link href={`/${table}/insert`} passHref>
          <a className="inline-block mb-5 bg-gray-400 hover:bg-gray-300 rounded p-2">+ Pridėti naują</a>
        </Link>
      )}
      <table className="w-full max-w-full">
        <thead className="font-medium text-gray-700 border-b border-black text-left">
          <tr>
            {columns.map((column: any) => (
              <th className="p-2 truncate max-w-[100px]" key={column}>
                {column}
              </th>
            ))}
            <th className="p-2">{" "}</th>
            <th className="p-2">{" "}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: any) => (
            <tr className="even:bg-gray-200" key={entry[pk]}>
              {Object.entries(entry).map(([key, value]: any) => (
                <td key={key+value} className="p-2 truncate max-w-[100px]">
                  {value}
                </td>
              ))}
              <td className="p-2">
                <ImPencil className="cursor-pointer" onClick={() => router.push(`/${table}/${entry[pk]}`)} />
              </td>
              <td className="p-2">
                <ImCross className="cursor-pointer fill-red-500" onClick={() => removeFromTable(entry[pk])} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
