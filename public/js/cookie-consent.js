/**
 * QuickNisab Cookie Consent Script
 * Handles GDPR/CCPA compliance for Google AdSense
 */

(function() {
    const STORAGE_KEY = 'quicknisab_consent';
    const CONSENT_VERSION = '1.0';

    // Check if consent is already given
    function hasConsent() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return false;
        try {
            const data = JSON.parse(stored);
            return data.version === CONSENT_VERSION && data.granted === true;
        } catch (e) {
            return false;
        }
    }

    // Save consent
    function saveConsent(granted) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            version: CONSENT_VERSION,
            granted: granted,
            timestamp: new Date().toISOString()
        }));
        
        if (granted) {
            enableAds();
        }
        
        hideBanner();
    }

    // Enable AdSense ads
    function enableAds() {
        // Find all ins elements that might be paused or hidden
        // In a more complex setup, we might dynamically inject the script here
        // For now, we rely on the script being present but potentially controlled or just notifying the user
        // Standard AdSense "pause" isn't client-side simple, but the TCF v2.0 framework is complex.
        // For this simple implementation, we assume "Notify & Accept" model which is common for small publishers.
        console.log('Ads enabled');
        
        // If we wanted to dynamically load adsbygoogle only after consent:
        /*
        if (!window.adsbygoogle) {
            const script = document.createElement('script');
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2826469813017365";
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
        }
        */
    }

    // Create and show banner
    function showBanner() {
        if (document.getElementById('cookie-consent-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 border-t border-gray-200 transform translate-y-full transition-transform duration-300 ease-out';
        banner.innerHTML = `
            <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-600 flex-1">
                    <p class="font-semibold text-gray-900 mb-1">We value your privacy</p>
                    <p>
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies. 
                        <a href="/privacy-policy" class="text-islamic-green hover:underline">Read our Privacy Policy</a>.
                    </p>
                </div>
                <div class="flex gap-3 shrink-0">
                    <button id="cookie-reject" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                        Reject
                    </button>
                    <button id="cookie-accept" class="px-4 py-2 text-sm font-medium text-white bg-islamic-green rounded-lg hover:bg-islamic-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm">
                        Accept All
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate in
        requestAnimationFrame(() => {
            banner.classList.remove('translate-y-full');
        });

        // Event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => saveConsent(true));
        document.getElementById('cookie-reject').addEventListener('click', () => saveConsent(false));
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Initialize
    if (!hasConsent()) {
        // Wait a moment before showing
        setTimeout(showBanner, 1000);
    } else {
        enableAds();
    }
})();
