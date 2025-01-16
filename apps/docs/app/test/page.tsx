'use client'
import { useEffect } from 'react';
import FontSelector from '@/components/FontSelector';  
import useFontStore from '@/store/fontStore';

  export default function HomePage() {
    const { selectedFont } = useFontStore();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.classList.add(selectedFont);
        }
    }, [selectedFont]);

    return (
      <div className="container mx-auto px-4 py-12">
        <div className={`preview-text ${selectedFont}`}>
        asdasdasf 
        </div>
       <FontSelector />
      </div>
    )
  }
