import os
import shutil

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BUILD_DIR = os.path.join(BASE_DIR, "build")

print(f"Building pure static site from {BASE_DIR} into {BUILD_DIR}...")

os.makedirs(BUILD_DIR, exist_ok=True)

# Copy individual root pages & files
files_to_copy = [
    ("index.html", "index.html"),
    ("services/index.html", "services/index.html"),
    ("rag/index.html", "rag/index.html"),
    ("recruitment/index.html", "recruitment/index.html"),
    ("about/index.html", "about/index.html"),
    ("contact/index.html", "contact/index.html"),
    ("favicon.svg", "favicon.svg"),
    ("favicon.png", "favicon.png"),
    ("favicon.ico", "favicon.ico"),
    ("mylogo.png", "mylogo.png"),
    ("_headers", "_headers"),
    ("llms.txt", "llms.txt"),
    ("robots.txt", "robots.txt"),
    ("sitemap.xml", "sitemap.xml"),
    ("index.html", "404.html"), # 404 fallback
]

for src_rel, dst_rel in files_to_copy:
    src = os.path.join(BASE_DIR, src_rel)
    dst = os.path.join(BUILD_DIR, dst_rel)
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        print(f"Copied: {src_rel} -> {dst_rel}")

# Copy directories: css, js, assets
dirs_to_copy = ["css", "js", "assets"]
for d in dirs_to_copy:
    src_dir = os.path.join(BASE_DIR, d)
    dst_dir = os.path.join(BUILD_DIR, d)
    if os.path.exists(src_dir):
        shutil.copytree(src_dir, dst_dir, dirs_exist_ok=True)
        print(f"Copied directory: {d}/ -> build/{d}/")

print("Static build completed successfully! 100% pure HTML/CSS/JS ready for deployment.")
