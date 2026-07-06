const CATEGORY_THEME: Record<string, { fill: string; accent: string; badge: string; group: string }> = {
  Geology: {
    fill: '#3d4b64',
    accent: '#beab6d',
    badge: 'GEOLOGY',
    group: 'Rock Archive',
  },
  Paleontology: {
    fill: '#6a5132',
    accent: '#d7b78b',
    badge: 'PALEONTOLOGY',
    group: 'Fossil Archive',
  },
  Mineral: {
    fill: '#214f66',
    accent: '#9ed7e8',
    badge: 'MINERAL',
    group: 'Mineral Collection',
  },
  Gemstones: {
    fill: '#5b3d68',
    accent: '#ddb6ef',
    badge: 'GEMSTONE',
    group: 'Gem Archive',
  },
  Petrology: {
    fill: '#4c4135',
    accent: '#c2aa8f',
    badge: 'PETROLOGY',
    group: 'Petrology Archive',
  },
  Gemology: {
    fill: '#5a3158',
    accent: '#ebb5dc',
    badge: 'GEMOLOGY',
    group: 'Gemology Archive',
  },
  Astronomy: {
    fill: '#243349',
    accent: '#a6c0df',
    badge: 'ASTRONOMY',
    group: 'Meteorite Archive',
  },
  Pedology: {
    fill: '#5b4a2f',
    accent: '#d5bf97',
    badge: 'PEDOLOGY',
    group: 'Soil Archive',
  },
  Other: {
    fill: '#3b4552',
    accent: '#b9c3d1',
    badge: 'OTHER',
    group: 'Reference Archive',
  },
}

type SpecimenSeed = {
  name: string
  id: string
  origin: string
  category: keyof typeof CATEGORY_THEME
  subcategory: string
}

const SPECIMEN_SEEDS: SpecimenSeed[] = [
  { name: 'Banded Iron Formation', id: 'GEO-00125', origin: 'Australia', category: 'Geology', subcategory: 'Sedimentary Rock' },
  { name: 'Ammonite sp.', id: 'PAL-00078', origin: 'Morocco', category: 'Paleontology', subcategory: 'Marine Fossil' },
  { name: 'Fluorite', id: 'MIN-00234', origin: 'China', category: 'Mineral', subcategory: 'Halide Mineral' },
  { name: 'Ruby (Corundum)', id: 'GEM-00056', origin: 'Myanmar', category: 'Gemstones', subcategory: 'Corundum Gem' },
  { name: 'Basalt', id: 'GEO-00034', origin: 'Iceland', category: 'Geology', subcategory: 'Igneous Rock' },
  { name: 'Trilobite sp.', id: 'PAL-00079', origin: 'Czech Republic', category: 'Paleontology', subcategory: 'Arthropod Fossil' },
  { name: 'Quartz', id: 'MIN-00235', origin: 'Brazil', category: 'Mineral', subcategory: 'Silicate Mineral' },
  { name: 'Sapphire', id: 'GEM-00057', origin: 'Sri Lanka', category: 'Gemstones', subcategory: 'Corundum Gem' },
  { name: 'Granite', id: 'GEO-00056', origin: 'Canada', category: 'Geology', subcategory: 'Igneous Rock' },
  { name: 'Fossil Coral', id: 'PAL-00080', origin: 'Indonesia', category: 'Paleontology', subcategory: 'Marine Fossil' },
  { name: 'Pyrite', id: 'MIN-00236', origin: 'Peru', category: 'Mineral', subcategory: 'Sulfide Mineral' },
  { name: 'Emerald (Beryl)', id: 'GEM-00058', origin: 'Colombia', category: 'Gemstones', subcategory: 'Beryl Gem' },
  { name: 'Sandstone', id: 'GEO-00057', origin: 'USA', category: 'Geology', subcategory: 'Sedimentary Rock' },
  { name: 'Brachiopod', id: 'PAL-00081', origin: 'UK', category: 'Paleontology', subcategory: 'Marine Fossil' },
  { name: 'Calcite', id: 'MIN-00237', origin: 'Mexico', category: 'Mineral', subcategory: 'Carbonate Mineral' },
  { name: 'Topaz', id: 'GEM-00059', origin: 'Pakistan', category: 'Gemstones', subcategory: 'Silicate Gem' },
  { name: 'Obsidian', id: 'GEO-00058', origin: 'Iceland', category: 'Geology', subcategory: 'Volcanic Glass' },
  { name: 'Mosasaur Tooth', id: 'PAL-00082', origin: 'Morocco', category: 'Paleontology', subcategory: 'Vertebrate Fossil' },
  { name: 'Malachite', id: 'MIN-00238', origin: 'Congo', category: 'Mineral', subcategory: 'Carbonate Mineral' },
  { name: 'Diamond', id: 'GEM-00060', origin: 'South Africa', category: 'Gemstones', subcategory: 'Native Element Gem' },
  { name: 'Shale', id: 'GEO-00059', origin: 'USA', category: 'Geology', subcategory: 'Sedimentary Rock' },
  { name: 'Fish Fossil', id: 'PAL-00083', origin: 'Brazil', category: 'Paleontology', subcategory: 'Vertebrate Fossil' },
  { name: 'Tourmaline', id: 'MIN-00239', origin: 'Brazil', category: 'Mineral', subcategory: 'Borate Mineral' },
  { name: 'Opal', id: 'GEM-00061', origin: 'Australia', category: 'Gemstones', subcategory: 'Silica Gem' },
  { name: 'Rhyolite', id: 'GEO-00060', origin: 'New Zealand', category: 'Geology', subcategory: 'Igneous Rock' },
  { name: 'Crinoid', id: 'PAL-00084', origin: 'USA', category: 'Paleontology', subcategory: 'Marine Fossil' },
  { name: 'Azurite', id: 'MIN-00240', origin: 'Morocco', category: 'Mineral', subcategory: 'Carbonate Mineral' },
  { name: 'Garnet', id: 'GEM-00062', origin: 'India', category: 'Gemstones', subcategory: 'Silicate Gem' },
  { name: 'Dolomite', id: 'GEO-00061', origin: 'Italy', category: 'Geology', subcategory: 'Carbonate Rock' },
  { name: 'Shark Tooth', id: 'PAL-00085', origin: 'USA', category: 'Paleontology', subcategory: 'Vertebrate Fossil' },
  { name: 'Selenite', id: 'MIN-00241', origin: 'Mexico', category: 'Mineral', subcategory: 'Sulfate Mineral' },
  { name: 'Aquamarine', id: 'GEM-00063', origin: 'Brazil', category: 'Gemstones', subcategory: 'Beryl Gem' },
  { name: 'Peridotite', id: 'GEO-00062', origin: 'Norway', category: 'Geology', subcategory: 'Ultramafic Rock' },
  { name: 'Belemnite', id: 'PAL-00086', origin: 'Germany', category: 'Paleontology', subcategory: 'Marine Fossil' },
  { name: 'Rhodonite', id: 'MIN-00242', origin: 'Russia', category: 'Mineral', subcategory: 'Silicate Mineral' },
  { name: 'Tanzanite', id: 'GEM-00064', origin: 'Tanzania', category: 'Gemstones', subcategory: 'Zoisite Gem' },
  { name: 'Gabbro Thin Section', id: 'PET-00021', origin: 'South Africa', category: 'Petrology', subcategory: 'Igneous Petrography' },
  { name: 'Schist Hand Sample', id: 'PET-00022', origin: 'Nepal', category: 'Petrology', subcategory: 'Metamorphic Petrography' },
  { name: 'Spinel Reference Cut', id: 'GML-00011', origin: 'Myanmar', category: 'Gemology', subcategory: 'Colored Stone Study' },
  { name: 'Morganite Facet Set', id: 'GML-00012', origin: 'Brazil', category: 'Gemology', subcategory: 'Facet-grade Analysis' },
  { name: 'Chondrite Meteorite', id: 'AST-00031', origin: 'Namibia', category: 'Astronomy', subcategory: 'Stony Meteorite' },
  { name: 'Iron Meteorite Slice', id: 'AST-00032', origin: 'Argentina', category: 'Astronomy', subcategory: 'Metallic Meteorite' },
  { name: 'Laterite Soil Profile', id: 'PED-00041', origin: 'Thailand', category: 'Pedology', subcategory: 'Tropical Soil' },
  { name: 'Loess Sediment Core', id: 'PED-00042', origin: 'China', category: 'Pedology', subcategory: 'Aeolian Soil Record' },
  { name: 'Teaching Reference Kit', id: 'OTH-00051', origin: 'Thailand', category: 'Other', subcategory: 'Mixed Teaching Collection' },
  { name: 'Comparative Archive Board', id: 'OTH-00052', origin: 'UK', category: 'Other', subcategory: 'Interdisciplinary Reference' },
]

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`
}

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Paleo/geoscience specimen-plate illustrations.
 * Each motif is drawn as an engraved scientific figure (stroke-based) using the
 * category ink + accent, so every mock image reads as part of one collection.
 */
type MotifName =
  | 'ammonite' | 'trilobite' | 'tooth' | 'fish' | 'coral' | 'crinoid' | 'brachiopod'
  | 'belemnite' | 'strata' | 'crystal' | 'gem' | 'meteorite' | 'soil' | 'section'
  | 'grains' | 'plate'

const MOTIFS: Record<MotifName, (ink: string, accent: string) => string> = {
  ammonite(ink, accent) {
    const cx = 600, cy = 430, a = 7, b = 0.165
    const thetaMax = 3.25 * 2 * Math.PI
    let d = ''
    for (let t = 0; t <= thetaMax; t += 0.1) {
      const r = a * Math.exp(b * t)
      d += (d ? 'L' : 'M') + (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy + r * Math.sin(t)).toFixed(1) + ' '
    }
    let ribs = ''
    for (let t = 2; t <= thetaMax; t += 0.32) {
      const r = a * Math.exp(b * t)
      const ri = r * 0.6
      ribs += `<line x1="${(cx + ri * Math.cos(t)).toFixed(1)}" y1="${(cy + ri * Math.sin(t)).toFixed(1)}" x2="${(cx + r * Math.cos(t)).toFixed(1)}" y2="${(cy + r * Math.sin(t)).toFixed(1)}"/>`
    }
    const rMax = a * Math.exp(b * thetaMax)
    return `<circle cx="${cx}" cy="${cy}" r="${(rMax * 1.04).toFixed(0)}" fill="${accent}" fill-opacity="0.14"/>
      <g fill="none" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round">
        <path d="${d}" stroke-width="8"/>
        <g stroke-width="3" stroke-opacity="0.5">${ribs}</g>
      </g>`
  },
  trilobite(ink, accent) {
    let seg = ''
    for (let i = 0; i < 9; i++) {
      const y = 360 + i * 34
      seg += `<path d="M542 ${y} Q 500 ${y + 14} 452 ${y + 6}"/><path d="M658 ${y} Q 700 ${y + 14} 748 ${y + 6}"/>`
    }
    return `<path d="M600 195 C 470 210 430 330 440 470 C 448 600 520 690 600 700 C 680 690 752 600 760 470 C 770 330 730 210 600 195 Z" fill="${accent}" fill-opacity="0.16" stroke="${ink}" stroke-width="7"/>
      <path d="M600 205 C 690 215 715 300 700 360 C 640 384 560 384 500 360 C 485 300 510 215 600 205 Z" fill="${ink}" fill-opacity="0.10" stroke="${ink}" stroke-width="4"/>
      <ellipse cx="600" cy="480" rx="58" ry="180" fill="none" stroke="${ink}" stroke-width="5"/>
      <circle cx="556" cy="300" r="12" fill="none" stroke="${ink}" stroke-width="4"/>
      <circle cx="644" cy="300" r="12" fill="none" stroke="${ink}" stroke-width="4"/>
      <g fill="none" stroke="${ink}" stroke-width="3.5" stroke-opacity="0.7">${seg}</g>`
  },
  tooth(ink, accent) {
    return `<path d="M600 185 C 705 320 700 520 648 640 C 636 668 564 668 552 640 C 500 520 495 320 600 185 Z" fill="${accent}" fill-opacity="0.16" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M556 640 C 548 678 560 700 566 704" fill="none" stroke="${ink}" stroke-width="5"/>
      <path d="M644 640 C 652 678 640 700 634 704" fill="none" stroke="${ink}" stroke-width="5"/>
      <path d="M600 230 C 600 380 600 520 600 620" fill="none" stroke="${ink}" stroke-width="3.5" stroke-opacity="0.45"/>
      <path d="M556 300 C 552 430 560 540 572 610 M644 300 C 648 430 640 540 628 610" fill="none" stroke="${ink}" stroke-width="2.5" stroke-opacity="0.35"/>`
  },
  fish(ink, accent) {
    let ribs = ''
    for (let i = 0; i < 11; i++) {
      const x = 380 + i * 42
      const len = 92 - Math.abs(i - 5) * 8
      ribs += `<path d="M${x} 430 Q ${x - 12} ${430 - len - 22} ${x - 28} ${430 - len}"/><path d="M${x} 430 Q ${x - 12} ${430 + len + 22} ${x - 28} ${430 + len}"/>`
    }
    return `<ellipse cx="600" cy="430" rx="300" ry="150" fill="${accent}" fill-opacity="0.12"/>
      <path d="M320 430 Q 600 405 858 430" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
      <path d="M330 430 C 268 386 268 474 330 430 Z" fill="${ink}" fill-opacity="0.12" stroke="${ink}" stroke-width="6"/>
      <circle cx="308" cy="422" r="9" fill="${ink}"/>
      <g fill="none" stroke="${ink}" stroke-width="3.5">${ribs}</g>
      <path d="M858 430 L 930 372 L 912 430 L 930 488 Z" fill="${accent}" fill-opacity="0.2" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/>`
  },
  coral(ink, accent) {
    const tips = [[452, 300], [568, 300], [628, 306], [736, 300], [512, 336], [676, 336]]
    let dots = ''
    for (const [x, y] of tips) dots += `<circle cx="${x}" cy="${y}" r="13" fill="${accent}" fill-opacity="0.35" stroke="${ink}" stroke-width="5"/>`
    return `<g fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round">
        <path d="M600 700 C 600 610 592 560 588 500"/>
        <path d="M588 520 C 540 470 520 430 512 344"/>
        <path d="M588 520 C 640 470 664 440 676 344"/>
        <path d="M512 404 C 486 360 470 340 452 306"/>
        <path d="M512 404 C 540 362 556 346 568 306"/>
        <path d="M676 404 C 700 360 716 342 736 306"/>
        <path d="M676 404 C 648 362 636 348 628 312"/>
      </g>${dots}`
  },
  crinoid(ink, accent) {
    let stalk = ''
    for (let y = 690; y > 440; y -= 26) stalk += `<ellipse cx="600" cy="${y}" rx="20" ry="12" fill="${accent}" fill-opacity="0.2" stroke="${ink}" stroke-width="4"/>`
    let arms = ''
    for (let i = -3; i <= 3; i++) arms += `<path d="M${600 + i * 10} 400 C ${600 + i * 46} 320 ${600 + i * 72} 250 ${600 + i * 84} 182"/>`
    return `${stalk}<path d="M552 410 Q 600 356 648 410 Q 626 444 574 444 Z" fill="${accent}" fill-opacity="0.2" stroke="${ink}" stroke-width="6"/>
      <g fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round">${arms}</g>`
  },
  brachiopod(ink, accent) {
    let ribs = ''
    for (let i = -5; i <= 5; i++) ribs += `<path d="M600 314 L ${600 + i * 50} 616"/>`
    return `<path d="M600 300 C 380 320 340 520 600 640 C 860 520 820 320 600 300 Z" fill="${accent}" fill-opacity="0.16" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>
      <g fill="none" stroke="${ink}" stroke-width="3.5" stroke-opacity="0.55">${ribs}</g>
      <path d="M540 306 Q 600 278 660 306" fill="none" stroke="${ink}" stroke-width="6"/>
      <path d="M368 402 C 430 556 770 556 832 402" fill="none" stroke="${ink}" stroke-width="4" stroke-opacity="0.5"/>`
  },
  belemnite(ink, accent) {
    return `<path d="M600 180 C 640 260 656 460 640 640 C 632 700 568 700 560 640 C 544 460 560 260 600 180 Z" fill="${accent}" fill-opacity="0.18" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M600 214 L 600 660" stroke="${ink}" stroke-width="3" stroke-opacity="0.5"/>
      <path d="M576 252 L 576 636 M624 252 L 624 636" stroke="${ink}" stroke-width="2.5" stroke-opacity="0.4"/>`
  },
  strata(ink, accent) {
    const ys = [160, 250, 350, 460, 570, 668, 748]
    let bands = ''
    for (let i = 0; i < ys.length - 1; i++) {
      bands += `<rect x="70" y="${ys[i]}" width="1060" height="${ys[i + 1] - ys[i] + 2}" fill="${i % 2 ? accent : ink}" fill-opacity="${i % 2 ? 0.18 : 0.1}"/>`
    }
    let lines = ''
    for (const y of ys.slice(1, -1)) {
      lines += `<path d="M60 ${y} C 300 ${y - 16} 500 ${y + 16} 760 ${y} S 1060 ${y - 14} 1140 ${y}"/>`
    }
    return `<clipPath id="strataFr"><rect x="70" y="160" width="1060" height="588" rx="16"/></clipPath>
      <g clip-path="url(#strataFr)">${bands}
        <g fill="none" stroke="${ink}" stroke-width="4" stroke-opacity="0.5">${lines}</g>
        <circle cx="320" cy="500" r="16" fill="none" stroke="${ink}" stroke-width="3" stroke-opacity="0.4"/>
        <circle cx="820" cy="410" r="12" fill="none" stroke="${ink}" stroke-width="3" stroke-opacity="0.4"/>
      </g>
      <rect x="70" y="160" width="1060" height="588" rx="16" fill="none" stroke="${ink}" stroke-width="6"/>`
  },
  crystal(ink, accent) {
    const prism = (x: number, baseY: number, w: number, h: number) => {
      const top = baseY - h
      return `<path d="M${x - w} ${baseY} L ${x - w} ${top + 30} L ${x} ${top} L ${x + w} ${top + 30} L ${x + w} ${baseY} L ${x} ${baseY + 22} Z" fill="${accent}" fill-opacity="0.18" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M${x - w} ${top + 30} L ${x} ${top + 52} L ${x + w} ${top + 30} M${x} ${top + 52} L ${x} ${baseY + 22}" fill="none" stroke="${ink}" stroke-width="4" stroke-opacity="0.6"/>`
    }
    return `${prism(516, 640, 70, 360)}${prism(668, 660, 58, 300)}${prism(598, 652, 44, 210)}`
  },
  gem(ink, accent) {
    return `<g stroke="${ink}" fill="none" stroke-linejoin="round">
        <polygon points="460,390 545,300 655,300 740,390" fill="${accent}" fill-opacity="0.16" stroke-width="7"/>
        <line x1="545" y1="300" x2="655" y2="300" stroke-width="7"/>
        <path d="M545 300 L520 390 M655 300 L680 390 M600 300 L600 390" stroke-width="3.5" stroke-opacity="0.55"/>
        <polygon points="460,390 740,390 600,672" fill="${accent}" fill-opacity="0.2" stroke-width="7"/>
        <path d="M520 390 L600 672 M680 390 L600 672 M600 390 L600 672" stroke-width="3.5" stroke-opacity="0.55"/>
      </g>`
  },
  meteorite(ink, accent) {
    const pits: [number, number, number][] = [[520, 360, 46], [664, 344, 38], [600, 470, 54], [722, 502, 40], [472, 522, 42], [600, 604, 34]]
    let craters = ''
    for (const [x, y, r] of pits) {
      craters += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r * 0.8).toFixed(0)}" fill="${accent}" fill-opacity="0.18" stroke="${ink}" stroke-width="3.5" stroke-opacity="0.6"/>`
    }
    return `<path d="M600 200 C 760 200 860 320 850 470 C 842 620 720 700 580 692 C 430 684 350 560 372 420 C 388 300 470 210 600 200 Z" fill="${ink}" fill-opacity="0.16" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>${craters}`
  },
  soil(ink, _accent) {
    const bands: [number, number, number][] = [[160, 250, 0.22], [250, 400, 0.14], [400, 570, 0.24], [570, 748, 0.16]]
    let out = ''
    for (const [y0, y1, op] of bands) out += `<rect x="80" y="${y0}" width="1040" height="${y1 - y0}" fill="${ink}" fill-opacity="${op}"/>`
    let dots = ''
    for (let i = 0; i < 72; i++) {
      const x = 108 + ((i * 137) % 1000)
      const y = 180 + ((i * 89) % 540)
      dots += `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="${ink}" fill-opacity="0.28"/>`
    }
    return `<clipPath id="soilFr"><rect x="80" y="160" width="1040" height="588" rx="16"/></clipPath>
      <g clip-path="url(#soilFr)">${out}${dots}</g>
      <rect x="80" y="160" width="1040" height="588" rx="16" fill="none" stroke="${ink}" stroke-width="6"/>`
  },
  section(ink, accent) {
    let grains = ''
    for (let gx = 360; gx < 860; gx += 118) {
      for (let gy = 200; gy < 680; gy += 118) {
        const cx = gx + ((gx * 7) % 40) - 20
        const cy = gy + ((gy * 11) % 40) - 20
        const r = 42 + ((gx + gy) % 34)
        const sides = 5 + ((gx + gy) % 3)
        let pts = ''
        for (let s = 0; s < sides; s++) {
          const a = (s / sides) * 2 * Math.PI + (gx % 5) * 0.3
          pts += `${(cx + r * Math.cos(a)).toFixed(0)},${(cy + r * Math.sin(a)).toFixed(0)} `
        }
        grains += `<polygon points="${pts.trim()}" fill="${(gx + gy) % 2 ? accent : ink}" fill-opacity="${(((gx + gy) % 3) * 0.07 + 0.06).toFixed(2)}" stroke="${ink}" stroke-width="3" stroke-opacity="0.5"/>`
      }
    }
    return `<clipPath id="secFr"><circle cx="600" cy="430" r="288"/></clipPath>
      <circle cx="600" cy="430" r="288" fill="${accent}" fill-opacity="0.1"/>
      <g clip-path="url(#secFr)">${grains}
        <path d="M600 140 L600 720 M312 430 L888 430" stroke="${ink}" stroke-width="2" stroke-opacity="0.28"/>
      </g>
      <circle cx="600" cy="430" r="288" fill="none" stroke="${ink}" stroke-width="8"/>`
  },
  grains(ink, accent) {
    let grains = ''
    for (let gx = 150; gx < 1080; gx += 116) {
      for (let gy = 190; gy < 730; gy += 116) {
        const cx = gx + ((gx * 13) % 54) - 27
        const cy = gy + ((gy * 17) % 54) - 27
        const r = 46 + ((gx * gy) % 38)
        const sides = 5 + ((gx + gy) % 3)
        let pts = ''
        for (let s = 0; s < sides; s++) {
          const a = (s / sides) * 2 * Math.PI + (gy % 7) * 0.2
          pts += `${(cx + r * Math.cos(a)).toFixed(0)},${(cy + r * Math.sin(a)).toFixed(0)} `
        }
        grains += `<polygon points="${pts.trim()}" fill="${(gx + gy) % 2 ? accent : ink}" fill-opacity="${(((gx + gy) % 4) * 0.06 + 0.08).toFixed(2)}" stroke="${ink}" stroke-width="3" stroke-opacity="0.45"/>`
      }
    }
    return `<clipPath id="grFr"><rect x="90" y="160" width="1020" height="588" rx="16"/></clipPath>
      <g clip-path="url(#grFr)">${grains}</g>
      <rect x="90" y="160" width="1020" height="588" rx="16" fill="none" stroke="${ink}" stroke-width="6"/>`
  },
  plate(ink, accent) {
    return `<path d="M470 300 C 640 270 820 340 800 470 C 786 590 640 660 500 630 C 380 606 360 400 470 300 Z" fill="${accent}" fill-opacity="0.16" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M520 360 L620 420 L560 520 M700 420 L640 500" fill="none" stroke="${ink}" stroke-width="4" stroke-opacity="0.5"/>`
  },
}

function resolveMotif(name: string, category: keyof typeof CATEGORY_THEME, variant: number): MotifName {
  if (variant === 11 || variant === 12 || variant === 13) return 'grains'
  if (variant === 14) return 'section'
  const n = name.toLowerCase()
  if (n.includes('ammonite')) return 'ammonite'
  if (n.includes('trilobite')) return 'trilobite'
  if (n.includes('tooth')) return 'tooth'
  if (n.includes('fish')) return 'fish'
  if (n.includes('coral')) return 'coral'
  if (n.includes('crinoid')) return 'crinoid'
  if (n.includes('brachiopod')) return 'brachiopod'
  if (n.includes('belemnite')) return 'belemnite'
  switch (category) {
    case 'Paleontology': return 'ammonite'
    case 'Geology': return 'strata'
    case 'Petrology': return 'section'
    case 'Mineral': return 'crystal'
    case 'Gemstones':
    case 'Gemology': return 'gem'
    case 'Astronomy': return 'meteorite'
    case 'Pedology': return 'soil'
    default: return 'plate'
  }
}

function makePlaceholder(name: string, category: keyof typeof CATEGORY_THEME, variant = 0) {
  const theme = CATEGORY_THEME[category]
  const ink = theme.fill
  const accent = theme.accent
  const motif = resolveMotif(name, category, variant)
  const rot = ((variant % 6) - 2) * 4
  const tint = (0.06 + (variant % 3) * 0.03).toFixed(2)
  const plateNo = String((variant % 6) + 1).padStart(2, '0')
  const label = escapeXml(name)
  const group = escapeXml(theme.group.toUpperCase())
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f7f1e4" />
          <stop offset="1" stop-color="#ece1cd" />
        </linearGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0 H0 V48" fill="none" stroke="${ink}" stroke-opacity="0.06" stroke-width="1.5" />
        </pattern>
      </defs>
      <rect width="1200" height="900" fill="url(#paper)" />
      <rect width="1200" height="900" fill="url(#grid)" />
      <circle cx="250" cy="180" r="360" fill="${accent}" fill-opacity="${tint}" />
      <rect x="34" y="34" width="1132" height="832" rx="26" fill="none" stroke="${ink}" stroke-opacity="0.32" stroke-width="3" />
      <rect x="48" y="48" width="1104" height="804" rx="20" fill="none" stroke="${ink}" stroke-opacity="0.16" stroke-width="1.5" />
      <g transform="rotate(${rot} 600 430)">${MOTIFS[motif](ink, accent)}</g>
      <g stroke="${ink}" stroke-width="4">
        <line x1="960" y1="812" x2="1110" y2="812" />
        <line x1="960" y1="800" x2="960" y2="824" />
        <line x1="1035" y1="802" x2="1035" y2="822" />
        <line x1="1110" y1="800" x2="1110" y2="824" />
      </g>
      <text x="960" y="792" fill="${ink}" fill-opacity="0.7" font-family="'PT Serif', serif" font-size="22" letter-spacing="2">5 cm</text>
      <text x="1118" y="96" text-anchor="end" fill="${ink}" fill-opacity="0.55" font-family="'PT Serif', serif" font-size="24" letter-spacing="4">PLATE ${plateNo}</text>
      <text x="82" y="800" fill="${ink}" font-family="'PT Serif', serif" font-size="36" font-weight="700">${label}</text>
      <text x="84" y="834" fill="${ink}" fill-opacity="0.62" font-family="'PT Serif', serif" font-size="22" letter-spacing="4">${group}</text>
    </svg>
  `
  return svgToDataUri(svg)
}

const CATEGORY_COLOR: Record<keyof typeof CATEGORY_THEME, string> = {
  Geology: 'gray',
  Paleontology: 'gold',
  Mineral: 'blue',
  Gemstones: 'purple',
  Petrology: 'olive',
  Gemology: 'purple',
  Astronomy: 'black',
  Pedology: 'orange',
  Other: 'gray',
}

const NAME_COLOR_OVERRIDES: Array<[RegExp, string]> = [
  [/ruby|garnet|rhodonite/i, 'red'],
  [/sapphire|aquamarine|azurite|fluorite/i, 'blue'],
  [/topaz|pyrite|selenite/i, 'yellow'],
  [/malachite|emerald|peridotite/i, 'olive'],
  [/amethyst|tanzanite|tourmaline|morganite/i, 'purple'],
  [/obsidian|diamond|basalt/i, 'black'],
  [/opal|quartz|calcite|granite|dolomite/i, 'gray'],
]

const PALEO_PERIODS = ['Cambrian', 'Devonian', 'Jurassic', 'Cretaceous', 'Permian']

function resolveColor(name: string, category: keyof typeof CATEGORY_THEME) {
  const override = NAME_COLOR_OVERRIDES.find(([re]) => re.test(name))
  return override ? override[1] : CATEGORY_COLOR[category]
}

const summaries = SPECIMEN_SEEDS.map((seed) => {
  const theme = CATEGORY_THEME[seed.category]
  const idNumber = parseInt(seed.id.replace(/\D/g, ''), 10) || 0
  return {
    ...seed,
    img: makePlaceholder(seed.name, seed.category),
    color: resolveColor(seed.name, seed.category),
    period: seed.category === 'Paleontology' ? PALEO_PERIODS[idNumber % PALEO_PERIODS.length] : '',
    hasCrossSection: idNumber % 2 === 0,
    badge: theme.badge,
    badgeClass:
      seed.category === 'Geology'
        ? 'badge-geo'
        : seed.category === 'Paleontology'
          ? 'badge-paleo'
          : seed.category === 'Mineral'
            ? 'badge-min'
            : seed.category === 'Gemstones'
              ? 'badge-gem'
              : seed.category === 'Petrology'
                ? 'badge-pet'
                : seed.category === 'Gemology'
                  ? 'badge-gml'
                  : seed.category === 'Astronomy'
                    ? 'badge-ast'
                    : seed.category === 'Pedology'
                      ? 'badge-ped'
                      : 'badge-oth',
  }
})

export const allSpecimens = summaries
export const featuredSpecimens = summaries.slice(4, 10)

export function getSpecimenById(id: string) {
  return summaries.find((specimen) => specimen.id === id) ?? null
}

function mockCoordinates(id: string) {
  const n = parseInt(id.replace(/\D/g, ''), 10) || 0
  const lat = ((n * 7.3) % 130) - 55
  const lon = ((n * 11.7) % 340) - 170
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`
}

export function getSpecimenDetail(id: string) {
  const specimen = getSpecimenById(id)
  if (!specimen) return null

  const theme = CATEGORY_THEME[specimen.category]
  const related = summaries.filter((entry) => entry.category === specimen.category && entry.id !== specimen.id).slice(0, 4)
  const collectionDate = specimen.category === 'Geology' ? '12 May 2018' : '21 August 2019'

  return {
    ...specimen,
    heroImages: Array.from({ length: 6 }, (_, index) => ({
      id: `${specimen.id}-${index}`,
      src: makePlaceholder(
        index === 0 ? specimen.name : `${specimen.name} ${['Hand Sample', 'Texture', 'Close-up', 'Microscopy', 'Repository', 'Field View'][index] ?? `View ${index + 1}`}`,
        specimen.category,
        index,
      ),
      alt: `${specimen.name} view ${index + 1}`,
      label: ['Primary', 'Hand Sample', 'Texture', 'Close-up', 'Microscopy', 'Field View'][index] ?? `View ${index + 1}`,
    })),
    breadcrumb: ['Home', 'All Specimens', specimen.category, specimen.name],
    verification: 'Verified',
    collectedBy: specimen.category === 'Paleontology' ? 'Dr. N. Kittiporn' : 'Dr. P. Somchai',
    collectionDate,
    repository: `Department of ${specimen.category === 'Geology' ? 'Geology' : specimen.category === 'Paleontology' ? 'Earth Sciences' : 'Mineralogy'}, xxxxx University`,
    location: `${specimen.origin} Reference Collection Site`,
    description: `${specimen.name} is presented here as a mock educational specimen detail entry. The content mirrors how Paleo Research Group can structure descriptive, contextual, and analytical data for browsing and classroom use.`,
    keyCharacteristics:
      specimen.category === 'Geology'
        ? ['Fine-grained', 'Dark matrix', 'Educational thin section', 'Volcanic origin', 'Teaching sample']
        : specimen.category === 'Paleontology'
          ? ['Preserved morphology', 'Diagnostic ornamentation', 'Collection-grade cast', 'Context metadata', 'Teaching sample']
          : specimen.category === 'Mineral'
            ? ['Crystal habit', 'Diagnostic luster', 'Reference cleavage', 'Color zoning', 'Teaching sample']
            : ['Facet-grade reference', 'Color saturation', 'Transparent sections', 'Mock provenance', 'Teaching sample'],
    classification: [
      ['Kingdom', specimen.category === 'Paleontology' ? 'Animalia' : specimen.category === 'Geology' ? 'Geological Material' : 'Mineralia'],
      ['Group', specimen.subcategory],
      ['Category', specimen.category],
      ['Repository Class', theme.group],
      ['Color Range', specimen.category === 'Geology' ? 'Slate blue to charcoal' : specimen.category === 'Mineral' ? 'Blue to clear' : 'Mock reference palette'],
      ['Hardness (Mohs)', specimen.category === 'Geology' ? '5.5 - 6' : specimen.category === 'Mineral' ? '4 - 7' : 'Mock value'],
    ],
    properties: [
      ['Origin', specimen.origin],
      ['Collection Date', collectionDate],
      ['Repository', `Paleo Research Group ${theme.group}`],
      ['Specimen Type', specimen.subcategory],
      ['Preparation', 'Photographed + catalogued'],
      ['Condition', 'Stable teaching reference'],
    ],
    composition: [
      { name: specimen.category === 'Geology' ? 'Plagioclase' : specimen.category === 'Paleontology' ? 'Calcitic shell' : specimen.category === 'Mineral' ? 'Silicate lattice' : 'Corundum matrix', value: '35-55%', image: makePlaceholder('Component A', specimen.category, 11) },
      { name: specimen.category === 'Geology' ? 'Pyroxene' : specimen.category === 'Paleontology' ? 'Matrix infill' : specimen.category === 'Mineral' ? 'Trace inclusions' : 'Color centers', value: '20-30%', image: makePlaceholder('Component B', specimen.category, 12) },
      { name: specimen.category === 'Geology' ? 'Olivine' : specimen.category === 'Paleontology' ? 'Replacement minerals' : specimen.category === 'Mineral' ? 'Accessory minerals' : 'Growth zoning', value: '5-15%', image: makePlaceholder('Component C', specimen.category, 13) },
    ],
    crossSection: {
      image: makePlaceholder(`${specimen.name} Section`, specimen.category, 14),
      description: `Mock analytical panel for ${specimen.name}. This block can later be replaced with a real thin section, microscopy panel, CT slice, or macro texture plate.`,
    },
    provenance: [
      ['Country', specimen.origin],
      ['Region', 'Reference Teaching Collection'],
      ['Locality', `${specimen.origin} Study Area`],
      ['Coordinates', mockCoordinates(specimen.id)],
    ],
    additionalInformation: [
      ['Texture', specimen.category === 'Geology' ? 'Aphanitic to porphyritic' : 'Reference classroom mock'],
      ['Structure', specimen.category === 'Paleontology' ? 'Preserved outer form' : 'Massive'],
      ['Weathering', 'Slightly weathered'],
      ['Notes', 'This detail page uses placeholder imagery and mock metadata.'],
    ],
    related,
  }
}
