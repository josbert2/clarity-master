import { ColoredLabel } from "@/registry/default/annui/colored-label"

export default function ColoredLabelDark() {
  return (
    <div className="flex flex-wrap gap-2">
      <ColoredLabel
        color="#F9A294"
        darkColor="#A294F9"
        darkBgOpacity={0.3}
        darkTextOpacity={0.8}
      >
        Hello
      </ColoredLabel>
      <ColoredLabel color="#99BC85" darkBgOpacity={0.3} darkTextOpacity={0.8}>
        Hello
      </ColoredLabel>
    </div>
  )
}
