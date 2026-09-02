import os
import re

base = r"c:\Users\Dell\OneDrive\Desktop\python\portfolio\build"
html_files = [
    os.path.join(base, "index.html"),
    os.path.join(base, "services", "index.html"),
    os.path.join(base, "rag", "index.html"),
    os.path.join(base, "about", "index.html"),
    os.path.join(base, "contact", "index.html")
]

missing_refs = []
total_refs = 0

for hf in html_files:
    rel_hf = os.path.relpath(hf, base)
    with open(hf, "r", encoding="utf-8") as f:
        html = f.read()

    # Find src="..."
    srcs = re.findall(r'src=["\'](/[^"\'?#]+)["\']', html)
    # Find href="..." for stylesheets and icons
    hrefs = re.findall(r'<link[^>]+href=["\'](/[^"\'?#]+)["\']', html)

    for ref in srcs + hrefs:
        total_refs += 1
        local_path = os.path.join(base, ref.lstrip("/").replace("/", os.sep))
        if not os.path.exists(local_path):
            missing_refs.append((rel_hf, ref, local_path))

if missing_refs:
    print(f"FAILED: {len(missing_refs)} missing references found!")
    for src_file, ref, path in missing_refs:
        print(f"  In {src_file}: {ref} -> {path} NOT FOUND")
else:
    print(f"PASS: ALL {total_refs} media, stylesheet, script, and icon references exist perfectly on disk!")

print("\n--- Auditing Internal Navigation Links ---")
all_links_ok = True
for hf in html_files:
    rel_hf = os.path.relpath(hf, base)
    with open(hf, "r", encoding="utf-8") as f:
        html = f.read()

    links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html)
    for l in links:
        if l.startswith("http") or l.startswith("mailto:") or l.startswith("https:"):
            continue
        clean_path = l.split("#")[0]
        if clean_path and clean_path not in ["/", "/services/", "/rag/", "/about/", "/contact/"]:
            print(f"  FLAGGED LINK in {rel_hf}: {l}")
            all_links_ok = False

if all_links_ok:
    print("PASS: All internal navigation links point to valid clean routes (/, /services/, /rag/, /about/, /contact/)!")

