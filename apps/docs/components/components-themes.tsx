


const ComponentThemes = () => {

    /* EXample 
    [
    {
        "entrekids": {
            "primary": "#00b4f0",
            "primary-content": "#fff",
            "secondary": "#ef4444",
            "secondary-content": "#1f1f1f",
            "accent": "#84cc16",
            "accent-content": "#1f1f1f",
            "neutral": "#162a41",
            "neutral-content": "#1f1f1f",
            "base-100": "#fff9f9",
            "base-200": "#ded9d9",
            "base-300": "#beb9b9",
            "base-content": "#161515",
            "info": "#00b7fb",
            "info-content": "#000c15",
            "success": "#4d7600",
            "success-content": "#d9e3d0",
            "warning": "#d06000",
            "warning-content": "#100300",
            "error": "#d20040",
            "error-content": "#fdd6d7"
        }
    }
]
    
    
    */

    const getTailwindConfig = () => {
        return require('../tailwind.config.ts')
    }

    const getThemeCustom = () => {
        return getTailwindConfig().default.flyonui.themes
    }

    console.log(getThemeCustom())
    return (
        <>  
            <div className="grid grid-cols-2 gap-6 p-6">
                {getThemeCustom().map((themeObject, index) => (
                    <div key={index} className="flex flex-col gap-4">
                    {/* Itera sobre cada tema dentro del objeto */}
                    {Object.keys(themeObject).map((themeKey) => {
                        const theme = themeObject[themeKey]; // Accede al contenido del tema

                        return (
                        <div key={themeKey}>
                            {/* Nombre del tema */}
                            <h2 className="text-xl font-bold mb-4">{themeKey}</h2>
                            <div className="grid grid-cols-4 gap-2">
                            {/* Itera sobre los colores dentro del tema */}
                            {Object.keys(theme).map((colorKey) => {
                                const colorValue = theme[colorKey];

                                return (
                                <div key={colorKey} className="flex flex-col items-center">
                                    {/* Muestra el color */}
                                    <div
                                    className="w-12 h-12 rounded shadow"
                                    style={{ backgroundColor: colorValue }}
                                    ></div>
                                    {/* Nombre del color */}
                                    <p className="text-sm text-gray-600 text-center">
                                    {colorKey}
                                    </p>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        );
                    })}
                    </div>
                ))}
                </div>

            <div className="grid grid-cols-2 hidden">
                {
                    Object.keys(getThemeCustom()).map((theme) => {
                        return (
                            <div key={theme} className="flex flex-col gap-2">
                                 Themes:{Object.keys(getThemeCustom()[theme])}
                                <div className="flex flex-col gap-2">
                                 
                                    {
                                        Object.keys(getThemeCustom()[theme][Object.keys(getThemeCustom()[theme])]).map((color) => {
                                            return (
                                                <>
                                                  
                                                    <div className="grid grid-cols-5 grid-rows-5 gap-4">
                                                        <div className="row-span-2"
                                                            style={{
                                                                backgroundColor: "red"
                                                            }}
                                                        >1</div>
                                                        <div className="col-start-2 row-start-2">2</div>
                                                        <div className="col-start-2 row-start-1">3</div>
                                                    </div>
                                                    {color}
                                                    <div key={color} className="w-8 h-8" style={{ backgroundColor: getThemeCustom()[theme][color] }}></div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}


export { ComponentThemes }