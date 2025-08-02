import type React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="mt-40"/>
        <main className="mt-40">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
