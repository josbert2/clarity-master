import type { ReactNode } from "react"
import { Book, Pen } from "lucide-react"

import { source } from "@/lib/source"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsLayout } from "@/components/notebook"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DocsLayout
        sidebar={{
          tabs: [
            {
              icon: <TabIcon icon={<Book />} />,
              title: "AnnUI",
              description: "Learn how to use AnnUI",
              url: "/docs",
            },
            {
              icon: <TabIcon icon={<Pen />} />,
              title: "Utilities",
              description: "Some utilities for developers",
              url: "https://utilities.annui.org",
            },
          ],
        }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>
    </SidebarProvider>
  )
}

const TabIcon = ({ icon }: { icon: ReactNode }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-fd-muted-foreground/20 to-fd-muted-foreground/40 text-fd-foreground [&>svg]:size-5">
      {icon}
    </div>
  )
}
