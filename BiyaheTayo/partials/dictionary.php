<?php
include("api/db_connect.php");

// Allowed columns
$allowedCols = ['english','tagalog','kapampangan','ilocano'];

// Fetch categories dynamically
$catsRes = $conn->query("SELECT DISTINCT category FROM translations ORDER BY category ASC");
$categories = ["All"];
while ($row = $catsRes->fetch_assoc()) {
    if (!empty($row['category'])) $categories[] = $row['category'];
}
?>

<section id="dictionary" class="py-20">
  <div class="max-w-6xl mx-auto px-6">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Dialect Dictionary</h2>
      <p class="text-xl text-gray-600">Common phrases and expressions for everyday conversations</p>
    </div>

    <!-- Search & Filters -->
    <form id="filterForm" class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- Search -->
        <div class="relative flex-1">
          <input name="search" type="text" placeholder="Search phrases..." 
                 class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"/>
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i class="ri-search-line"></i>
          </div>
        </div>

        <!-- Language From -->
        <select name="from" class="px-4 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="all" selected>All</option>
          <?php foreach ($allowedCols as $col): ?>
            <option value="<?=$col?>"><?=ucfirst($col)?></option>
          <?php endforeach; ?>
        </select>

        <span class="self-center text-gray-600">→</span>

        <!-- Language To -->
        <select name="to" class="px-4 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="all" selected>All</option>
          <?php foreach ($allowedCols as $col): ?>
            <option value="<?=$col?>"><?=ucfirst($col)?></option>
          <?php endforeach; ?>
        </select>

        <!-- Category -->
        <select name="category" class="px-4 py-2 border border-gray-200 rounded-lg text-sm">
          <?php foreach ($categories as $cat): ?>
            <option value="<?=$cat?>"><?=$cat?></option>
          <?php endforeach; ?>
        </select>
      </div>
    </form>

    <!-- Results -->
    <div id="dictionary-results" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- AJAX will inject results here -->
    </div>

    <!-- Pagination -->
    <div id="pagination" class="flex justify-center mt-10 space-x-2"></div>
  </div>
</section>

<script>
const form = document.getElementById("filterForm");
const resultsDiv = document.getElementById("dictionary-results");
const paginationDiv = document.getElementById("pagination");

function fetchResults(page = 1) {
  const formData = new FormData(form);
  formData.append("page", page);

  // Convert "all" to empty string to show all translations
  if (formData.get("from") === "all") formData.set("from", "");
  if (formData.get("to") === "all") formData.set("to", "");

  const params = new URLSearchParams(formData).toString();

  fetch("fetch_dictionary.php?" + params)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = data.html;
      paginationDiv.innerHTML = data.pagination;

      // re-bind pagination links
      paginationDiv.querySelectorAll("a[data-page]").forEach(link => {
        link.addEventListener("click", e => {
          e.preventDefault();
          fetchResults(link.dataset.page);
        });
      });
    });
}

// Load initial results
fetchResults();

// Re-fetch on filters
form.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", () => fetchResults());
  el.addEventListener("change", () => fetchResults());
});
</script>
