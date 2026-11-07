#!/usr/bin/env python3
"""Extract structured content from fetched ascoma.com pages into JSON."""
import re, json, html as H, os, sys

def clean(t):
    t = re.sub(r'<[^>]+>', '', t)
    t = H.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()

def extract(path):
    raw = open(path).read()
    # Title & meta
    title = re.search(r'<title>([^<]*)</title>', raw)
    title = title.group(1) if title else ''
    desc = re.search(r'name="description" content="([^"]*)"', raw)
    desc = desc.group(1) if desc else ''

    # body minus scripts/styles
    body = raw[raw.find('<body'):]
    body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', body, flags=re.S)

    # headings in order with context
    blocks = []
    for m in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>', body, re.S):
        t = clean(m.group(2))
        if t:
            blocks.append({'type': m.group(1), 'text': t})

    # paragraphs (elementor text-editor + p)
    paras = []
    for m in re.finditer(r'<p[^>]*>(.*?)</p>', body, re.S):
        t = clean(m.group(1))
        if t and len(t) > 2:
            paras.append(t)

    # list items
    lis = []
    for m in re.finditer(r'<li[^>]*>(.*?)</li>', body, re.S):
        t = clean(m.group(1))
        if t:
            lis.append(t)

    # buttons/links labels
    links = []
    for m in re.finditer(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', body, re.S):
        t = clean(m.group(2))
        if t:
            links.append({'text': t, 'href': m.group(1)})

    # images
    imgs = []
    for m in re.finditer(r'<img[^>]*src="([^"]+)"[^>]*>', body):
        src = m.group(1)
        if 'wp-content/uploads' in src:
            alt = re.search(r'alt="([^"]*)"', m.group(0))
            imgs.append({'src': src, 'alt': alt.group(1) if alt else ''})

    # videos
    vids = re.findall(r'(https://ascoma\.com/wp-content/uploads/[^"]+\.(?:mp4|webm))', raw)

    return {'title': title, 'description': desc, 'headings': blocks,
            'paragraphs': paras, 'lists': lis, 'links': links,
            'images': imgs, 'videos': list(dict.fromkeys(vids))}

def main():
    pages_dir = '/home/z/my-project/scripts/pages'
    out = {}
    for f in sorted(os.listdir(pages_dir)):
        if not f.endswith('.html'): continue
        name = f[:-5]
        try:
            out[name] = extract(os.path.join(pages_dir, f))
        except Exception as e:
            print('ERR', name, e)
    json.dump(out, open('/home/z/my-project/scripts/content.json', 'w'), ensure_ascii=False, indent=1)
    print('pages:', len(out))
    for k, v in out.items():
        print(f"{k}: H={len(v['headings'])} P={len(v['paragraphs'])} IMG={len(v['images'])} VID={len(v['videos'])}")

if __name__ == '__main__':
    main()
