import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFontStore = create(
  persist(
    (set) => ({
      selectedFont: '', // Estado inicial
      setSelectedFont: (fontClassName) => {
        // Aplica la clase al body
        if (typeof window !== 'undefined') {
          document.body.className = fontClassName;
        }
        set({ selectedFont: fontClassName });
      },
    }),
    {
      name: 'font-store', // Clave para localStorage
    }
  )
);

export default useFontStore;