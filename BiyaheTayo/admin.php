<?php
include("api/db_connect.php");

// Handle form submission for adding new phrase
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_phrase'])) {
    $english = $_POST['english'] ?? '';
    $tagalog = $_POST['tagalog'] ?? '';
    $kapampangan = $_POST['kapampangan'] ?? '';
    $ilocano = $_POST['ilocano'] ?? '';
    $category = $_POST['category'] ?? '';

    if ($english) {
        $stmt = $conn->prepare("INSERT INTO translations (english, tagalog, kapampangan, ilocano, category) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $english, $tagalog, $kapampangan, $ilocano, $category);
        $stmt->execute();
        $stmt->close();
        header("Location: admin_dashboard.php"); // reload page after submission
        exit;
    }
}

// Fetch all translations
$translations = $conn->query("SELECT * FROM translations ORDER BY id ASC");
$feedback = $conn->query("SELECT * FROM feedback ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex">

  <!-- Sidebar -->
  <div class="w-64 bg-blue-700 text-white min-h-screen p-6">
    <h2 class="text-2xl font-bold mb-6">Admin</h2>
    <nav class="space-y-3">
      <button onclick="showTab('translations')" class="w-full text-left py-2 px-3 bg-blue-600 rounded hover:bg-blue-500">📘 Translations</button>
      <button onclick="showTab('feedback')" class="w-full text-left py-2 px-3 bg-blue-600 rounded hover:bg-blue-500">⭐ Feedback</button>
    </nav>
  </div>

  <!-- Main Content -->
  <div class="flex-1 p-6">

    <!-- Translations Section (includes Add Phrase form) -->
    <div id="translations">
      <h2 class="text-xl font-bold text-blue-700 mb-4">Manage Translations</h2>

      <!-- Add New Phrase Form -->
      <div class="bg-white p-6 rounded shadow mb-6">
        <h3 class="text-lg font-semibold mb-3 text-blue-700">Add New Phrase</h3>
        <form method="POST" class="space-y-4">
          <div>
            <label class="block font-medium text-gray-700 mb-1">English</label>
            <input type="text" name="english" class="w-full border px-3 py-2 rounded" required>
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Tagalog</label>
            <input type="text" name="tagalog" class="w-full border px-3 py-2 rounded">
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Kapampangan</label>
            <input type="text" name="kapampangan" class="w-full border px-3 py-2 rounded">
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Ilocano</label>
            <input type="text" name="ilocano" class="w-full border px-3 py-2 rounded">
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Category</label>
            <input type="text" name="category" class="w-full border px-3 py-2 rounded" placeholder="e.g., Greeting, Question">
          </div>
          <button type="submit" name="add_phrase" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">Add Phrase</button>
        </form>
      </div>

      <!-- Filter & Search -->
      <div class="flex items-center gap-4 mb-4">
        <label class="text-gray-700 font-medium">Language:</label>
        <select id="languageFilter" class="border rounded px-2 py-1">
          <option value="all">All</option>
          <option value="english">English</option>
          <option value="tagalog">Tagalog</option>
          <option value="kapampangan">Kapampangan</option>
          <option value="ilocano">Ilocano</option>
        </select>

        <label class="text-gray-700 font-medium">Category:</label>
        <select id="categoryFilter" class="border rounded px-2 py-1">
          <option value="all">All</option>
          <?php
          $categories = $conn->query("SELECT DISTINCT category FROM translations WHERE category != ''");
          while ($cat = $categories->fetch_assoc()) {
              echo '<option value="'.htmlspecialchars($cat['category']).'">'.htmlspecialchars($cat['category']).'</option>';
          }
          ?>
        </select>

        <input type="text" id="searchBox" placeholder="Search phrase..." class="border rounded px-3 py-1 w-64">
      </div>

      <!-- Translations Table -->
      <div class="overflow-x-auto bg-white rounded shadow">
        <table class="w-full text-sm text-left border-collapse" id="translationTable">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border lang-english">English</th>
              <th class="px-4 py-2 border lang-tagalog">Tagalog</th>
              <th class="px-4 py-2 border lang-kapampangan">Kapampangan</th>
              <th class="px-4 py-2 border lang-ilocano">Ilocano</th>
              <th class="px-4 py-2 border">Category</th>
              <th class="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php while($row = $translations->fetch_assoc()): ?>
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-2 border"><?= $row['id'] ?></td>
                <td class="px-4 py-2 border lang-english"><?= htmlspecialchars($row['english']) ?></td>
                <td class="px-4 py-2 border lang-tagalog"><?= htmlspecialchars($row['tagalog']) ?></td>
                <td class="px-4 py-2 border lang-kapampangan"><?= htmlspecialchars($row['kapampangan']) ?></td>
                <td class="px-4 py-2 border lang-ilocano"><?= htmlspecialchars($row['ilocano']) ?></td>
                <td class="px-4 py-2 border category"><?= htmlspecialchars($row['category']) ?></td>
                <td class="px-4 py-2 border">
                  <a href="edit_translation.php?id=<?= $row['id'] ?>" class="text-blue-600 hover:underline">Edit</a>
                </td>
              </tr>
            <?php endwhile; ?>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button id="prevBtn" class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Prev</button>
        <span id="pageInfo" class="font-medium text-gray-700"></span>
        <button id="nextBtn" class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
      </div>
    </div>

    <!-- Feedback Section -->
    <div id="feedback" class="hidden">
      <h2 class="text-xl font-bold text-blue-700 mb-4">User Feedback</h2>
      <div class="overflow-x-auto bg-white rounded shadow">
        <table class="w-full text-sm text-left border-collapse">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Name</th>
              <th class="px-4 py-2 border">Email</th>
              <th class="px-4 py-2 border">Message</th>
              <th class="px-4 py-2 border">Rating</th>
              <th class="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            <?php while($fb = $feedback->fetch_assoc()): ?>
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-2 border"><?= $fb['id'] ?></td>
                <td class="px-4 py-2 border"><?= htmlspecialchars($fb['name']) ?></td>
                <td class="px-4 py-2 border"><?= htmlspecialchars($fb['email']) ?></td>
                <td class="px-4 py-2 border"><?= htmlspecialchars($fb['message']) ?></td>
                <td class="px-4 py-2 border"><?= str_repeat("⭐", $fb['rating']) ?></td>
                <td class="px-4 py-2 border"><?= $fb['created_at'] ?></td>
              </tr>
            <?php endwhile; ?>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <script>
    // Tabs
    function showTab(tab) {
      document.getElementById('translations').classList.add('hidden');
      document.getElementById('feedback').classList.add('hidden');
      document.getElementById(tab).classList.remove('hidden');
    }

    // Filtering + Search + Pagination + Dynamic Columns
    const rows = Array.from(document.querySelectorAll("#translationTable tbody tr"));
    const rowsPerPage = 10;
    let currentPage = 1;

    function renderTable() {
      const languageFilter = document.getElementById("languageFilter").value;
      const categoryFilter = document.getElementById("categoryFilter").value;
      const search = document.getElementById("searchBox").value.toLowerCase();

      // Show/hide language columns
      const columns = ['english','tagalog','kapampangan','ilocano'];
      columns.forEach(col => {
        const display = (languageFilter === 'all' || languageFilter === col) ? '' : 'none';
        document.querySelectorAll(`th.lang-${col}`).forEach(th => th.style.display = display);
        document.querySelectorAll(`td.lang-${col}`).forEach(td => td.style.display = display);
      });

      // Filter rows
      let filteredRows = rows.filter(row => {
        if (languageFilter !== "all") {
          if (!row.querySelector(".lang-" + languageFilter).innerText.trim()) return false;
        }
        if (categoryFilter !== "all") {
          if (row.querySelector(".category").innerText !== categoryFilter) return false;
        }
        if (search) {
          const rowText = Array.from(row.cells).map(c => c.innerText.toLowerCase()).join(" ");
          if (!rowText.includes(search)) return false;
        }
        return true;
      });

      const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
      if (currentPage > totalPages) currentPage = totalPages || 1;

      rows.forEach(r => r.style.display = "none");
      filteredRows.slice((currentPage-1)*rowsPerPage, currentPage*rowsPerPage).forEach(r => r.style.display = "");

      document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages || 1}`;
      document.getElementById("prevBtn").disabled = currentPage === 1;
      document.getElementById("nextBtn").disabled = currentPage === totalPages;
    }

    document.getElementById("languageFilter").addEventListener("change", () => { currentPage=1; renderTable(); });
    document.getElementById("categoryFilter").addEventListener("change", () => { currentPage=1; renderTable(); });
    document.getElementById("searchBox").addEventListener("input", () => { currentPage=1; renderTable(); });
    document.getElementById("prevBtn").addEventListener("click", () => { if (currentPage>1){ currentPage--; renderTable(); }});
    document.getElementById("nextBtn").addEventListener("click", () => { currentPage++; renderTable(); });

    renderTable();
  </script>

</body>
</html>
