<?php
include("api/db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);
    $rating = isset($_POST["rating"]) ? (int)$_POST["rating"] : null;

    if ($name && $email && $message) {
        $stmt = $conn->prepare("INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $name, $email, $message, $rating);
        $stmt->execute();
        $stmt->close();

        $success = "✅ Thank you for your feedback!";
    } else {
        $error = "⚠️ Please fill all required fields.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Feedback</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen">

  <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
    <h2 class="text-2xl font-bold text-blue-600 mb-4 text-center">We Value Your Feedback</h2>

    <?php if (!empty($success)): ?>
      <p class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg"><?= $success ?></p>
    <?php elseif (!empty($error)): ?>
      <p class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"><?= $error ?></p>
    <?php endif; ?>

    <form method="POST" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name*</label>
        <input type="text" name="name" required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email*</label>
        <input type="email" name="email" required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Message*</label>
        <textarea name="message" rows="4" required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Rating</label>
        <div class="flex flex-row-reverse justify-end space-x-1 space-x-reverse mt-1">
          <input type="radio" name="rating" id="star5" value="5" class="hidden peer" />
          <label for="star5" class="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-400">★</label>

          <input type="radio" name="rating" id="star4" value="4" class="hidden peer" />
          <label for="star4" class="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-400">★</label>

          <input type="radio" name="rating" id="star3" value="3" class="hidden peer" />
          <label for="star3" class="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-400">★</label>

          <input type="radio" name="rating" id="star2" value="2" class="hidden peer" />
          <label for="star2" class="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-400">★</label>

          <input type="radio" name="rating" id="star1" value="1" class="hidden peer" />
          <label for="star1" class="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-400">★</label>
        </div>
      </div>

      <button type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
        Submit Feedback
      </button>
    </form>
  </div>

</body>
</html>
