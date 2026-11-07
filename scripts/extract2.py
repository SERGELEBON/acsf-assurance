#!/usr/bin/env python3
"""Extract structured content from fetched ascoma.com pages into JSON - v2 with cards."""
import re, json, html as H, os

def clean(t):
    t = re.sub(r'<[^>]+>', '', t)
    t = H.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()

def strip_ignored(body):
    # remove nav, footer, cookie banner: keep main content by cutting at known markers
    return body

def extract(path):
    raw = open(path).read()
    title = re.search(r'<title>([^<]*)</title>', raw)
    title = title.group(1) if title else ''
    desc = re.search(r'name="description" content="([^"]*)"', raw)
    desc = desc.group(1) if desc else ''

    body = raw[raw.find('<body'):]
    body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', body, flags=re.S)

    # Sequence walk: headings and paragraphs interleaved (in document order)
    seq = []
    for m in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>|<p[^>]*>(.*?)</p>|<li[^>]*>(.*?)</li>', body, re.S):
        if m.group(1):
            t = clean(m.group(2))
            if t: seq.append({'k': m.group(1), 't': t})
        elif m.group(3) is not None:
            t = clean(m.group(3))
            if t and len(t) > 2: seq.append({'k': 'p', 't': t})
        else:
            t = clean(m.group(4))
            if t: seq.append({'k': 'li', 't': t})

    # videos
    vids = re.findall(r'(https://ascoma\.com/wp-content/uploads/[^"]+\.(?:mp4|webm))', raw)

    # upload images in doc order
    imgs = re.findall(r'data-src="(https://ascoma\.com/wp-content/uploads/[^"]+)"|src="(https://ascoma\.com/wp-content/uploads/[^"]+)"', body)
    imgs = [a or b for a, b in imgs]

    return {'title': title, 'description': desc, 'seq': seq, 'images': imgs, 'videos': list(dict.fromkeys(vids))}

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
    json.dump(out, open('/home/z/my-project/scripts/content2.json', 'w'), ensure_ascii=False, indent=1)
    print('pages:', len(out))

if __name__ == '__main__':
    main()
