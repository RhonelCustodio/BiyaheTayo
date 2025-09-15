<section id="translations" class="py-20 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Real-Time Translation</h2>
      <p class="text-xl text-gray-600">Instantly translate speech and text between local dialects</p>
    </div>

    <div class="bg-white rounded-2xl shadow-lg p-8 relative">
      <div class="grid md:grid-cols-2 gap-8 items-start">

        <!-- Input -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select id="inputLang" class="w-full px-4 py-3 border border-gray-200 rounded-lg">
              <option value="en">English</option>
              <option value="tl">Tagalog</option>
              <option value="pam">Kapampangan</option>
              <option value="ilo">Ilocano</option>
            </select>
          </div>
          <div class="relative">
            <textarea id="inputText" placeholder="Type or speak here..." class="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none transition-all duration-300"></textarea>
            <button id="micBtn" class="absolute bottom-3 right-3 p-2 text-gray-500 hover:text-primary">
              <i class="ri-mic-line text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Output -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select id="outputLang" class="w-full px-4 py-3 border border-gray-200 rounded-lg">
              <option value="tl">Tagalog</option>
              <option value="en">English</option>
              <option value="pam">Kapampangan</option>
              <option value="ilo">Ilocano</option>
            </select>
          </div>
          <div class="relative">
            <div id="outputText" class="w-full h-32 p-4 border border-gray-200 rounded-lg bg-gray-50 text-sm transition-all duration-300"></div>
            <button id="speakBtn" class="absolute bottom-3 right-3 p-2 text-gray-500 hover:text-primary">
              <i class="ri-volume-up-line text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Swap Button -->
        <button id="swapBtn" class="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-50 flex items-center justify-center transition-transform duration-300">
          <i class="ri-exchange-line text-lg"></i>
        </button>

      </div>
    </div>
  </div>
</section>
