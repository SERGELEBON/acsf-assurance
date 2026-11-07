import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const OUT = '/home/z/my-project/public/images/pays';

const countries: Array<[string, string]> = [
  ['cote-divoire', 'Abidjan Ivory Coast skyline with lagoon Plateau business district and modern towers, golden light, photorealistic, cinematic, high quality'],
  ['burkina-faso', 'Ouagadougou Burkina Faso city view, modern buildings and streets, warm sunlight, photorealistic, cinematic, high quality'],
  ['niger', 'Niamey Niger riverside city view, Niger river with boats and modern buildings, warm golden light, photorealistic, cinematic, high quality'],
  ['benin', 'Cotonou Benin cityscape, red star square and modern buildings, coastal light, photorealistic, cinematic, high quality'],
  ['togo', 'Lome Togo waterfront cityscape, palm trees and modern avenue, warm tropical light, photorealistic, cinematic, high quality'],
  ['senegal', 'Dakar Senegal corniche oceanfront with African Renaissance Monument, blue Atlantic, bright light, photorealistic, cinematic, high quality'],
  ['guinee-conakry', 'Conakry Guinea coastal city view, mosque and waterfront, tropical light, photorealistic, cinematic, high quality'],
  ['mali', 'Bamako Mali city view over Niger river, bridges and hills, golden hour, photorealistic, cinematic, high quality'],
  ['mauritanie', 'Nouakchott Mauritania city view, wide boulevards and desert light, warm tones, photorealistic, cinematic, high quality'],
  ['cameroun', 'Douala Cameroon cityscape, modern towers and riverfront, tropical business district, photorealistic, cinematic, high quality'],
  ['burundi', 'Bujumbura Burundi lakeside city view on Lake Tanganyika with mountains, bright tropical light, photorealistic, cinematic, high quality'],
  ['rca', 'Bangui Central African Republic riverside view on Ubangi river, tropical cityscape, warm light, photorealistic, cinematic, high quality'],
  ['tchad', 'N Djamena Chad city view, modern avenues and Sahel light, warm golden tones, photorealistic, cinematic, high quality'],
  ['guinee-equatoriale', 'Malabo Equatorial Guinea coastal city with colonial architecture and volcano backdrop, tropical light, photorealistic, cinematic, high quality'],
  ['rwanda', 'Kigali Rwanda panoramic skyline, clean modern African city with green hills, bright blue sky, photorealistic, cinematic, high quality'],
  ['gabon', 'Libreville Gabon seaside boulevard with modern buildings, oceanfront, tropical light, photorealistic, cinematic, high quality'],
  ['congo', 'Brazzaville Congo skyline with Congo river, modern towers, warm light, photorealistic, cinematic, high quality'],
  ['rdc', 'Kinshasa DR Congo city skyline on Congo river, modern towers, vibrant warm light, photorealistic, cinematic, high quality'],
  ['madagascar', 'Antananarivo Madagascar hillside city with red brick architecture and rice paddies, soft light, photorealistic, cinematic, high quality'],
  ['ghana', 'Accra Ghana modern waterfront cityscape, Independence Arch area, golden light, photorealistic, cinematic, high quality'],
  ['monaco', 'Monaco Monte Carlo harbor with luxury yachts and hillside city, French Riviera, bright Mediterranean light, photorealistic, cinematic, high quality'],
  ['paris', 'Paris La Defense business district skyline with modern glass towers at dusk, elegant blue hour light, photorealistic, cinematic, high quality'],
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const zai = await ZAI.create();
  for (const [name, prompt] of countries) {
    const out = `${OUT}/${name}.jpg`;
    if (existsSync(out)) { console.log('skip', name); continue; }
    for (let a = 1; a <= 3; a++) {
      try {
        const res = await zai.images.generations.create({ prompt, size: '1344x768' });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('no data');
        writeFileSync(out, Buffer.from(b64, 'base64'));
        console.log('OK', name);
        break;
      } catch (e: any) {
        console.error('ERR', name, a, e?.message || e);
        if (a === 3) console.error('FAILED', name);
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }
  console.log('COUNTRY IMAGES DONE');
}
main();
