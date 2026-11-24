# Proyecto de Clase: Portafolio Web Personal (HTML, CSS y JS Puro)

Este documento define la **arquitectura oficial, reglas técnicas y guía de construcción** del proyecto de Portafolio Web Personal.

---

## 1. Objetivo del Proyecto
Desarrollar un sitio web personal de **5 páginas independientes** que compartan una misma identidad visual (encabezado, menú de navegación, paleta de colores, tipografía y pie de página), utilizando únicamente tecnologías web nativas.

---

## 2. Reglas Técnicas Estrictas (Restricciones)
Tanto el estudiante como cualquier Agente de IA que asista en el código deben cumplir estas reglas:
1. **Solo tecnologías nativas**: Únicamente **HTML5**, **CSS3** y **JavaScript puro (Vanilla JS)**.
2. **Sin frameworks ni librerías**: No usar Bootstrap, Tailwind, React, Vue, jQuery ni plantillas externas.
3. **Sin backend**: Toda la funcionalidad debe ejecutarse en el navegador del cliente.
4. **Sitio Multipágina (MPA)**: Cada sección principal debe ser un archivo `.html` independiente (no construir todo en una sola página de scroll largo).
5. **Convención de idioma**:
   * **Nombres de archivos, carpetas, IDs y clases CSS**: en **inglés** (`index.html`, `about.html`, `.nav-menu`, `.project-card`).
   * **Contenido visible para el visitante y comentarios del código**: en **español**.

---

## 3. Arquitectura Oficial de Carpetas y Archivos
El proyecto respeta exactamente la siguiente estructura:

```text
proyecto_portafolio/
│
├── README.md               # Especificación y guía del proyecto
├── index.html              # Página 1: Inicio (Presentación y resumen)
├── about.html              # Página 2: Sobre mí (Biografía, trayectoria y CV)
├── skills.html             # Página 3: Habilidades (Técnicas, herramientas y blandas)
├── projects.html           # Página 4: Proyectos (Galería de tarjetas de proyectos)
├── contact.html            # Página 5: Contacto (WhatsApp, LinkedIn, Correo y formulario)
│
├── css/
│   ├── global.css          # Variables (:root), reset, botones, header, nav y footer
│   └── pages.css           # Estilos específicos del contenido (<main>) de cada página
│
├── js/
│   ├── main.js             # Lógica global (menú móvil, enlace activo y año del footer)
│   └── contact.js          # Lógica de contacto (copiar correo, validar form, enviar a WhatsApp/mailto)
│
└── assets/
    ├── img/                # Foto de perfil e imágenes de proyectos
    └── docs/               # Currículum Vitae en PDF para descarga
```
