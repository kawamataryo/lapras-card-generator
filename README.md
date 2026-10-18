<p style="text-align: center">
<a href="https://lapras-card-generator.vercel.app"><img src="https://lapras-card-generator.vercel.app/api/svg?type=tech&e=4.12&ep=8.00&g=4.30&ta=3.10&te=2.40&tg=4.60&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja" width="400"></a>
</p>

## LAPRAS Card Generator

Tool to generate awesome [LAPRAS](https://lapras.com) Score images.


* [Generator](https://lapras-card-generator.vercel.app)

### Classic Card

The original card shows the three LAPRAS scores (Engineering / Business / Influence).

<p style="text-align: center">
<a href="https://lapras-card-generator.vercel.app"><img src="https://lapras-card-generator.vercel.app/api/svg?e=4.22&b=3.51&i=2.28&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja" width="400"></a>
</p>

| Param | Description | Default when omitted |
| --- | --- | --- |
| `e` | Engineering score (0.00–5.00) | `4.22` |
| `b` | Business score (0.00–5.00) | `2.28` |
| `i` | Influence score (0.00–5.00) | `3.51` |
| `b1` / `b2` | Background gradient colors | `#020E27` / `#0E5593` |
| `i1` / `i2` | Icon gradient colors | `#030E21` / `#1688BF` |
| `l` | Language, `ja` or `en` | `ja` |
| `u` | LAPRAS public share id — fetches scores from `https://lapras.com/public/<u>.json` instead of `e`/`b`/`i` | - |

### Tech Card

LAPRAS's public profile page currently only surfaces the technical (Engineering) score — the Business/Influence scores shown on the classic card above are no longer displayed there. To match that, this generator also offers a Tech Card that focuses on the technical score and its breakdown (GitHub / tech articles / tech events / skill tag count).

Add `type=tech` and use these parameters instead of `b` / `i`:

| Param | Description | When omitted |
| --- | --- | --- |
| `type` | Set to `tech` to use this card. Any other value (or omitted) keeps the classic card, byte-identical to before | classic card |
| `e` | Engineering score (0.00–5.00) | `4.22` |
| `ep` | Top percentile, already inverted (`100 - percentile`), e.g. `8.00` for "top 8%" | the percentile row is hidden |
| `g` | GitHub score (0.00–5.00) | shown as `-.--` with an empty bar |
| `ta` | Tech article score (0.00–5.00) | shown as `-.--` with an empty bar |
| `te` | Tech event score (0.00–5.00) | shown as `-.--` with an empty bar |
| `tg` | Skill tag count score (0.00–5.00) | shown as `-.--` with an empty bar |
| `b1` / `b2` / `i1` / `i2` / `l` / `u` | Same as the classic card. When using `u`, the tech card automatically falls back to the classic card if the fetched profile doesn't include a technical score breakdown yet | - |

Example:

```
https://lapras-card-generator.vercel.app/api/svg?type=tech&e=4.12&ep=8.00&g=4.30&ta=3.10&te=2.40&tg=4.60&l=ja
```

### Related

* [LAPRAS Card Readme](https://github.com/marketplace/actions/lapras-card-readme)

### Image API

Social preview metadata uses `/api/png`. The unused `/api/og` endpoint has been
removed; use `/api/png` for PNG images and `/api/svg` for SVG images.
