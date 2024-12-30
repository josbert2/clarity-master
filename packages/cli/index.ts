import fs from "fs";
import path from "path";
import os from "os";

// Use an absolute path to the project root
const projectRoot = path.resolve(process.cwd());
const registryFilePath = path.resolve(projectRoot, "../registry-ui.ts");
console.log(registryFilePath)
const [, , nameArg] = process.argv;
const name = nameArg?.replace(/^--name=/, "");

// Validate command and name
if (!name) {
  console.error("Usage: bun generated-registry --name=ComponentName");
  process.exit(1);
}

console.log("Registry File Path:", registryFilePath);
console.log("Project Root:", projectRoot);

try {
  // Ensure ALL parent directories exist
  fs.mkdirSync(path.dirname(registryFilePath), { recursive: true });

  let fileContent = "";
  let uiArray: any[] = [];
  let importStatement = `import { Registry } from "@/registry/schema";`;

  // Check if file exists
  if (fs.existsSync(registryFilePath)) {
    fileContent = fs.readFileSync(registryFilePath, "utf-8");

    // 1) Extraer la importación existente (por si quieres conservarla)
    const importMatch = fileContent.match(/import\s+{[^}]+}\s+from\s+['"].+['"]/);
    if (importMatch) {
      importStatement = importMatch[0];
    }

    // 2) Extraer el contenido del array `ui` usando una expresión regular más amplia
    //    para capturar incluso saltos de línea y espacios.
    const uiExportMatch = fileContent.match(/export\s+const\s+ui:\s*Registry\s*=\s*(\[[\s\S]*?\]);/);
    if (uiExportMatch && uiExportMatch[1]) {
      // uiExportMatch[1] es el contenido entre corchetes, p.e. [{ "name": ... }]
      let arrayString = uiExportMatch[1];
      try {
        // Reemplaza claves sin comillas y comillas simples por comillas dobles dentro del array
        // para generar un JSON válido.  
        // Ojo: es un "hack" que funciona sólo si el array está en formato *muy* parecido a JSON.
        let sanitizedArrayString = arrayString
          .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // p.e. name: => "name":
          .replace(/'/g, '"'); // cambia comillas simples a dobles

        uiArray = JSON.parse(sanitizedArrayString);
      } catch (parseError) {
        console.warn("Could not parse existing registry, starting with empty array");
        uiArray = [];
      }
    }

    // 3) Verificar si el nombre ya existe
    if (uiArray.some(item => item.name === name)) {
      console.error(`Registry item '${name}' already exists.`);
      process.exit(1);
    }
  }

  // Preparar nuevo item
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

  // Añadir nuevo item
  uiArray.push(newItem);

  // Reconstruir el contenido del archivo con la importación y el nuevo array
  const updatedContent = `${importStatement}

export const ui: Registry = ${JSON.stringify(uiArray, null, 2)};
`;

  // Guardar el contenido
  fs.writeFileSync(registryFilePath, updatedContent, "utf-8");

  // Asegurar que exista la carpeta para el componente
  const componentDir = path.resolve(projectRoot, "apps/docs/registry");
  fs.mkdirSync(componentDir, { recursive: true });

  // Crear el archivo del componente
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

  console.log(`Successfully added '${name}' to the registry.`);
  console.log(`Created component file: ${componentPath}`);
  console.log("✅ Done!")
} catch (error) {
  console.error("Error updating the registry:", error instanceof Error ? error.message : error);
  console.error("Full error:", error);
  process.exit(1);
}
