/**
 * ==============================================================================
 * CONTACT.JS - Lógica de la Página de Contacto (contact.html)
 * Proyecto de Clase: Portafolio Web Personal
 * Titular: Christian Alex Chancay Naranjo (Guayaquil, Ecuador)
 * Responsabilidades:
 *  1. Copiar dirección de correo al portapapeles con confirmación visual
 *  2. Validación completa de los campos del formulario en el cliente
 *  3. Envío del mensaje por Correo Electrónico (mailto:) sin backend
 *  4. Envío del mensaje por WhatsApp (wa.me) sin backend
 * ==============================================================================
 */

// ============================================================================
// CONFIGURACIÓN DE CONTACTO REAL DE CHRISTIAN CHANCAY
// ============================================================================
const CONTACT_CONFIG = {
  // Correo electrónico principal del CV
  email: 'christian_chancay@hotmail.com',
  // Correo electrónico alternativo
  alternateEmail: 'chancayalex19@gmail.com',
  // Número de WhatsApp internacional para Ecuador: Código +593 seguido del número sin el 0 inicial (985738531)
  whatsappPhone: '593985738531'
};

document.addEventListener('DOMContentLoaded', () => {
  initClipboardCopy();
  initContactForm();
});

/**
 * 1. Copiar Correo al Portapapeles
 * Utiliza la API moderna navigator.clipboard con retrocompatibilidad
 */
function initClipboardCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  const originalText = copyBtn.textContent;

  copyBtn.addEventListener('click', async () => {
    try {
      // Intentar copiar mediante la API del portapapeles
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_CONFIG.email);
      } else {
        // Método alternativo de respaldo (fallback)
        fallbackCopyTextToClipboard(CONTACT_CONFIG.email);
      }

      // Confirmación visual temporal
      copyBtn.textContent = '¡Correo copiado!';
      copyBtn.classList.add('btn-primary');
      copyBtn.classList.remove('btn-outline');

      // Restaurar el texto original después de 2.5 segundos
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('btn-primary');
        copyBtn.classList.add('btn-outline');
      }, 2500);

    } catch (err) {
      console.error('Error al intentar copiar al portapapeles:', err);
      showFeedback('No se pudo copiar el correo automáticamente. Por favor, cópialo manualmente: ' + CONTACT_CONFIG.email, 'error');
    }
  });
}

/**
 * Método alternativo para copiar texto en entornos sin soporte para navigator.clipboard
 */
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

/**
 * 2. Lógica del Formulario: Validación y Envío (Correo y WhatsApp)
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const whatsappBtn = document.getElementById('send-whatsapp-btn');

  if (!form) return;

  // Envío tradicional por Correo Electrónico (mailto:)
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = getFormData();
    const error = validateFormData(data);

    if (error) {
      showFeedback(error, 'error');
      return;
    }

    // Construcción del enlace mailto:
    const subjectEncoded = encodeURIComponent(`[Portafolio Christian Chancay] ${data.subject}`);
    const bodyContent = `Hola Christian,\n\nMi nombre es: ${data.name}\nCorreo de contacto: ${data.email}\n\nMensaje:\n${data.message}`;
    const bodyEncoded = encodeURIComponent(bodyContent);

    const mailtoUrl = `mailto:${CONTACT_CONFIG.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    showFeedback('¡Validación exitosa! Abriendo tu cliente de correo para enviar el mensaje...', 'success');

    // Abrir el cliente de correo predeterminado del sistema operativo
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  });

  // Envío directo por WhatsApp Web / App
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const data = getFormData();
      const error = validateFormData(data);

      if (error) {
        showFeedback(error, 'error');
        return;
      }

      // Construcción del mensaje para WhatsApp
      const waMessage = `¡Hola Christian! Me comunico desde tu portafolio web.\n\n*Nombre:* ${data.name}\n*Correo:* ${data.email}\n*Asunto:* ${data.subject}\n\n*Mensaje:*\n${data.message}`;
      const waMessageEncoded = encodeURIComponent(waMessage);

      const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappPhone}?text=${waMessageEncoded}`;

      showFeedback('¡Validación exitosa! Abriendo WhatsApp para enviar tu mensaje...', 'success');

      // Abrir WhatsApp en una nueva pestaña
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 600);
    });
  }
}

/**
 * Obtiene los valores actuales de los campos del formulario
 */
function getFormData() {
  return {
    name: document.getElementById('name')?.value.trim() || '',
    email: document.getElementById('email')?.value.trim() || '',
    subject: document.getElementById('subject')?.value.trim() || '',
    message: document.getElementById('message')?.value.trim() || ''
  };
}

/**
 * Valida los datos del formulario
 * @returns {string|null} Retorna el mensaje de error o null si todo es válido
 */
function validateFormData(data) {
  if (!data.name || data.name.length < 2) {
    return 'Por favor, ingresa tu nombre completo (mínimo 2 caracteres).';
  }

  if (!data.email) {
    return 'Por favor, ingresa tu dirección de correo electrónico.';
  }

  // Expresión regular para validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return 'Por favor, ingresa un correo electrónico válido (ejemplo: usuario@correo.com).';
  }

  if (!data.subject || data.subject.length < 3) {
    return 'Por favor, ingresa un asunto descriptivo (mínimo 3 caracteres).';
  }

  if (!data.message || data.message.length < 10) {
    return 'Por favor, escribe un mensaje más detallado (mínimo 10 caracteres).';
  }

  return null; // Datos válidos
}

/**
 * Muestra alertas visuales en el contenedor #form-feedback
 * @param {string} message - Texto del mensaje
 * @param {'success'|'error'} type - Tipo de alerta
 */
function showFeedback(message, type) {
  const feedback = document.getElementById('form-feedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = `form-feedback active ${type}`;

  // Desplazar suavemente a la alerta para visibilidad en móviles
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
