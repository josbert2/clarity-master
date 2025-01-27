"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/default/annui/vercel-tabs"

export default function VercelTabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger className="hidden md:block" value="notifications">
          Notifications
        </TabsTrigger>
        <TabsTrigger className="hidden md:block" value="integrations">
          Integrations
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
