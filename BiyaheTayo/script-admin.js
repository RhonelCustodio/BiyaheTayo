document.addEventListener('DOMContentLoaded', function() {
    // Sample admin data (in a real app, this would come from a server)
    const adminData = {
        fullName: "Rhonel Allen A. Custodio",
        email: "ra.custodio00587@student.tsu.edu.ph",
        password: "admin123" // In a real app, never store passwords in plain text
    };

    // Sample dictionary data
    let dictionaryEntries = [
        // { id: 1, term: "balay", translation: "house", language: "ilocano", example: "Napanak idiay balayda." },
        // { id: 2, term: "asawa", translation: "spouse", language: "ilocano", example: "Nakasarak iti nasayaat nga asawa." },
        // { id: 3, term: "bale", translation: "house", language: "kapampangan", example: "Munta ku king bale da." },
        // { id: 4, term: "asawa", translation: "spouse", language: "kapampangan", example: "Atin yang masanting a asawa." }
    ];

    // Sample feedback data
    let feedbackEntries = [
        { id: 1, user: "Maria Santos", email: "maria@example.com", date: "2023-05-15", content: "The translation for 'house' in Kapampangan is incorrect.", status: "resolved" },
        { id: 2, user: "Juan Dela Cruz", email: "juan@example.com", date: "2023-05-18", content: "Could you add more Ilocano terms related to farming?", status: "pending" },
        { id: 3, user: "Ana Reyes", email: "ana@example.com", date: "2023-05-20", content: "Great dictionary! Very helpful for my language studies.", status: "resolved" }
    ];

    // DOM Elements
    const loginModal = document.getElementById('loginModal');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Profile elements
    const profileTab = document.getElementById('profileTab');
    const profileSection = document.getElementById('profileSection');
    const adminFullName = document.getElementById('adminFullName');
    const adminEmail = document.getElementById('adminEmail');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    const editFullName = document.getElementById('editFullName');
    const editEmail = document.getElementById('editEmail');
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    // Dictionary elements
    const dictionaryTab = document.getElementById('dictionaryTab');
    const dictionarySection = document.getElementById('dictionarySection');
    const addEntryBtn = document.getElementById('addEntryBtn');
    const languageFilter = document.getElementById('languageFilter');
    const dictionaryTableBody = document.getElementById('dictionaryTableBody');
    const entryModal = document.getElementById('entryModal');
    const modalTitle = document.getElementById('modalTitle');
    const entryForm = document.getElementById('entryForm');
    const entryId = document.getElementById('entryId');
    const entryTerm = document.getElementById('entryTerm');
    const entryTranslation = document.getElementById('entryTranslation');
    const entryLanguage = document.getElementById('entryLanguage');
    const entryExample = document.getElementById('entryExample');
    const cancelEntryBtn = document.getElementById('cancelEntryBtn');
    
    // Feedback elements
    const feedbackTab = document.getElementById('feedbackTab');
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackTableBody = document.getElementById('feedbackTableBody');
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackModalTitle = document.getElementById('feedbackModalTitle');
    const feedbackUser = document.getElementById('feedbackUser');
    const feedbackDate = document.getElementById('feedbackDate');
    const feedbackEmail = document.getElementById('feedbackEmail');
    const feedbackStatus = document.getElementById('feedbackStatus');
    const feedbackContent = document.getElementById('feedbackContent');
    const closeFeedbackModal = document.getElementById('closeFeedbackModal');
    const markResolvedBtn = document.getElementById('markResolvedBtn');
    const markPendingBtn = document.getElementById('markPendingBtn');
    const deleteFeedbackBtn = document.getElementById('deleteFeedbackBtn');
    
    // Current selected feedback ID
    let currentFeedbackId = null;

    // Initialize the application
    function init() {
        // Check sessionStorage for login state
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedEmail = sessionStorage.getItem('adminEmail');
    
    if (isLoggedIn && storedEmail === adminData.email) {
        // User is logged in
        loginModal.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        
        // Load admin data
        adminFullName.textContent = adminData.fullName;
        adminEmail.textContent = adminData.email;
        
        // Check for stored active tab
        const activeTab = sessionStorage.getItem('activeTab') || 'profile';
        showSection(activeTab);
        
        // Load content based on active tab
        if (activeTab === 'dictionary') {
            renderDictionaryEntries();
        } else if (activeTab === 'feedback') {
            loadFeedback(); // Make sure this matches your feedback loading function
        }
    } else {
        // User not logged in
        adminDashboard.classList.add('hidden');
        loginModal.classList.remove('hidden');
    }
        
        // Set up event listeners
        setupEventListeners();
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (in a real app, this would be a server request)
            if (email === adminData.email && password === adminData.password) {
                // Store login state in sessionStorage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('adminEmail', email);
                
                loginModal.classList.add('hidden');
                adminDashboard.classList.remove('hidden');
            } else {
                alert('Invalid email or password');
            }
        });
        
        // Logout button
        logoutBtn.addEventListener('click', function() {
            // Clear the session storage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('adminEmail');
            
            adminDashboard.classList.add('hidden');
            loginModal.classList.remove('hidden');
            loginForm.reset();
        });
        
        // Navigation tabs
        profileTab.addEventListener('click', function() {
            showSection('profile');
        });
        
        dictionaryTab.addEventListener('click', function() {
            showSection('dictionary');
        });
        
        feedbackTab.addEventListener('click', function() {
            showSection('feedback');
        });
        
        // Profile edit buttons
        editProfileBtn.addEventListener('click', function() {
            editFullName.value = adminData.fullName;
            editEmail.value = adminData.email;
            editProfileForm.classList.remove('hidden');
            editProfileBtn.classList.add('hidden');
        });
        
        cancelEditBtn.addEventListener('click', function() {
            editProfileForm.classList.add('hidden');
            editProfileBtn.classList.remove('hidden');
        });
        
        // Profile form submission
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate current password if changing password
            if (newPassword.value && currentPassword.value !== adminData.password) {
                alert('Current password is incorrect');
                return;
            }
            
            // Update admin data
            adminData.fullName = editFullName.value;
            adminData.email = editEmail.value;
            if (newPassword.value) {
                adminData.password = newPassword.value;
            }
            
            // Update UI
            adminFullName.textContent = adminData.fullName;
            adminEmail.textContent = adminData.email;
            
            // Hide form
            editProfileForm.classList.add('hidden');
            editProfileBtn.classList.remove('hidden');
            
            // Clear password fields
            currentPassword.value = '';
            newPassword.value = '';
            
            alert('Profile updated successfully');
        });
        
        // Dictionary management
        addEntryBtn.addEventListener('click', function() {
            showEntryModal('add');
        });
        
        languageFilter.addEventListener('change', function() {
            renderDictionaryEntries();
        });
        
        // Entry form submission
        entryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const term = entryTerm.value.trim();
            const translation = entryTranslation.value.trim();
            const language = entryLanguage.value;
            const example = entryExample.value.trim();
            
            if (entryId.value) {
                // Edit existing entry
                const id = parseInt(entryId.value);
                const index = dictionaryEntries.findIndex(entry => entry.id === id);
                
                if (index !== -1) {
                    dictionaryEntries[index] = {
                        id,
                        term,
                        translation,
                        language,
                        example
                    };
                }
            } else {
                // Add new entry
                const newId = dictionaryEntries.length > 0 
                    ? Math.max(...dictionaryEntries.map(entry => entry.id)) + 1 
                    : 1;
                
                dictionaryEntries.push({
                    id: newId,
                    term,
                    translation,
                    language,
                    example
                });
            }
            
            // Refresh table and hide modal
            renderDictionaryEntries();
            entryModal.classList.add('hidden');
            entryForm.reset();
        });
        
        cancelEntryBtn.addEventListener('click', function() {
            entryModal.classList.add('hidden');
            entryForm.reset();
        });
        
        // Feedback management
        closeFeedbackModal.addEventListener('click', function() {
            feedbackModal.classList.add('hidden');
        });
        
        markResolvedBtn.addEventListener('click', function() {
            if (currentFeedbackId) {
                const feedback = feedbackEntries.find(f => f.id === currentFeedbackId);
                if (feedback) {
                    feedback.status = "resolved";
                    renderFeedbackEntries();
                    feedbackModal.classList.add('hidden');
                }
            }
        });
        
        markPendingBtn.addEventListener('click', function() {
            if (currentFeedbackId) {
                const feedback = feedbackEntries.find(f => f.id === currentFeedbackId);
                if (feedback) {
                    feedback.status = "pending";
                    renderFeedbackEntries();
                    feedbackModal.classList.add('hidden');
                }
            }
        });
        
        deleteFeedbackBtn.addEventListener('click', function() {
            if (currentFeedbackId) {
                if (confirm('Are you sure you want to delete this feedback?')) {
                    feedbackEntries = feedbackEntries.filter(f => f.id !== currentFeedbackId);
                    renderFeedbackEntries();
                    feedbackModal.classList.add('hidden');
                }
            }
        });
    }

    // Show the selected section
    function showSection(section) {
        // Reset all tabs and sections
        profileTab.classList.remove('bg-blue-100', 'text-blue-700');
        profileTab.classList.add('hover:bg-gray-100');
        profileSection.classList.add('hidden');
        
        dictionaryTab.classList.remove('bg-blue-100', 'text-blue-700');
        dictionaryTab.classList.add('hover:bg-gray-100');
        dictionarySection.classList.add('hidden');
        
        feedbackTab.classList.remove('bg-blue-100', 'text-blue-700');
        feedbackTab.classList.add('hover:bg-gray-100');
        feedbackSection.classList.add('hidden');
        
        // Activate selected tab and section
        switch(section) {
            case 'profile':
                profileTab.classList.add('bg-blue-100', 'text-blue-700');
                profileTab.classList.remove('hover:bg-gray-100');
                profileSection.classList.remove('hidden');
                break;
            case 'dictionary':
                dictionaryTab.classList.add('bg-blue-100', 'text-blue-700');
                dictionaryTab.classList.remove('hover:bg-gray-100');
                dictionarySection.classList.remove('hidden');
                break;
            case 'feedback':
                feedbackTab.classList.add('bg-blue-100', 'text-blue-700');
                feedbackTab.classList.remove('hover:bg-gray-100');
                feedbackSection.classList.remove('hidden');
                break;
        }
    }

    // Render dictionary entries in the table
    function renderDictionaryEntries() {
        const filter = languageFilter.value;
        let entriesToShow = dictionaryEntries;
        
        if (filter !== 'all') {
            entriesToShow = dictionaryEntries.filter(entry => entry.language === filter);
        }
        
        dictionaryTableBody.innerHTML = '';
        
        if (entriesToShow.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">No entries found</td>
            `;
            dictionaryTableBody.appendChild(row);
            return;
        }
        
        entriesToShow.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${entry.term}</td>
                <td class="px-6 py-4 whitespace-nowrap">${entry.translation}</td>
                <td class="px-6 py-4 whitespace-nowrap capitalize">${entry.language}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="edit-btn action-btn mr-2" data-id="${entry.id}">
                        <i class="fas fa-edit mr-1"></i> Edit
                    </button>
                    <button class="delete-btn action-btn" data-id="${entry.id}">
                        <i class="fas fa-trash-alt mr-1"></i> Delete
                    </button>
                </td>
            `;
            dictionaryTableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                showEntryModal('edit', id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteDictionaryEntry(id);
            });
        });
    }

    // Show the entry modal for adding or editing
    function showEntryModal(action, id = null) {
        if (action === 'edit' && id) {
            const entry = dictionaryEntries.find(e => e.id === id);
            if (entry) {
                modalTitle.textContent = 'Edit Dictionary Entry';
                entryId.value = entry.id;
                entryTerm.value = entry.term;
                entryTranslation.value = entry.translation;
                entryLanguage.value = entry.language;
                entryExample.value = entry.example || '';
            }
        } else {
            modalTitle.textContent = 'Add New Dictionary Entry';
            entryId.value = '';
            entryTerm.value = '';
            entryTranslation.value = '';
            entryLanguage.value = 'ilocano';
            entryExample.value = '';
        }
        
        entryModal.classList.remove('hidden');
    }

    // Delete a dictionary entry
    function deleteDictionaryEntry(id) {
        if (confirm('Are you sure you want to delete this entry?')) {
            dictionaryEntries = dictionaryEntries.filter(entry => entry.id !== id);
            renderDictionaryEntries();
        }
    }

    // Render feedback entries in the table
    function renderFeedbackEntries() {
        feedbackTableBody.innerHTML = '';
        
        if (feedbackEntries.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">No feedback found</td>
            `;
            feedbackTableBody.appendChild(row);
            return;
        }
        
        feedbackEntries.forEach(feedback => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${feedback.user}</td>
                <td class="px-6 py-4 whitespace-nowrap">${feedback.date}</td>
                <td class="px-6 py-4">${feedback.content.substring(0, 50)}${feedback.content.length > 50 ? '...' : ''}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="status-badge status-${feedback.status}">
                        ${feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 view-feedback-btn" data-id="${feedback.id}">
                        <i class="fas fa-eye mr-1"></i> View
                    </button>
                </td>
            `;
            feedbackTableBody.appendChild(row);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-feedback-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                showFeedbackDetails(id);
            });
        });
    }

    // Show feedback details in modal
    function showFeedbackDetails(id) {
        currentFeedbackId = id;
        const feedback = feedbackEntries.find(f => f.id === id);
        
        if (feedback) {
            feedbackModalTitle.textContent = `Feedback #${feedback.id}`;
            feedbackUser.textContent = feedback.user;
            feedbackDate.textContent = feedback.date;
            feedbackEmail.textContent = feedback.email;
            feedbackStatus.textContent = feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1);
            feedbackContent.textContent = feedback.content;
            
            // Update status button visibility
            if (feedback.status === 'resolved') {
                markResolvedBtn.classList.add('hidden');
                markPendingBtn.classList.remove('hidden');
            } else {
                markResolvedBtn.classList.remove('hidden');
                markPendingBtn.classList.add('hidden');
            }
            
            feedbackModal.classList.remove('hidden');
        }
        
    }
    function loadFeedback() {
    fetch('get_feedback.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('feedbackTableBody');
            tbody.innerHTML = '';
            
            data.forEach(feedback => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${feedback.name}</td>
                    <td>${new Date(feedback.created_at).toLocaleDateString()}</td>
                    <td>${feedback.feedback.substring(0, 50)}${feedback.feedback.length > 50 ? '...' : ''}</td>
                    <td><span class="status-badge ${feedback.status}">${feedback.status}</span></td>
                    <td>
                        <button class="btn-view" data-id="${feedback.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Add event listeners to view buttons
            document.querySelectorAll('.btn-view').forEach(btn => {
                btn.addEventListener('click', function() {
                    const feedbackId = this.getAttribute('data-id');
                    showFeedbackDetails(feedbackId);
                });
            });
        })
    }

function showFeedbackDetails(feedbackId) {
    fetch(`get_feedback.php?id=${feedbackId}`)
        .then(response => response.json())
        .then(feedback => {
            document.getElementById('feedbackUser').textContent = feedback.name;
            document.getElementById('feedbackDate').textContent = new Date(feedback.created_at).toLocaleString();
            document.getElementById('feedbackEmail').textContent = feedback.email;
            document.getElementById('feedbackStatus').textContent = feedback.status;
            document.getElementById('feedbackContent').textContent = feedback.feedback;
            
            // Show modal
            document.getElementById('feedbackModal').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error loading feedback details:', error);
        });
}
    
    // document.getElementById('feedbackTab').addEventListener('click', function() {
    //     loadFeedback();
    // });
    // Initialize the application
    init();
    
});