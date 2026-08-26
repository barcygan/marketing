(function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/klaro-theme.css';
    document.head.appendChild(link);
})();

var klaroConfig = {
    elementID: 'klaro',
    storageMethod: 'localStorage',
    storageName: 'klaro_consent',
    htmlTexts: true,
    cookieExpiresDays: 365,
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: true,
    lang: document.documentElement.lang ? document.documentElement.lang.slice(0, 2) : 'pl',
    translations: {
        pl: {
            consentModal: {
                title: 'Informacje o plikach cookies',
                description: 'Używamy plików cookies i podobnych technologii, aby zapewnić prawidłowe działanie strony oraz analizować ruch. Możesz dostosować swoje preferencje poniżej.',
            },
            consentNotice: {
                changeDescription: 'Od ostatniej wizyty zmieniły się ustawienia prywatności. Zaktualizuj swoje zgody.',
                description: 'Ta strona korzysta z plików cookies, aby zapewnić najwyższą jakość usług oraz analizować ruch anonimowo (Google Analytics).',
                learnMore: 'Dostosuj zgody',
            },
            purposes: {
                analytics: {
                    title: 'Analityka i statystyki',
                    description: 'Pozwala nam anonimowo badać, jak użytkownicy korzystają ze strony, abyśmy mogli ją ulepszać.',
                },
                security: {
                    title: 'Niezbędne',
                    description: 'Pliki cookie niezbędne do prawidłowego funkcjonowania strony.',
                }
            },
            ok: 'Zaakceptuj wszystkie',
            save: 'Zapisz wybrane',
            decline: 'Odrzuć opcjonalne',
            close: 'Zamknij',
            app: {
                optOut: {
                    title: '(opt-out)',
                    description: 'Wyłączone',
                },
                required: {
                    title: '(wymagane)',
                    description: 'Niezbędne do działania',
                },
                purposes: 'Cele',
                purpose: 'Cel',
            },
            googleAnalytics: {
                title: 'Google Analytics 4',
                description: 'Anonimowe zbieranie statystyk dotyczących wizyt na stronie.',
            }
        },
        en: {
            consentModal: {
                title: 'Cookie Information',
                description: 'We use cookies and similar technologies to ensure website functionality and analyze traffic. You can customize your preferences below.',
            },
            consentNotice: {
                changeDescription: 'Privacy settings have changed since your last visit. Please update your consent.',
                description: 'This website uses cookies to deliver the best user experience and anonymously analyze traffic (Google Analytics).',
                learnMore: 'Customize',
            },
            purposes: {
                analytics: {
                    title: 'Analytics & Statistics',
                    description: 'Allows us to anonymously measure how visitors use the site so we can improve it.',
                },
                security: {
                    title: 'Essential',
                    description: 'Cookies strictly necessary for the operation of the website.',
                }
            },
            ok: 'Accept all',
            save: 'Save preferences',
            decline: 'Decline optional',
            close: 'Close',
            app: {
                optOut: {
                    title: '(opt-out)',
                    description: 'Disabled',
                },
                required: {
                    title: '(required)',
                    description: 'Required for functionality',
                },
                purposes: 'Purposes',
                purpose: 'Purpose',
            },
            googleAnalytics: {
                title: 'Google Analytics 4',
                description: 'Anonymous statistical collection about website visits.',
            }
        }
    },
    services: [
        {
            name: 'googleAnalytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [
                /^_ga(_.*)?$/
            ],
            required: false,
            optOut: false,
            default: false,
            callback: function(consent, service) {
                if (typeof gtag === 'function') {
                    if (consent) {
                        gtag('consent', 'update', {
                            'analytics_storage': 'granted',
                            'ad_storage': 'granted',
                            'ad_user_data': 'granted',
                            'ad_personalization': 'granted'
                        });
                    } else {
                        gtag('consent', 'update', {
                            'analytics_storage': 'denied',
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied'
                        });
                    }
                }
            }
        }
    ]
};
