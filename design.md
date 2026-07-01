# SIROTECH Design System

> **Cél:** Ezt a dokumentumot bármely AI fejlesztő eszköznek átadva a weboldal *tartalma és felépítése változatlan marad*, csak a vizuális réteg (szín, tipográfia, elrendezés, komponensek, mozgás) igazodik az itt leírt rendszerhez.
>
> A fejlesztő AI-nak szóló utasítás röviden:
> **„Ne írd át a szövegeket, a szekciók sorrendjét, a mezőket vagy a linkeket. Csak a stílust, a színeket, a tipográfiát, a spacinget, a komponens-kinézetet és az animációkat alakítsd az alábbi rendszerhez.”**

---

## 1. Design filozófia

- **Enterprise SaaS találkozik az ipari precizitással.** Sötét, prémium, technikai — nem játékos, nem generikus SaaS-kék.
- **Fekete-közeli alap, egy-egy erős accent szín.** A háttér mindig sötét, sosem gradienses. A színt információhordozóként használjuk (al-márkák megkülönböztetése), nem dekorációként.
- **Célzott mozgás, nem cirkusz.** Csak belépő és hover animációk. Semmi loopoló effekt.
- **Sok üres tér, bal-igazított olvasási irány.** Kényelmesen érzett spacingnál 2–3×-osan több levegő.
- **AI slop tilos:** ne legyen lila/violet gradient fehér háttéren, ne legyen középre igazított egyenletes SaaS layout, ne legyen Inter+Roboto duó Google-hero stílusban.

---

## 2. Színpaletta

> **FONTOS:** A 2.1 (alaprétegek), 2.2 (szöveg) és 2.4 (szabályok) **MINDEN al-brand oldalán azonosak és változatlanok**. Ez a közös vizuális horgony, ami a SIROTECH márkacsaládot egységbe fogja. Csak a 2.3 pont (accent) függ az al-brandtől.

A pontos HEX értékeket használd. Ne közelítsd, ne cseréld le HSL Tailwind alapértelmezésekre.

### 2.1 Alaprétegek (sötét) — **KÖZÖS MINDEN AL-BRANDNÉL**

| Token | HEX | Használat |
|---|---|---|
| `bg` | `#0A0A0C` | Oldal háttere. Egész layout mögött. |
| `surface` | `#111116` | Kártyák, panelek, űrlapok felülete. |
| `panel` | `#18181F` | Emelt / lebegő panel (dropdown, modal). |
| `line` | `#2A2A35` | Finom elválasztók, border-ok. |

### 2.2 Szöveg — **KÖZÖS MINDEN AL-BRANDNÉL**

| Token | HEX | Használat |
|---|---|---|
| `ink` | `#F0F0F5` | Elsődleges szöveg, headline. |
| `muted` | `#8888A0` | Másodlagos szöveg, label, description. |
| `silver` | `#C0C0D0` | „Umbrella" / semleges accent — CTA, márka-független kiemelés. Az `sirotech.hu` (umbrella) oldalon ez az elsődleges accent. Al-brand oldalakon másodlagos szerepű, semleges CTA-khoz. |

### 2.3 Accent színek — **AL-BRANDENKÉNT EGY**

Minden al-brand oldalán **pontosan egy** accent szín szerepel a saját identitása szerint. Ne keverj kettőt (kivétel: az umbrella `sirotech.hu`, ahol mind a négy megjelenik a hero switcherben és a deep-dive szekciókban).

| Al-brand | Accent HEX | Rövid név / karakter |
|---|---|---|
| **SIRONIC** (IT üzemeltetés) — `sironic.hu` | `#E8271A` | Piros — vezető szolgáltatás, erő, sürgősség (SLA). |
| **SIRO-VÉD** (biztonságtechnika) — `siroved.hu` | `#1A6BE8` | Acélkék — védelem, megbízhatóság. |
| **SIROSOFT** (szoftverfejlesztés) — `sirosoft.hu` | `#1AE87B` | Elektromos zöld — kód, fejlesztés, „új". |
| **SIROVILL** (villanyszerelés) — `sirovill.hu` | `#F5B81C` | Amber — energia, áram, ipari. |
| **SIROTECH** (umbrella) — `sirotech.hu` | `silver` `#C0C0D0` | Semleges, egyik al-brandet sem hangsúlyozza felül. |

Új al-brand bevezetésekor válassz az eddig **nem használt** színsávból (magenta, cyan, ibolyaszín stb.). Sose használd újra egy másik al-brand accentjét.

### 2.4 Színhasználati szabályok — **KÖZÖS MINDEN AL-BRANDNÉL**

- **Háttér mindig sötét.** Sose tegyél sötét szöveget sötét háttérre. Sárga (`#F5B81C`) és zöld (`#1AE87B`) felületekre `#0A0A0C` szöveg jön; piros (`#E8271A`) és kék (`#1A6BE8`) felületekre fehér (`#F0F0F5`).
- **Nincs gradient a felszínen.** Gradient csak radiális glow-ként, `opacity: 0.05–0.25` értékkel, egy accent színből átlátszóba, dekoratív ambient fényként.
- **Accent szín border-en:** `border-color` = accent + `40` (25% opacitás), pl. `#E8271A40`.
- **Accent szín háttér-tint:** `bg` = accent + `12` (7% opacitás), pl. `#E8271A12`.
- **Accent szín glow (box-shadow):** `0 0 28px -14px <accent>` alap, hover-en `0 0 56px -10px <accent>`.

---

## 3. Tipográfia

### 3.1 Fontok (`next/font` vagy CDN)

| Szerep | Font | Fallback |
|---|---|---|
| Display (headline) | **Space Grotesk** — 500/600/700 | `sans-serif` |
| Body (törzsszöveg) | **Inter** — 400/500/600 | `sans-serif` |
| Mono (label, kód, technikai kiegészítő) | **JetBrains Mono** — 400/600 | `monospace` |

### 3.2 Szöveghierarchia

| Elem | Méret (desktop) | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| **H1** hero headline | `4rem` (`text-6xl` lg), fokozatos: `text-4xl sm:text-5xl lg:text-6xl` | 700 | **`-0.04em`** (kötelező) | 1.05 |
| **H2** szekció headline | `text-3xl` mobil → `text-4xl` desktop | 600 | `-0.02em` | 1.15 |
| **H3** kártya title | `text-lg` – `text-xl` | 600 | 0 | 1.3 |
| **Body** | `text-base` mobil (`text-sm`), desktop `text-base`–`text-lg` | 400 | 0 | **1.7** |
| **Label** (eyebrow, kis címke) | `text-xs` (`0.75rem`) | 600 | **`0.12em` + `uppercase`** | 1.4 — **mono fonttal** |
| **Legal / footer fine print** | `text-xs` | 400 | 0 | 1.6 — **mono fonttal** |

### 3.3 Tipográfiai szabályok

- **Headline mindig display fontban**, negatív letter-spacinggel.
- **Label mindig mono fontban**, uppercase, széles letter-spacinggel — ez a rendszer aláírása, sose cseréld sans-serifre.
- **Törzsszövegben tilos justify align.** Bal-igazítás mindig.
- **Ne használj emoji karaktereket** ikon helyett — Lucide icon library kötelező.

---

## 4. Layout & spacing

### 4.1 Rács

- **Max content width:** `1280px` (`max-w-site`), középre igazítva `mx-auto`.
- **Oldal padding:** `px-6` mobilon és desktopon egyaránt.
- **Gutter kártyák között:** `gap-4` (16 px) sűrű rácsnál, `gap-6`/`gap-8` levegősebbnél.
- **Grid:** mobil `grid-cols-1`, tablet `sm:grid-cols-2`, desktop `lg:grid-cols-3` vagy `lg:grid-cols-4` az elemszám szerint.

### 4.2 Vertikális ritmus

- **Szekciók között:** `py-28` (112 px). Kivétel: hero `pt-36 sm:pt-44 pb-28`, footer `py-16`.
- **Szekció header → tartalom:** `mt-14`.
- **Eyebrow → headline:** `mt-6`.
- **Headline → subheadline:** `mt-5`–`mt-6`.
- **Subheadline → CTA blokk:** `mt-9`–`mt-10`.
- **Szekció-elválasztó:** `border-t border-line/50` — finom, nem hangsúlyos.

### 4.3 Border-radius

- **Kártya, panel, űrlap:** `rounded-lg` (8 px).
- **Gomb, input, chip:** `rounded` (4 px).
- **Tag, badge:** `rounded-sm` (2 px).
- **Kör (avatar, ikon-badge):** `rounded-full`.

**Sose használj `rounded-2xl` vagy nagyobbat.** Az „élesség" része a márkakarakter­nek.

---

## 5. Komponens-minták

### 5.1 Gomb

**Elsődleges (silver / semleges):**
```
bg-silver text-bg font-semibold rounded px-6 py-3 text-sm
hover:bg-ink transition-colors duration-150
```

**Elsődleges accent (piros):**
```
bg-[#E8271A] text-white font-semibold rounded px-6 py-3 text-sm
hover:scale-[1.02] transition-transform duration-150 ease-out
```

**Másodlagos (outline):**
```
border border-line text-ink font-semibold rounded px-6 py-3 text-sm
hover:border-silver transition-colors duration-150
```

**Text link accent színnel:** kis nyíllal (`ArrowRight` vagy `ArrowUpRight` a Lucide-ból), `group-hover:translate-x-1` mikroanimációval a nyilon.

### 5.2 Kártya

```
rounded-lg border border-line bg-surface p-8
transition-colors duration-150 hover:border-silver/40
```

**Accent-glow kártya (brand switcher):**
```
rounded-lg border bg-surface p-6
border-color: <accent>40
box-shadow: 0 0 28px -14px <accent>
hover: scale-[1.02] + box-shadow: 0 0 56px -10px <accent>
transition: all 150ms ease-out
```

### 5.3 Chip / tag (eyebrow accent)

```
label inline-block rounded-sm border px-2.5 py-1
color: <accent>
border-color: <accent>40
background: <accent>12
```

### 5.4 Input / textarea

```
w-full rounded border border-line bg-bg px-4 py-3 text-sm text-ink
placeholder:text-muted/50 transition-colors
focus:border-silver focus:outline-none
```

**Label:** mono, uppercase, `label mb-2 block text-muted`.
**Hiba szöveg:** `mt-1.5 text-xs text-[#E8271A]`.
**Checkbox címke:** kártyaszerű pill.

```
flex items-center gap-3 rounded border border-line bg-bg px-3.5 py-3
text-sm text-ink hover:border-silver/50 transition-colors
```

### 5.5 Navbar

- Fixed, `h-16`, `border-b border-line/60`, `bg-bg/80 backdrop-blur-xl`.
- Balra: logo (SVG, `h-7`).
- Középen (desktop): text link-ek `text-sm text-muted hover:text-ink`.
- Dropdown: hover-alapú, `panel` háttér, `rounded-lg`, `shadow-2xl shadow-black/60`, minden item bal oldalán színes „dot" a kategória accent színével + `box-shadow: 0 0 8px <accent>`.
- Jobbra: nyelv-toggle (mono, 2 gomb pill), elsődleges CTA gomb.

### 5.6 Footer

- `border-t border-line/50 bg-surface/40`.
- 3 oszlopos grid: logo + tagline + social | sub-brand linkek | nav linkek.
- Legalja: `border-t border-line/50 pt-7` fölött `font-mono text-xs text-muted` legal sor.

---

## 6. Ikonok

- **Kizárólag Lucide React** (`lucide-react`).
- **Alap méret:** `size={20}` inline szöveg mellett, `size={24}` kártya headerben, `size={84} strokeWidth={1.25}` display-panelben.
- **StrokeWidth** kártyáknál `1.5`, hero display-eknél `1.25` — vékonyabb, technikaibb hatás.
- **Szín:** ha semleges → `text-silver` vagy `text-muted`; ha branded → inline `style={{ color: <accent> }}`.

---

## 7. Mozgás (Framer Motion)

### 7.1 Filozófia
- **Csak entrance és hover.** Semmi loop, semmi „figyelemhívó lengetés".
- **Reduced motion tiszteletben tartva:** `<MotionConfig reducedMotion="user">` a gyökér providerben, `@media (prefers-reduced-motion: reduce) { animation-duration: 0.01ms !important; }` a CSS-ben.

### 7.2 Belépő animációk

**Hero headline / CTA blokk (page load):**
```ts
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1..0.3, ease: [0.22, 1, 0.36, 1] }}
```

**Hero kártya-strip (staggered):**
- `translateY(24px) → 0`
- `opacity 0 → 1`
- **60 ms delay a kártyák között** (`delay: 0.45 + index * 0.06`)
- `duration: 0.5`, `ease: "easeOut"`

**Scroll reveal (`<Reveal>` wrapper):**
```ts
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
```
`delay` értékek: `index * 0.05..0.08` staggerhez.

### 7.3 Hover

- **Kártya scale:** `scale(1.02)` + glow intenzitás növelés, `150ms ease-out`.
- **Gomb accent:** `scale(1.02)`, ne color-change.
- **Text link nyíl:** `group-hover:translate-x-1`.
- **Border-color váltás:** `hover:border-silver/40..50`, `150ms`.

**Csak konkrét property-t animálj** (`opacity`, `transform`, `background-color`, `border-color`, `box-shadow`) — **soha ne `transition: all`**, mert eltöri a `transform`-okat.

---

## 8. Háttér-hatások

Ezek hozzák be a „technikai" atmoszférát — mindig sötétben tartva, sose vidáman.

### 8.1 Grid overlay (hero, deep-dive panel)
```css
.hero-grid {
  background-image:
    linear-gradient(to right, rgba(42,42,53,0.35) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(42,42,53,0.35) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%);
}
```

### 8.2 Ambient glow
Radiális gradient az accent színből átlátszóba, `opacity: 0.07..0.2`, hero mögé vagy CTA banner mögé, dekoratívan.

### 8.3 Grain / noise overlay
Egész oldalra `body::after` fixed layer, SVG turbulence feltöltéssel, `opacity: 0.03`, `pointer-events: none`. Prémium, mozifilm érzet.

---

## 9. Kiemelt „szignatúra" elemek

Ezek nélkül az arculat nem SIROTECH-jellegű:

1. **Accent-glow kártya-strip** — a hero központi elem, staggered belépéssel, hover-nél intenzívebb glow-val.
2. **Mono uppercase label** eyebrow-ként minden szekció fölött.
3. **Grid overlay + noise** háttéren.
4. **Bal-igazított, aszimmetrikus hero** — sose középre igazított.
5. **Silver/ink CTA-k a semleges „umbrella" szintén, accent CTA-k csak brand-kontextusban.**

---

## 10. Adaptálási recept — így alakítsd át a meglévő al-brand oldalt

Bármely al-brand oldal (sironic.hu, siro-véd.hu, sirovill.hu, sirosoft.hu vagy egy jövőbeli új) átalakítása 8 lépésben, **a tartalom megtartásával**:

**Első lépésként állapítsd meg, melyik al-brandről van szó, és keresd ki a hozzá tartozó accent HEX-et a 2.3 pontból.** A továbbiakban ez lesz az egyetlen accent az egész oldalon — mindenhol ezt használd, ahol a példa `<accent>`-et említ (chip, ikon, glow, primary CTA, bullet check).

1. **Cseréld le a teljes színpalettát** a 2. pontban leírtakra. A 2.1 (`bg`, `surface`, `panel`, `line`) és 2.2 (`ink`, `muted`, `silver`) értékei **minden al-brand oldalán azonosak**; ne térj el tőlük. Az accent az al-brand saját 2.3-beli színe.
2. **Cseréld a fontokat**: display → Space Grotesk, body → Inter, kód/label → JetBrains Mono. Alkalmazd a 3.2 pont hierarchiát.
3. **Cseréld le a border-radius értékeket** a 4.3 pont szerint (`rounded-lg`/`rounded`/`rounded-sm`).
4. **Alkalmazd a spacing rendszert** (4.2 pont) — a szekciók padding-jét `py-28`-ra, a fejlécet-tartalom távolságot `mt-14`-re.
5. **Minden szekció fölé eyebrow label** (mono, uppercase). Az umbrella `sirotech.hu` oldalon `text-silver`; al-brand oldalakon az adott brand accent színével (`style={{ color: <accent> }}`).
6. **Cseréld le a gombokat és kártyákat** az 5. pont patternjeire. Az elsődleges CTA az al-brand accent színét kapja (`bg-[<accent>]`), a szöveg fehér vagy `#0A0A0C` a 2.4 kontraszt-szabály szerint.
7. **Cseréld le az ikonokat** Lucide-ra (6. pont). Az al-brand accent színét kapják, ahol vizuális kiemelés kell (bullet check, kártya-headline ikon, hero display icon).
8. **Vezess be motion-t**: `<MotionConfig reducedMotion="user">` wrapper, scroll reveal minden szekcióra, staggered belépés minden kártyagridre a 7. pont értékeivel. Hover state minden kattintható elemre (7.3).

### Amit NE változtass meg (semelyik al-brand oldalon):
- Szekciók sorrendje.
- Szövegek (headline, body, bullet listák).
- Űrlapmezők és kötelezőségük.
- Menü linkek és útvonalak.
- Kép-elrendezés (bal/jobb alternálás megmarad).
- **Az alappaletta (2.1–2.2) és a tipográfia (3.) sose módosul brandenként.**

---

## 11. Tailwind konfig (minimum)

```ts
theme: {
  extend: {
    colors: {
      bg: "#0A0A0C",
      surface: "#111116",
      panel: "#18181F",
      line: "#2A2A35",
      ink: "#F0F0F5",
      muted: "#8888A0",
      silver: "#C0C0D0",
      // + a projekt saját accent színei az adott kategóriákhoz
    },
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      body: ["var(--font-body)", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    },
    maxWidth: { site: "1280px" },
  },
}
```

Kötelező globális CSS-ben a `body::after` grain layer, a `.hero-grid` mintázat, a `.label` osztály (mono uppercase), és a reduced-motion media query — pontos snippet a `/app/frontend/src/app/globals.css`-ben.

---

## 12. Ellenőrzőlista átalakítás után

- [ ] Az alappaletta (`bg #0A0A0C`, `surface #111116`, `panel #18181F`, `line #2A2A35`, `ink #F0F0F5`, `muted #8888A0`) a többi SIROTECH al-brand oldallal **pixelre azonos**.
- [ ] Az oldalon **pontosan egy** al-brand accent szerepel (kivéve az umbrella `sirotech.hu`).
- [ ] Nincs világos háttér sehol (csak a fenti CTA-gombokban az `ink`/`silver`).
- [ ] Nincs sötét szöveg sötét háttéren.
- [ ] Minden szekció fölött ott van a mono uppercase eyebrow.
- [ ] Minden interaktív elemen van hover state (150 ms, konkrét property-vel).
- [ ] Minden szekció fade-in-e csak egyszer fut le, nem loopol.
- [ ] Prefers-reduced-motion tesztelve — az animációk lekapcsolnak.
- [ ] Minden ikon Lucide, egyetlen emoji sincs.
- [ ] A tartalom, a szekciók sorrendje, az űrlapmezők és a linkek nem változtak.
- [ ] Ha az al-brandet átnavigálva vetjük össze az umbrella oldallal (`sirotech.hu` → `sironic.hu` stb.), a hangulat, a spacing és a tipográfia egységes; csak az accent szín cserélődik.

---

**Verzió:** 1.1 — 2026-06-24
**Forrás projekt:** sirotech.hu (SIROTECH Informatikai és Biztonságtechnikai Kft.)
**Használat:** SIROTECH umbrella + minden al-brand oldal (sironic.hu, siroved.hu, sirosoft.hu, sirovill.hu és jövőbeli al-brandek)
