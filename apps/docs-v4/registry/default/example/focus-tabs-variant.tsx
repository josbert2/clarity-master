"use client"

import { LockIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsTriggerIcon,
  TabsTriggerText,
} from "@/registry/default/annui/focus-tabs"

export default function FocusTabsVariant() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <VariantTrigger value="account">
          <TabsTriggerIcon>
            <UserIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Account</TabsTriggerText>
        </VariantTrigger>
        <VariantTrigger value="password">
          <TabsTriggerIcon>
            <LockIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Password</TabsTriggerText>
        </VariantTrigger>
        <VariantTrigger value="settings">
          <TabsTriggerIcon>
            <SettingsIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Settings</TabsTriggerText>
        </VariantTrigger>
      </TabsList>
      <VariantContent value="account">
        This is the account content.
      </VariantContent>
      <VariantContent value="password">
        This is the password content.
      </VariantContent>
      <VariantContent value="settings">
        This is the settings content.
      </VariantContent>
    </Tabs>
  )
}

const VariantTrigger = ({
  value,
  children,
}: {
  value: string
  children?: React.ReactNode
}) => {
  return (
    <TabsTrigger
      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      value={value}
    >
      {children}
    </TabsTrigger>
  )
}

const VariantContent = ({
  value,
  children,
}: {
  value: string
  children?: React.ReactNode
}) => {
  return (
    <TabsContent
      className="bg-secondary text-secondary-foreground p-4 rounded-md h-32 w-72"
      value={value}
    >
      {children}
    </TabsContent>
  )
}
