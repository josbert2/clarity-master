#!/usr/bin/env bash


# Códigos de color ANSI
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"
RESET="\033[0m"  # Quita los atributos (vuelve a "normal")


function success_msg() {
  echo -e "${GREEN}✅ $1${RESET}"
}

# Función para mostrar un mensaje de error
function error_msg() {
  echo -e "${RED}❌ $1${RESET}"
}

# Función para mostrar una advertencia
function warn_msg() {
  echo -e "${YELLOW}⚠️  $1${RESET}"
}

# registry.sh
# Ejemplo de uso:
#   ./registry.sh --component=Test
#     -> Creará/insertará para (type=ui, theme=default), (type=ui, theme=gourmet),
#        (type=example, theme=default), (type=example, theme=gourmet)
#
#   ./registry.sh --component=Card --type=example
#     -> Creará/insertará para (type=example, theme=default) y (type=example, theme=gourmet)
#
#   ./registry.sh --component=Button --theme=default
#     -> Creará/insertará para (type=ui, theme=default) y (type=example, theme=default)
#
#   ./registry.sh --component=Avatar --type=ui --theme=gourmet
#     -> Creará/insertará SOLO (type=ui, theme=gourmet)

########################################
# 1) Función para convertir a PascalCase
########################################
to_pascal_case() {
  local str="$1"
  # Reemplaza '-' con espacio
  str="${str//-/ }"
  local pascal=""
  # Capitaliza cada palabra y concatena
  for w in $str; do
    pascal="${pascal}${w^}"
  done
  echo "$pascal"
}

########################################
# 2) Parsear argumentos
########################################
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

# Validar que tengamos componente
if [ -z "$COMPONENT_NAME" ]; then
  echo "Error: Debes especificar un nombre de componente con --component=Nombre"
  exit 1
fi

########################################
# 3) Arrays de valores válidos para type y theme
########################################
VALID_TYPES=("ui" "example")
VALID_THEMES=("default" "gourmet")

# Si no se pasa --type, usaremos TODOS los valid types
if [ -z "$COMPONENT_TYPE" ]; then
  USE_TYPES=("${VALID_TYPES[@]}")
else
  # Validar que el type pasado sea uno de los permitidos
  if [[ ! " ${VALID_TYPES[*]} " =~ " $COMPONENT_TYPE " ]]; then
    echo "Error: --type debe ser uno de: ${VALID_TYPES[*]}"
    exit 1
  fi
  USE_TYPES=("$COMPONENT_TYPE")
fi

# Si no se pasa --theme, usaremos TODOS los valid themes
if [ -z "$THEME" ]; then
  USE_THEMES=("${VALID_THEMES[@]}")
else
  # Validar que el theme pasado sea uno de los permitidos
  if [[ ! " ${VALID_THEMES[*]} " =~ " $THEME " ]]; then
    echo "Error: --theme debe ser uno de: ${VALID_THEMES[*]}"
    exit 1
  fi
  USE_THEMES=("$THEME")
fi

########################################
# 4) Definir archivo JSON de historial
########################################
HISTORY_FILE="registry-history.json"
if [ ! -f "$HISTORY_FILE" ]; then
  echo "[]" > "$HISTORY_FILE"
fi

# Generar el nombre en PascalCase (para la función dentro del .tsx)
pascalName=$(to_pascal_case "$COMPONENT_NAME")

########################################
# 5) Función para procesar UNA combinación (type, theme)
########################################
function process_combination() {
  local compName="$1"
  local t="$2"
  local th="$3"

  # 1) Definir archivo de registro y nombre del array
  local REGISTRY_FILE ARRAY_NAME
  if [ "$t" == "ui" ]; then
    REGISTRY_FILE="registry-ui.ts"
    ARRAY_NAME="ui"
  else
    # t == "example"
    REGISTRY_FILE="registry-examples.ts"
    ARRAY_NAME="examples"
  fi

  # 2) Definir ruta real y ruta que se coloca en el registro
  local PATH_PREFIX="registry/${th}"
  local PATH_SUFFIX
  if [ "$t" == "ui" ]; then
    PATH_SUFFIX="annui"
  else
    PATH_SUFFIX="example"
  fi

  # FILE_PATH se guardará en "files: []"
  local FILE_PATH="${PATH_SUFFIX}/${compName}.tsx"
  # FILE_PATH_REAL es la ruta física real en el proyecto
  local FILE_PATH_REAL="${PATH_PREFIX}/${FILE_PATH}"

  echo "===================================="
  echo "👉 Procesando: component=$compName, type=$t, theme=$th"
  echo "   - Registry file: $REGISTRY_FILE"
  echo "   - Ruta relativa (en 'files'): $FILE_PATH"
  echo "   - Ruta física real: $FILE_PATH_REAL"

  # 3) Crear carpeta y archivo (si no existe)
  mkdir -p "$(dirname "$FILE_PATH_REAL")"

  if [ -f "$FILE_PATH_REAL" ]; then
    echo "   [INFO] El archivo '${FILE_PATH_REAL}' ya existe. No se sobreescribe."
  else
    echo "   [INFO] Creando archivo '${FILE_PATH_REAL}'"
    cat <<EOF > "$FILE_PATH_REAL"
export default function ${pascalName}() {
  return (
    <div>
      <h1>${compName} component</h1>
    </div>
  )
}
EOF
  fi

  # 4) Verificar si el archivo de registro (p.ej. registry-ui.ts) existe
  #    si no, crearlo con la estructura base
  if [ ! -f "registry/$REGISTRY_FILE" ]; then
    echo "   [WARN] El archivo 'registry/$REGISTRY_FILE' no existe. Creando archivo base..."
    mkdir -p registry
    cat <<EOF > "registry/$REGISTRY_FILE"
import { Registry } from "@/registry/schema"

export const ${ARRAY_NAME}: Registry = []
EOF
  fi

  # 5) Verificar si ya existe en el registro => grep "name: \"${compName}\""
  if grep -q "name: \"${compName}\"" "registry/$REGISTRY_FILE"; then
    echo "   [WARN] El componente '${compName}' ya existe en 'registry/$REGISTRY_FILE'."
    echo "          No se insertará un duplicado."
    return
  fi

  # 6) Insertar en el registro si no está
  echo "   [INFO] Insertando en 'registry/$REGISTRY_FILE'..."
  sed -i "/^export const ${ARRAY_NAME}: Registry = \[/a \  {\n    name: \"${compName}\",\n    type: \"registry:${t}\",\n    dependencies: [],\n    files: [\n      {\n        path: \"${FILE_PATH}\",\n        type: \"registry:${t}\",\n      },\n    ],\n  }," "registry/$REGISTRY_FILE"

  # 7) Añadir al historial JSON con jq
  echo "   [INFO] Actualizando historial en $HISTORY_FILE..."
  local TIMESTAMP
  TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S%z")
  jq --arg component "$compName" \
     --arg ctype "$t" \
     --arg ctheme "$th" \
     --arg ctimestamp "$TIMESTAMP" \
     '. + [{ component: $component, type: $ctype, theme: $ctheme, timestamp: $ctimestamp }]' \
     "$HISTORY_FILE" > temp_history.json && mv temp_history.json "$HISTORY_FILE"

  echo "   [OK] Hecho!"
}

########################################
# 6) Bucle para procesar todas las combinaciones solicitadas
########################################
for t in "${USE_TYPES[@]}"; do
  for th in "${USE_THEMES[@]}"; do
    process_combination "$COMPONENT_NAME" "$t" "$th"
    echo
  done
done

echo "----------------------------------------"
echo "✅ Finalizado. Componente(s) procesado(s)."
echo "----------------------------------------"
