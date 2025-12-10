const mailbox = document.getElementById("mailbox");
const mailboxWrapper = document.getElementById("mailboxWrapper");
const letter = document.getElementById("letter");
const foldedLetter = document.getElementById("foldedLetter");
const heartsContainer = document.getElementById("heartsContainer");
const backgroundMusic = document.getElementById("backgroundMusic");
let isOpened = false;
let musicPlayed = false;
let letterIsUnfolded = false; // Vẫn cần để tránh kích hoạt lại

// Create hearts on page load
function createHearts() {
    const heartCount = 15; // Number of hearts
    const sizes = ['size-small', 'size-medium', 'size-large', 'size-xlarge'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = `heart ${sizes[Math.floor(Math.random() * sizes.length)]}`;
        
        const img = document.createElement('img');
        img.src = 'images/heart.png';
        img.alt = 'heart';
        heart.appendChild(img);
        
        // Random position
        const left = Math.random() * 100; // 0-100%
        const top = Math.random() * 100; // 0-100%
        
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        
        // Random delay for appearance (0-0.4s) for staggered effect
        const delay = Math.random() * 0.4;
        heart.style.animationDelay = `${delay}s, ${3.5 + delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Initialize hearts when page loads
window.addEventListener('DOMContentLoaded', () => {
    createHearts();
});

// Function to play music
function playMusic() {
    if (!musicPlayed && backgroundMusic) {
        backgroundMusic.play().catch(error => {
            console.log("Audio play failed:", error);
            // Some browsers require user interaction first
        });
        musicPlayed = true;
    }
}

// Play music when clicking anywhere on the screen
document.addEventListener("click", () => {
    playMusic();
});

// Play music on touch for mobile
document.addEventListener("touchstart", () => {
    playMusic();
}, { once: true });


// LOGIC TỰ ĐỘNG MỞ THƯ
function autoUnfoldLetter() {
    if (letterIsUnfolded) return; 

    letterIsUnfolded = true;

    // 1. Ẩn lá thư gấp sau 2 GIÂY KHI NÓ VỪA HIỆN RA
    setTimeout(() => {
        foldedLetter.classList.add("hide");
        
        // 2. Đợi 0.3s để hiệu ứng ẩn thư gấp xong
        setTimeout(() => {
            foldedLetter.style.display = 'none'; // Ẩn hẳn
            
            // 3. Hiển thị bức thư đầy đủ ngay lập tức với animation "opening"
            letter.classList.add("show");
            letter.classList.add("opening");
            
        }, 300); // 0.3 giây cho hiệu ứng ẩn thư gấp
        
    }, 2000); // Đợi 2 giây sau khi thư gấp đã hiện ra
}


// Sự kiện khi click vào Hòm thư
mailbox.addEventListener("click", () => {
    if (isOpened) return; // Prevent multiple clicks
    
    isOpened = true;
    
    // Play music when opening mailbox
    playMusic();
    
    // Add opened class to show open mailbox
    mailbox.classList.add("opened");
    
    // Đợi 0.3s cho hòm thư mở, sau đó hiện lá thư gấp VÀ kích hoạt TỰ ĐỘNG MỞ
    setTimeout(() => {
        foldedLetter.classList.add("show"); // HIỆN THƯ GẤP
        autoUnfoldLetter(); // KÍCH HOẠT TỰ ĐỘNG MỞ
    }, 300);
    
    // Disable cursor pointer after opening
    mailbox.style.cursor = "default";
});

// Touch event cho Hòm thư
mailbox.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (!isOpened) {
        mailbox.click();
    }
}, { passive: false });

