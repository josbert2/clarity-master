import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    "name": "testing",
    "type": "registry:ui",
    "dependencies": [],
    "files": [
      {
        "path": "apps/docs/registry/testing.tsx",
        "type": "registry:ui"
      }
    ]
  }
];
