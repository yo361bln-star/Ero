document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-hidden';
    
    // Lightbox Content Structure
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <img id="lightbox-img" src="" alt="Großansicht">
            <div class="lightbox-text">
                <h3 id="lightbox-title"></h3>
                <p id="lightbox-desc"></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);

    // Elements
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.close-btn');

    // Function to open lightbox
    const openLightbox = (img) => {
        lightboxImg.src = img.src;
        // Fallback to alt text if no data-title is present, but preference is data-attributes
        lightboxTitle.textContent = img.dataset.title || img.alt;
        lightboxDesc.textContent = img.dataset.desc || "Professionelle Ausführung durch EY Abriss und mehr.";
        
        lightbox.classList.remove('lightbox-hidden');
        lightbox.classList.add('lightbox-visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('lightbox-visible');
        lightbox.classList.add('lightbox-hidden');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Attach click listeners to all reference images
    const images = document.querySelectorAll('.ref-img, .ref-gallery img');
    images.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on click outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('lightbox-visible')) {
            closeLightbox();
        }
    });
});

// Audio Autoplay Handling
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");
    if(audio) {
        audio.play().catch(error => {
            console.log("Autoplay prevented. Music will start on interaction.");
            document.body.addEventListener("click", () => {
                audio.play();
            }, { once: true });
        });
    }
});

