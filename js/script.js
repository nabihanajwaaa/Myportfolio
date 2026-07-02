// ============================================================
// Mobile nav toggle
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav__toggle');

  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ==========================================================
  // Terminal typing effect (Home page only)
  // ==========================================================
  const terminalBody = document.querySelector('[data-terminal]');
  if (terminalBody) {
    const lines = JSON.parse(terminalBody.getAttribute('data-lines'));
    terminalBody.textContent = '';
    let lineIndex = 0;
    let charIndex = 0;

    const cursor = document.createElement('span');
    cursor.className = 'terminal__cursor';

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        terminalBody.appendChild(cursor);
        return;
      }

      const current = lines[lineIndex];
      const lineEl = terminalBody.children[lineIndex] || document.createElement('div');

      if (charIndex === 0) {
        const prefix = document.createElement('span');
        prefix.className = current.type === 'out' ? 'out' : 'prompt';
        prefix.textContent = current.type === 'out' ? '' : '$ ';
        lineEl.appendChild(prefix);
        terminalBody.appendChild(lineEl);
      }

      lineEl.append(current.text[charIndex] || '');
      charIndex++;

      if (charIndex <= current.text.length) {
        window.setTimeout(typeNextChar, current.type === 'out' ? 8 : 32);
      } else {
        lineIndex++;
        charIndex = 0;
        window.setTimeout(typeNextChar, 220);
      }
    }

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      lines.forEach((line) => {
        const lineEl = document.createElement('div');
        lineEl.textContent = (line.type === 'out' ? '' : '$ ') + line.text;
        terminalBody.appendChild(lineEl);
      });
    } else {
      typeNextChar();
    }
  }

  // ==========================================================
  // Footer year
  // ==========================================================
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
