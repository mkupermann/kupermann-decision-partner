# Publication figures

Editable SVG figures and PNG exports for **Kupermann Decision Partner**.

| Figure | English | German | SVG dimensions | PNG dimensions |
|---|---|---|---|---|
| Decision cycle | `decision-cycle.en.svg` | `decision-cycle.de.svg` | 1280 × 1320 | 2560 × 2640 |
| Responsibilities | `responsibilities.en.svg` | `responsibilities.de.svg` | 1280 × 1160 | 2560 × 2320 |
| Illustrative pilot | `pilot-case.en.svg` | `pilot-case.de.svg` | 1280 × 1440 | 2560 × 2880 |
| Hero | `hero.en.svg` | — | 1600 × 840 | 3200 × 1680 |

Every PNG has the same basename followed by `@2x.png`. Prefer SVG for the web and PNG for applications that cannot import SVG reliably.

## Design and accessibility

- Cream `#faf8f2`, paper `#f5f2e8`, ink `#141413`, secondary text `#6b6862`, rust `#b8532e`.
- Display type uses Georgia with Cambria and serif fallbacks. Body type uses Segoe UI with Arial and sans-serif fallbacks. Fonts remain editable and are not bundled.
- SVGs include a title, a description and an explicit language. Add meaningful `alt` text when embedding them with HTML or Markdown; embedded SVG titles do not replace an image's alt text.
- Body text in the explanatory figures is at least 28 pixels at the source size. The figures were visually inspected at 640 pixels wide, where labels and explanatory text remain legible.
- On narrow phones, provide the key explanation in normal article text and allow readers to open the full figure. A fixed-layout figure does not reflow like HTML.
- The pilot is explicitly fictional. It illustrates arithmetic and selection limitations, not measured effectiveness. Capacity value is not automatically a cash saving.

## Rebuild

Requirements: Node.js and the `sharp` package. From this directory:

```sh
npm install --no-save sharp
node generate-figures.cjs
```

`SHARP_MODULE` can point to an existing Sharp installation. An optional argument saves 640-pixel review renders to a separate directory:

```sh
node generate-figures.cjs path/to/review-images
```

The generator writes only these SVG and PNG assets plus optional review renders. Raster typography may differ when the listed fonts are not installed; review regenerated images on the target platform.

## Suggested alternative text

**Decision cycle, English:** Six stages: frame the decision, set criteria, develop options, investigate selectively, challenge the recommendation, and recommend and revisit. If an assumption fails, return to the relevant stage. The human makes the decision.

**Decision cycle, German:** Sechs Schritte: Problem klären, Kriterien festlegen, Optionen entwickeln, gezielt untersuchen, Empfehlung hinterfragen sowie empfehlen und überprüfen. Wenn eine Annahme nicht hält, wird der passende Schritt wieder aufgenommen. Der Mensch entscheidet.

**Responsibilities, English:** The human owns goals, values, trade-offs, risk acceptance and the decision. AI supports options, research, calculations, challenge and the decision brief. Evidence is checked together.

**Responsibilities, German:** Der Mensch verantwortet Ziele, Werte, Abwägungen, Risiken und die Entscheidung. Die KI unterstützt mit Optionen, Recherche, Berechnungen, Gegenprüfung und Entscheidungsvorlage. Die Evidenz wird gemeinsam geprüft.

**Pilot, English:** Fictional calculation: six reported minutes saved less four minutes of omitted review equals two net minutes. Applied to 14,400 routine cases, this yields 480 hours and EUR 24,000 capacity value. After the licence, EUR 6,000 remains annually; after one-off integration, the first-year balance is minus EUR 6,000. Selection bias and cash realization still require validation.

**Pilot, German:** Fiktive Rechnung: Sechs Minuten gemeldete Ersparnis abzüglich vier Minuten nicht erfasster Nachprüfung ergeben zwei Minuten netto. Bei 14.400 Routinefällen sind das 480 Stunden und 24.000 Euro Kapazitätswert. Nach der Lizenz bleiben jährlich 6.000 Euro, nach einmaliger Integration im ersten Jahr minus 6.000 Euro. Auswahlverzerrung und tatsächlich realisierbare Einsparungen sind noch zu prüfen.

**Hero, English:** Kupermann Decision Partner. Established methods. Accountable decisions. An agent skill for advisers and decision-makers. Evidence informs. People decide.

## Quality check

All seven figures were rendered and individually inspected at 640 pixels wide. Both language variants show complete text without clipping or overlapping labels. The PNG dimensions were checked after export. The illustrative calculation was checked: 6 − 4 = 2; 24,000 × 0.60 = 14,400; 14,400 × 2 ÷ 60 = 480; 480 × 50 = 24,000; 24,000 − 18,000 = 6,000; 6,000 − 12,000 = −6,000.
