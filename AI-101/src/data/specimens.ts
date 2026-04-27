const CATEGORY_THEME: Record<string, { fill: string; accent: string; badge: string; group: string }> = {
  Geology: {
    fill: '#2a4b3d',
    accent: '#8fbc9a',
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
]

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function makePlaceholder(name: string, category: keyof typeof CATEGORY_THEME, variant = 0) {
  const theme = CATEGORY_THEME[category]
  const shade = variant % 2 === 0 ? theme.fill : theme.accent
  const highlight = variant % 2 === 0 ? theme.accent : theme.fill
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${shade}" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" rx="32" />
      <circle cx="${260 + variant * 28}" cy="${200 + variant * 18}" r="170" fill="${highlight}" fill-opacity="0.18" />
      <circle cx="${940 - variant * 22}" cy="${640 - variant * 16}" r="220" fill="${highlight}" fill-opacity="0.14" />
      <rect x="110" y="110" width="980" height="680" rx="30" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.22" />
      <text x="600" y="405" text-anchor="middle" fill="#ffffff" font-family="Barlow, Arial, sans-serif" font-size="96" font-weight="700">${name}</text>
      <text x="600" y="490" text-anchor="middle" fill="#ffffff" fill-opacity="0.78" font-family="Barlow, Arial, sans-serif" font-size="34" letter-spacing="6">${theme.group.toUpperCase()}</text>
    </svg>
  `
  return svgToDataUri(svg)
}

const summaries = SPECIMEN_SEEDS.map((seed) => {
  const theme = CATEGORY_THEME[seed.category]
  return {
    ...seed,
    img: makePlaceholder(seed.name, seed.category),
    badge: theme.badge,
    badgeClass:
      seed.category === 'Geology'
        ? 'badge-geo'
        : seed.category === 'Paleontology'
          ? 'badge-paleo'
          : seed.category === 'Mineral'
            ? 'badge-min'
            : 'badge-gem',
  }
})

export const allSpecimens = summaries
export const featuredSpecimens = summaries.slice(4, 10)

export function getSpecimenById(id: string) {
  return summaries.find((specimen) => specimen.id === id) ?? null
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
    repository: `Department of ${specimen.category === 'Geology' ? 'Geology' : specimen.category === 'Paleontology' ? 'Earth Sciences' : 'Mineralogy'}, Chulalongkorn University`,
    location: `${specimen.origin} Reference Collection Site`,
    description: `${specimen.name} is presented here as a mock educational specimen detail entry. The content mirrors how GEO HUB can structure descriptive, contextual, and analytical data for browsing and classroom use.`,
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
      ['Color Range', specimen.category === 'Geology' ? 'Dark gray to black' : specimen.category === 'Mineral' ? 'Blue-green to clear' : 'Mock reference palette'],
      ['Hardness (Mohs)', specimen.category === 'Geology' ? '5.5 - 6' : specimen.category === 'Mineral' ? '4 - 7' : 'Mock value'],
    ],
    properties: [
      ['Origin', specimen.origin],
      ['Collection Date', collectionDate],
      ['Repository', `GEO HUB ${theme.group}`],
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
      ['Coordinates', '64.6355 N, 21.7300 W'],
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
