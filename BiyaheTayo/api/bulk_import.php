<?php
include("db_connect.php");
set_time_limit(0);

$GOOGLE_API_KEY = "AIzaSyDMNMA5wkq7-cI0HwgOFAd4rRgJcBJyOIE"; 
$file = __DIR__ . "/phrases.csv"; 
$phrases = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$total = count($phrases);
$current = 0;

$langMap = [
    "en"  => ["db" => "english",     "google" => "en"],
    "tl"  => ["db" => "tagalog",     "google" => "tl"],
    "pam" => ["db" => "kapampangan", "google" => "pam"],
    "ilo" => ["db" => "ilocano",     "google" => "ilo"]
];

function gtranslate($text, $source, $target, $key) {
    $url = "https://translation.googleapis.com/language/translate/v2?key=$key";
    $data = ["q" => $text, "source" => $source, "target" => $target, "format" => "text"];
    $options = [
        "http" => [
            "header" => "Content-Type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data),
        ]
    ];
    $context = stream_context_create($options);
    $res = file_get_contents($url, false, $context);
    if ($res === false) return "";
    $json = json_decode($res, true);
    return $json["data"]["translations"][0]["translatedText"] ?? "";
}

// ---- HTML header ----
echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Import Progress</title>
<style>
body { font-family: Arial, sans-serif; padding:20px; }
.progress-container { width:100%; background:#eee; border-radius:10px; margin:20px 0; }
.progress-bar { height:25px; width:0%; background:#4caf50; text-align:center; color:#fff; border-radius:10px; }
.log { font-family: monospace; white-space: pre-wrap; background:#f9f9f9; padding:10px; border:1px solid #ddd; height:300px; overflow-y:scroll; }
</style>
</head><body>
<h2>Bulk Import Progress</h2>
<div class='progress-container'><div id='progress-bar' class='progress-bar'>0%</div></div>
<div class='log' id='log'></div>
<script>
function updateProgress(percent, message) {
    const bar = document.getElementById('progress-bar');
    bar.style.width = percent + '%';
    bar.innerText = percent + '%';
    const log = document.getElementById('log');
    log.innerText += message + \"\\n\";
    log.scrollTop = log.scrollHeight;
}
</script>
";

// Flush early so browser shows updates
ob_flush(); flush();

foreach ($phrases as $line) {
    $current++;
    $line = trim($line);
    if (!$line) continue;

    // Support: id, phrase, [category]
    $cols = str_getcsv($line);
    $id = $cols[0] ?? null;
    $phrase = trim($cols[1] ?? '');
    $category = trim($cols[2] ?? 'General');

    if (!$phrase) continue;

    $phraseKey = strtolower($phrase);

    // Skip if exists
    $stmt = $conn->prepare("SELECT id FROM translations WHERE phrase_key = ?");
    $stmt->bind_param("s", $phraseKey);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "<script>updateProgress(" . round(($current/$total)*100) . ", '✅ Skipped: $phrase');</script>";
        ob_flush(); flush();
        continue;
    }

    $translations = [];
    foreach ($langMap as $key => $info) {
        if ($info["google"] === "en") {
            $translations[$info["db"]] = $phrase;
            continue;
        }
        $raw = gtranslate($phrase, "en", $info["google"], $GOOGLE_API_KEY);
        $translations[$info["db"]] = html_entity_decode($raw, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        sleep(1); // avoid rate-limit
    }

    $sql = "INSERT INTO translations 
            (phrase_key, english, tagalog, kapampangan, ilocano, category, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE 
                tagalog=VALUES(tagalog),
                kapampangan=VALUES(kapampangan),
                ilocano=VALUES(ilocano),
                category=VALUES(category)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssss", 
        $phraseKey,
        $translations["english"],
        $translations["tagalog"],
        $translations["kapampangan"],
        $translations["ilocano"],
        $category
    );
    $stmt->execute();

    echo "<script>updateProgress(" . round(($current/$total)*100) . ", '✅ Saved: $phrase ($category)');</script>";
    ob_flush(); flush();
}

echo "<script>updateProgress(100, '🎉 Import complete! $total words done.');</script>";
echo "</body></html>";
