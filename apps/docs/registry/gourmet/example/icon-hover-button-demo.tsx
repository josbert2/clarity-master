"use client"

import { PlusIcon } from "lucide-react"

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button"

export default function IconHoverButtonDemo() {
  return (
    <IconHoverButton>
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Button</IconHoverButtonText>
    </IconHoverButton>
  )
}
