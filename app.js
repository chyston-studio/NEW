document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. ALBUM DATABASE & PASSWORDS =================
    // Default password for "personal-2026" is: secret123
    const ALBUM_DATA = {
        'personal-2026': {
            title: 'Personal Archives 2026',
            description: 'Private personal photos & behind-the-scenes moments.',
            password: 'secret123', // <-- Set your album password here
            photos: [
                {
                    thumb: 'https://picsum.photos/800/600?random=50',
                    full: 'https://picsum.photos/1400/900?random=50',
                    title: 'Behind the Lens',
                    desc: 'Candid photo setting up gear on the field.'
                },
                {
                    thumb: 'https://picsum.photos/800/600?random=51',
                    full: 'https://picsum.photos/1400/900?random=51',
                    title: 'Road Trip Notes',
                    desc: 'Scouting locations in late autumn.'
                },
                {
                    thumb: 'https://picsum.photos/800/600?random=52',
                    full: 'https://picsum.photos/1400/900?random=52',
                    title: 'Private Studio Session',
                    desc: 'Testing out studio lighting setups.'
                },
                {
                    thumb: 'https://picsum.photos/800/600?random=53',
                    full: 'https://picsum.photos/1400/900?random=53',
                    title: 'Sunset Reflections',
                    desc: 'Personal favorite unreleased shot.'
                }
            ]
        }
    };

    let selectedAlbumId = null;

    // ================= 2. PAGE NAVIGATION =================
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-page');

            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            pages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ================= 3. CAROUSEL CONTROLS =================
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselWrapper = document.getElementById('home-carousel');

    if (carouselWrapper && prevBtn && nextBtn) {
        const scrollAmount = 400;

        nextBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // ================= 4. ALBUM PASSWORD & UNLOCK SYSTEM =================
    const albumCards = document.querySelectorAll('.album-card');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('album-password-input');
    const passwordError = document.getElementById('password-error');
    const submitPasswordBtn = document.getElementById('submit-password-btn');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');

    const albumSelectionView = document.getElementById('album-selection');
    const albumViewer = document.getElementById('album-viewer');
    const backToAlbumsBtn = document.getElementById('back-to-albums');
    const openedAlbumTitle = document.getElementById('opened-album-title');
    const openedAlbumDesc = document.getElementById('opened-album-desc');
    const openedAlbumPhotos = document.getElementById('opened-album-photos');

    // Click on an album card to trigger prompt
    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedAlbumId = card.getAttribute('data-album-id');
            passwordInput.value = '';
            passwordError.textContent = '';
            passwordModal.classList.add('active');
            passwordInput.focus();
        });
    });

    // Cancel modal
    cancelPasswordBtn.addEventListener('click', () => {
        passwordModal.classList.remove('active');
        selectedAlbumId = null;
    });

    // Check Password
    function verifyPassword() {
        if (!selectedAlbumId || !ALBUM_DATA[selectedAlbumId]) return;

        const enteredPassword = passwordInput.value;
        const correctPassword = ALBUM_DATA[selectedAlbumId].password;

        if (enteredPassword === correctPassword) {
            passwordModal.classList.remove('active');
            loadAlbum(selectedAlbumId);
        } else {
            passwordError.textContent = 'Incorrect password. Please try again.';
        }
    }

    submitPasswordBtn.addEventListener('click', verifyPassword);

    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });

    // Load unlocked album photos into gallery view
    function loadAlbum(albumId) {
        const album = ALBUM_DATA[albumId];

        openedAlbumTitle.textContent = album.title;
        openedAlbumDesc.textContent = album.description;
        openedAlbumPhotos.innerHTML = '';

        album.photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.setAttribute('data-full', photo.full);
            photoCard.setAttribute('data-title', photo.title);
            photoCard.setAttribute('data-desc', photo.desc);

            photoCard.innerHTML = `
                <div class="img-wrapper">
                    <img src="${photo.thumb}" alt="${photo.title}">
                </div>
                <div class="card-caption">
                    <h4>${photo.title}</h4>
                    <p>${photo.desc}</p>
                </div>
            `;

            // Attach lightbox handler to dynamically created photos
            photoCard.addEventListener('click', () => {
                openLightbox(photo.full, photo.title, photo.desc);
            });

            openedAlbumPhotos.appendChild(photoCard);
        });

        albumSelectionView.style.display = 'none';
        albumViewer.style.display = 'block';
    }

    // Back button to return to directory
    backToAlbumsBtn.addEventListener('click', () => {
        albumViewer.style.display = 'none';
        albumSelectionView.style.display = 'grid';
        selectedAlbumId = null;
    });

    // ================= 5. LIGHTBOX SYSTEM =================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(fullSrc, title, desc) {
        lightboxImg.src = fullSrc;
        lightboxTitle.textContent = title || 'Untitled';
        lightboxDesc.textContent = desc || '';
        lightbox.classList.add('active');
    }

    // Enable lightbox for static elements on page
    document.querySelectorAll('.photo-card').forEach(card => {
        // Skip album entry cards
        if (card.classList.contains('album-card')) return;

        card.addEventListener('click', () => {
            const fullSrc = card.getAttribute('data-full');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            openLightbox(fullSrc, title, desc);
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            passwordModal.classList.remove('active');
        }
    });

});
