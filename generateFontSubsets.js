import { exec } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

const fonts = readdirSync('public/fonts', { withFileTypes: true })

if (!existsSync('public/fonts/subsets')) {
  mkdirSync('public/fonts/subsets')
}

const subsets = [
  ['latin', 'U+0000-00FF'],
  ['latin-ext', 'U+0100-017F,U+0180-024F,U+1E00-1EFF'],
  ['rest', 'U+0250-1DFF,U+1F00-2C5F,U+D800-F8FF,U+FB00-FE2F'],
  [
    'cjk-a',
    'U+2E80-33FF,U+3400-4DFF,U+4E00-5FFF,U+F900-FAFF,U+FF00-FFEF,U+20000-2FA1F'
  ],
  ['cjk-b', 'U+6000-7FFF'],
  ['cjk-c', 'U+8000-9FFF']
]

const layoutFeatures = [
  'vrt2',
  'ccmp',
  'jp04',
  'jp78',
  'jp83',
  'nlck',
  'trad',
  'vert',
  'afrc',
  'frac',
  'zero',
  'numr',
  'liga',
  'dnom',
  'ital',
  'sinf',
  'sups'
].join(',')
const fontFaces = []
const fontWeights = {
  L: 300,
  R: 400,
  M: 500,
  DB: 600,
  B: 700,
  H: 800
}

for (const font of fonts.filter(font => font.isFile())) {
  for (const subset of subsets) {
    const fontWeight = font.name.split('-')[1].split('.')[0]
    const subsetName = `${fontWeight}-${subset[0]}.woff2`
    const subsetPath = `fonts/subsets/${subsetName}`

    console.log(subsetName, subset[1])

    fontFaces.push(`
@font-face {
  font-family: 'Shin Go Pr5';
  font-style: normal;
  font-weight: ${fontWeights[fontWeight]};
  font-display: swap;
  src: url('/${subsetPath}') format('woff2');
  unicode-range: ${subset[1]};
}`)

    await execAsync(
      `pyftsubset public/fonts/${font.name} --output-file=public/${subsetPath} --unicodes="${subset[1]}" --flavor=woff2 --layout-features+="${layoutFeatures}"`
    )
  }
}

writeFileSync('public/fonts/subsets/style.css', fontFaces.join('\n'))
