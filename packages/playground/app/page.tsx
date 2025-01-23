"use client";

import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultHTML = `
<div class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
  <div class="col-start-3 row-start-3 flex max-w-lg flex-col bg-gray-100 p-2 dark:bg-white/10">
    <div class="rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
      <img src="/img/logo.svg" class="mb-11.5 h-6 dark:hidden" alt="Tailwind Play" />
      <img src="/img/logo-dark.svg" class="mb-11.5 h-6 not-dark:hidden" alt="Tailwind Play" />
      <div class="space-y-6">
        <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Customizing your theme with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@theme</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Adding custom utilities with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@utility</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
              Adding custom variants with
              <code class="font-mono font-medium text-gray-950 dark:text-white">@variant</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="size-5.5 shrink-0" fill="none" stroke-linecap="square">
              <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
              <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
              <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">Code completion with instant preview</p>
          </li>
        </ul>
        <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
      </div>
      <hr class="my-6 w-full border-(--pattern-fg)" />
      <p class="mb-3">Want to dig deeper into Tailwind?</p>
      <p class="font-semibold">
        <a href="https://tailwindcss.com/docs" class="text-gray-950 underline decoration-sky-400 underline-offset-3 hover:decoration-2 dark:text-white">Read the docs &rarr;</a>
      </p>
    </div>
  </div>
  <div class="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
  <div class="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
</div>`;

const defaultCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .custom-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors;
  }
}`;

const defaultConfig = JSON.stringify({
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
      },
    },
  },
  plugins: [],
}, null, 2);

export default function Home() {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [config, setConfig] = useState(defaultConfig);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      // Validar que la configuración sea JSON válido
      JSON.parse(config);
      // Forzar la actualización del iframe
      setIframeKey(prev => prev + 1);
    } catch (error) {
      console.error('Error en la configuración de Tailwind: Asegúrate de que sea JSON válido');
    }
  }, [config]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [css]);

  const handleDownload = () => {
    const fullCode = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${css}</style>
  <script>
    tailwind.config = ${config}
  </script>
</head>
<body>
  ${html}
</body>
</html>`;

    const blob = new Blob([fullCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailwind-playground.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      const data = {
        html,
        css,
        config
      };
      await navigator.clipboard.writeText(
        window.location.href + "?data=" + encodeURIComponent(JSON.stringify(data))
      );
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <h1 className="text-xl font-bold">Tailwind CSS Playground</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-4rem)]">
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="h-[calc(100vh-8rem)]">
              <Editor
                height="100%"
                defaultLanguage="html"
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={html}
                onChange={(value) => value && setHtml(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </TabsContent>
            <TabsContent value="css" className="h-[calc(100vh-8rem)]">
              <Editor
                height="100%"
                defaultLanguage="css"
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={css}
                onChange={(value) => value && setCss(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </TabsContent>
            <TabsContent value="config" className="h-[calc(100vh-8rem)]">
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={config}
                onChange={(value) => value && setConfig(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="rounded-lg border bg-card overflow-auto">
          <iframe
            key={iframeKey}
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <script src="https://cdn.tailwindcss.com"></script>
                  <script>
                    try {
                      tailwind.config = ${config};
                    } catch (e) {
                      console.error('Error al aplicar la configuración:', e);
                    }
                  </script>
                  <style>${css}</style>
                </head>
                <body>
                  ${html}
                </body>
              </html>
            `}
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}