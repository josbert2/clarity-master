"use client"

import {
  ArrowRight,
  CommandIcon,
  EllipsisIcon,
  MessageSquareIcon,
  PlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ColoredLabel } from "../annui/colored-label"
import {
  DetailPanel,
  DetailPanelHeader,
  DetailPanelHeaderAction,
  DetailPanelHeaderActions,
  DetailPanelHeaderTitle,
  DetailPanelProperties,
  DetailPanelProperty,
  DetailPanelPropertyLabel,
  DetailPanelPropertyValue,
  DetailPanelSection,
  DetailPanelSectionContent,
  DetailPanelSectionDescription,
  DetailPanelSectionTitle,
} from "../annui/detail-panel"

export default function DetailPanelDemo() {
  return (
    <DetailPanel className="bg-accent rounded-lg w-[320px]">
      <DetailPanelHeader>
        <DetailPanelHeaderTitle>Detail Panel</DetailPanelHeaderTitle>
        <DetailPanelHeaderActions>
          <DetailPanelHeaderAction>
            Open in full view <LinkIcon />
          </DetailPanelHeaderAction>
        </DetailPanelHeaderActions>
      </DetailPanelHeader>

      <DetailPanelProperties>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>ID</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue asChild>
            <a href="#" className="text-blue-500">
              #290
            </a>
          </DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Status</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue className="text-yellow-500">
            In Progress
          </DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Estimate</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue>16 points</DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Duration</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue>3 days</DetailPanelPropertyValue>
        </DetailPanelProperty>
      </DetailPanelProperties>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Labels</DetailPanelSectionTitle>
        <DetailPanelSectionContent className="flex gap-1.5">
          <ColoredLabel color="#A294F9">Code</ColoredLabel>
          <ColoredLabel color="#99BC85">Frontend</ColoredLabel>
          <button className="text-xs text-muted-foreground border border-primary/30 border-dashed rounded-md size-5 flex items-center justify-center">
            <PlusIcon className="size-3" />
          </button>
        </DetailPanelSectionContent>
      </DetailPanelSection>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Assignees</DetailPanelSectionTitle>
        <DetailPanelSectionDescription>
          Developers assigned from here will override developers assigned to
          subtasks.
        </DetailPanelSectionDescription>
        <DetailPanelSectionContent className="flex flex-col gap-2 mt-2">
          <Assignee name="LioRael" avatar="https://github.com/liorael.png" />
          <Assignee name="Shadcn" avatar="https://github.com/shadcn.png" />
          <Assignee
            name="Fuma Nama"
            avatar="https://github.com/fuma-nama.png"
          />
          <button className="h-5 w-fit text-sm gap-1.5 flex items-center justify-center">
            <div className="w-5 flex items-center justify-center text-muted-foreground">
              <PlusIcon className="size-[14px]" />
            </div>
            <span className="font-medium">Add assignee</span>
            <div className="flex items-center justify-center text-muted-foreground">
              <CommandIcon className="size-[14px]" />A
            </div>
          </button>
        </DetailPanelSectionContent>
      </DetailPanelSection>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Subtasks</DetailPanelSectionTitle>
        <DetailPanelSectionContent>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </DetailPanelSectionContent>
      </DetailPanelSection>
    </DetailPanel>
  )
}

function LinkIcon() {
  return (
    <span className="flex items-center justify-center bg-primary/20 rounded-full p-[1px] group-hover:bg-primary/30 transition-colors duration-200">
      <ArrowRight className="-rotate-45" />
    </span>
  )
}

function Assignee({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="size-5">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{name}</span>
      <div className="flex items-center gap-0.5 ml-auto">
        <button className="text-xs text-muted-foreground size-5 flex items-center justify-center">
          <MessageSquareIcon className="size-3" />
        </button>
        <button className="text-xs text-muted-foreground size-5 flex items-center justify-center">
          <EllipsisIcon className="size-3" />
        </button>
      </div>
    </div>
  )
}
