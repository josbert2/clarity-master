# clarity-master

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.



# Configuración de un Monorepo con Bun y Turborepo

Esta guía detalla cómo configurar un monorepo utilizando **Bun** como gestor de dependencias y **Turborepo** como herramienta para manejar la construcción y el desarrollo eficiente de múltiples paquetes.

---

## **1. Instalar las herramientas**

Asegúrate de tener instalados los siguientes elementos:

1. **Node.js y Bun:**

   ```bash
   npm install -g bun
   ```

2. **Turborepo:**
   Instálalo globalmente o como una dependencia en tu proyecto:

   ```bash
   npm install turbo -g
   ```

---

## **2. Configura el Monorepo**

1. **Crea un nuevo proyecto:**

   ```bash
   mkdir bun-turborepo
   cd bun-turborepo
   bun init
   ```

2. **Configura ****`workspaces`**** en el archivo ****`package.json`****:**

   ```json
   {
     "name": "bun-turborepo",
     "version": "1.0.0",
     "private": true,
     "workspaces": ["apps/*", "packages/*"]
   }
   ```

3. **Instala Turborepo:**
   Agrega Turborepo como dependencia de desarrollo:

   ```bash
   bun add -d turbo
   ```

---

## **3. Estructura del proyecto**

Organiza los directorios de tu monorepo:

```bash
bun-turborepo/
├── apps/
│   ├── app-a/
│   ├── app-b/
├── packages/
│   ├── package-a/
│   ├── package-b/
├── turbo.json
└── package.json
```

1. **Crea las aplicaciones:**

   - En `apps/app-a` y `apps/app-b`, inicializa `package.json` con:
     ```bash
     bun init
     ```

2. **Crea los paquetes:**

   - En `packages/package-a` y `packages/package-b`, inicializa `package.json`:
     ```bash
     bun init
     ```

   Ejemplo de `package-a` con dependencias internas:

   ```json
   {
     "name": "package-a",
     "version": "1.0.0",
     "main": "index.js"
   }
   ```

   Ejemplo de `package-b` dependiendo de `package-a`:

   ```json
   {
     "name": "package-b",
     "version": "1.0.0",
     "main": "index.js",
     "dependencies": {
       "package-a": "workspace:*"
     }
   }
   ```

---

## **4. Configurar Turborepo**

Crea un archivo `turbo.json` en la raíz del proyecto:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

---

## **5. Scripts en el Monorepo**

Actualiza el archivo `package.json` en la raíz con scripts de Turborepo:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev"
  },
  "devDependencies": {
    "turbo": "^1.10.0"
  }
}
```

---

## **6. Construcción y Desarrollo**

- **Construir todos los paquetes:**

  ```bash
  bun run build
  ```

- **Desarrollar todos los proyectos con watch:**

  ```bash
  bun run dev
  ```

- **Construir un paquete específico:**

  ```bash
  turbo run build --filter=package-a
  ```

---

## **Beneficios de Bun y Turborepo**

- **Velocidad:** Bun es más rápido que Yarn o npm para instalar dependencias.
- **Cache Inteligente:** Turborepo optimiza tareas repetitivas con caché distribuida.
- **Escalabilidad:** Manejo eficiente de dependencias y pipelines complejos.

---

Esta configuración inicial te permite trabajar eficientemente con múltiples aplicaciones y paquetes dentro de un mismo repositorio. Si necesitas adaptarlo a un caso específico, ¡puedes personalizarlo según tus necesidades!

