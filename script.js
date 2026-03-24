// ===================================
// Korea-Taiwan Interpretation Agency
// Interactions
// ===================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  // Mouse Spotlight Effect for Stats Grid
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsGrid.addEventListener('mousemove', (e) => {
      const rect = statsGrid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      statsGrid.style.setProperty('--mouse-x', `${x}px`);
      statsGrid.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  // Number Count-Up Animation
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.innerText;
        const targetValue = parseInt(targetText.replace(/\D/g, ''));

        if (!isNaN(targetValue)) {
          let startTimestamp = null;
          const duration = 2000;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * targetValue);

            // Keep the suffix (e.g. "+")
            const suffix = targetText.replace(/[0-9]/g, '');
            el.innerText = currentValue + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              el.innerText = targetText; // Ensure exact final value
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(el);
        }
      }
    });
  }, observerOptions);

});
