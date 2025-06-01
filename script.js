// script.js
// This script adds simple interactivity to the timeline cards.
// When a card is clicked, it will show an alert with the card's title and year.
// This is a beginner-friendly example of DOM interaction.

// Wait until the page content is loaded
window.addEventListener('DOMContentLoaded', function() {
  // Select all timeline cards inside the section
  var cards = document.querySelectorAll('section > div');

  // Fun facts for tooltips (one per card, in order)
  const funFacts = [
    "Intel was founded by two pioneers of the semiconductor industry!",
    "The 4004 microprocessor had just 2,300 transistors.",
    "The x86 architecture is still used in most PCs today.",
    "The 386 was the first 32-bit processor for PCs.",
    "Intel's GHG emissions peaked in 2006, then started to drop.",
    "RISE stands for Responsible, Inclusive, Sustainable, Enabling.",
    "Net-zero means balancing emissions produced and removed.",
    "99% renewable electricity is a huge achievement!",
    "The first Sustainability Summit was in 2024."
  ];

  // Modal popup for card details
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const shareBtn = document.getElementById('share-btn');

  // Timeline scroll buttons
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const timelineSection = document.querySelector('section');

  // Search/filter
  const searchBox = document.getElementById('search-box');

  // Progress bar
  const progressBar = document.getElementById('progress-bar');

  // Dark mode
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Tooltip
  const tooltip = document.getElementById('tooltip');

  // Back to top
  const backToTop = document.getElementById('back-to-top');

  // Get all timeline cards
  const cards = document.querySelectorAll('section > div');

  // Show modal with card details
  cards.forEach(function(card, idx) {
    card.addEventListener('click', function(e) {
      // Prevent click if tooltip is showing
      if (tooltip.style.display === 'block') return;
      const year = card.querySelector('h2').textContent;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;
      const img = card.querySelector('img').src;
      modalContent.innerHTML =
        `<h2>${year}</h2><h3>${title}</h3><img src="${img}" alt="${title}" style="width:90%;border-radius:6px;margin:10px 0;"/><p>${desc}</p>`;
      modal.style.display = 'flex';
      // Store for share
      shareBtn.dataset.year = year;
      shareBtn.dataset.title = title;
    });
    // Tooltip on hover
    card.addEventListener('mouseenter', function(e) {
      tooltip.textContent = funFacts[idx] || '';
      tooltip.style.display = 'block';
      // Position tooltip near mouse
      document.addEventListener('mousemove', moveTooltip);
    });
    card.addEventListener('mouseleave', function(e) {
      tooltip.style.display = 'none';
      document.removeEventListener('mousemove', moveTooltip);
    });
  });

  // Move tooltip with mouse
  function moveTooltip(e) {
    tooltip.style.left = (e.pageX + 12) + 'px';
    tooltip.style.top = (e.pageY + 12) + 'px';
  }

  // Close modal
  modalClose.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Share button (copy to clipboard)
  shareBtn.onclick = function() {
    const text = `Check out this Intel milestone: ${this.dataset.year} - ${this.dataset.title}`;
    navigator.clipboard.writeText(text).then(function() {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => shareBtn.textContent = 'Share', 1200);
    });
  };

  // Scroll timeline left/right
  scrollLeftBtn.onclick = function() {
    timelineSection.scrollBy({ left: -300, behavior: 'smooth' });
  };
  scrollRightBtn.onclick = function() {
    timelineSection.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Filter cards by search
  searchBox.addEventListener('input', function() {
    const val = this.value.toLowerCase();
    cards.forEach(function(card) {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(val) ? '' : 'none';
    });
  });

  // Interactive Timeline Filter by Decade
  const decadeFilter = document.getElementById('decadeFilter');
  if (decadeFilter) {
    decadeFilter.addEventListener('change', function() {
      const value = this.value;
      // Get all timeline card divs inside the main section
      const cards = document.querySelectorAll('main section > div');
      cards.forEach(card => {
        // Get the year from the first heading in each card
        const yearHeading = card.querySelector('h3, h2');
        if (!yearHeading) return;
        const year = parseInt(yearHeading.textContent.trim(), 10);
        let show = false;
        if (value === 'all') {
          show = true;
        } else if (value === '1960s' && year >= 1960 && year < 1970) {
          show = true;
        } else if (value === '1970s' && year >= 1970 && year < 1980) {
          show = true;
        } else if (value === '1980s' && year >= 1980 && year < 1990) {
          show = true;
        } else if (value === '2000s' && year >= 2000 && year < 2010) {
          show = true;
        } else if (value === '2020s' && year >= 2020 && year < 2030) {
          show = true;
        }
        card.style.display = show ? '' : 'none';
      });
    });
  }

  // Progress bar updates on timeline scroll
  function updateProgressBar() {
    const scrollLeft = timelineSection.scrollLeft;
    const scrollWidth = timelineSection.scrollWidth - timelineSection.clientWidth;
    const percent = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    progressBar.style.width = percent + '%';
  }
  timelineSection.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  window.addEventListener('DOMContentLoaded', updateProgressBar);

  // Dark mode toggle
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  darkModeToggle.onclick = function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  };

  // Back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Enhanced Timeline Arrow Navigation for Accessibility and RTL Support ---
  // Helper: Get all visible timeline cards
  function getVisibleCards() {
    return Array.from(document.querySelectorAll('main section > div')).filter(card => card.style.display !== 'none');
  }

  // Helper: Focus and scroll a card into view
  function focusCard(card) {
    card.setAttribute('tabindex', '0'); // Make card focusable
    card.focus();
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // Track the currently focused card index
  let currentCardIdx = 0;

  // Initialize: set tabindex for all cards
  function initializeTabIndexes() {
    const visible = getVisibleCards();
    visible.forEach((card, idx) => {
      card.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    });
  }
  initializeTabIndexes();

  // Update tabindex when filter/search changes
  function updateTabIndexes() {
    const visible = getVisibleCards();
    visible.forEach((card, idx) => {
      card.setAttribute('tabindex', idx === currentCardIdx ? '0' : '-1');
    });
  }

  // Left arrow button click
  scrollLeftBtn.onclick = function() {
    const visible = getVisibleCards();
    if (visible.length === 0) return;
    const isRTL = document.documentElement.dir === 'rtl';
    if (isRTL) {
      if (currentCardIdx < visible.length - 1) {
        currentCardIdx++;
        focusCard(visible[currentCardIdx]);
        updateTabIndexes();
      }
    } else {
      if (currentCardIdx > 0) {
        currentCardIdx--;
        focusCard(visible[currentCardIdx]);
        updateTabIndexes();
      }
    }
  };

  // Right arrow button click
  scrollRightBtn.onclick = function() {
    const visible = getVisibleCards();
    if (visible.length === 0) return;
    const isRTL = document.documentElement.dir === 'rtl';
    if (isRTL) {
      if (currentCardIdx > 0) {
        currentCardIdx--;
        focusCard(visible[currentCardIdx]);
        updateTabIndexes();
      }
    } else {
      if (currentCardIdx < visible.length - 1) {
        currentCardIdx++;
        focusCard(visible[currentCardIdx]);
        updateTabIndexes();
      }
    }
  };

  // When a card is clicked, update currentCardIdx
  document.querySelectorAll('main section > div').forEach((card) => {
    card.addEventListener('click', function() {
      const visible = getVisibleCards();
      const newIdx = visible.indexOf(card);
      if (newIdx !== -1) {
        currentCardIdx = newIdx;
        updateTabIndexes();
      }
    });
  });

  // When search/filter changes, reset focus to first visible card
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      currentCardIdx = 0;
      updateTabIndexes();
    });
  }
  if (decadeFilter) {
    decadeFilter.addEventListener('change', function() {
      currentCardIdx = 0;
      updateTabIndexes();
    });
  }

  // Keyboard navigation for timeline (left/right arrows)
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') {
      scrollRightBtn.click();
    } else if (e.key === 'ArrowLeft') {
      scrollLeftBtn.click();
    }
  });

  // Auto-detect language and adjust layout direction (RTL/LTR)
  (function() {
    // List of RTL language codes
    var rtlLangs = ['ar', 'he', 'fa', 'ur'];

    // Function to set dir attribute based on language
    function updateDir() {
      var html = document.documentElement;
      var lang = html.lang || navigator.language || navigator.userLanguage || '';
      lang = lang.toLowerCase().split('-')[0]; // e.g., 'ar', 'en'
      if (rtlLangs.includes(lang)) {
        html.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
      } else {
        html.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
      }
    }

    // Run on page load
    updateDir();

    // Observe changes to <html lang="..."> (e.g., by Google Translate)
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'lang') {
          updateDir();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Optionally, check every few seconds in case of dynamic changes
    setInterval(updateDir, 2000);
  })();

  // Form validation for accessibility
  const newsletterForm = document.querySelector('form[aria-labelledby="newsletter-heading"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      const emailInput = document.getElementById('subscriberEmail');
      const emailHelp = document.getElementById('emailHelp');
      if (!emailInput.value || !emailInput.validity.valid) {
        e.preventDefault();
        emailInput.setAttribute('aria-invalid', 'true');
        emailHelp.textContent = 'يرجى إدخال بريد إلكتروني صحيح.';
        emailHelp.classList.add('text-danger');
        emailInput.focus();
      } else {
        emailInput.removeAttribute('aria-invalid');
        emailHelp.textContent = 'لن نشارك بريدك الإلكتروني مع أي طرف ثالث.';
        emailHelp.classList.remove('text-danger');
      }
    });
  }
});
