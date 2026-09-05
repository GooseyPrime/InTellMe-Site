/* Records when the request form was rendered, so the endpoint can tell a
   person filling it in from a bot posting instantly.

   External rather than inline: the content security policy no longer allows
   inline script, and an inline block here would be silently blocked — which is
   how this signal was lost in the first place. */
(function () {
  'use strict';
  function stamp() {
    var f = document.getElementById('investor-form');
    if (!f) return;
    var t = document.getElementById('_started');
    if (t) t.value = String(Date.now());
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stamp);
  } else {
    stamp();
  }
})();
