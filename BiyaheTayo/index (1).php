<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>iStorya</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #0a1e3a;
      color: #ffffff;
      margin: 0;
    }

    .navbar {
      background-color: #06172e;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      font-weight: bold;
      color: #6ec1e4;
    }
    
    .offline-btn {
      background-color: #2fa4e7;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 8px 15px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .offline-btn:hover {
      background-color: #1c8ad9;
    }

    .hero {
      background: url('exhibit1.jpg') no-repeat center center;
      background-size: cover;
      height: 450px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 30px;
      position: relative;
    }

    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(10, 30, 58, 0.95), rgba(10, 30, 58, 0.3));
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero h1 {
      font-weight: bold;
      font-size: 2rem;
      color: #6ec1e4;
    }

    .info-tags {
      font-size: 0.9rem;
      color: #aad3e6;
    }

    .btn-watch {
      background: #2fa4e7;
      border: none;
      padding: 10px 20px;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 10px;
    }

    .exhibit-cards {
      padding: 20px;
    }

    .exhibit-card {
      background: #112a4d;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .exhibit-card img {
      width: 100%;
      height: 150px;
    }

    .exhibit-card .card-body {
      padding: 15px;
    }

    .exhibit-card h5 {
      font-weight: 600;
      color: #6ec1e4;
    }

    .tagline {
      font-size: 0.85rem;
      color: #c9e4f5;
    }
    .loader {
      display: none;
      margin-top: 20px;
    }

    .spinner-border {
      width: 2rem;
      height: 2rem;
    }
  </style>
</head>
<body>

  <nav class="navbar">
    <span class="navbar-brand">iStorya</span>
    <button class="offline-btn" id="downloadBtn">Offline Mode</button>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <h1>Welcome to the iStorya Experience</h1>
      <p>Explore and discover stories behind every exhibit.</p>
      <button class="btn-watch" onclick="startRedirect()">Proceed Now</button>
    </div>

    <div class="loader">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="mt-2">Preparing Experience...</p>
      </div>
    </div>
  </div>



    <script>
    function startRedirect() {
      document.querySelector('.btn-watch').style.display = 'none';
      document.querySelector('.loader').style.display = 'block';
      setTimeout(function () {
        window.location.href = 'setup.php';
      }, 1500); // Wait 1.5s before redirect
    }
    
    // Function to handle the offline mode download
    document.getElementById('downloadBtn').addEventListener('click', function() {
      // Google Drive download link
      const fileId = '16QXMX_AJP0kiwBYvDfV7pOre4gSBVejg';
      const downloadUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'iStorya_Offline.zip'; // You can name the file whatever you prefer
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  </script>

  </section>

  <section class="exhibit-cards container">
  <div class="d-flex flex-row flex-wrap justify-content-between">
    <div class="exhibit-card" style="width: 50%; height: 150px">
      <img src="exhibit2.jpg" alt="Exhibit">
      
    </div>

    <div class="exhibit-card" style="width: 50%; height: 150px">
      <img src="exhibit3.png" alt="Exhibit">
    
    </div>
  </div>
</section>


</body>
</html>