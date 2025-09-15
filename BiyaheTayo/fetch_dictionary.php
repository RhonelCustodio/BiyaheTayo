<?php
include("api/db_connect.php");

$allowedCols = ['english','tagalog','kapampangan','ilocano'];

$langFrom = $_GET['from'] ?? '';
$langTo   = $_GET['to'] ?? '';
$category = $_GET['category'] ?? 'All';
$search   = $_GET['search'] ?? '';
$page     = max(1, intval($_GET['page'] ?? 1));
$limit    = 10;
$offset   = ($page - 1) * $limit;

if ($langFrom === 'all') $langFrom = '';
if ($langTo === 'all') $langTo = '';

if ($langFrom && !in_array($langFrom, $allowedCols)) $langFrom = '';
if ($langTo && !in_array($langTo, $allowedCols)) $langTo = '';

// ------------------------
// Build WHERE clause
// ------------------------
$where = "1=1";
$params = [];
$types = "";

if ($category !== "All") {
    $where .= " AND category = ?";
    $params[] = $category;
    $types .= "s";
}

if ($search) {
    if ($langFrom) {
        $where .= " AND $langFrom LIKE ?";
        $params[] = "%$search%";
        $types .= "s";
    } else {
        $likeParts = [];
        foreach ($allowedCols as $col) {
            $likeParts[] = "$col LIKE ?";
            $params[] = "%$search%";
            $types .= "s";
        }
        $where .= " AND (" . implode(" OR ", $likeParts) . ")";
    }
}

// ------------------------
// Decide SQL based on category
// ------------------------
if ($category === "All") {
    // Default: 1 example per category
    $sql = "SELECT t.*
            FROM translations t
            INNER JOIN (
                SELECT category, MAX(id) AS max_id
                FROM translations
                WHERE $where
                GROUP BY category
            ) AS grp ON t.id = grp.max_id
            ORDER BY t.created_at DESC
            LIMIT $limit OFFSET $offset";

    // Total rows for pagination
    $totalRes = $conn->query("SELECT COUNT(DISTINCT category) AS total FROM translations")->fetch_assoc();
    $totalRows = $totalRes['total'] ?? 0;
} else {
    // Specific category: show all phrases
    $sql = "SELECT * FROM translations WHERE $where ORDER BY created_at DESC LIMIT $limit OFFSET $offset";

    // Total rows for pagination
    $stmtTotal = $conn->prepare("SELECT COUNT(*) AS total FROM translations WHERE $where");
    if ($params) $stmtTotal->bind_param($types, ...$params);
    $stmtTotal->execute();
    $totalRes = $stmtTotal->get_result()->fetch_assoc();
    $totalRows = $totalRes['total'] ?? 0;
}

$totalPages = ceil($totalRows / $limit);

// ------------------------
// Execute query
// ------------------------
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();
$phrases = $result->fetch_all(MYSQLI_ASSOC);

// ------------------------
// Build HTML
// ------------------------
$html = "";
if ($phrases) {
    foreach ($phrases as $p) {
        $html .= '<div class="card p-6 border border-gray-200 rounded-xl shadow-sm bg-white">';
        $html .= '<div class="mb-4"><span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">'.htmlspecialchars($p['category']).'</span></div>';
        $html .= '<h3 class="font-semibold text-gray-900 mb-3">'.htmlspecialchars($p['english']).'</h3>';
        $html .= '<div class="space-y-2 text-sm">';
        
        if ($langFrom && $langTo) {
            $html .= '<div><span class="text-gray-500">'.ucfirst($langTo).':</span> '.htmlspecialchars($p[$langTo]).'</div>';
        } else {
            foreach ($allowedCols as $col) {
                $html .= '<div><span class="text-gray-500">'.ucfirst($col).':</span> '.htmlspecialchars($p[$col]).'</div>';
            }
        }

        $html .= '</div>';
        $html .= '<div class="mt-4 pt-4 border-t border-gray-100"><span class="text-xs text-gray-400">Added: '.date("M d, Y", strtotime($p['created_at'])).'</span></div>';
        $html .= '</div>';
    }
} else {
    $html = '<p class="text-gray-500">No results found.</p>';
}

// ------------------------
// Pagination HTML
// ------------------------
$pagination = "";
if ($totalPages > 1) {
    $pagination .= '<div class="flex justify-center mt-10 space-x-2">';
    if ($page > 1) $pagination .= '<a href="#" data-page="'.($page-1).'" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Prev</a>';
    $pagination .= '<span class="px-4 py-2 text-sm text-gray-600">Page '.$page.' of '.$totalPages.'</span>';
    if ($page < $totalPages) $pagination .= '<a href="#" data-page="'.($page+1).'" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Next</a>';
    $pagination .= '</div>';
}

// ------------------------
// Return JSON
// ------------------------
header('Content-Type: application/json');
echo json_encode([
    "html" => $html,
    "pagination" => $pagination
]);
