<?php
// index.php
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BiyaheTayo - Break Language Barriers in Tarlac Province</title>
    <link rel="stylesheet" href="global.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" rel="stylesheet"/>
  </head>
  <body class="bg-white text-gray-800">
    
    <!-- Header -->
    <?php include "partials/header.php"; ?>

    <!-- Hero -->
    <section id="home" class="relative min-h-screen flex items-center hero-section">
      <div class="absolute inset-0 hero-overlay"></div>
      <div class="relative w-full px-6 py-20">
        <div class="max-w-6xl mx-auto">
          <div class="max-w-2xl">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Break Language Barriers in <span class="text-primary">Tarlac Province</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with locals, explore authentic experiences, and navigate
              Tarlac with confidence using our comprehensive translation
              platform supporting English, Kapampangan, Ilocano, and Tagalog.
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">English</span>
              <span class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Kapampangan</span>
              <span class="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">Ilocano</span>
              <span class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">Tagalog</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Translation -->
    <?php include "partials/translation.php"; ?>

    <!-- Dictionary -->
    <?php include "partials/dictionary.php"; ?>

    <!-- About -->
    <?php include "partials/about.php"; ?>

    <!-- Footer -->
    <?php include "partials/footer.php"; ?>

    <!-- Scripts -->
    <script src="backend/app.js"></script>
  </body>

  <script src="backend/translate.js"></script>

</html>
