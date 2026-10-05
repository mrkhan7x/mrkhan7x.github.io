import sys
from playwright.sync_api import sync_playwright
url,prefix,w=sys.argv[1],sys.argv[2],int(sys.argv[3]); sel=sys.argv[4:]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':w,'height':820 if w>700 else 800})
    msgs=[]
    pg.on('console',lambda m: msgs.append(m.type+': '+m.text) if m.type=='error' and 'ERR_TUNNEL' not in m.text else None)
    pg.on('pageerror',lambda e: msgs.append('PAGEERR '+str(e)))
    pg.goto(url,wait_until='load'); pg.wait_for_timeout(600)
    for i,s in enumerate(sel):
        if s.startswith('y='):
            pg.evaluate(f'window.scrollTo(0,{s[2:]})')
        else:
            pg.evaluate(f'document.querySelector("{s}").scrollIntoView({{block:"start"}})')
        pg.wait_for_timeout(1300)
        pg.screenshot(path=f'{prefix}{i}.png')
    print('\n'.join(msgs[:10]) or 'no console errors')
    b.close()
