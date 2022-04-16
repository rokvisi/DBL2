import Breadcrumbs from "@/components/breadcrumbs";

export default function Layout({ children }: any) {
  return (
    <div className="mx-40 my-20">
      <Breadcrumbs />
      <main>{children}</main>
    </div>
  )
}