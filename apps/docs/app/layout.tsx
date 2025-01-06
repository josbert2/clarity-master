import "./global.css"

import type { ReactNode } from "react"
import { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider"

import { fontMono, fontSans } from "@/lib/fonts"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/registry/default/lib/utils"

import FlyonuiScript from '@/components/FlyonuiScript';

export const metadata: Metadata = {
  title: {
    default: "AnnUI - Modern React Component Library",
    template: "%s | AnnUI",
  },
  description:
    "AnnUI is a collection of re-usable components that you can copy and paste into your web apps.",
  keywords: [
    "Next.js",
    "React",
    "Component Library",
    "UI Library",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "TypeScript",
    "Frontend Development",
    "Web Development",
    "UI Components",
    "Design System",
  ],
  authors: [
    {
      name: "liorael",
      url: "https://github.com/liorael",
    },
  ],
  creator: "liorael",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.annui.org",
    title: "AnnUI - Modern React Component Library",
    description:
      "AnnUI is a collection of reusable components that you can copy and paste into your web apps.",
    siteName: "AnnUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnnUI - Modern React Component Library",
    description:
      "AnnUI is a collection of reusable components that you can copy and paste into your web apps.",
    creator: "@liorael",
  },
  metadataBase: new URL("https://www.annui.org"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-svh font-sans antialiased">
      <button
        className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-blue-600"
      >
        Button
      </button> 
        <RootProvider>{children}</RootProvider>
        
        <Toaster />
      </body>
      <FlyonuiScript />
    </html>
  )
}
