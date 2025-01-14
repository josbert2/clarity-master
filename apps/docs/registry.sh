#!/usr/bin/env bash

# registry.sh
# Ejemplo de uso:
#   ./registry.sh --component=Test --type=ui --theme=default
#   ./registry.sh --component=Card --type=example --theme=gourmet

# --- 1) Parsear argumentos ---
for arg in "$@"; do
  case $arg in
    --component=*)
      COMPONENT_NAME="${arg#*=}"
      shift
      ;;
    --type=*)
      COMPONENT_TYPE="${arg#*=}"
      shift
      ;;
    --theme=*)
      THEME="${arg#*=}"
      shift
      ;;
    *)
      shift
      ;;
  esac
done

# --- 2) Validar argumentos ---
if [ -z "$COMPONENT_NAME" ]; then
  echo "Error: Debes especificar un nombre de componente con --component=Nombre"
  exit 1
fi

# Si no se pasa --type, por defecto será "ui"
if [ -z "$COMPONENT_TYPE" ]; then
  COMPONENT_TYPE="ui"
fi

# Validar que type sea 'ui' o 'example'
if [ "$COMPONENT_TYPE" != "ui" ] && [ "$COMPONENT_TYPE" != "example" ]; then
  echo "Error: --type debe ser 'ui' o 'example'"
  exit 1
fi

# Si no se pasa --theme, por defecto será "default"
if [ -z "$THEME" ]; then
  THEME="default"
fi

# Validar que theme sea 'default' o 'gourmet'
if [ "$THEME" != "default" ] && [ "$THEME" != "gourmet" ]; then
  echo "Error: --theme debe ser 'default' o 'gourmet'"
  exit 1
fi

# --- 3) Definir archivo de registro y nombre de array según el tipo ---
if [ "$COMPONENT_TYPE" == "ui" ]; then
  REGISTRY_FILE="registry-ui.tsx"  # Ajusta si tu archivo se llama distinto
  ARRAY_NAME="ui"                  # Ajusta si el array no se llama 'ui'
else
  # type=example
  REGISTRY_FILE="registry-examples.ts"  # Ajusta si tu archivo se llama distinto
  ARRAY_NAME="examples"                 # Ajusta si el array no se llama 'examples'
fi

# --- 4) Definir la ruta base según el theme ---
PATH_PREFIX="registry/${THEME}"

# --- 5) Definir la carpeta final según el tipo ---
if [ "$COMPONENT_TYPE" == "ui" ]; then
  PATH_SUFFIX="annui"
else
  PATH_SUFFIX="example"
fi

# --- 6) Construir ruta final donde estará el archivo TSX ---
FILE_PATH="${PATH_PREFIX}/${PATH_SUFFIX}/${COMPONENT_NAME}.tsx"
echo "FILE_PATH: ${FILE_PATH}"

# --- 7) Crear la carpeta y el archivo (si no existe) ---
mkdir -p "$(dirname "$FILE_PATH")"
if [ ! -f "$FILE_PATH" ]; then
  # OPCIONAL: contenido base
  echo "export default function ${COMPONENT_NAME}() {
  return (
    <div>
      <h1>${COMPONENT_NAME} component</h1>
    </div>
  )
}
" > "$FILE_PATH"
else
  echo "El archivo '${FILE_PATH}' ya existe. Se conservará el contenido actual."
fi

# --- 8) Verificar si ya existe el componente en el registro para evitar duplicados ---
if grep -q "name: \"${COMPONENT_NAME}\"" "$REGISTRY_FILE"; then
  echo "⚠️  El componente '${COMPONENT_NAME}' ya existe en ${REGISTRY_FILE}."
  echo "    No se insertará un duplicado."
  exit 1
fi

# --- 9) Insertar el objeto en el archivo de registro (via sed) ---
sed -i "/^export const ${ARRAY_NAME}: Registry = \[/a \  {\n    name: \"${COMPONENT_NAME}\",\n    type: \"registry:${COMPONENT_TYPE}\",\n    dependencies: [],\n    files: [\n      {\n        path: \"${FILE_PATH}\",\n        type: \"registry:${COMPONENT_TYPE}\",\n      },\n    ],\n  }," ./$REGISTRY_FILE

# --- 10) Mensaje de confirmación ---
echo "-----------------------------------------------"
echo "✅ Se ha añadido el componente '${COMPONENT_NAME}'"
echo "   - Type: ${COMPONENT_TYPE}"
echo "   - Theme: ${THEME}"
echo "   - Registro modificado: ${REGISTRY_FILE}"
echo "   - Ruta generada: ${FILE_PATH}"
echo "-----------------------------------------------"

# --- 11) Registrar en el historial (registry-history.json) ---
HISTORY_FILE="registry-history.json"

# 1) Verificar si existe el archivo JSON; si no, crearlo con array vacío
if [ ! -f "$HISTORY_FILE" ]; then
  echo "[]" > "$HISTORY_FILE"
fi

# 2) Usar jq para agregar un nuevo objeto al array existente
#    - 'now' en jq genera un timestamp UNIX, si quieres un string con fecha legible, puedes usar algo como:
#      date +"%Y-%m-%d %H:%M:%S"
#
#   Comando jq explicado:
#     - . es el array actual
#     - + [{ ... }] añade un nuevo objeto al final
#     - --arg var "" para inyectar variables shell en el contexto de jq
#     - .timestamp = (now | todate) => convierte el UNIX timestamp en un string con formato ISO 8601
#        (disponible desde jq 1.6). Si tu jq es más viejo, puedes usar date en bash y pasarla como variable.

jq --arg component "$COMPONENT_NAME" \
   --arg ctype "$COMPONENT_TYPE" \
   --arg ctheme "$THEME" \
   '. + [{ component: $component, type: $ctype, theme: $ctheme, timestamp: (now | todate) }]' \
   "$HISTORY_FILE" > temp_history.json && mv temp_history.json "$HISTORY_FILE"

echo "Registro agregado a $HISTORY_FILE:"
echo "  - Component: $COMPONENT_NAME"
echo "  - Type: $COMPONENT_TYPE"
echo "  - Theme: $THEME"
