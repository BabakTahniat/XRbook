const canvas = document.getElementById('scrub-canvas');
const context = canvas.getContext('2d');
const loadingIndicator = document.getElementById('loading-indicator');

// Set the canvas dimensions
canvas.width = 1920; // Set to your desired resolution
canvas.height = 1080;

const frameCount = 192; // The total number of frames you exported
const currentFrame = (index) =>
    //  image path format
    `/frames/frame-${index.toString().padStart(4, '0')}.jpg`;

const images = [];
const imageState = {
    frame: 0,
};

// Preload all images
let imagesLoaded = 0;
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        imagesLoaded++;
        const percent = Math.round((imagesLoaded / frameCount) * 100);
        loadingIndicator.textContent = `Loading... ${percent}%`;
        if (imagesLoaded === frameCount) {
            loadingIndicator.style.display = 'none';
            // Draw the first frame once all are loaded
            drawImage(0);
        }
    };
    images.push(img);
}

// Function to draw a specific frame to the canvas
const drawImage = (frameIndex) => {
    const img = images[frameIndex];
    if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
};

// Update image on scroll
const handleScroll = () => {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = window.scrollY / scrollableHeight;

    // Map scroll fraction to a frame index
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    // Use requestAnimationFrame to update the canvas
    requestAnimationFrame(() => drawImage(frameIndex));
};

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
});
