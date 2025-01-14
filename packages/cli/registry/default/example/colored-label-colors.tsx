import { ColoredLabel } from "@/registry/default/annui/colored-label"

export default function ColoredLabelColors() {
  return (
    <div className="flex flex-wrap gap-2">
      <ColoredLabel color="#F9A294">Hello</ColoredLabel>
      <ColoredLabel color="#99BC85">Hello</ColoredLabel>
      <ColoredLabel color="#A294F9">Hello</ColoredLabel>
    </div>
  )
}
