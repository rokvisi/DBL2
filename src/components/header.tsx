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

export default function Headera() {
  return (
    <div className="flex mb-10 items-center text-xl">
      <Breadcrumbs />
      <ul className="inline-block ml-auto space-x-4">
        {TABLES.map((table) => (
          <Link href={table.href}>
            <li className="inline-block cursor-pointer hover:underline">{table.href.substring(1)}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
