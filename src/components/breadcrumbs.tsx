import { useRouter } from "next/router";
import React from "react";
import { ImArrowLeft2 } from "react-icons/im";

export default function Breadcrumbs() {
  const router = useRouter();

  const crumbs = router.asPath.split("/").filter((crumb) => crumb !== "");
  const crumbData = crumbs.map((crumb) => ({ crumb, url: router.asPath.substring(0, router.asPath.indexOf(crumb) + crumb.length) }));
  let prevUrl = router.asPath.slice(0, -1).substring(0, router.asPath.slice(0, -1).lastIndexOf("/"));
  if (prevUrl === "") prevUrl = "/";

  return (
    <div className="flex items-center mb-10 text-2xl">
      <ImArrowLeft2 className={`inline-block mt-1 mr-4 ${crumbData.length === 0 ? "fill-gray-400" : "cursor-pointer"}`} onClick={() => router.push(prevUrl)} />
      <span className="mx-1 cursor-pointer hover:underline" onClick={() => router.push("/")}>/</span>
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
