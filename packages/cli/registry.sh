#!/bin/bash

# 1) Determinar la ruta raíz (sube 3 niveles desde packages/cli)
projectRoot=$(dirname $(dirname $(dirname $(realpath $0))))

# 2) Ubicar el archivo registry.ts dentro de apps/docs/registry
registryFilePath="$projectRoot/apps/docs/registry/registry.ts"

# 3) Leer el argumento --name=TuComponente
for arg in "$@"; do
  case $arg in
    --name=*)
      name="${arg#*=}"
      ;;
  esac
done

# 4) Validar que venga el nombre
if [ -z "$name" ]; then
  echo "Uso: $0 --name=MiComponente"
  exit 1
fi

# Info para debug
echo "Registry File Path: $registryFilePath"
echo "Project Root: $projectRoot"

# Asegurarnos de que exista la carpeta que contiene registry.ts
mkdir -p $(dirname "$registryFilePath")

# Inicializar variables
importStatement="import { Registry } from \"@/registry/schema\";"
uiArray="[]"

if [ -f "$registryFilePath" ]; then
  # Leer el contenido del archivo actual
  fileContent=$(cat "$registryFilePath")

  # Extraer el array existente de `ui`
  uiArray=$(echo "$fileContent" | grep -Poz "(?<=export const ui: Registry = )\[.*\];" | tr -d '\0' | sed 's/;$//')

  # Si no se puede parsear, iniciar con un array vacío
  if ! echo "$uiArray" | jq . &>/dev/null; then
    echo "Advertencia: No se encontró un array válido en el archivo. Iniciando con un array vacío."
    uiArray="[]"
  fi
fi

# Verificar si ya existe un elemento con ese nombre
if echo "$uiArray" | jq -e ".[] | select(.name == \"$name\")" &>/dev/null; then
  echo "El item '$name' ya existe en el registry."
  exit 1
fi

# Crear nuevo item
newItem=$(cat <<EOF
{
  "name": "$name",
  "type": "registry:ui",
  "dependencies": [],
  "files": [
    {
      "path": "annui/$name.tsx",
      "type": "registry:ui"
    }
  ]
}
EOF
)

# Insertar el nuevo item al array
uiArray=$(echo "$uiArray" | jq ". + [$newItem]")

# Reconstruir el contenido de registry.ts
updatedContent=$(cat <<EOF
$importStatement

export const ui: Registry = $(echo "$uiArray" | jq .);
EOF
)

# Escribir el contenido actualizado al archivo registry.ts
echo "$updatedContent" > "$registryFilePath"
echo "✓ Se añadió '$name' al archivo registry.ts correctamente."

# Crear el archivo de componente
componentDir="$projectRoot/apps/docs/registry/default/annui"
mkdir -p "$componentDir"
componentPath="$componentDir/$name.tsx"

if [ ! -f "$componentPath" ]; then
  cat <<EOF > "$componentPath"
import React from 'react';

export default function $name() {
  return (
    <div>
      {/* $name Component */}
      Hello, $name!
    </div>
  );
}
EOF
  echo "✓ Componente creado en: $componentPath"
else
  echo "El componente ya existe: $componentPath"
fi
