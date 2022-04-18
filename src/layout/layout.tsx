import Header from "@/components/header";

export default function Layout({ children }: any) {
  return (
    <div className="mx-20 my-10">
      <Header/>
      <main>{children}</main>
    </div>
  )
}