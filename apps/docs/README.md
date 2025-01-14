# AnnUI

AnnUI is a collection of re-usable components that you can copy and paste into your web apps.

## ✨ Features

- 🎨 **Highly Customizable** - Inherits shadcn/ui's design philosophy while retaining Radix UI's powerful declarative component design
- 🚀 **Great DX** - Declarative API design, reduced boilerplate code, improved development efficiency
- ♿ **Accessibility** - Built on Radix UI's accessibility support
- 🎭 **Beautiful Animations** - Thoughtfully designed animations providing intuitive visual feedback
- 📦 **Easy to Use** - Quick component installation via shadcn CLI
- 🎯 **TypeScript Support** - Complete TypeScript type definitions

## 🚀 Quick Start

Install components quickly using the CLI tool:

```bash
npx shadcn@latest add <component-name>
```

For example, install the button component:

```bash
npx shadcn@latest add button
```

## 📖 Documentation

Visit [annui.org](https://annui.org) for complete documentation.

## 💖 Credits

AnnUI is heavily inspired by these excellent projects:

- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [MagicUI](https://magicui.design)

## 📄 License

MIT © [AnnUI](LICENSE)


## Para generar registry componentes

```bash
bun index.ts --name=test
```

o


Ir primero al archivo registry-ui.tsx para añadir un nuevo ui de registro dentro 

Ejemplo crearemos avatar 

```bash
{
    name: "Avatar",
    type: "registry:ui",
    dependencies: [],
    files: [
      {
        path: "annui/avatar.tsx",
        type: "registry:ui",
      },
    ],
}
```

Esto lo tenemos que añadir con su tipo y sus dependencias, ahora dirigirnos a annui/avatar.tsx para crear el componente


Para crear el demo o example

```bash
{
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: [],
    files: [
      {
        path: "example/avatar-demo.tsx",
        type: "registry:example",
      },
    ],
},
``` 

Una vez tenemos el demo o example lo tenemos que ejecutar 

npm run build:registry

Recordemos que si tenemos mas temas debemos ponerlo en el otro osea replicarlo 



Por ultimo crear un docs en content/docs avatar.mdx para añadirlo a las url

Editar el contenido, asinar el nombre del demo creado 
```bash
<ComponentPreview
  name="avatar-demo"
  description="A component that allows you to create an adaptive container."
/>
```

./registry.sh --component=MyTest --type=example --theme=gourmet