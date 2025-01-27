import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <button className="btn btn-test">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-info">Info</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-error">Error</button>
        
        <div className="sticky top-[var(--fd-banner-height)] flex flex-row items-center rounded-t-[28px] border-b border-fd-foreground/10
         px-4 transition-colors bg-fd-background/80 backdrop-blur-lg h-14 md:gap-1.5 z-[2]">
          Hola
        </div>

        <button className="badge badge-xl badge-error ">
          hola
        </button>
        <div class="flex justify-between items-center gap-2 border-t border-dashed border-t-base-content/5 py-2">Amanda Anderson <span class="badge badge-xs badge-success">Completed</span></div>
      </main>
    </div>
  );
}
