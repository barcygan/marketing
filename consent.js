/**
 * Custom Cookie Consent Manager
 * Replaces Klaro with a fully custom, beautifully designed consent banner.
 * Integrates with Google Consent Mode v2.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'kcygan_consent';
  const GA_ID = 'G-TEXVN0KVB9';
  const FONT = "'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  // ── Detect language ─────────────────────────────────────────────────────────
  const lang = (document.documentElement.lang || 'pl').slice(0, 2);

  const i18n = {
    pl: {
      title: 'Używamy plików cookies',
      desc: 'Ta strona korzysta z plików cookies, aby analizować ruch oraz poprawiać jakość naszych usług. Możesz zdecydować, które cookies akceptujesz.',
      acceptAll: 'Zaakceptuj wszystkie',
      declineAll: 'Tylko niezbędne',
      customize: 'Dostosuj',
      save: 'Zapisz wybór',
      back: '← Wróć',
      necessary: 'Niezbędne',
      necessaryDesc: 'Wymagane do prawidłowego działania strony. Nie można wyłączyć.',
      analytics: 'Analityczne',
      analyticsDesc: 'Pozwalają nam anonimowo mierzyć ruch i ulepszać stronę (Google Analytics 4).',
      poweredBy: 'Zarządzanie prywatnością',
    },
    en: {
      title: 'We use cookies',
      desc: 'This site uses cookies to analyze traffic and improve our services. You can decide which cookies you accept.',
      acceptAll: 'Accept all',
      declineAll: 'Essential only',
      customize: 'Customize',
      save: 'Save preferences',
      back: '← Back',
      necessary: 'Essential',
      necessaryDesc: 'Required for the website to function properly. Cannot be disabled.',
      analytics: 'Analytics',
      analyticsDesc: 'Allows us to anonymously measure traffic and improve the site (Google Analytics 4).',
      poweredBy: 'Privacy Management',
    },
  };

  const t = i18n[lang] || i18n.pl;

  // ── Consent Mode helpers ─────────────────────────────────────────────────────
  function grantAll() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  }

  function denyAll() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  function setConsent(analytics) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  // ── Storage ──────────────────────────────────────────────────────────────────
  function saveConsent(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'kcygan-consent-styles';
    style.textContent = `
      #kc-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(10, 10, 10, 0.55);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 999998;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 24px 16px;
        box-sizing: border-box;
        animation: kc-fade-in 0.3s ease forwards;
      }

      @keyframes kc-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      #kc-banner {
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06);
        width: 100%;
        max-width: 760px;
        font-family: ${FONT};
        overflow: hidden;
        animation: kc-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      @keyframes kc-slide-up {
        from { transform: translateY(32px); opacity: 0; }
        to   { transform: translateY(0);   opacity: 1; }
      }

      #kc-notice,
      #kc-settings {
        padding: 28px 28px 24px;
      }

      #kc-settings { display: none; }

      .kc-title {
        font-size: 22px;
        font-weight: 700;
        color: #111;
        letter-spacing: -0.03em;
        margin: 0 0 10px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .kc-title-icon {
        width: 28px;
        height: 28px;
        background: rgb(229,147,149);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .kc-desc {
        font-size: 14px;
        line-height: 1.6;
        color: #555;
        margin: 0 0 20px;
      }

      /* ─ Button row ─ */
      .kc-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }

      .kc-btn {
        font-family: ${FONT};
        font-size: 14px;
        font-weight: 700;
        border: none;
        border-radius: 12px;
        padding: 13px 22px;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        line-height: 1;
        outline: none;
        white-space: nowrap;
      }

      .kc-btn:active { transform: scale(0.97); }

      .kc-btn-primary {
        background: rgb(229,147,149);
        color: #fff;
        flex: 1;
        order: 2; /* Desktop: po prawej */
        box-shadow: 0 4px 14px rgba(229,147,149,0.4);
      }

      .kc-btn-primary:hover {
        background: rgb(209,127,129);
        box-shadow: 0 6px 18px rgba(229,147,149,0.5);
        transform: translateY(-1px);
      }

      .kc-btn-secondary {
        background: #f4f4f4;
        color: #333;
        flex: 1;
        order: 1; /* Desktop: po lewej */
      }

      .kc-btn-secondary:hover {
        background: #ebebeb;
      }

      .kc-btn-ghost {
        background: transparent;
        color: #888;
        font-weight: 600;
        padding: 13px 10px;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .kc-btn-ghost:hover { color: #444; }

      /* ─ Settings view ─ */
      .kc-category {
        border: 1px solid #f0f0f0;
        border-radius: 14px;
        padding: 16px 18px;
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }

      .kc-category-info { flex: 1; }

      .kc-category-name {
        font-size: 15px;
        font-weight: 700;
        color: #111;
        margin: 0 0 4px;
      }

      .kc-category-desc {
        font-size: 13px;
        color: #777;
        margin: 0;
        line-height: 1.5;
      }

      /* Toggle switch */
      .kc-toggle {
        position: relative;
        flex-shrink: 0;
        width: 44px;
        height: 26px;
        margin-top: 2px;
      }

      .kc-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .kc-toggle-track {
        position: absolute;
        inset: 0;
        border-radius: 100px;
        background: #e0e0e0;
        transition: background 0.2s ease;
        cursor: pointer;
      }

      .kc-toggle-track::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        transition: transform 0.2s ease;
      }

      .kc-toggle input:checked + .kc-toggle-track {
        background: rgb(229,147,149);
      }

      .kc-toggle input:checked + .kc-toggle-track::after {
        transform: translateX(18px);
      }

      .kc-toggle input:disabled + .kc-toggle-track {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Divider */
      .kc-divider {
        height: 1px;
        background: #f0f0f0;
        margin: 0 0 20px;
      }

      /* Footer note */
      .kc-footer-note {
        font-size: 11px;
        color: #bbb;
        text-align: center;
        padding: 12px 28px;
        border-top: 1px solid #f5f5f5;
      }

      /* ─ Mobile ─ */
      @media (max-width: 600px) {
        #kc-backdrop {
          align-items: flex-end;
          padding: 12px 10px;
        }

        #kc-notice, #kc-settings {
          padding: 22px 18px 18px;
        }

        .kc-title { font-size: 19px; }

        .kc-actions {
          flex-direction: column;
        }

        /* Mobile: Zaakceptuj na górze, Odrzuć poniżej */
        .kc-btn-primary  { order: 1; }
        .kc-btn-secondary { order: 2; }

        .kc-btn {
          width: 100%;
          padding: 15px 18px;
        }

        .kc-btn-ghost {
          width: 100%;
          text-align: center;
          order: 3;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── HTML ─────────────────────────────────────────────────────────────────────
  function buildUI() {
    const backdrop = document.createElement('div');
    backdrop.id = 'kc-backdrop';

    backdrop.innerHTML = `
      <div id="kc-banner" role="dialog" aria-modal="true" aria-labelledby="kc-title">

        <!-- NOTICE VIEW -->
        <div id="kc-notice">
          <p class="kc-title" id="kc-title">
            <span class="kc-title-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
            </span>
            ${t.title}
          </p>
          <p class="kc-desc">${t.desc}</p>
          <div class="kc-actions">
            <button id="kc-decline" class="kc-btn kc-btn-secondary">${t.declineAll}</button>
            <button id="kc-accept" class="kc-btn kc-btn-primary">${t.acceptAll}</button>
          </div>
          <div style="margin-top: 10px; display: flex; justify-content: center;">
            <button id="kc-open-settings" class="kc-btn kc-btn-ghost">${t.customize}</button>
          </div>
        </div>

        <!-- SETTINGS VIEW -->
        <div id="kc-settings" role="region" aria-label="${t.customize}">
          <p class="kc-title">
            <span class="kc-title-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
            </span>
            ${t.customize}
          </p>
          <div class="kc-divider"></div>

          <!-- Necessary -->
          <div class="kc-category">
            <div class="kc-category-info">
              <p class="kc-category-name">${t.necessary}</p>
              <p class="kc-category-desc">${t.necessaryDesc}</p>
            </div>
            <label class="kc-toggle">
              <input type="checkbox" checked disabled aria-label="${t.necessary}">
              <span class="kc-toggle-track"></span>
            </label>
          </div>

          <!-- Analytics -->
          <div class="kc-category">
            <div class="kc-category-info">
              <p class="kc-category-name">${t.analytics}</p>
              <p class="kc-category-desc">${t.analyticsDesc}</p>
            </div>
            <label class="kc-toggle">
              <input type="checkbox" id="kc-toggle-analytics" aria-label="${t.analytics}">
              <span class="kc-toggle-track"></span>
            </label>
          </div>

          <div class="kc-actions" style="margin-top: 8px;">
            <button id="kc-back" class="kc-btn kc-btn-secondary">${t.back}</button>
            <button id="kc-save" class="kc-btn kc-btn-primary">${t.save}</button>
          </div>
        </div>

        <p class="kc-footer-note">${t.poweredBy}</p>
      </div>
    `;

    return backdrop;
  }

  // ── Logic ────────────────────────────────────────────────────────────────────
  function dismiss(backdrop) {
    backdrop.style.opacity = '0';
    backdrop.style.transition = 'opacity 0.25s ease';
    setTimeout(() => backdrop.remove(), 260);
  }

  function init() {
    const existing = loadConsent();
    if (existing !== null) {
      // Apply saved consent on page load
      if (existing.analytics) grantAll(); else denyAll();
      return;
    }

    injectStyles();
    const backdrop = buildUI();
    document.body.appendChild(backdrop);

    const noticeEl   = backdrop.querySelector('#kc-notice');
    const settingsEl = backdrop.querySelector('#kc-settings');

    // Accept all
    backdrop.querySelector('#kc-accept').addEventListener('click', () => {
      saveConsent({ analytics: true });
      grantAll();
      dismiss(backdrop);
    });

    // Decline (essential only)
    backdrop.querySelector('#kc-decline').addEventListener('click', () => {
      saveConsent({ analytics: false });
      denyAll();
      dismiss(backdrop);
    });

    // Open settings
    backdrop.querySelector('#kc-open-settings').addEventListener('click', () => {
      noticeEl.style.display = 'none';
      settingsEl.style.display = 'block';
    });

    // Back
    backdrop.querySelector('#kc-back').addEventListener('click', () => {
      settingsEl.style.display = 'none';
      noticeEl.style.display = 'block';
    });

    // Save custom
    backdrop.querySelector('#kc-save').addEventListener('click', () => {
      const analytics = backdrop.querySelector('#kc-toggle-analytics').checked;
      saveConsent({ analytics });
      setConsent(analytics);
      dismiss(backdrop);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose reset helper for dev console
  window.kcConsent = {
    show: function () {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    },
    reset: function () {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  };
})();
