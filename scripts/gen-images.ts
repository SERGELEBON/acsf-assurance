import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const OUT = '/home/z/my-project/public/images';

const images: Array<[string, string, string]> = [
  // [filename, prompt, size]
  ['hero-city.jpg', 'Aerial panoramic view of a modern African business district skyline at dusk, Abidjan style with lagoon, warm golden hour light, glass towers, dramatic sky, cinematic, photorealistic, high quality', '1344x768'],
  ['history-industrial.jpg', 'Heavy industrial excavator machinery working in an open coal mine at sunset, dramatic industrial photography, dust and warm light, photorealistic, high quality', '864x1152'],
  ['history-couple.jpg', 'Happy African couple at home, mature man with woman wearing traditional turban, smiling at camera, warm indoor lighting, professional lifestyle photography, photorealistic, high quality', '864x1152'],
  ['card-entreprises.jpg', 'African business professionals in a modern office meeting, team discussing strategy with tablet, corporate photography, bright natural light, photorealistic, high quality', '1152x864'],
  ['card-particuliers.jpg', 'Joyful African family with children at home living room, laughing together, warm lifestyle photography, natural light, photorealistic, high quality', '1152x864'],
  ['card-sante.jpg', 'African doctor with stethoscope smiling in modern hospital, healthcare professional portrait, bright clean medical environment, photorealistic, high quality', '1152x864'],
  ['card-international.jpg', 'Container port with cranes and cargo ships at African harbor, international trade logistics, blue sky, aerial view, photorealistic, high quality', '1152x864'],
  ['card-reassurance.jpg', 'Modern glass skyscrapers viewed from below with dramatic clouds, corporate finance district, blue tones, architectural photography, photorealistic, high quality', '1152x864'],
  ['map-africa.jpg', 'Stylized dark navy map of Africa continent made of glowing light blue dots and network connection lines, modern fintech style, dark background, digital, elegant', '1344x768'],
  ['news-acquisition.jpg', 'Business handshake between two executives in suits, modern office with city view, corporate press photo, professional lighting, photorealistic, high quality', '1344x768'],
  ['news-gouvernance.jpg', 'African board of directors meeting around elegant conference table, corporate governance, modern boardroom, professional photography, photorealistic, high quality', '1344x768'],
  ['sante-hero.jpg', 'African healthcare team of doctors and nurses walking in modern hospital corridor, bright optimistic, medical insurance concept, photorealistic, high quality', '1344x768'],
  ['carrieres-hero.jpg', 'Diverse African office team collaborating and smiling in bright modern workplace, careers recruitment concept, corporate photography, photorealistic, high quality', '1344x768'],
  ['contact-hero.jpg', 'Modern reception desk of corporate office with welcoming staff, African business environment, bright professional, photorealistic, high quality', '1344x768'],
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const zai = await ZAI.create();
  const only = process.argv[2];
  for (const [name, prompt, size] of images) {
    if (only && name !== only) continue;
    const out = `${OUT}/${name}`;
    if (existsSync(out)) { console.log('skip', name); continue; }
    for (let a = 1; a <= 3; a++) {
      try {
        const res = await zai.images.generations.create({ prompt, size });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('no data');
        writeFileSync(out, Buffer.from(b64, 'base64'));
        console.log('OK', name, size);
        break;
      } catch (e: any) {
        console.error('ERR', name, a, e?.message || e);
        if (a === 3) console.error('FAILED', name);
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }
  console.log('IMAGES DONE');
}
main();
