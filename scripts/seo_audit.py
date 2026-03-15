import sys
import urllib.request
import urllib.parse
import re
import json
import io

# Force UTF-8 encoding for stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def fetch_url(url):
    try:
        headers = {'User-Agent': 'SEO-Audit-Bot/1.0'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def audit_page(url):
    print(f"\n--- SEO/GEO Audit Report: {url} ---")
    html = fetch_url(url)
    if not html:
        return

    # Check Title
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_match.group(1) if title_match else None
    print(f"Title: {'✅ ' + title if title else '❌ Missing'}")

    # Check Meta Description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc_match:
        # Try different order of attributes
        desc_match = re.search(r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']', html, re.IGNORECASE)
    
    desc = desc_match.group(1) if desc_match else None
    print(f"Meta Description: {'✅ ' + (desc[:50] + '...') if desc else '❌ Missing'}")

    # Check Structured Data
    schema_matches = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', html, re.DOTALL)
    print(f"Schema (JSON-LD): {'✅ Found ' + str(len(schema_matches)) + ' block(s)' if schema_matches else '❌ Missing'}")

    # Check for GEO Answer First Format (Bolding at start of paragraphs)
    # Flexible check for <strong> or <b> tags at the beginning of content inside a <p>
    bold_matches = re.findall(r'<p[^>]*>\s*<(strong|b)[^>]*>(.*?)</\1>', html, re.IGNORECASE | re.DOTALL)
    print(f"GEO Answer First Format: {'✅ Detected likely optimized blocks' if bold_matches else '⚠️ Not detected in paragraphs'}")

    # Check robots.txt
    parsed_url = urllib.parse.urlparse(url)
    robots_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
    print(f"\nChecking robots.txt at: {robots_url}")
    robots_txt = fetch_url(robots_url)
    
    if robots_txt:
        required_bots = ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Bingbot', 'Googlebot']
        allowed_count = 0
        for bot in required_bots:
            if bot in robots_txt:
                allowed_count += 1
        
        if allowed_count == len(required_bots):
            print(f"AI Bot Access: ✅ All required bots allowed")
        else:
            print(f"AI Bot Access: ⚠️ {allowed_count}/{len(required_bots)} bots mentioned")
            if 'Allow: /' in robots_txt:
                print("  (Global 'Allow: /' detected)")
    else:
        print("AI Bot Access: ❌ robots.txt not found or inaccessible")

    # Recommendations
    print("\nRecommendations:")
    if not title: print("- Add a keyword-rich <title> tag.")
    if not desc: print("- Add a compelling meta description.")
    if not schema_matches: print("- Implement FAQ or Organization Schema.")
    if not robots_txt: print("- Create a robots.txt file to guide AI crawlers.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/seo_audit.py <url>")
    else:
        audit_page(sys.argv[1])
