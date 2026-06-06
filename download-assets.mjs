import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const ORIGIN = 'https://www.getty.edu/tracingart/'
const OUT = join(process.cwd(), 'public')

const intro = [
  'An-Old-Man-in-Military-Costume','Fly-or-Blister-Beetle_Willow-Bellflower_Gourd_and-Bindweed',
  'GardenGathering','LansdowneHerakles','Madonna-of-the-Cherries','Self-Portrait','Spring',
  'StagRhyton','The-Investiture-of-Sinchi-Roca-by-Manco-Capac','The-Italian-Comedians',
  'Wheatstacks_Snow-Effect_Morning',
]
const stillLife = [
  'Baluster-vase','Bell-Tower-in-Rain-Okayama','Bouquet-of-Flowers-in-a-Vase','Christies-Auction-Room',
  'Country-Store','DP356939','Docks-on-a-Sunday','Family-Group-in-an-Interior',
  'Foreigners-in-the-Drawing-Room-of-Foreign-Merchants-House-in-Yokohama','Girl-in-a-Sailors-Blouse',
  'Helmet','House-of-Bijapur','Irises','Irises-at-Yatsuhashi','Landscape','Mäda-Primavesi',
  'Male-skeleton-walking-behind-a-female-skeleton','Man-with-a-Hoe','MontSainte-Victoire','MrsEthel-Cushing',
  'On-the-Southern-Plains','One-Third-of-a-Nation','Pines-and-Cranes-of-Longevity','Plaque-Warrior-and-Attendants',
  'Portrait-of-James-Christie','Portrait-of-LouisXIV','Portrait-of-Madame-Brunet','Portrait-of-Scholar-Official-Yun-Bonggu',
  'Portrait-of-Sisters-Zenaide-and-Charlotte-Bonaparte','Portrait-of-a-Boy-in-Fancy-Dress','Prestige-Stool-Kou-fo',
  'Self-Portrait-Horace','Seven-Beauties-of-the-Bamboo-Grove','Shooting-the-Rapids','Still-Life',
  'Still-Life-Peaches-SilverGoblet-Grapes','Sun','Taos-Woman','Tapestry-Psyche-at-the-Basketmakers',
  'The-Adoration-of-the-Magi','The-Bird-Catchers','The-Black-Horse','The-Contest-for-the-Bouquet','The-Fitting-Room',
  'The-Grand-Canal-in-Venice-from-Palazzo','The-Harbor','The-Hindu-Goddess-of-Kali','The-Interior-British-Institution-Gallery',
  'The-Promenade','The-Repast-of-the-Lion','The-Street-Pavers','The-Thinker','The-magnet','Two-Women','Vase-carpet',
  'Wallclock','Wheatstacks_Snow-Effect_Morning','Wolves','amsterdam_harbor_scene_2011.3.1','goblet',
]
const worldOfGpi = [
  'A-Mountain-Landscape','A-Wooded-Landscape','Adoration-of-the-Shepherds','Circus-Sideshow','Double-Portrait',
  'Entry-of-the-animals-into-Noahs-Ark','Fox-Dog-Highly-Finished','Horse-Stable','Oleanders','Plate43',
  'Portrait-Of-William-E-Henley','Portrait-of-a-Carthusian','Portrait-of-a-Halberdier','Portrait-of-a-Man',
  'Portrait-of-a-Woman','Saint-Nicholas-of-Bari','SaintPeter','Seaside','Seated-Cupid','Still-Life-with-apples-and-pears',
  'The-Anunciation','The-Music-Lesson','Thomas-Howard','approach_to_venice_1937.1.110','diana_and_endymion_1960.6.2',
  'filippo_cattaneo_1942.9.93','herdsmen_tending_cattle_1937.1.59','maddalena_cattaneo_1942.9.94',
  'marchesa_elena_grimaldi_cattaneo_1942.9.92','the_olive_orchard_1963.10.152','tiger_and_snake_2014.136.30',
  'view_of_dordrecht_from_the_north_2014.136.34','woman-preparing-bread-and-butter',
]
const artistToArtist = [
  'Comtesse-de-la-Châtre','Julie-Le-Brun','Madam-Grand',
  'the_marquise_de_pezay,_and_the_marquise_de_rouge_with_her_sons_alexis_and_adrien_1964.11.1',
]

const jobs = []
const addPainting = (dir, name) => { for (const sz of ['@lg', '@sm']) jobs.push({ rel: `images/getty/${dir}/${name}${sz}.webp`, optional: sz === '@sm' }) }
intro.forEach(n => addPainting('intro', n))
stillLife.forEach(n => addPainting('still-life', n))
worldOfGpi.forEach(n => addPainting('world-of-gpi', n))
artistToArtist.forEach(n => addPainting('artist-to-artist', n))

const sectionImgs = [
  'section-1/ledger','section-1/zoom-img','section-2/transaction-1','section-2/transaction-2-img-1',
  'section-2/transaction-2-img-2','section-2/zoom-img','section-2/zoom-credit',
  'section-2/husband-and-wife/husband','section-2/husband-and-wife/wife',
]
sectionImgs.forEach(p => { for (const sz of ['@lg','@sm']) jobs.push({ rel: `images/${p}${sz}.webp`, optional: true }) })
;[
  'images/section-2/world-of-gpi-title.svg',
  'images/getty-spritesheets/generated/data-viz/metadata.json',
  'fonts/bradford/BradfordLLSub-Regular.woff2',
  'fonts/bradford/BradfordLLSub-Regular.woff',
  'fonts/bradford/BradfordLL-LightItalic.otf',
].forEach(rel => jobs.push({ rel, optional: false }))

let ok = 0, miss = [], failed = []
const exists = async p => { try { await access(p); return true } catch { return false } }
async function run(job){
  const dest = join(OUT, job.rel)
  if (await exists(dest)) { ok++; return }
  try {
    const res = await fetch(ORIGIN + encodeURI(job.rel))
    if (!res.ok) { (job.optional ? miss : failed).push(`${res.status} ${job.rel}`); return }
    const buf = Buffer.from(await res.arrayBuffer())
    await mkdir(dirname(dest), { recursive: true }); await writeFile(dest, buf); ok++
  } catch (e) { failed.push(`ERR ${job.rel} ${e.message}`) }
}
let idx = 0
await Promise.all(Array.from({length:12}, async () => { while (idx < jobs.length) await run(jobs[idx++]) }))
console.log(`OK ${ok}/${jobs.length} · optional-miss ${miss.length} · required-fail ${failed.length}`)
if (failed.length) failed.forEach(f=>console.log('  FAIL '+f))
