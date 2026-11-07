import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';

async function main() {
  const url = process.argv[2];
  const out = process.argv[3];
  try {
    const zai = await ZAI.create();
    const res = await zai.functions.invoke('page_reader', { url });
    console.log('code:', res.code, 'title:', res.data?.title, 'url:', res.data?.url);
    const html = res.data?.html || '';
    writeFileSync(out, html);
    console.log('saved', html.length, 'chars to', out);
  } catch (e: any) {
    console.error('ERROR:', e?.message || e);
    process.exit(1);
  }
}
main();
