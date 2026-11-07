import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, existsSync } from 'fs';

const pages = [
  ['nous-connaitre', 'https://ascoma.com/nous-connaitre/'],
  ['solutions', 'https://ascoma.com/solutions/'],
  ['entreprises', 'https://ascoma.com/entreprises/'],
  ['particuliers', 'https://ascoma.com/particuliers/'],
  ['multi-pays', 'https://ascoma.com/multi-pays/'],
  ['sante', 'https://ascoma.com/sante/'],
  ['reassurance', 'https://ascoma.com/reassurance/'],
  ['ascoma-assureurs-conseils', 'https://ascoma.com/ascoma-assureurs-conseils/'],
  ['ascoma-international', 'https://ascoma.com/ascoma-international/'],
  ['ascoma-cote-divoire', 'https://ascoma.com/ascoma-cote-divoire/'],
  ['ascoma-burkina-faso', 'https://ascoma.com/ascoma-burkina-faso/'],
  ['ascoma-niger', 'https://ascoma.com/ascoma-niger/'],
  ['ascoma-benin', 'https://ascoma.com/ascoma-benin/'],
  ['ascoma-togo', 'https://ascoma.com/ascoma-togo/'],
  ['ascoma-senegal', 'https://ascoma.com/ascoma-senegal/'],
  ['ascoma-guinee-conakry', 'https://ascoma.com/ascoma-guinee-conakry/'],
  ['ascoma-mali', 'https://ascoma.com/ascoma-mali/'],
  ['ascoma-mauritanie', 'https://ascoma.com/ascoma-mauritanie/'],
  ['hub-ascoma-cameroun', 'https://ascoma.com/hub-ascoma-cameroun/'],
  ['ascoma-burundi', 'https://ascoma.com/ascoma-burundi/'],
  ['ascoma-rca', 'https://ascoma.com/ascoma-rca/'],
  ['ascoma-tchad', 'https://ascoma.com/ascoma-tchad/'],
  ['ascoma-guinee-equatoriale', 'https://ascoma.com/ascoma-guinee-equatoriale/'],
  ['ascoma-rwanda', 'https://ascoma.com/ascoma-rwanda/'],
  ['hub-ascoma-gabon', 'https://ascoma.com/hub-ascoma-gabon/'],
  ['ascoma-congo', 'https://ascoma.com/ascoma-congo/'],
  ['ascoma-rdc', 'https://ascoma.com/ascoma-rdc/'],
  ['ascoma-madagascar', 'https://ascoma.com/ascoma-madagascar/'],
  ['ascoma-ghana', 'https://ascoma.com/ascoma-ghana/'],
  ['medias', 'https://ascoma.com/medias/'],
  ['carrieres', 'https://ascoma.com/carrieres/'],
  ['contactez-nous', 'https://ascoma.com/contactez-nous/'],
  ['presse-gouvernance', 'https://ascoma.com/ascoma-assureurs-conseils-renforce-la-gouvernance-de-son-conseil-dadministration/'],
  ['presse-acquisition', 'https://ascoma.com/communique-presse-acquisition-integrale-dascoma/'],
];

async function main() {
  const zai = await ZAI.create();
  const only = process.argv[2];
  for (const [name, url] of pages) {
    if (only && name !== only) continue;
    const out = `/home/z/my-project/scripts/pages/${name}.html`;
    if (existsSync(out)) { console.log('skip', name); continue; }
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await zai.functions.invoke('page_reader', { url });
        const html = res.data?.html || '';
        if (html.length < 2000) throw new Error('too small: ' + html.length);
        writeFileSync(out, html);
        console.log('OK', name, html.length);
        break;
      } catch (e: any) {
        console.error('ERR', name, 'attempt', attempt, e?.message || e);
        if (attempt === 3) {
          writeFileSync(out, '');
        }
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    await new Promise(r => setTimeout(r, 800));
  }
  console.log('DONE');
}
main();
