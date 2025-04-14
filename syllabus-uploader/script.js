document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const contentPreview = document.getElementById('contentPreview');
    const fileContent = document.getElementById('fileContent');
    const clearButton = document.getElementById('clearButton');
    const analyzeButton = document.getElementById('analyzeButton');

    // Deal with file input change event
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;

        // show file name
        fileName.textContent = file.name;
        fileInfo.classList.remove('hidden');
        
        // show loading
        loadingIndicator.classList.remove('hidden');
        
        // hide content preview
        contentPreview.classList.add('hidden');

        // read file
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // hide loading
            loadingIndicator.classList.add('hidden');
            
            // show preview
            const content = e.target.result;
            fileContent.textContent = content;
            contentPreview.classList.remove('hidden');
            
            // store in localstorage
            localStorage.setItem('syllabusContent', content);
            localStorage.setItem('syllabusFileName', file.name);
        };
        
        reader.onerror = function() {
            loadingIndicator.classList.add('hidden');
            alert('error in reading file');
        };
        
        reader.readAsText(file);
    });

    // clearButton
    clearButton.addEventListener('click', function() {
        fileInput.value = '';
        fileInfo.classList.add('hidden');
        contentPreview.classList.add('hidden');
        localStorage.removeItem('syllabusContent');
        localStorage.removeItem('syllabusFileName');
    });

    // uploadButton
    analyzeButton.addEventListener('click', function() {
        // Check if empty
        if (!localStorage.getItem('syllabusContent')) {
            alert('Upload a syllabus file first!');
            return;
        }
        
        // TODO: jump to certain page
        window.location.href = '';
    });

    // Drag and drop
    const uploadArea = document.querySelector('.upload-area');
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#eef6fd';
        uploadArea.style.borderColor = '#3498db';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ccc';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#f9f9f9';
        uploadArea.style.borderColor = '#ccc';
        
        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            // cause change event
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
});