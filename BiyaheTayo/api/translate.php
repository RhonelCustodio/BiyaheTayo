<?php
header("Content-Type: application/json; charset=utf-8");
include("db_connect.php");

// Google API Key
$GOOGLE_API_KEY = "AIzaSyDMNMA5wkq7-cI0HwgOFAd4rRgJcBJyOIE"; // replace with your real key

$input = json_decode(file_get_contents("php://input"), true);

$phrase = trim($input['phrase'] ?? '');
$from   = $input['from'] ?? 'en';
$to     = $input['to'] ?? 'tl';

$langMap = [
    "en"  => "english",
    "tl"  => "tagalog",
    "pam" => "kapampangan",
    "ilo" => "ilocano"
];

$fromCol = $langMap[$from] ?? "english";
$toCol   = $langMap[$to] ?? "tagalog";

if (!$phrase) {
    echo json_encode(["translation" => ""]);
    exit;
}

// 1️⃣ Try fetching from DB
$stmt = $conn->prepare("SELECT english, tagalog, kapampangan, ilocano FROM translations WHERE $fromCol = ?");
$stmt->bind_param("s", $phrase);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "translation" => $row[$toCol] ?? ""
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2️⃣ Google Translate API call
function translateText($text, $source, $target, $apiKey) {
    $url = "https://translation.googleapis.com/language/translate/v2?key=" . $apiKey;
    $data = [
        "q" => $text,
        "source" => $source,
        "target" => $target,
        "format" => "text"
    ];
    $options = [
        "http" => [
            "header" => "Content-Type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data),
            "timeout" => 5
        ]
    ];
    $response = @file_get_contents($url, false, stream_context_create($options));
    if ($response === false) return "";
    $json = json_decode($response, true);
    $raw = $json['data']['translations'][0]['translatedText'] ?? "";

    // ✅ Decode & normalize spaces
    $decoded = html_entity_decode($raw, ENT_QUOTES, 'UTF-8');
    $decoded = preg_replace('/\s+/u', ' ', $decoded); // collapse weird spacing
    return trim($decoded);
}

// 3️⃣ Translate to all languages
$english     = ($from === "en") ? $phrase : translateText($phrase, $from, "en", $GOOGLE_API_KEY);
$tagalog     = translateText($english, "en", "tl", $GOOGLE_API_KEY);
$kapampangan = translateText($english, "en", "pam", $GOOGLE_API_KEY);
$ilocano     = translateText($english, "en", "ilo", $GOOGLE_API_KEY);

// 4️⃣ Save to DB
$phraseKey = substr($english, 0, 191);
$stmtInsert = $conn->prepare("
    INSERT INTO translations (phrase_key, english, tagalog, kapampangan, ilocano) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        english=VALUES(english),
        tagalog=VALUES(tagalog),
        kapampangan=VALUES(kapampangan),
        ilocano=VALUES(ilocano)
");
$stmtInsert->bind_param("sssss", $phraseKey, $english, $tagalog, $kapampangan, $ilocano);
$stmtInsert->execute();

// 5️⃣ Return final decoded translation
$finalTranslation = "";
switch ($to) {
    case "en":  $finalTranslation = $english; break;
    case "tl":  $finalTranslation = $tagalog; break;
    case "pam": $finalTranslation = $kapampangan; break;
    case "ilo": $finalTranslation = $ilocano; break;
}

echo json_encode([
    "translation" => $finalTranslation
], JSON_UNESCAPED_UNICODE);
