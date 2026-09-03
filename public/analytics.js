/* InTellMe — measurement.
   GA4 with Consent Mode v2. Storage defaults to denied in the EEA, the UK and
   Switzerland (Google resolves the region server-side, so no geo lookup runs
   here) and to granted elsewhere, which matches US law and Google's EU User
   Consent Policy. A visitor's explicit choice, once made, overrides both.
   Nothing here is required for the page to render or work. */
(function () {
  'use strict';
  var ID = 'G-V8HDM5XF8J';
  var KEY = 'intellme.consent';
  var EEA = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT',
             'LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'];

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'granted',
    security_storage: 'granted', wait_for_update: 500, region: EEA
  });
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'granted', functionality_storage: 'granted', security_storage: 'granted'
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'granted' || saved === 'denied') {
    gtag('consent', 'update', { analytics_storage: saved });
  }

  gtag('js', new Date());
  gtag('config', ID, { anonymize_ip: true, allow_google_signals: false });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  /* Consent bar. Rendered only when the visitor has not chosen yet. */
  if (saved === 'granted' || saved === 'denied') return;
  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    gtag('consent', 'update', { analytics_storage: value });
    var bar = document.getElementById('consent-bar');
    if (bar) bar.remove();
  }
  function render() {
    var bar = document.createElement('div');
    bar.id = 'consent-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Measurement consent');
    bar.innerHTML =
      '<p>This site uses Google Analytics to count visits. Nothing is sold, and no advertising ' +
      'profile is built. <a href="/privacy">How we handle data</a>.</p>' +
      '<div class="consent-bar__actions">' +
      '<button type="button" class="btn btn--secondary" data-consent="denied">Decline</button>' +
      '<button type="button" class="btn btn--primary" data-consent="granted">Allow</button>' +
      '</div>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) choose(b.getAttribute('data-consent'));
    });
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else { render(); }
})();
