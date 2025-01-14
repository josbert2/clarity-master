#!/usr/bin/env bun
import fs from "fs";
import path from "path";

// Temas que quieres crear
const THEMES = ["default", "gourmet"];

// Mapea el tipo con el nombre de la exportación y el nombre de archivo
const REGISTRY_CONFIG = {
  ui: {
    exportName: "ui",
    fileName: "registry-ui.tsx", // Ajusta si tu archivo se llama diferente
    itemType: "registry:ui",
    folderName: "annui", // subcarpeta donde crear componentes UI
  },
  example: {
    exportName: "examples",
    fileName: "registry-example.tsx", // Ajusta si tu archivo se llama diferente
    itemType: "registry:example",
    folderName: "example", // subcarpeta donde crear componentes de ejemplos
  },
};

// 1) Determinar la ruta raíz de tu proyecto
const projectRoot = path.resolve(__dirname, "../..");

//
// 2) Parsear argumentos
//
const [, , ...args] = process.argv;
const componentArg = args.find((arg) => arg.startsWith("--component="));
const typeArg = args.find((arg) => arg.startsWith("--type="));

// Extraemos valores
const componentName = componentArg?.replace("--component=", "");
const typeValue = typeArg?.replace("--type=", "") as keyof typeof REGISTRY_CONFIG;

// 3) Validaciones de argumentos
if (!componentName || !typeValue) {
  console.error("Uso: bun index.ts --component=MiComponente --type=ui|example");
  process.exit(1);
}

// Verificamos que el tipo sea válido
if (!(typeValue in REGISTRY_CONFIG)) {
  console.error(`El tipo '${typeValue}' no es válido. Debe ser 'ui' o 'example'.`);
  process.exit(1);
}

//
// 4) Determinar ruta del archivo de registro según el tipo
//
const registryInfo = REGISTRY_CONFIG[typeValue];
const registryFilePath = path.resolve(
  projectRoot,
  "apps/docs/registry",
  registryInfo.fileName
);

// 5) Crear la carpeta si no existe
fs.mkdirSync(path.dirname(registryFilePath), { recursive: true });

// Variables para acumular el contenido existente
let fileContent = "";
let registryArray: any[] = [];
let importStatement = `import { Registry } from "@/registry/schema";`;

// 6) Leer el archivo actual si existe
if (fs.existsSync(registryFilePath)) {
  fileContent = fs.readFileSync(registryFilePath, "utf-8");

  // Extraer todas las importaciones (para usarlas más adelante si quieres)
  const importMatches = fileContent.match(/import\s+[^;]+;/g);
  if (importMatches && importMatches.length > 0) {
    importStatement = importMatches.join("\n");
  }

  // Extraer el array exportado, p. ej.
  // export const ui: Registry = [ ... ];
  const exportRegex = new RegExp(
    `export\\s+const\\s+${registryInfo.exportName}:\\s*Registry\\s*=\\s*(\\[[\\s\\S]*?\\])`
  );
  const exportMatch = fileContent.match(exportRegex);

  if (exportMatch && exportMatch[1]) {
    let arrayString = exportMatch[1];

    try {
      // Sanitiza
      let sanitizedArrayString = arrayString
        .replace(/,\s*([\]}])/g, "$1") // quita comas sobrantes
        .replace(/'/g, '"') // comillas simples -> dobles
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":'); // keys sin comillas -> comillas

      // Parsear
      registryArray = JSON.parse(sanitizedArrayString);
    } catch (err) {
      console.warn(
        "No se pudo parsear el contenido existente, iniciando con un array vacío."
      );
      registryArray = [];
    }
  } else {
    console.warn(
      `No se encontró un 'export const ${registryInfo.exportName}: Registry = [...]' válido en ${registryInfo.fileName}`
    );
  }
}

// 7) Revisar si ya existe un item con ese nombre
if (registryArray.some((item) => item.name === componentName)) {
  console.error(`El item '${componentName}' ya existe en el ${registryInfo.fileName}.`);
  process.exit(1);
}

// 8) Construir el nuevo item
const newItem: Record<string, any> = {
  name: componentName,
  type: registryInfo.itemType,
  files: [
    {
      path: `${registryInfo.folderName}/${componentName}.tsx`,
      type: registryInfo.itemType,
    },
  ],
};

// Si es example, puede que quieras un campo "registryDependencies"
if (typeValue === "example") {
  newItem.registryDependencies = [];
}

// 9) Agregarlo al arreglo
registryArray.push(newItem);

//
// 10) Convertir a JSON y reemplazar SOLO la parte de [ ... ] dentro del export const ui = ...
//
const newArrayString = JSON.stringify(registryArray, null, 2);

/**
 * Regex de reemplazo:
 * - Capturamos "export const ui: Registry ="
 * - Capturamos el contenido "[ ... ]"
 * - Capturamos un ";" opcional al final
 *
 * Usamos un replace que reemplace SOLO el segundo grupo con newArrayString.
 *
 * Así no perdemos nada del archivo (importaciones, etc.), 
 * y mantenemos intacto lo que esté antes/después.
 */
const arrayReplaceRegex = new RegExp(
  `(export\\s+const\\s+${registryInfo.exportName}:\\s*Registry\\s*=\\s*)(\\[[\\s\\S]*?\\])(;?)`
);

if (arrayReplaceRegex.test(fileContent)) {
  fileContent = fileContent.replace(
    arrayReplaceRegex,
    `$1${newArrayString}$3`
  );
} else {
  // Si no se halló la sección para reemplazar, quizás no existía. 
  // De ser el caso, podrías:
  // - Insertar al final, 
  // - O lanzar error,
  // según tu preferencia.
  console.warn(`No se pudo reemplazar el array. Se agregará uno al final del archivo.`);
  fileContent += `

${importStatement}

export const ${registryInfo.exportName}: Registry = ${newArrayString};
`;
}

// 11) Guardar el archivo con el contenido modificado
fs.writeFileSync(registryFilePath, fileContent, "utf-8");

// 12) Crear el/los archivos de componente en las rutas indicadas para cada tema
THEMES.forEach((theme) => {
  const themeDir = path.resolve(
    projectRoot,
    "apps/docs/registry",
    theme,
    registryInfo.folderName
  );
  fs.mkdirSync(themeDir, { recursive: true });

  const componentPath = path.resolve(themeDir, `${componentName}.tsx`);

  if (!fs.existsSync(componentPath)) {
    fs.writeFileSync(
      componentPath,
      `import React from "react";

export default function ${componentName}() {
  return (
    <div>
      {/* ${componentName} Component */}
      Hello, ${componentName}!
    </div>
  );
}
`,
      "utf-8"
    );
    console.log(`✓ Componente creado en: ${componentPath}`);
  } else {
    console.warn(`El archivo ya existe y no se sobreescribió: ${componentPath}`);
  }
});

console.log(`✓ Se añadió '${componentName}' al archivo ${registryInfo.fileName} correctamente.`);
