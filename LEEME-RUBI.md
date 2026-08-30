# Dashboard · Mujer, Haz lo Tuyo

Guía rápida para subir y mantener el sitio. No necesitas saber programar para lo básico — solo edición de texto.

## 1. Subir a Netlify

1. Entra a [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**.
2. Arrastra la carpeta completa (o el .zip descomprimido) a la zona de "Drag and drop".
3. En unos segundos Netlify te da una URL tipo `algo-al-azar.netlify.app`. Puedes cambiarla en **Site settings → Change site name**.
4. Ve a **Site settings → Forms** y activa las notificaciones por correo si quieres que te avisen cada vez que alguien llena un formulario (registro, semblanza, cuestionario, feedback, materiales).

## 2. Cambiar las contraseñas (¡hazlo antes de compartir el sitio!)

Abre `assets/js/auth.js` y cambia estas tres líneas:

```
asistente: { pass: "HAZLOTUYO2026", ... }
ponente:   { pass: "PONENTE2026",   ... }
admin:     { pass: "RUBI2026",      ... }
```

Vuelve a subir el sitio a Netlify (arrastrando la carpeta de nuevo) para que el cambio tome efecto.

**Importante:** esto no es una seguridad "de banco" — es una cortina simple para separar a cada grupo. Cualquiera que sepa ver el código fuente de la página puede encontrar la contraseña. Es suficiente para un diplomado cerrado, pero no lo uses para nada más delicado.

## 3. Editar fechas, módulos y ponentes

Todo el contenido del programa vive en un solo archivo: `assets/js/data.js`. Ahí puedes:

- Cambiar fechas, temas o ponentes de cada módulo.
- Escribir la lectura previa y la tarea de cada módulo (donde dice "Por confirmar").
- Apuntar a la presentación de cada módulo (ver punto 4).

Cambias el archivo una sola vez y se actualiza automáticamente en los 3 portales (asistentes, ponentes y admin) porque todos leen del mismo lugar.

## 4. Subir las presentaciones (PDF)

Coloca los PDF dentro de `assets/presentaciones/` con el nombre `modulo-01.pdf`, `modulo-02.pdf`, etc. (ver `LEEME.txt` en esa carpeta). Vuelve a subir el sitio a Netlify y el botón de descarga aparecerá solo en cada módulo.

## 5. Ver lo que la gente llena en los formularios

Todo llega a **Netlify Forms** (dentro de tu panel de Netlify → pestaña "Forms"), no a este código. En el portal de administradora, pestaña **"Formularios recibidos"**, puedes pegar la URL de tu sitio una vez y quedan ligas directas a cada formulario.

Formularios que existen:
- `registro-asistentes`
- `semblanzas` (asistentes)
- `semblanzas-ponentes`
- `test-confirmacion`
- `cuestionario-previo`
- `feedback-sesion`
- `materiales-ponente` (incluye archivos adjuntos)

## 6. Estructura del sitio

```
index.html              → portada + acceso por rol
asistentes/index.html   → portal de asistentes
ponentes/index.html     → portal de ponentes
admin/index.html        → portal de administradora
assets/css/style.css    → estilos (colores de marca The Ok People)
assets/js/data.js       → contenido editable del programa
assets/js/auth.js       → contraseñas por rol
assets/presentaciones/  → PDFs de cada módulo
```

## 7. Si más adelante quieres algo más robusto

Este dashboard es 100% estático a propósito, para que lo puedas subir a Netlify en un clic. Si en algún momento quieres logins individuales por participante, ver el feedback en vivo dentro del sitio, o que los ponentes suban archivos grandes, lo siguiente sería conectar una base de datos real (por ejemplo Supabase). Cuando llegue ese momento, dímelo y lo evolucionamos juntos sin perder nada de lo que ya está armado.

—

**Haz lo tuyo, hazlo tuyo.**
