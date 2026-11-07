import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const OUT = '/home/z/my-project/public/images';

const images: Array<[string, string, string]> = [
  // [filename, prompt, size]

  // HERO — inspiration flyer : femme africaine souriante au téléphone
  ['acsf-hero.jpg', 'Elegant happy African businesswoman in white blazer talking on smartphone, smiling warmly, modern Abidjan city skyline background, insurance savings advertising photography, deep navy blue and red color accents, professional studio quality, photorealistic, high quality', '1344x768'],

  // MISSION — gestionnaires de risques
  ['acsf-family.jpg', 'Joyful African family, father mother and two children embracing in bright modern living room, protection and love concept, warm natural light, professional lifestyle photography, photorealistic, high quality', '864x1152'],
  ['acsf-advisor.jpg', 'Professional African insurance advisor in navy suit consulting smiling young couple across desk, showing documents and tablet, modern bright office, corporate photography, photorealistic, high quality', '864x1152'],

  // CARTES SOLUTIONS (5)
  ['acsf-entreprises.jpg', 'African business executives in strategy meeting around modern conference table, documents and charts, corporate insurance advisory, bright office with city view, photorealistic, high quality', '1152x864'],
  ['acsf-particuliers.jpg', 'Young happy African couple planning family budget together at home with laptop and notebook, saving money and life insurance concept, warm cozy light, photorealistic, high quality', '1152x864'],
  ['acsf-sante.jpg', 'Friendly African doctor with stethoscope consulting smiling elderly patient in bright modern clinic, health insurance care concept, photorealistic, high quality', '1152x864'],
  ['acsf-capitaux.jpg', 'Elegant still life of luxury safe vault with golden coins and growing green plant, wealth capital protection concept, deep navy blue background with soft red accent light, premium financial photography, photorealistic, high quality', '1152x864'],
  ['acsf-garantie.jpg', 'Close-up of business handshake over signed contract with fountain pen, financial guarantee and trust concept, modern office, navy blue and red corporate tones, photorealistic, high quality', '1152x864'],

  // ABIDJAN — nous connaître + vidéo + CTA
  ['acsf-abidjan.jpg', 'Aerial panoramic view of Abidjan Plateau business district skyline at golden hour, modern skyscrapers and lagoon, Côte d Ivoire, dramatic warm light, cinematic photography, photorealistic, high quality', '1344x768'],

  // ACTUALITÉS
  ['acsf-news-1.jpg', 'African insurance seminar speaker presenting life insurance savings concepts on stage with large screen, engaged professional audience, modern conference hall, navy and red branding, photorealistic, high quality', '1344x768'],
  ['acsf-news-2.jpg', 'Confident diverse African insurance team standing together smiling in modern office lobby, financial services group photo, professional corporate photography, photorealistic, high quality', '1344x768'],

  // HÉROS DE PAGES INTÉRIEURES
  ['acsf-sante-hero.jpg', 'African healthcare professionals doctors and nurses walking confidently in bright modern hospital corridor, health insurance concept, optimistic light, photorealistic, high quality', '1344x768'],
  ['acsf-carrieres.jpg', 'Young ambitious African professionals collaborating and smiling in bright modern workspace, careers recruitment concept, corporate photography, photorealistic, high quality', '1344x768'],
  ['acsf-contact.jpg', 'Welcoming reception desk of modern corporate insurance office in Abidjan, professional African receptionist greeting client, bright professional interior, photorealistic, high quality', '1344x768'],
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const zai = await ZAI.create();
  const only = process.argv[2];
  for (const [name, prompt, size] of images) {
    if (only && name !== only) continue;
    const out = `${OUT}/${name}`;
    if (existsSync(out)) { console.log('skip', name); continue; }
    for (let a = 1; a <= 5; a++) {
      try {
        const res = await zai.images.generations.create({ prompt, size });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('no data');
        writeFileSync(out, Buffer.from(b64, 'base64'));
        console.log('OK', name, size);
        break;
      } catch (e: any) {
        console.error('ERR', name, a, e?.message || e);
        if (a === 5) console.error('FAILED', name);
        const wait = 20000 * a;
        console.log(`waiting ${wait / 1000}s...`);
        await new Promise(r => setTimeout(r, wait));
      }
    }
    // Espacer les requêtes pour éviter le 429
    await new Promise(r => setTimeout(r, 12000));
  }
  console.log('IMAGES DONE');
}
main();
