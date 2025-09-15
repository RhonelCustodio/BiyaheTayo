<?php
header('Content-Type: application/json');
require_once "db_connect.php";

$phrase = $_GET['phrase'] ?? '';
$lang_from = $_GET['from'] ?? 'en';
$lang_to = $_GET['to'] ?? 'tl';

if (!$phrase) {
    echo json_encode(["error" => "No phrase provided"]);
    exit;
}

$stmt = $conn->prepare("SELECT translation FROM translations WHERE phrase=? AND lang_from=? AND lang_to=? LIMIT 1");
$stmt->bind_param("sss", $phrase, $lang_from, $lang_to);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    echo json_encode(["translation" => $row['translation']]);
} else {
    echo json_encode(["translation" => "[Not found]"]);
}
