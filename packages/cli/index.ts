#!/usr/bin/env bun
import fs from "fs";
import path from "path";

// 1) Determinar la ruta raíz (sube 2 niveles desde packages/cli)
const projectRoot = path.resolve(__dirname, "../..");

// 2) Ubicar el archivo registry-ui.ts dentro de apps/docs/registry
const registryFilePath = path.resolve(projectRoot, "apps/docs/registry/registry-ui.ts");

// 3) Leer el argumento --name=TuComponente
const [, , nameArg] = process.argv;
const name = nameArg?.replace(/^--name=/, "");

// 4) Validar que venga el nombre
if (!name) {
  console.error("Uso: bun index.ts --name=MiComponente");
  process.exit(1);
}

// Info para debug
console.log("Registry File Path:", registryFilePath);
console.log("Project Root:", projectRoot);

try {
  // Asegurarnos de que exista la carpeta que contiene registry-ui.ts
  fs.mkdirSync(path.dirname(registryFilePath), { recursive: true });

  let fileContent = "";
  let uiArray: any[] = [];

  // Valor por defecto de la importación
  let importStatement = `import { Registry } from "@/registry/schema";`;

  // 5) Verificar si ya existe un registry-ui.ts
  if (fs.existsSync(registryFilePath)) {
    fileContent = fs.readFileSync(registryFilePath, "utf-8");

    // Extraer la importación si existe, para no sobrescribirla
    const importMatch = fileContent.match(/import\s+{[^}]+}\s+from\s+['"].+['"]/);
    if (importMatch) {
      importStatement = importMatch[0];
    }

    // 6) Usar regex para encontrar la parte export const ui: Registry = [ ... ];
    const uiExportMatch = fileContent.match(/export\s+const\s+ui:\s*Registry\s*=\s*(\[[\s\S]*?\]);/);

    if (uiExportMatch && uiExportMatch[1]) {
      let arrayString = uiExportMatch[1];

      try {
        console.log("===== MATCHED ARRAY STRING =====");
        console.log(arrayString);
        console.log("================================");

        // 7) Sanitizar: quitar trailing commas, cambiar comillas simples a dobles, etc.
        let sanitizedArrayString = arrayString
          // Elimina comas sobrantes antes de } o ]:  ,]
          .replace(/,\s*([\]}])/g, "$1")
          // Cambia comillas simples a dobles
          .replace(/'/g, '"')
          // Agrega comillas a las keys sin comillas (si tuvieras name: '...')
          .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');

        console.log("===== SANITIZED ARRAY STRING =====");
        console.log(sanitizedArrayString);
        console.log("==================================");

        // 8) Parsear a JSON
        uiArray = JSON.parse(sanitizedArrayString);
        console.log("uiArray after parse =>", uiArray);
      } catch (parseError) {
        console.warn("Could not parse existing registry, starting with empty array");
        uiArray = [];
      }
    }
  }

  // 9) Checar si ya existe un item con ese nombre
  if (uiArray.some((item) => item.name === name)) {
    console.error(`El item '${name}' ya existe en la registry.`);
    process.exit(1);
  }

  // 10) Crear nuevo item
  const newItem = {
    name,
    type: "registry:ui",
    dependencies: [],
    files: [
      {
        path: `apps/docs/registry/${name}.tsx`,
        type: "registry:ui",
      },
    ],
  };

  // 11) Insertarlo al array
  uiArray.push(newItem);

  // 12) Reconstruir el contenido de registry-ui.ts
  const updatedContent = `${importStatement}

export const ui: Registry = ${JSON.stringify(uiArray, null, 2)};
`;

  // 13) Escribir el archivo de nuevo
  fs.writeFileSync(registryFilePath, updatedContent, "utf-8");

  // 14) Crear el archivo de componente en apps/docs/registry/NombreComponente.tsx
  const componentDir = path.resolve(projectRoot, "apps/docs/registry/default/annui");
  fs.mkdirSync(componentDir, { recursive: true });

  const componentPath = path.resolve(componentDir, `${name}.tsx`);

  if (!fs.existsSync(componentPath)) {
    fs.writeFileSync(
      componentPath,
      `
import React from 'react';

export default function ${name}() {
  return (
    <div>
      {/* ${name} Component */}
      Hello, ${name}!
    </div>
  );
}
`.trim(),
      "utf-8"
    );
  }

  console.log(`✓ Se añadió '${name}' al archivo registry-ui.ts correctamente.`);
  console.log(`✓ Componente creado en: ${componentPath}`);
} catch (error) {
  console.error("Error actualizando la registry:", error instanceof Error ? error.message : error);
  console.error("Full error:", error);
  process.exit(1);
}
