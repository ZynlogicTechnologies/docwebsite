// hooks/useGlobalTextZigzag.ts
import { useEffect } from 'react';

export const useGlobalTextZigzag = () => {
  useEffect(() => {
    const selector = 'h1,h2,h3,h4,h5,h6,p,li,a,span';
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      if (el.dataset.animated) return;

      const text = el.textContent;
      if (!text || !text.trim()) return;

      const words = text.trim().split(/\s+/);
      el.innerHTML = ''; // Clear old content

      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.classList.add('zigzag-word');
        span.style.animationDelay = `${i * 0.07}s`;
        el.appendChild(span);
      });

      el.dataset.animated = 'true';
    });
  }, []);
};
