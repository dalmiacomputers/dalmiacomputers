<?php
require __DIR__.'/config.php';
session_start();
if (empty($_SESSION['ok'])) { header('Location: login.php'); exit; }
$settings = [];
$stmt = $pdo->query("SELECT k,v FROM dc_settings");
foreach($stmt as $row){ $settings[$row['k']] = $row['v']; }
function val($k,$d=''){ global $settings; return htmlspecialchars($settings[$k] ?? $d); }
?&gt;
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<title>Dalmia CMS — Dashboard</title>
<link href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" rel="stylesheet"/>
<style>details{border:1px solid #e5e7eb;border-radius:8px;padding:10px;margin:8px 0}</style>
<meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head>
<body>
<h1>🛠️ Dalmia CMS — Dashboard</h1>
<details open=""><summary><b>Global Settings</b></summary>
<form action="save.php" method="post">
<input name="__section" type="hidden" value="global"/>
<label>Business Name <input name="g_name" value="&lt;?php echo val('g_name','Dalmia Computers');?&gt;"/></label>
<label>Tagline <input name="g_tagline" value="&lt;?php echo val('g_tagline','Your Trusted Tech Partner.');?&gt;"/></label>
<label>Sales Phone <input name="g_sales" value="&lt;?php echo val('g_sales','9734290001');?&gt;"/></label>
<label>Service Phone <input name="g_service" value="&lt;?php echo val('g_service','8145290001');?&gt;"/></label>
<label>TDL Phone <input name="g_tdl" value="&lt;?php echo val('g_tdl','9734290001');?&gt;"/></label>
<label>Email <input name="g_email" value="&lt;?php echo val('g_email','dalmiacomputers@gmail.com');?&gt;"/></label>
<label>Address <input name="g_address" value="&lt;?php echo val('g_address','Bikash Bhawan, Near ICICI Bank, Ranchi Road, Purulia – 723101');?&gt;"/></label>
<label>GST <input name="g_gst" value="&lt;?php echo val('g_gst','19AEHPD9752K1Z0');?&gt;"/></label>
<label>WhatsApp Community Link <input name="s_wa_channel" value="&lt;?php echo val('s_wa_channel','https://whatsapp.com/channel/0029Va4P2HNJuyA3g8qVrE0D');?&gt;"/></label>
<label>WhatsApp CTA (short) <input name="s_wa_cta" value="&lt;?php echo val('s_wa_cta','Join our WhatsApp community for updates &amp; offers.');?&gt;"/></label>
<label>Facebook <input name="s_facebook" value="&lt;?php echo val('s_facebook','https://facebook.com/dalmiashowroom');?&gt;"/></label>
<label>Instagram <input name="s_instagram" value="&lt;?php echo val('s_instagram','https://instagram.com/dalmiacomputers');?&gt;"/></label>
<label>YouTube <input name="s_youtube" value="&lt;?php echo val('s_youtube','');?&gt;"/></label>
<label>LinkedIn <input name="s_linkedin" value="&lt;?php echo val('s_linkedin','');?&gt;"/></label>
<label>X (Twitter) <input name="s_x" value="&lt;?php echo val('s_x','');?&gt;"/></label>
<label>Visitor Counter Mode
    <select name="vis_counter_mode">
<option <?php="" ?'selected':'';?="" echo="" val('vis_counter_mode')="none" value="none">&gt;None</option>
<option <?php="" ?'selected':'';?="" echo="" val('vis_counter_mode')="php" value="php">&gt;Simple PHP Counter</option>
<option <?php="" ?'selected':'';?="" echo="" val('vis_counter_mode')="ga4" value="ga4">&gt;Use GA4 Only</option>
</select>
</label>
<button>Save Global</button>
</form>
</details>
<details open=""><summary><b>Reviews &amp; Social Proof</b></summary>
<form action="save.php" method="post">
<input name="__section" type="hidden" value="reviews"/>
<label>Reviews Source
    <select name="rev_source">
<option <?php="" ?'selected':'';?="" echo="" val('rev_source','embed')="embed" value="embed">&gt;Embed Widget</option>
<option <?php="" ?'selected':'';?="" echo="" val('rev_source')="api" value="api">&gt;Google API (place_id)</option>
<option <?php="" ?'selected':'';?="" echo="" val('rev_source')="manual" value="manual">&gt;Curated Manual</option>
</select>
</label>
<label>Embed Code (Trustindex/Elfsight/GBP/Justdial) <textarea name="rev_embed" rows="5"><?php echo val('rev_embed','');?></textarea></label>
<label>Google Place ID <input name="rev_place_id" value="&lt;?php echo val('rev_place_id','4690025437030468228');?&gt;"/></label>
<label>Justdial Profile URL <input name="rev_justdial" value="&lt;?php echo val('rev_justdial','https://www.justdial.com/Purulia/Dalmia-Computers-ICICI-Bank-Bus-Stand-Road/9999P3252-3252-180615141017-I7D9_BZDET');?&gt;"/></label>
<button>Save Reviews</button>
</form>
</details>
<details open=""><summary><b>Hero Slider (6 slides)</b></summary>
<form action="save.php" enctype="multipart/form-data" method="post">
<input name="__section" type="hidden" value="hero"/>
<label>Enable Hero Slider
    <select name="hero_enabled">
<option <?php="" ?'selected':'';?="" echo="" val('hero_enabled','1')="1" value="1">&gt;Yes</option>
<option <?php="" ?'selected':'';?="" echo="" val('hero_enabled')="0" value="0">&gt;No</option>
</select>
</label>
<?php for($i=1;$i<=6;$i++): ?>
<fieldset style="border:1px dashed #ddd;padding:8px;border-radius:8px">
<legend>Slide <?php echo $i;?></legend>
<label>Title <input name="hero&lt;?php echo $i;?&gt;_title" value="&lt;?php echo val('hero'.$i.'_title','');?&gt;"/></label>
<label>Subtitle <input name="hero&lt;?php echo $i;?&gt;_sub" value="&lt;?php echo val('hero'.$i+'_sub','');?&gt;"/></label>
<label>CTA Text <input name="hero&lt;?php echo $i;?&gt;_cta_text" value="&lt;?php echo val('hero'.$i+'_cta_text','Explore');?&gt;"/></label>
<label>CTA URL <input name="hero&lt;?php echo $i;?&gt;_cta_url" value="&lt;?php echo val('hero'.$i+'_cta_url','/pages/products/');?&gt;"/></label>
<label>Image URL <input name="hero&lt;?php echo $i;?&gt;_img_url" value="&lt;?php echo val('hero'.$i+'_img_url','/assets/hero_placeholder.jpg');?&gt;"/></label>
</fieldset>
<?php endfor; ?>
<button>Save Hero</button>
</form>
</details>
<details open=""><summary><b>Brand &amp; Accessories</b></summary>
<form action="save.php" enctype="multipart/form-data" method="post">
<input name="__section" type="hidden" value="catalog"/>
<label>Brand Logos (comma-separated absolute URLs) <textarea name="brand_urls" placeholder="https://.../hp.png, https://.../dell.png" rows="4"><?php echo val('brand_urls','');?></textarea></label>
<label>Accessories List (one per line: name|img_url|link_url) <textarea name="acc_list" placeholder="SSD|/assets/acc/ssd.png|/pages/products/" rows="6"><?php echo val('acc_list','');?></textarea></label>
<button>Save Catalog</button>
</form>
</details>
<details open=""><summary><b>Tally &amp; Quick Heal Spotlight</b></summary>
<form action="save.php" method="post">
<input name="__section" type="hidden" value="spotlight"/>
<label>Tally Headline <input name="tally_head" value="&lt;?php echo val('tally_head','Tally Prime — Customized, Supported, Upgraded');?&gt;"/></label>
<label>Tally Deck <textarea name="tally_body" rows="4"><?php echo val('tally_body','We implement GST-ready workflows, TDL automation, TSS renewals, and rental programs.');?></textarea></label>
<label>Quick Heal Headline <input name="qh_head" value="&lt;?php echo val('qh_head','Quick Heal Total Security — Peace of Mind');?&gt;"/></label>
<label>Quick Heal Deck <textarea name="qh_body" rows="4"><?php echo val('qh_body','Real-time protection, ransomware defense, and expert local support.');?></textarea></label>
<button>Save Spotlight</button>
</form>
</details>
<details><summary><b>Lucky Draw &amp; Selfie Contest</b></summary>
<form action="save.php" method="post">
<input name="__section" type="hidden" value="contest"/>
<label>Lucky Draw Enabled
    <select name="ld_enabled"><option value="1">Yes</option><option <?php="" ?'selected':'';?="" echo="" val('ld_enabled')="0" value="0">&gt;No</option></select>
</label>
<label>Period Start <input name="ld_start" placeholder="YYYY-MM-DD" value="&lt;?php echo val('ld_start','');?&gt;"/></label>
<label>Period End <input name="ld_end" placeholder="YYYY-MM-DD" value="&lt;?php echo val('ld_end','');?&gt;"/></label>
<label>Prizes (1st/2nd/3rd) <input name="ld_prizes" value="&lt;?php echo val('ld_prizes','Neckband / Mouse / Pen-drive');?&gt;"/></label>
<label>Referral Enabled
    <select name="ref_enabled"><option value="1">Yes</option><option <?php="" ?'selected':'';?="" echo="" val('ref_enabled')="0" value="0">&gt;No</option></select>
</label>
<label>Terms &amp; Conditions <textarea name="ld_terms" rows="5"><?php echo val('ld_terms','One entry per period. Winners notified via SMS/Email/WhatsApp.');?></textarea></label>
<button>Save Contests</button>
</form>
</details>
<details><summary><b>Customer Care Directory</b></summary>
<form action="save.php" method="post">
<input name="__section" type="hidden" value="care"/>
<label>Companies JSON (name, phone, url) <textarea name="care_companies" placeholder='[{"name":"HP","phone":"1800-258-7170","url":"https://support.hp.com"}]' rows="6"><?php echo val('care_companies','');?></textarea></label>
<button>Save Customer Care</button>
</form>
</details>
<hr/>
<h3>Pages</h3>
<form action="save_page.php" method="post">
<label>Choose Page
    <select name="slug">
<option value="products">products</option>
<option value="services">services</option>
<option value="contact">contact</option>
<option value="heritage">heritage</option>
<option value="tally">tally</option>
<option value="quickheal">quickheal</option>
<option value="careers">careers</option>
<option value="support">support</option>
<option value="reviews">reviews</option>
<option value="lucky-draw">lucky-draw</option>
</select>
</label>
<label>Title <input name="title"/></label>
<label>Description <input name="description"/></label>
<label>Content (HTML) <textarea name="content" rows="12"></textarea></label>
<label>Schema JSON-LD <textarea name="schema_json" rows="8"></textarea></label>
<button>Save Page</button>
<button formaction="export.php" formmethod="post">Export Static</button>
</form>
<hr/>
<form action="logout.php"><button>Logout</button></form>
</body>
</html>
