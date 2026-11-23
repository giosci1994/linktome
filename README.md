# 🔗 linktome

**All my links in one place — Giovanni La Cascia, chef by trade, dev by passion.**
A tiny link-in-bio page in the same style as [my personal site](https://giosci1994.github.io):
by day the Chef, by night the Dev.

<p align="center">
  <a href="https://giosci1994.github.io/linktome/"><img src="https://img.shields.io/website?url=https%3A%2F%2Fgiosci1994.github.io%2Flinktome%2F&label=giosci1994.github.io%2Flinktome&up_message=online&down_message=offline" alt="Website status" /></a>
  <img src="https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/build-no%20build%20step-informational" alt="No build step" />
  <img src="https://img.shields.io/badge/i18n-IT%20%C2%B7%20EN-8a63d2" alt="Bilingual IT/EN" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/giosci1994/linktome" alt="License" /></a>
  <a href="https://buymeacoffee.com/giosci1994u"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee" /></a>
</p>

<p align="center">
  <a href="https://giosci1994.github.io/linktome/">
    <img src="assets/preview.webp" width="560" alt="The link page in day mode (Chef) and night mode (Dev)" />
  </a>
</p>

<p align="center"><strong>🌐 Live: <a href="https://giosci1994.github.io/linktome/">giosci1994.github.io/linktome</a></strong></p>

---

## ✨ Highlights

- 🌗 **Day = Chef, night = Dev** — warm paper, amber and serif by day; dark green and mono by
  night. It follows the system theme, and tapping the photo flips it to the other side.
- 🐙 **Interactive GitHub card** — tap it and it opens on my featured repositories, with
  language, stars and last update fetched live from the GitHub API.
- 🌍 **Bilingual IT/EN** — picks the browser language and shares the choice with the main site.
- 📧 **Email kept away from bots** — the address is assembled in JavaScript, with a one-tap
  copy button.
- 📤 **Share button** — native share sheet on phones, copy-to-clipboard elsewhere.
- ⚡ **Zero build step** — plain HTML + CSS + vanilla JS. The only external script is [Motion](https://motion.dev)
  (pinned, with SRI) for the scroll reveals. The links work even without JavaScript.
- ♿ **Accessible** — real buttons and lists, ARIA states, keyboard focus,
  `prefers-reduced-motion` aware.

## 🔗 The links

| | |
|---|---|
| 📸 Instagram | [@giovannilacascia](https://www.instagram.com/giovannilacascia/) |
| 💼 LinkedIn | [in/giovannilacascia](https://www.linkedin.com/in/giovannilacascia/) |
| 𝕏 X | [@giosci1994](https://x.com/giosci1994) |
| ✈️ Telegram | [@giovannilacascia](https://t.me/giovannilacascia) |
| 🏠 Home Assistant Community | [@giosci1994](https://community.home-assistant.io/u/giosci1994/summary) |
| 🐙 GitHub | [@giosci1994](https://github.com/giosci1994) |
| 🌐 Website | [giosci1994.github.io](https://giosci1994.github.io) |
| 🌱 Arborae | [arborae.github.io](https://arborae.github.io) |
| 🎮 Discord | [profile](https://discord.com/users/414840008977940481) |
| 🎮 Steam | [id/giosci1994](https://steamcommunity.com/id/giosci1994/) |
| 🎮 Epic Games | [Giosci_](https://store.epicgames.com/u/9fa3b70f028c4b80af578f31c6dca246) |
| ☕ Buy Me a Coffee | [giosci1994u](https://buymeacoffee.com/giosci1994u) |
| 💳 PayPal | [paypal.me/giovannilacascia](https://paypal.me/giovannilacascia) |

## 🧩 Project structure

```
index.html        the page: every link is plain HTML
style.css         day (Chef) and night (Dev) themes
app.js            IT/EN, theme switch, email, share, live GitHub data
assets/
  avatar-chef.webp / avatar-dev.webp   the two faces of the avatar
  favicon.svg, arborae.svg             icons
  og-image.jpg                         1200×630 social preview
  preview.webp                         screenshot for this README
```

## ✏️ Adding or changing a link

1. Copy one `<li>` inside a `.links` list in `index.html` and change `href`, title and subtitle.
2. Pick a tile colour: add a `.tile-yourbrand` rule in `style.css` and, if needed, an icon
   `<symbol>` at the top of `index.html` (brand icons come from [Simple Icons](https://simpleicons.org), CC0).
3. Translatable text gets a `data-i18n="key"` attribute, with the key in both `it` and `en` in `app.js`.

**Featured repositories** are `<li class="repo" data-repo="name">` items inside the GitHub card:
the name must match the repository on GitHub, and stars, language and last update are filled in
automatically.

## 🛠️ Run locally

```bash
git clone https://github.com/giosci1994/linktome.git
cd linktome
python -m http.server 8000        # → http://localhost:8000
```

## 🚀 Deploy

GitHub Pages, **Deploy from a branch** → `main` / `(root)`. Every push to `main` is online at
**https://giosci1994.github.io/linktome/** within a minute or two.

## ☕ Support

If one of my projects is useful to you, you can buy me a coffee.

<a href="https://buymeacoffee.com/giosci1994u"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee" /></a>

## 📄 License

The **source code** (HTML/CSS/JS) is released under the [GNU GPLv3 License](LICENSE).

> ℹ️ **Not covered by GPLv3:** the personal photographs and avatar (`avatar-*.webp`,
> `og-image.jpg`, `preview.webp`), the personal branding and the Arborae logo are
> © their owners, all rights reserved. Brand icons are trademarks of their respective owners.
