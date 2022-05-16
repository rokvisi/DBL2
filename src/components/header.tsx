import { TABLES } from "@/data/const";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ImArrowLeft2 } from "react-icons/im";

function Breadcrumbs() {
  const router = useRouter();

  const crumbs = router.asPath.split("/").filter((crumb) => crumb !== "");
  const crumbData = crumbs.map((crumb) => ({ crumb, url: router.asPath.substring(0, router.asPath.indexOf(crumb) + crumb.length) }));
  let prevUrl = router.asPath.slice(0, -1).substring(0, router.asPath.slice(0, -1).lastIndexOf("/"));
  if (prevUrl === "") prevUrl = "/";

  return (
    <div className="inline-flex items-center">
      <ImArrowLeft2 className={`inline-block mt-1 mr-4 ${crumbData.length === 0 ? "fill-gray-400" : "cursor-pointer"}`} onClick={() => router.push(prevUrl)} />
      <span className="mx-1 cursor-pointer hover:underline" onClick={() => router.push("/")}>
        duombazė
      </span>
      /
      {crumbData.map((crumb) => (
        <React.Fragment key={crumb.crumb}>
          <span className="mx-1 cursor-pointer hover:underline" onClick={() => router.push(crumb.url)}>
            {crumb.crumb}
          </span>
          /
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Header() {
  return (
    <div className="mb-10 text-xl">
      <div className="flex items-center">
        <Breadcrumbs />
        <ul className="flex ml-auto space-x-4">
          <Link href="/ataskaita">
            <li className="inline-block px-4 my-auto border-r cursor-pointer">
              Ataskaita
            </li>
          </Link>

          {TABLES.map((table) => (
            <Link href={table.href} key={table.href}>
              <li className="inline-block cursor-pointer group">
                <p className="text-center group-hover:underline">{table.href.substring(1)}</p>
                <p className="text-sm italic text-center">{table.info}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
