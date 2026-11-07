#!/usr/bin/env python3
"""Extract filiale page data (intro, address, phone, email, director)."""
import re, json, html as H, os

def clean(t):
    t = re.sub(r'<[^>]+>', '', t)
    t = H.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()

def get_main_html(raw):
    """Return body html minus scripts/styles, header nav and footer."""
    body = raw[raw.find('<body'):]
    body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', body, flags=re.S)
    # cut footer: everything from 'Informations légales' footer heading onwards
    fi = body.find('>Informations légales<')
    if fi > 0:
        body = body[:fi]
    return body

countries = ['ascoma-assureurs-conseils','ascoma-international','ascoma-cote-divoire','ascoma-burkina-faso','ascoma-niger','ascoma-benin','ascoma-togo','ascoma-senegal','ascoma-guinee-conakry','ascoma-mali','ascoma-mauritanie','hub-ascoma-cameroun','ascoma-burundi','ascoma-rca','ascoma-tchad','ascoma-guinee-equatoriale','ascoma-rwanda','hub-ascoma-gabon','ascoma-congo','ascoma-rdc','ascoma-madagascar','ascoma-ghana']

out = {}
for c in countries:
    path = f'/home/z/my-project/scripts/pages/{c}.html'
    if not os.path.exists(path):
        print('MISSING', c); continue
    raw = open(path).read()
    body = get_main_html(raw)
    d = {'name': c}
    # Title (h3 first)
    t = re.search(r'<h3[^>]*>([^<]{4,80})</h3>', body)
    d['title'] = clean(t.group(1)) if t else c
    # intro paragraph: first long p after title
    ps = re.findall(r'<p[^>]*>(.*?)</p>', body, re.S)
    ps = [clean(p) for p in ps if clean(p) and len(clean(p)) > 60 and 'Mentions' not in clean(p) and 'cookie' not in clean(p).lower() and 'carrière' not in clean(p)]
    d['intro'] = ps[0] if ps else ''
    # phone
    ph = re.findall(r'\(\+?2?2?\d{1,3}\)[\s\d]{6,}', body)
    d['phone'] = clean(ph[0]) if ph else ''
    if not d['phone']:
        ph2 = re.findall(r'href="tel:([^"]+)"', body)
        d['phone'] = clean(ph2[0]) if ph2 else ''
    # email
    em = re.findall(r'href="mailto:([^"]+)"', body)
    d['email'] = em[0] if em else ''
    # address: find text containing BP or Rue or Avenue or Boulevard near tel
    addr_m = re.findall(r'>([^<]*(?:BP|B\.P|Rue|Avenue|Boulevard|Immeuble|Zone|Route)[^<]*)<', body)
    d['address'] = clean(addr_m[0]) if addr_m else ''
    # director: find h4 followed by role text (Directeur|Directrice)
    dir_m = re.search(r'<h4[^>]*>([^<]{5,60})</h4>\s*(?:<[^>]+>\s*)*<?[^>]*>?([^<]*(?:Directeur|Directrice)[^<]*)', body, re.S)
    if not dir_m:
        dir_m = re.search(r'>([A-ZÀ-Ý][a-zà-ÿ]+ [A-ZÀ-Ý][a-zà-ÿ]+(?: [A-ZÀ-Ý][a-zà-ÿ]+)?)<[^>]*(?:.){0,400}?>([^<]*Directeur[^<]*)', body, re.S)
    d['director'] = clean(dir_m.group(1)) if dir_m else ''
    d['director_role'] = clean(dir_m.group(2)) if dir_m else ''
    # hero image: first big upload image
    im = re.findall(r'data-src="(https://ascoma\.com/wp-content/uploads/[^"]+)"', body)
    d['hero_img'] = im[0] if im else ''
    out[c] = d
    print(c, '| phone:', d['phone'][:20], '| email:', d['email'], '| dir:', d['director'])

json.dump(out, open('/home/z/my-project/scripts/filiales.json', 'w'), ensure_ascii=False, indent=1)
print('saved')
