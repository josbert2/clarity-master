import {
  BecomeSponsor,
  DashedCircle,
  DashedLineContainer,
  Feature,
  GetStarted,
  Github,
  HorizontalDashedLine,
  VerticalDashedLine,
} from "./page.client"



export default function HomePage() {
 
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center py-32">
        <DashedLineContainer>
          <VerticalDashedLine
            className="md:-left-10"
            width="calc(100% + 80px)"
            mobileWidth="100%"
          />
          <h1 className="relative text-5xl sm:text-7xl font-bold py-5">
            AnnUI
          </h1>
          <VerticalDashedLine />

          <div className="py-10 flex flex-col items-center px-4">
            <p className="max-w-2xl text-xl text-muted-foreground">
              <span className="text-primary font-medium">AnnUI</span> is a
              collection of{" "}
              <span className="text-primary font-medium">
                reusable components
              </span>{" "}
              that you can{" "}
              <span className="text-primary font-medium">copy and paste</span>{" "}
              into your web apps.
            </p>
          </div>
          <VerticalDashedLine />

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4 relative py-10 px-8">
              <div className="flex flex-wrap justify-center gap-4">
                <GetStarted />
                <Github />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-green-500">✓</span>
                  Open Source
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-green-500">✓</span>
                  MIT License
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="text-green-500">✓</span>
                  Customizable
                </div>
              </div>

              <HorizontalDashedLine
                className="hidden md:block"
                height="calc(100% + 56px)"
                side="left"
              />
              <HorizontalDashedLine
                className="hidden md:block"
                height="calc(100% + 56px)"
                side="right"
              />
            </div>
          </div>

          <VerticalDashedLine />

          <HorizontalDashedLine
            className="-top-14"
            height="calc(100% + 112px)"
            side="left"
          />
          <HorizontalDashedLine
            className="-top-14"
            height="calc(100% + 112px)"
            side="right"
          />
          <DashedCircle className="-top-12 -left-12" />
        </DashedLineContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-r border-dashed border-primary/20 mt-20">
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>

      <div className="border-t border-dashed border-primary/20">
        <BecomeSponsor />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Highly Customizable",
    description:
      "Inherits shadcn/ui's design philosophy with Radix UI's powerful declarative components",
  },
  {
    title: "Great Developer Experience",
    description:
      "Declarative API design, reduced boilerplate code, improved development efficiency",
  },
  {
    title: "Accessibility First",
    description:
      "Built on Radix UI's accessibility support with beautiful animations",
  },
  {
    title: "Theme System",
    description:
      "Built-in light/dark modes with support for custom theme colors and styles",
  },
  {
    title: "TypeScript First",
    description:
      "Complete TypeScript type support with intelligent code suggestions",
  },
  {
    title: "Responsive Design",
    description:
      "Optimized for different devices ensuring great cross-platform experience",
  },
]
