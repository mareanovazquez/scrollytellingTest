/**
 * INTRO ANIMATIONS - LUDITAS SCROLLYTELLING
 * Animaciones para la sección de introducción
 */

// Configuración del typewriter
const TYPEWRITER_CONFIG = {
    text: "Quién no fantaseó alguna vez con revolear su computadora, arrojar el teléfono contra la pared, atribuirle cualquier frustración a la máquina y desquitarse.",
    speed: 50, // milisegundos entre caracteres
    startDelay: 2500 // delay antes de iniciar el typewriter
};

// Variables del DOM
let typewriterElement;
let cursor;
let scrollIndicator;

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    startAnimationSequence();
});

/**
 * Inicializa las referencias a elementos del DOM
 */
function initializeElements() {
    typewriterElement = document.getElementById('typewriter-text');
    cursor = document.getElementById('cursor');
    scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Verificar que los elementos existan
    if (!typewriterElement || !cursor || !scrollIndicator) {
        console.error('Error: No se pudieron encontrar los elementos requeridos');
        return;
    }
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    // Smooth scroll al hacer click en el indicador
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', handleScrollClick);
    }
    
    // Listener para detectar cuando el usuario hace scroll manual
    window.addEventListener('scroll', handleScroll);
    
    // Listener para redimensionamiento de ventana
    window.addEventListener('resize', handleResize);
}

/**
 * Inicia la secuencia de animaciones
 */
function startAnimationSequence() {
    // Inicia el efecto typewriter después del delay configurado
    setTimeout(initTypewriter, TYPEWRITER_CONFIG.startDelay);
}

/**
 * Inicializa y ejecuta el efecto typewriter
 */
function initTypewriter() {
    if (!typewriterElement || !cursor) return;
    
    let currentIndex = 0;
    
    function typeNextCharacter() {
        if (currentIndex < TYPEWRITER_CONFIG.text.length) {
            // Añade el siguiente carácter
            const currentText = TYPEWRITER_CONFIG.text.slice(0, currentIndex + 1);
            typewriterElement.innerHTML = currentText + '<span class="cursor" id="cursor">|</span>';
            
            currentIndex++;
            setTimeout(typeNextCharacter, TYPEWRITER_CONFIG.speed);
        } else {
            // Texto completado, mantener cursor parpadeando
            finalizeTypewriter();
        }
    }
    
    // Comenzar el efecto
    typeNextCharacter();
}

/**
 * Finaliza el efecto typewriter
 */
function finalizeTypewriter() {
    setTimeout(() => {
        const newCursor = document.getElementById('cursor');
        if (newCursor) {
            newCursor.style.animation = 'blink 1s infinite';
        }
        
        // Opcional: hacer que el cursor desaparezca después de un tiempo
        setTimeout(() => {
            const finalCursor = document.getElementById('cursor');
            if (finalCursor) {
                finalCursor.style.opacity = '0';
            }
        }, 5000);
    }, 500);
}

/**
 * Maneja el click en el indicador de scroll
 */
function handleScrollClick() {
    const nextSection = document.querySelector('.intro-section').nextElementSibling;
    
    if (nextSection) {
        // Scroll hacia la siguiente sección
        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Si no hay siguiente sección, scroll una pantalla completa
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
}

/**
 * Maneja el scroll de la página
 */
function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Efecto parallax sutil en elementos flotantes
    applyParallaxEffect(scrollPosition);
    
    // Ocultar indicador de scroll cuando el usuario haga scroll
    if (scrollPosition > windowHeight * 0.1) {
        hideScrollIndicator();
    } else {
        showScrollIndicator();
    }
}

/**
 * Aplica efecto parallax a elementos flotantes
 */
function applyParallaxEffect(scrollPosition) {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1); // Velocidades diferentes para cada elemento
        const yPos = scrollPosition * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
}

/**
 * Oculta el indicador de scroll
 */
function hideScrollIndicator() {
    if (scrollIndicator && !scrollIndicator.classList.contains('hidden')) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        scrollIndicator.classList.add('hidden');
    }
}

/**
 * Muestra el indicador de scroll
 */
function showScrollIndicator() {
    if (scrollIndicator && scrollIndicator.classList.contains('hidden')) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        scrollIndicator.classList.remove('hidden');
    }
}

/**
 * Maneja el redimensionamiento de ventana
 */
function handleResize() {
    // Reajustar animaciones si es necesario
    // Por ejemplo, recalcular posiciones de elementos flotantes
    
    // Debounce para evitar múltiples ejecuciones
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Lógica de reajuste aquí si es necesaria
        console.log('Ventana redimensionada');
    }, 250);
}

/**
 * Utilidad para detectar si un elemento está visible en el viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Añade clase CSS para transición suave al scroll indicator
 */
function addScrollIndicatorTransition() {
    if (scrollIndicator) {
        scrollIndicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
}

// Inicializar transiciones adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    addScrollIndicatorTransition();
});

/**
 * Configuración para Intersection Observer (opcional)
 * Para detectar cuando elementos entran/salen del viewport
 */
function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos que necesiten animación al entrar en viewport
        const elementsToObserve = document.querySelectorAll('.floating-element');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }
}

// Inicializar Intersection Observer
document.addEventListener('DOMContentLoaded', setupIntersectionObserver);