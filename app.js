/* linktome — lingua IT/EN, tema giorno/notte, email, condivisione e repo GitHub dal vivo.
   Senza JS la pagina resta tutta navigabile: qui ci sono solo i ritocchi. */
(function () {
  'use strict';

  const GH_USER = 'giosci1994';

  const I18N = {
    it: {
      'meta.title': 'Giovanni La Cascia · Link',
      'meta.desc': 'Chef di professione, dev per passione. Tutti i miei link in un posto: social, progetti open source e contatti.',
      'ui.options': 'Opzioni',
      'ui.share': 'Condividi questa pagina',
      'ui.toNight': 'Passa alla notte: il Dev',
      'ui.toDay': 'Passa al giorno: lo Chef',
      'kicker.day': 'di giorno · chef',
      'kicker.night': '// di notte · dev',
      'tag.chef': 'di professione',
      'tag.dev': 'per passione',
      'g.social': 'Social & contatti',
      'g.code': 'Progetti',
      'g.support': 'Supporta il mio lavoro',
      'mail.title': 'Email di lavoro',
      'mail.copy': 'Copia indirizzo email',
      'gh.sub': '{n} progetti',
      'gh.all': 'Tutti i repository su GitHub',
      'site.title': 'Sito personale',
      'arborae.sub': 'Org open source che ho cofondato',
      'bmc.title': 'Offrimi un caffè',
      'repo.site': 'Sito',
      'repo.forknotes': 'Novità',
      'repo.updated': 'ultimo aggiornamento: {d}',
      'repo.widget-spotify': 'Mini-telecomando Spotify nella tray di Windows: brano in riproduzione, controlli e cambio dispositivo.',
      'repo.feature-overrides-registry': 'Sblocca il supporto NVMe nativo sperimentale di Windows con i Feature Management override, rollback incluso.',
      'repo.kitchen-app': 'Gestionale per cucine e ristoranti: inventario, ricette e prep-list. PWA, pronto per Docker.',
      'repo.webapp-palestra': 'Piattaforma a microservizi per palestre: dashboard web, bot Telegram e scraper automatico.',
      'repo.PC-MQTT-Notifier': 'Notifiche desktop su Windows da MQTT e Home Assistant, con overlay personalizzabile e icona nella tray.',
      'repo.floor3d-card': 'Il gemello digitale 3D della casa per Home Assistant, aggiornato: three.js e Lit nuovi, luce solare e ombre, tracker delle persone.',
      'repo.rejuvenation-ita-patch': 'Traduzione italiana non ufficiale di Pokémon Rejuvenation: il 99,9% dei testi del gioco.',
      'foot.made': 'fatto con ❤️ tra fornelli e container',
      'foot.source': 'codice sorgente',
      'share.text': 'Tutti i link di Giovanni La Cascia, chef & dev',
      'toast.mail': 'Email copiata',
      'toast.link': 'Link copiato',
      'toast.fail': 'Copia non riuscita'
    },
    en: {
      'meta.title': 'Giovanni La Cascia · Links',
      'meta.desc': 'Chef by trade, dev by passion. All my links in one place: socials, open-source projects and contacts.',
      'ui.options': 'Options',
      'ui.share': 'Share this page',
      'ui.toNight': 'Switch to night: the Dev',
      'ui.toDay': 'Switch to day: the Chef',
      'kicker.day': 'by day · chef',
      'kicker.night': '// by night · dev',
      'tag.chef': 'by trade',
      'tag.dev': 'by passion',
      'g.social': 'Socials & contact',
      'g.code': 'Projects',
      'g.support': 'Support my work',
      'mail.title': 'Work email',
      'mail.copy': 'Copy email address',
      'gh.sub': '{n} projects',
      'gh.all': 'All repositories on GitHub',
      'site.title': 'Personal website',
      'arborae.sub': 'Open-source org I co-founded',
      'bmc.title': 'Buy me a coffee',
      'repo.site': 'Website',
      'repo.forknotes': "What's new",
      'repo.updated': 'last updated: {d}',
      'repo.widget-spotify': 'Spotify remote in the Windows tray: now playing, playback controls and device switching.',
      'repo.feature-overrides-registry': "Unlocks Windows' experimental native NVMe support through Feature Management overrides, with rollback.",
      'repo.kitchen-app': 'Kitchen & restaurant management: inventory, recipes and prep lists. PWA, Docker-ready.',
      'repo.webapp-palestra': 'Microservice platform for gyms: web dashboard, Telegram bot and automated scraper.',
      'repo.PC-MQTT-Notifier': 'Windows desktop notifications from MQTT & Home Assistant, with a customizable overlay and a tray icon.',
      'repo.floor3d-card': 'The 3D digital twin of your home for Home Assistant, refreshed: new three.js and Lit, sunlight and shadows, person trackers.',
      'repo.rejuvenation-ita-patch': 'Unofficial Italian translation patch for Pokémon Rejuvenation: 99.9% of the game text.',
      'foot.made': 'made with ❤️ between stoves and containers',
      'foot.source': 'source code',
      'share.text': 'All the links of Giovanni La Cascia, chef & dev',
      'toast.mail': 'Email copied',
      'toast.link': 'Link copied',
      'toast.fail': "Couldn't copy"
    }
  };

  const root = document.documentElement;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } };

  let lang = 'it';
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.it[key] || '';

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Browser vecchi o contesti non sicuri: il vecchio trucco della textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { }
      ta.remove();
      return ok;
    }
  }

  /* ---------- Tema: giorno = Chef, notte = Dev ---------- */
  const themeBtn = $('#theme-toggle');
  const avatar = $('#avatar');
  const themeMeta = $('meta[name="theme-color"]');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let animTimer;

  const currentTheme = () => (root.dataset.theme === 'night' ? 'night' : 'day');

  function setTheme(next, animate) {
    if (animate) {
      root.classList.add('theme-anim');
      clearTimeout(animTimer);
      animTimer = setTimeout(() => root.classList.remove('theme-anim'), 700);
    }
    root.dataset.theme = next;
    themeMeta.setAttribute('content', next === 'night' ? '#070b0a' : '#f6efe3');
    updateThemeLabels();
  }

  function updateThemeLabels() {
    const label = t(currentTheme() === 'night' ? 'ui.toDay' : 'ui.toNight');
    [themeBtn, avatar].forEach((el) => {
      el.setAttribute('aria-label', label);
      el.title = label;
    });
  }

  function toggleTheme() {
    const next = currentTheme() === 'night' ? 'day' : 'night';
    setTheme(next, true);
    store('linktome-theme', next);
  }

  themeBtn.addEventListener('click', toggleTheme);
  avatar.addEventListener('click', toggleTheme);

  // Se l'utente non ha scelto, si segue il sistema anche a pagina aperta
  darkQuery.addEventListener('change', (e) => {
    if (!load('linktome-theme')) setTheme(e.matches ? 'night' : 'day', true);
  });

  /* ---------- Email: composta qui, così nell'HTML non c'è in chiaro ---------- */
  const mailLink = $('#mail-link');
  const mailText = $('#mail-text');
  const mailCopy = $('#mail-copy');
  const address = mailLink.dataset.user + '@' + mailLink.dataset.domain;
  mailLink.href = 'mailto:' + address;
  mailText.textContent = mailLink.dataset.user;
  mailText.append(document.createElement('wbr'), '@' + mailLink.dataset.domain);

  let copyTimer;
  mailCopy.addEventListener('click', async () => {
    const ok = await copyText(address);
    toast(ok ? t('toast.mail') : t('toast.fail'));
    if (!ok) return;
    mailCopy.classList.add('done');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => mailCopy.classList.remove('done'), 1800);
  });

  /* ---------- Condividi ---------- */
  $('#share').addEventListener('click', async () => {
    const url = $('link[rel="canonical"]').href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, text: t('share.text'), url }); } catch (e) { }
      return;
    }
    toast((await copyText(url)) ? t('toast.link') : t('toast.fail'));
  });

  /* ---------- GitHub: la card si apre sui repository ---------- */
  const gh = $('#gh');
  const ghToggle = $('#gh-toggle');
  const ghPanel = $('#gh-panel');
  const repoEls = $$('.repo[data-repo]');
  const CACHE_KEY = 'linktome-repos';
  const CACHE_TTL = 60 * 60 * 1000; // l'API senza token concede 60 richieste l'ora per IP
  let repoData = null;
  let repoRequest = null;

  repoEls.forEach((el, i) => el.style.setProperty('--i', i));

  function setPanel(open) {
    gh.classList.toggle('open', open);
    ghToggle.setAttribute('aria-expanded', String(open));
    ghPanel.toggleAttribute('inert', !open);
    if (open) loadRepos();
  }

  ghToggle.addEventListener('click', () => setPanel(!gh.classList.contains('open')));
  // Si comincia a scaricare appena il mouse ci passa sopra: all'apertura i dati sono già lì
  ghToggle.addEventListener('pointerenter', loadRepos);
  ghToggle.addEventListener('focus', loadRepos);

  // linktome/#github apre direttamente i progetti
  const openFromHash = () => { if (location.hash === '#github') setPanel(true); };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  function loadRepos() {
    if (repoData || repoRequest) return;
    repoRequest = (async () => {
      try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
        if (cached && Date.now() - cached.t < CACHE_TTL) {
          repoData = cached.d;
          return;
        }
      } catch (e) { }

      const res = await fetch('https://api.github.com/users/' + GH_USER + '/repos?per_page=100', {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!res.ok) throw new Error('GitHub API ' + res.status);
      const wanted = new Set([...repoEls].map((el) => el.dataset.repo));
      repoData = {};
      (await res.json()).forEach((r) => {
        if (wanted.has(r.name)) {
          repoData[r.name] = { stars: r.stargazers_count, lang: r.language, pushed: r.pushed_at };
        }
      });
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: repoData })); } catch (e) { }
    })()
      .then(renderRepos)
      .catch(() => { repoData = null; }) // restano i dati scritti nell'HTML
      .finally(() => { repoRequest = null; });
  }

  function timeAgo(iso) {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto', style: 'short' });
    const secs = (new Date(iso) - Date.now()) / 1000;
    const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600]];
    for (const [unit, size] of units) {
      if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit);
    }
    return rtf.format(Math.round(secs / 60), 'minute');
  }

  function renderRepos() {
    if (!repoData) return;
    repoEls.forEach((el) => {
      const d = repoData[el.dataset.repo];
      if (!d) return;
      const stars = el.querySelector('.repo-stars');
      stars.lastElementChild.textContent = d.stars;
      stars.hidden = !d.stars;
      if (d.lang) el.querySelector('.repo-lang > span').textContent = d.lang;
      if (d.pushed) {
        const upd = el.querySelector('.repo-updated');
        upd.textContent = timeAgo(d.pushed);
        upd.title = t('repo.updated').replace('{d}',
          new Date(d.pushed).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' }));
        upd.hidden = false;
      }
    });
  }

  /* ---------- Lingua ---------- */
  function setLang(next) {
    lang = I18N[next] ? next : 'it';
    root.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v) el.textContent = v.replace('{n}', repoEls.length);
    });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('.lang-switch [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.title = t('meta.title');
    $('meta[name="description"]').setAttribute('content', t('meta.desc'));
    updateThemeLabels();
    renderRepos();
  }

  $$('.lang-switch [data-lang]').forEach((b) => b.addEventListener('click', () => {
    setLang(b.dataset.lang);
    store('lang', lang); // stessa chiave del sito: la scelta vale anche su giosci1994.github.io
  }));

  // Scelta salvata, altrimenti la lingua del browser (italiano o, per tutti gli altri, inglese)
  const saved = load('lang');
  const browserIt = /^it\b/i.test((navigator.languages && navigator.languages[0]) || navigator.language || '');
  setLang(I18N[saved] ? saved : (browserIt ? 'it' : 'en'));
  setTheme(currentTheme(), false);

  $('#year').textContent = new Date().getFullYear();
})();
