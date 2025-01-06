"use client"

import { PlusIcon } from "lucide-react"

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button"

export default function IconHoverButtonLink() {
  return (
    <IconHoverButton variant="link">
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Link</IconHoverButtonText>
    </IconHoverButton>
  )
}
