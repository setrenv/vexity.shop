// Typewriter effect
const phrases = ["fuck yall yn's", "stalking me? that's hot"];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

const typewriterText = document.getElementById('typewriterText');
const cursor = document.getElementById('cursor');

function typewriter() {
    const phrase = phrases[currentPhrase];
    
    if (!isDeleting) {
        if (currentChar < phrase.length) {
            typewriterText.textContent += phrase[currentChar];
            currentChar++;
            setTimeout(typewriter, 80);
        } else {
            setTimeout(() => {
                isDeleting = true;
                typewriter();
            }, 2000);
        }
    } else {
        if (currentChar > 0) {
            typewriterText.textContent = phrase.substring(0, currentChar - 1);
            currentChar--;
            setTimeout(typewriter, 80);
        } else {
            currentPhrase = (currentPhrase + 1) % phrases.length;
            isDeleting = false;
            setTimeout(typewriter, 500);
        }
    }
}

// Initialize
typewriter();

// Data structure
let bioData = {
    links: [{ id: '1', title: 'Roblox', url: 'https://www.roblox.com', icon: '🎮' }],
    backgroundVideo: null,
    music: null,
    profilePic: null
};

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('bioData');
    if (saved) {
        bioData = JSON.parse(saved);
        renderLinks();
        loadMedia();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('bioData', JSON.stringify(bioData));
}

// Render links
function renderLinks() {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';
    
    bioData.links.forEach(link => {
        const card = document.createElement('a');
        card.className = 'link-card';
        card.href = link.url;
        card.target = '_blank';
        card.innerHTML = `<span>${link.icon || '→'} ${link.title}</span>`;
        container.appendChild(card);
    });
}

// Render links in admin
function renderLinksAdmin() {
    const container = document.getElementById('linksEditContainer');
    container.innerHTML = '';
    
    bioData.links.forEach(link => {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-center bg-gray-800 p-3 rounded border border-gray-600';
        div.innerHTML = `
            <input type="text" value="${link.icon || ''}" placeholder="Icon" class="w-12 p-2 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300" onchange="updateLink('${link.id}', 'icon', this.value)">
            <input type="text" value="${link.title}" placeholder="Title" class="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300" onchange="updateLink('${link.id}', 'title', this.value)">
            <input type="text" value="${link.url}" placeholder="URL" class="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-sm text-gray-300" onchange="updateLink('${link.id}', 'url', this.value)">
            <button onclick="deleteLink('${link.id}')" class="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-700 rounded text-sm text-gray-300 transition-colors">Delete</button>
        `;
        container.appendChild(div);
    });
}

// Load media
function loadMedia() {
    if (bioData.profilePic) {
        const img = document.getElementById('profilePic');
        img.src = bioData.profilePic;
        img.style.display = 'block';
        document.getElementById('pfpImg').src = bioData.profilePic;
        document.getElementById('pfpPreview').style.display = 'flex';
    }
    
    if (bioData.backgroundVideo) {
        const video = document.getElementById('bgVideo');
        video.src = bioData.backgroundVideo;
        video.style.display = 'block';
        document.getElementById('videoStatus').style.display = 'block';
    }
    
    if (bioData.music) {
        const audio = document.getElementById('bgAudio');
        audio.src = bioData.music;
        document.getElementById('audioToggle').style.display = 'block';
    }
}

// Handle file upload
function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const url = e.target.result;
        
        if (type === 'pfp') {
            bioData.profilePic = url;
            const img = document.getElementById('profilePic');
            img.src = url;
            img.style.display = 'block';
            document.getElementById('pfpImg').src = url;
            document.getElementById('pfpPreview').style.display = 'flex';
        } else if (type === 'video') {
            bioData.backgroundVideo = url;
            const video = document.getElementById('bgVideo');
            video.src = url;
            video.style.display = 'block';
            document.getElementById('videoStatus').style.display = 'block';
        } else if (type === 'audio') {
            bioData.music = url;
            const audio = document.getElementById('bgAudio');
            audio.src = url;
            document.getElementById('audioToggle').style.display = 'block';
        }
        
        saveData();
    };
    reader.readAsDataURL(file);
}

// Link management
function addLink() {
    const icon = document.getElementById('newLinkIcon').value;
    const title = document.getElementById('newLinkTitle').value;
    const url = document.getElementById('newLinkUrl').value;
    
    if (title && url) {
        bioData.links.push({
            id: Date.now().toString(),
            title,
            url,
            icon
        });
        document.getElementById('newLinkIcon').value = '';
        document.getElementById('newLinkTitle').value = '';
        document.getElementById('newLinkUrl').value = '';
        saveData();
        renderLinks();
        renderLinksAdmin();
    }
}

function updateLink(id, field, value) {
    const link = bioData.links.find(l => l.id === id);
    if (link) {
        link[field] = value;
        saveData();
        renderLinks();
    }
}

function deleteLink(id) {
    bioData.links = bioData.links.filter(l => l.id !== id);
    saveData();
    renderLinks();
    renderLinksAdmin();
}

// Admin panel
function toggleAdmin() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
        renderLinksAdmin();
    }
}

// Audio
function toggleAudio() {
    const audio = document.getElementById('bgAudio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Initialize on load
loadData();
renderLinks();
