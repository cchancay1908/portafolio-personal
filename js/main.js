/**
 * ==============================================================================
 * MAIN.JS - Lógica Global del Portafolio
 * Proyecto de Clase: Portafolio Web Personal
 * Titular: Christian Alex Chancay Naranjo
 * Responsabilidades:
 *  1. Selector de Tema Día / Noche (Modo Claro / Modo Oscuro) con Persistencia
 *  2. Control del Menú Móvil (Hamburguesa)
 *  3. Detección y Marcado Automático del Enlace de Navegación Activo
 *  4. Inserción Dinámica del Año en el Pie de Página (Footer)
 * ==============================================================================
 */

// Clave para almacenar la preferencia en localStorage
const THEME_STORAGE_KEY = 'portfolio_theme';

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de funciones globales
  initThemeToggle();
  initMobileMenu();
  setActiveNavLink();
  setCurrentYear();
});

/**
 * 1. Control del Selector de Tema Día y Noche (Claro/Oscuro)
 * Aplica la preferencia guardada o detecta la del sistema operativo
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // 1. Determinar tema inicial: Almacenado > Preferencia del Sistema > Claro por defecto
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  let currentTheme = 'light'; // Por defecto modo claro Microsoft

  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  }

  // Aplicar tema en el elemento raíz <html>
  applyTheme(currentTheme);

  // 2. Evento clic para alternar entre Claro y Oscuro
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }
}

/**
 * Aplica el tema seleccionado al documento y actualiza accesibilidad
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    const isDark = theme === 'dark';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    themeToggleBtn.setAttribute('title', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  }
}

/**
 * 2. Control del Menú Móvil (Adaptado a iPhone y pantallas táctiles)
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) return;

  // Alternar apertura/cierre al pulsar el botón hamburguesa
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cerrar el menú si el usuario hace clic fuera de la barra de navegación
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar el menú automáticamente al hacer clic en cualquier enlace
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 3. Marcado Automático del Enlace Activo (.active)
 */
function setActiveNavLink() {
  const path = window.location.pathname;
  let currentPage = path.substring(path.lastIndexOf('/') + 1);

  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 4. Año Dinámico en el Footer
 */
function setCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
