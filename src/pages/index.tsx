import { TABLES } from "@/data/const";
import Link from "next/link";

export default function Index() {
  return (
    <div className="grid grid-flow-row space-y-2">
      {TABLES.map((table) => {
        return (
          <Link key={table.href} href={table.href} passHref>
            <span className="inline-block py-2 bg-gray-400 cursor-pointer text-center rounded hover:bg-gray-300">
              <p>{table.href.substring(1)}</p>
              <p className="text-xs">({table.info})</p>            
            </span>
          </Link>
        );
      })}
    </div>
  );
}
