import type React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 ml-0 860:ml-64">
        <Header />

        <main className="pt-16 px-4 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
