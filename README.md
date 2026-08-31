# Taller de WordPress, SEO y n8n — Portal de Recursos

Portal web moderno diseñado para los alumnos del máster con todo el material del taller organizado por módulos y recursos.

Diseño inspirado en la interfaz moderna de **Talkbase.io**: estética *Bento Grid*, tipografía **Plus Jakarta Sans**, buscador instantáneo en tiempo real, filtros por tipo de contenido y tarjetas interactivas.

---

## Archivos de la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la web, cabecera, accesos destacados y componentes. |
| `recursos.json` | **Aquí se edita todo**: módulos, recursos, enlaces, descargas y descripciones. |
| `estilos.css` | Sistema de diseño Talkbase (paleta violeta/índigo, tarjetas Bento, modo responsive). |
| `taller.js` | Lógica interactiva: carga dinámica, buscador en vivo, filtros, acordeones y copiar enlaces. |
| `servir.cmd` | Servidor local para previsualizar la web en un clic en `http://localhost:8000/taller/`. |

---

## Cómo añadir o editar recursos

Abre `recursos.json`, busca el módulo correspondiente y añade un objeto a la lista `recursos`:

```json
{
  "titulo": "Guía de optimización de imágenes en WordPress",
  "tipo": "descarga",
  "url": "archivos/optimizacion-imagenes.pdf",
  "descripcion": "Paso a paso para comprimir y convertir a WebP automáticamente.",
  "meta": "PDF · 1,8 MB",
  "descarga": true
}
```

### Campos disponibles:

| Campo | Obligatorio | Descripción |
|---|---|---|
| `titulo` | Sí | Nombre visible del recurso. |
| `tipo` | Sí | Tipo de recurso para el badge de color: `diapositivas`, `descarga`, `apuntes`, `herramienta`, `enlace`, `video`, `plantilla`. |
| `url` | Sí | URL completa (`https://…`) o ruta relativa (`archivos/…` o `../modulo/`). |
| `descripcion` | No | Breve explicación para los alumnos. |
| `meta` | No | Información adicional como formato o peso (`PPTX · 1,4 MB`, `En preparación`, `HTML`). |
| `descarga` | No | `true` si es un archivo que debe descargarse directamente. |

---

## Novedades y características para los alumnos

1. **Buscador instantáneo:** Escribe cualquier término ("Rank Math", "PPTX", "Search Console", "n8n") y la lista se filtra en tiempo real.
2. **Atajo de teclado:** Pulsa la tecla `/` en cualquier momento para ir directamente al buscador.
3. **Filtros por categoría:** Botones para ver sólo Diapositivas, Descargas, Apuntes, Herramientas o Plantillas.
4. **Copiar enlace directo:** Cada tarjeta incluye un botón para copiar el enlace directo al portapapeles.
5. **Accesos directos Bento:** En la parte superior se destacan los recursos clave como la presentación interactiva y el PowerPoint editable.
6. **Navegación por anclas:** Puedes enviar a los alumnos directamente a una sección compartiendo el enlace con ancla:
   - `.../taller/#wordpress`
   - `.../taller/#seo`
   - `.../taller/#n8n`

---

## Cómo previsualizar antes de publicar

1. **En local:** Haz doble clic en `servir.cmd`. Abrirá automáticamente `http://localhost:8000/taller/` con todos los recursos y enlaces funcionando.
2. **Publicada:** Sube la carpeta al hosting o servidor web y funcionará directamente.
