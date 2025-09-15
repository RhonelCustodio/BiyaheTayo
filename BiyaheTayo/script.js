tailwind.config = {
        theme: {
          extend: {
          colors: {
          primary: "#57b5e7",
          secondary: "#8dd3c7",
        },
        borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
    },
  },
};
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // Translation Elements
    const elements = {
        inputLangBtn: document.getElementById('inputLangBtn'),
        outputLangBtn: document.getElementById('outputLangBtn'),
        inputText: document.getElementById('inputText'),
        outputText: document.getElementById('outputText'),
        translateBtn: document.querySelector('.btn-primary'),
        micBtn: document.getElementById('ri-mic-line'),
        clearBtn: document.getElementById('ri-delete-bin-line'),
        copyBtn: document.querySelector('.ri-file-copy-line').parentElement,
        speakBtn: document.querySelector('.ri-volume-up-line').parentElement
    };

    let currentLanguages = {
        input: 'english',
        output: 'kapampangan'
    };


    // Translation dictionary
    const translations = {
    english: {
        kapampangan: {
            "hello": "kumusta",
            "good morning": "mayap a abak",
            "thank you": "salamat",
            "how much is this": "magkanu ya ini",
            "where is the market": "nukarin ya ing palengki",
            "i'm hungry": "mabayat ku",
            "help me": "saupan me",
            "goodbye": "paalam",
            "yes": "wa",
            "no": "ali",
            "please": "paki",
            "water": "danum",
            "food": "pamangan",
            "house": "bale",
            "beautiful": "malagu"
        },
        ilocano: {
            "hello": "kumusta",
            "good morning": "naimbag a bigat",
            "thank you": "agyamanak",
            "how much is this": "mano daytoy",
            "where is the market": "sadino ti merkado",
            "i'm hungry": "mabisinko",
            "help me": "tulongannak",
            "goodbye": "agpakadaakon",
            "yes": "wen",
            "no": "madi",
            "please": "pangngaasi",
            "water": "danum",
            "food": "taraon",
            "house": "balay",
            "beautiful": "napintas"
        },
        tagalog: {
            "hello": "kumusta",
            "good morning": "magandang umaga",
            "thank you": "salamat",
            "how much is this": "magkano ito",
            "where is the market": "saan ang palengke",
            "i'm hungry": "gutom ako",
            "help me": "tulungan mo ako",
            "goodbye": "paalam",
            "yes": "oo",
            "no": "hindi",
            "please": "pakiusap",
            "water": "tubig",
            "food": "pagkain",
            "house": "bahay",
            "beautiful": "maganda"
        }
    },
    ilocano: {
        english: {
            "kumusta": "hello",
            "naimbag a bigat": "good morning",
            "agyamanak": "thank you",
            "mano daytoy": "how much is this",
            "sadino ti merkado": "where is the market",
            "mabisinko": "i'm hungry",
            "tulongannak": "help me",
            "agpakadaakon": "goodbye",
            "wen": "yes",
            "saan": "no",
            "pangngaasi": "please",
            "danum": "water",
            "taraon": "food",
            "balay": "house",
            "napintas": "beautiful"
        },
        kapampangan: {
            "kumusta": "kumusta",
            "naimbag a bigat": "mayap a abak",
            "agyamanak": "salamat",
            "mano daytoy": "magkanu ya ini",
            "sadino ti merkado": "nukarin ya ing palengki",
            "mabisinko": "mabayat ku",
            "tulongannak": "saupan me",
            "agpakadaakon": "paalam",
            "wen": "wa",
            "saan": "ali",
            "pangngaasi": "paki",
            "danum": "danum",
            "taraon": "pamangan",
            "balay": "bale",
            "napintas": "malagu"
        },
        tagalog: {
            "kumusta": "kumusta",
            "naimbag a bigat": "magandang umaga",
            "agyamanak": "salamat",
            "mano daytoy": "magkano ito",
            "sadino ti merkado": "saan ang palengke",
            "mabisinko": "gutom ako",
            "tulongannak": "tulungan mo ako",
            "agpakadaakon": "paalam",
            "wen": "oo",
            "saan": "hindi",
            "pangngaasi": "pakiusap",
            "danum": "tubig",
            "taraon": "pagkain",
            "balay": "bahay",
            "napintas": "maganda"
        }
    },
    kapampangan: {
        english: {
            "kumusta": "hello",
            "mayap a abak": "good morning",
            "salamat": "thank you",
            "magkanu ya ini": "how much is this",
            "nukarin ya ing palengki": "where is the market",
            "mabayat ku": "i'm hungry",
            "saupan me": "help me",
            "paalam": "goodbye",
            "wa": "yes",
            "ali": "no",
            "paki": "please",
            "danum": "water",
            "pamangan": "food",
            "bale": "house",
            "malagu": "beautiful"
        },
        ilocano: {
            "kumusta": "kumusta",
            "mayap a abak": "naimbag a bigat",
            "salamat": "agyamanak",
            "magkanu ya ini": "mano daytoy",
            "nukarin ya ing palengki": "sadino ti merkado",
            "mabayat ku": "mabisinko",
            "saupan me": "tulongannak",
            "paalam": "agpakadaakon",
            "wa": "wen",
            "ali": "saan",
            "paki": "pangngaasi",
            "danum": "danum",
            "pamangan": "taraon",
            "bale": "balay",
            "malagu": "napintas"
        },
        tagalog: {
            "kumusta": "kumusta",
            "mayap a abak": "magandang umaga",
            "salamat": "salamat",
            "magkanu ya ini": "magkano ito",
            "nukarin ya ing palengki": "saan ang palengke",
            "mabayat ku": "gutom ako",
            "saupan me": "tulungan mo ako",
            "paalam": "paalam",
            "wa": "oo",
            "ali": "hindi",
            "paki": "pakiusap",
            "danum": "tubig",
            "pamangan": "pagkain",
            "bale": "bahay",
            "malagu": "maganda"
        }
    },
    tagalog: {
        english: {
            "kumusta": "hello",
            "magandang umaga": "good morning",
            "salamat": "thank you",
            "magkano ito": "how much is this",
            "saan ang palengke": "where is the market",
            "gutom ako": "i'm hungry",
            "tulungan mo ako": "help me",
            "paalam": "goodbye",
            "oo": "yes",
            "hindi": "no",
            "pakiusap": "please",
            "tubig": "water",
            "pagkain": "food",
            "bahay": "house",
            "maganda": "beautiful"
        },
        ilocano: {
            "kumusta": "kumusta",
            "magandang umaga": "naimbag a bigat",
            "salamat": "agyamanak",
            "magkano ito": "mano daytoy",
            "saan ang palengke": "sadino ti merkado",
            "gutom ako": "mabisinko",
            "tulungan mo ako": "tulongannak",
            "paalam": "agpakadaakon",
            "oo": "wen",
            "hindi": "saan",
            "pakiusap": "pangngaasi",
            "tubig": "danum",
            "pagkain": "taraon",
            "bahay": "balay",
            "maganda": "napintas"
        },
        kapampangan: {
            "kumusta": "kumusta",
            "magandang umaga": "mayap a abak",
            "salamat": "salamat",
            "magkano ito": "magkanu ya ini",
            "saan ang palengke": "nukarin ya ing palengki",
            "gutom ako": "mabayat ku",
            "tulungan mo ako": "saupan me",
            "paalam": "paalam",
            "oo": "wa",
            "hindi": "ali",
            "pakiusap": "paki",
            "tubig": "danum",
            "pagkain": "pamangan",
            "bahay": "bale",
            "maganda": "malagu"
        }
    }
};

    // Create dropdown elements
    function createDropdown(buttonElement, languages, type) {
        const dropdown = document.createElement('div');
        dropdown.className = 'absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 hidden';
        dropdown.id = `${type}LangDropdown`;
        
        languages.forEach(lang => {
            const item = document.createElement('button');
            item.className = 'w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100';
            item.textContent = lang;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentLanguages[type] = lang.toLowerCase();
                buttonElement.querySelector('span').textContent = lang;
                dropdown.classList.add('hidden');
                if (elements.inputText.value.trim()) translateText();
            });
            dropdown.appendChild(item);
        });
        
        buttonElement.parentElement.appendChild(dropdown);
        buttonElement.parentElement.classList.add('relative');
        return dropdown;
    }


    // Initialize dropdowns
    const languages = ['English', 'Kapampangan', 'Ilocano', 'Tagalog'];
    const inputDropdown = elements.inputLangBtn ? createDropdown(elements.inputLangBtn, languages, 'input') : null;
    const outputDropdown = elements.outputLangBtn ? createDropdown(elements.outputLangBtn, languages, 'output') : null;

    // Toggle dropdowns
    if (elements.inputLangBtn) {
        elements.inputLangBtn.addEventListener('click', (e) => {
            e.preventDefault();
            inputDropdown.classList.toggle('hidden');
            if (outputDropdown) outputDropdown.classList.add('hidden');
        });
    }

    if (elements.outputLangBtn) {
        elements.outputLangBtn.addEventListener('click', (e) => {
            e.preventDefault();
            outputDropdown.classList.toggle('hidden');
            if (inputDropdown) inputDropdown.classList.add('hidden');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (inputDropdown && !elements.inputLangBtn.contains(e.target) && !inputDropdown.contains(e.target)) {
            inputDropdown.classList.add('hidden');
        }
        if (outputDropdown && !elements.outputLangBtn.contains(e.target) && !outputDropdown.contains(e.target)) {
            outputDropdown.classList.add('hidden');
        }
    });

    // Translation function
    function translateText() {
        const text = elements.inputText.value.trim().toLowerCase();
        if (!text) {
            elements.outputText.textContent = 'Translation will appear here...';
            return;
        }

        let translatedText = 'Translation not available for this phrase';
        
        if (translations[currentLanguages.input]?.[currentLanguages.output]?.[text]) {
            translatedText = translations[currentLanguages.input][currentLanguages.output][text];
        } else if (translations[currentLanguages.input]?.english?.[text]) {
            const englishText = translations[currentLanguages.input].english[text];
            if (translations.english?.[currentLanguages.output]?.[englishText]) {
                translatedText = translations.english[currentLanguages.output][englishText];
            }
        }

        elements.outputText.textContent = translatedText;
    }

    // Event Listeners
    elements.translateBtn?.addEventListener('click', translateText);
    elements.clearBtn?.addEventListener('click', () => {
        elements.inputText.value = '';
        elements.outputText.textContent = '';
    });
    elements.copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(elements.outputText.textContent)
            .then(() => alert('Translation copied to clipboard!'))
            .catch(err => console.error('Failed to copy text: ', err));
    });
    elements.speakBtn?.addEventListener('click', speakText);
    elements.micBtn?.addEventListener('click', startSpeechRecognition);

    // Auto-translate with debounce
    let debounceTimer;
    elements.inputText?.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(translateText, 500);
    });

    // Text-to-speech function
    function speakText() {
        if (!('speechSynthesis' in window)) {
            alert('Text-to-speech not supported in your browser');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(elements.outputText.textContent);
        utterance.lang = getLanguageCode(currentLanguages.output);
        speechSynthesis.speak(utterance);
    }

    // Speech recognition function
    function startSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition not supported in your browser');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.lang = getLanguageCode(currentLanguages.input);
        recognition.interimResults = false;

        recognition.onstart = () => elements.inputText.placeholder = 'Listening...';
        recognition.onresult = (e) => {
            elements.inputText.value = e.results[0][0].transcript;
            translateText();
        };
        recognition.onerror = (e) => {
            console.error('Speech recognition error', e.error);
            elements.inputText.placeholder = 'Error occurred. Please try again.';
        };
        recognition.onend = () => elements.inputText.placeholder = 'Type your message here...';
        recognition.start();
    }

    // Language code mapping
    function getLanguageCode(lang) {
        const codes = {
            english: 'en-US',
            tagalog: 'fil-PH',
            kapampangan: 'fil-PH',
            ilocano: 'fil-PH'
        };
        return codes[lang] || 'en-US';
    }

    // Swap languages function
    function setupSwapButton() {
        const swapBtn = document.createElement('button');
        swapBtn.className = 'swap-btn';
        swapBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
        `;

        const translationBoxes = document.querySelector('.grid.md\\:grid-cols-2.gap-8');
        if (translationBoxes) {
            const swapContainer = document.createElement('div');
            swapContainer.className = 'swap-container';
            swapContainer.appendChild(swapBtn);
            translationBoxes.parentNode.insertBefore(swapContainer, translationBoxes.nextSibling);
        }

        swapBtn.addEventListener('click', () => {
            // Swap languages
            [currentLanguages.input, currentLanguages.output] = [currentLanguages.output, currentLanguages.input];
            
            // Update UI
            const inputSpan = elements.inputLangBtn?.querySelector('span');
            const outputSpan = elements.outputLangBtn?.querySelector('span');
            if (inputSpan && outputSpan) {
                [inputSpan.textContent, outputSpan.textContent] = [outputSpan.textContent, inputSpan.textContent];
            }
            
            // Swap text
            [elements.inputText.value, elements.outputText.textContent] = 
                [elements.outputText.textContent, elements.inputText.value];
            
            if (elements.inputText.value) translateText();
        });
    }

    setupSwapButton();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // Dictionary data - you could also fetch this from an API
    const dictionaryData = [
        {
            category: "Greetings",
            english: "Good morning",
            kapampangan: "Mayap a abak",
            ilocano: "Naimbag nga bigat",
            tagalog: "Magandang umaga",
            pronunciation: "MAH-yap ah AH-bak"
        },
        {
            category: "Directions",
            english: "Where is the market?",
            kapampangan: "Nukarin ya ing palengki?",
            ilocano: "Sadino ti merkado?",
            tagalog: "Nasaan ang palengke?",
            pronunciation: "noo-KAH-rin yah ing pah-LENG-ki"
        },
        {
            category: "Shopping",
            english: "How much is this?",
            kapampangan: "Magkanu ya ini?",
            ilocano: "Mano ti gatad daytoy?",
            tagalog: "Magkano ito?",
            pronunciation: "mag-KAH-nu yah ee-NEE"
        },
        {
            category: "Food",
            english: "I'm hungry",
            kapampangan: "Mabayat ku",
            ilocano: "Mabisinek",
            tagalog: "Gutom ako",
            pronunciation: "mah-BAH-yat koo"
        },
        {
            category: "Emergency",
            english: "Help me please",
            kapampangan: "Saup yu ku",
            ilocano: "Tulongannak",
            tagalog: "Tulungan mo ako",
            pronunciation: "SAH-oop yoo koo"
        },
        {
            category: "Courtesy",
            english: "Thank you",
            kapampangan: "Salamat",
            ilocano: "Agyaman",
            tagalog: "Salamat",
            pronunciation: "sah-LAH-mat"
        }
    ];

    // DOM Elements
    const searchInput = document.querySelector('#dictionary input[type="text"]');
    const categoryButtons = document.querySelectorAll('#dictionary .flex-wrap button');
    const dictionaryContainer = document.querySelector('#dictionary .grid');

    // Initial render
    renderDictionaryCards(dictionaryData);

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterDictionary(searchTerm);
    });

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('border', 'border-gray-200', 'text-gray-700');
            });
            
            // Add active class to clicked button
            if (this.textContent !== 'All') {
                this.classList.remove('border', 'border-gray-200', 'text-gray-700');
                this.classList.add('bg-primary', 'text-white');
            } else if(this.textContent === 'All'){
              this.classList.remove('border', 'border-gray-200', 'text-gray-700');
              this.classList.add('bg-primary', 'text-white');
            }
            
            const category = this.textContent;
            filterByCategory(category);
        });
    });

    // Filter function for search
    function filterDictionary(searchTerm) {
        const filteredData = dictionaryData.filter(item => {
            return (
                item.english.toLowerCase().includes(searchTerm) ||
                item.kapampangan.toLowerCase().includes(searchTerm) ||
                item.ilocano.toLowerCase().includes(searchTerm) ||
                item.tagalog.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
        });
        renderDictionaryCards(filteredData);
    }

    // Filter function for category
    function filterByCategory(category) {
        if (category === 'All') {
            renderDictionaryCards(dictionaryData);
            return;
        }
        
        const filteredData = dictionaryData.filter(item => item.category === category);
        renderDictionaryCards(filteredData);
    }

    // Render dictionary cards
    function renderDictionaryCards(data) {
        dictionaryContainer.innerHTML = '';
        
        if (data.length === 0) {
            dictionaryContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="ri-search-line text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No phrases found matching your search</p>
                </div>
            `;
            return;
        }
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card p-6';
            
            // Determine color based on category
            let categoryColor = 'blue';
            if (item.category === 'Directions') categoryColor = 'green';
            else if (item.category === 'Shopping') categoryColor = 'orange';
            else if (item.category === 'Food') categoryColor = 'purple';
            else if (item.category === 'Emergency') categoryColor = 'red';
            else if (item.category === 'Courtesy') categoryColor = 'yellow';
            
            card.innerHTML = `
                <div class="mb-4">
                    <span class="bg-${categoryColor}-50 text-${categoryColor}-700 px-2 py-1 rounded text-xs">${item.category}</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-3">${item.english}</h3>
                <div class="space-y-2 text-sm">
                    <div>
                        <span class="text-gray-500">Kapampangan:</span> ${item.kapampangan}
                    </div>
                    <div>
                        <span class="text-gray-500">Ilocano:</span> ${item.ilocano}
                    </div>
                    <div>
                        <span class="text-gray-500">Tagalog:</span> ${item.tagalog}
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100">
                    <span class="text-xs text-gray-500">Pronunciation: ${item.pronunciation}</span>
                </div>`;
            
            dictionaryContainer.appendChild(card);
        });
    }
});