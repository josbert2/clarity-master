"use client"

import { ChevronRight, Home, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemDescription,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/annui/dropdown-menu-00"

export default function DropdownMenu00Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Home />
          </DropdownMenuItemIcon>
          <DropdownMenuItemTitle>Home</DropdownMenuItemTitle>
          <DropdownMenuItemDescription>Home page</DropdownMenuItemDescription>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Settings />
          </DropdownMenuItemIcon>
          <DropdownMenuItemTitle>Settings</DropdownMenuItemTitle>
          <DropdownMenuItemDescription>
            Settings page
          </DropdownMenuItemDescription>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <ChevronRight />
          </DropdownMenuItemIcon>
          <DropdownMenuItemTitle>More</DropdownMenuItemTitle>
          <DropdownMenuItemDescription>More page</DropdownMenuItemDescription>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <LogOut />
          </DropdownMenuItemIcon>
          <DropdownMenuItemTitle>Logout</DropdownMenuItemTitle>
          <DropdownMenuItemDescription>Logout page</DropdownMenuItemDescription>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
