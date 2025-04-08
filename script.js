// DOM Elements
const wordElement = document.getElementById('word');
const emojiOptionsElement = document.getElementById('emoji-options');
const translationElement = document.getElementById('translation');
const correctEmojiElement = document.getElementById('correct-emoji');
const nextButton = document.getElementById('next-word');
const soundButton = document.getElementById('sound-toggle');
const helpButton = document.getElementById('help-button');

// Game state
let soundEnabled = true;
let currentWord = null;
let showingAnswer = false;

// Dictionary of words with their translations and emojis
const words = {
    // Animals
    'dog': { translation: 'כלב', emoji: '🐕' },
    'cat': { translation: 'חתול', emoji: '🐈' },
    'bird': { translation: 'ציפור', emoji: '🐦' },
    'fish': { translation: 'דג', emoji: '🐠' },
    'lion': { translation: 'אריה', emoji: '🦁' },
    'elephant': { translation: 'פיל', emoji: '🐘' },
    'giraffe': { translation: 'ג\'ירף', emoji: '🦒' },
    'monkey': { translation: 'קוף', emoji: '🐒' },
    'turtle': { translation: 'צב', emoji: '🐢' },
    'butterfly': { translation: 'פרפר', emoji: '🦋' },
    
    // Nature
    'tree': { translation: 'עץ', emoji: '🌳' },
    'flower': { translation: 'פרח', emoji: '🌸' },
    'sun': { translation: 'שמש', emoji: '☀️' },
    'moon': { translation: 'ירח', emoji: '🌙' },
    'star': { translation: 'כוכב', emoji: '⭐' },
    'cloud': { translation: 'ענן', emoji: '☁️' },
    'rain': { translation: 'גשם', emoji: '🌧️' },
    'snow': { translation: 'שלג', emoji: '❄️' },
    'mountain': { translation: 'הר', emoji: '⛰️' },
    'sea': { translation: 'ים', emoji: '🌊' },
    
    // Food
    'apple': { translation: 'תפוח', emoji: '🍎' },
    'banana': { translation: 'בננה', emoji: '🍌' },
    'orange': { translation: 'תפוז', emoji: '🍊' },
    'strawberry': { translation: 'תות', emoji: '🍓' },
    'watermelon': { translation: 'אבטיח', emoji: '🍉' },
    'pizza': { translation: 'פיצה', emoji: '🍕' },
    'ice cream': { translation: 'גלידה', emoji: '🍦' },
    'cake': { translation: 'עוגה', emoji: '🍰' },
    'bread': { translation: 'לחם', emoji: '🍞' },
    'milk': { translation: 'חלב', emoji: '🥛' },
    
    // Objects
    'house': { translation: 'בית', emoji: '🏠' },
    'car': { translation: 'מכונית', emoji: '🚗' },
    'book': { translation: 'ספר', emoji: '📚' },
    'ball': { translation: 'כדור', emoji: '⚽' },
    'phone': { translation: 'טלפון', emoji: '📱' },
    'computer': { translation: 'מחשב', emoji: '💻' },
    'clock': { translation: 'שעון', emoji: '⏰' },
    'key': { translation: 'מפתח', emoji: '🔑' },
    'umbrella': { translation: 'מטרייה', emoji: '☂️' },
    'gift': { translation: 'מתנה', emoji: '🎁' },
    
    // Colors
    'red': { translation: 'אדום', emoji: '🔴' },
    'blue': { translation: 'כחול', emoji: '🔵' },
    'green': { translation: 'ירוק', emoji: '🟢' },
    'yellow': { translation: 'צהוב', emoji: '🟡' },
    'purple': { translation: 'סגול', emoji: '🟣' },
    'orange': { translation: 'כתום', emoji: '🟠' },
    'brown': { translation: 'חום', emoji: '🟤' },
    'black': { translation: 'שחור', emoji: '⚫' },
    'white': { translation: 'לבן', emoji: '⚪' },
    
    // Additional words
    'heart': { translation: 'לב', emoji: '💗' }
};

// Function to get a random word from the dictionary
function getRandomWord() {
    const wordKeys = Object.keys(words);
    return wordKeys[Math.floor(Math.random() * wordKeys.length)];
}

// Function to get random emojis (excluding the correct one)
function getRandomEmojis(correctEmoji, count = 2) {
    const allEmojis = Object.values(words).map(word => word.emoji);
    const otherEmojis = allEmojis.filter(emoji => emoji !== correctEmoji);
    
    // Shuffle and take the first 'count' emojis
    const shuffled = otherEmojis.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to display a word with emoji options
function displayWord(word) {
    currentWord = word;
    showingAnswer = false;
    
    // Clear previous content
    wordElement.textContent = word;
    translationElement.textContent = '';
    correctEmojiElement.textContent = '';
    emojiOptionsElement.innerHTML = '';
    emojiOptionsElement.style.display = 'flex'; // Make sure the container is visible
    
    // Get the correct emoji and two random ones
    const correctEmoji = words[word].emoji;
    const randomEmojis = getRandomEmojis(correctEmoji);
    
    // Combine and shuffle all emojis
    const allEmojis = [correctEmoji, ...randomEmojis].sort(() => 0.5 - Math.random());
    
    // Create emoji options
    allEmojis.forEach(emoji => {
        const emojiOption = document.createElement('div');
        emojiOption.className = 'emoji-option';
        emojiOption.textContent = emoji;
        emojiOption.addEventListener('click', () => checkAnswer(emoji, correctEmoji));
        emojiOptionsElement.appendChild(emojiOption);
    });
}

// Function to check if the selected emoji is correct
function checkAnswer(selectedEmoji, correctEmoji) {
    if (showingAnswer) return;
    
    const emojiOptions = document.querySelectorAll('.emoji-option');
    emojiOptions.forEach(option => {
        if (option.textContent === selectedEmoji) {
            if (selectedEmoji === correctEmoji) {
                option.classList.add('correct');
                triggerConfetti();
                setTimeout(() => {
                    showAnswer();
                }, 1000);
            } else {
                option.classList.add('wrong');
            }
        }
    });
}

// Function to show the answer
function showAnswer() {
    if (showingAnswer) return;
    
    showingAnswer = true;
    const wordData = words[currentWord];
    translationElement.textContent = wordData.translation;
    correctEmojiElement.textContent = wordData.emoji;
    emojiOptionsElement.style.display = 'none';
    
    if (soundEnabled) {
        speakWord(currentWord);
    }
}

// Function to speak a word
function speakWord(word) {
    if (!soundEnabled) return;
    
    // Check if running on Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(word);
    
    // Set English language
    utterance.lang = 'en-US';
    
    // Different handling for Android
    if (isAndroid) {
        // Try alternative approach for Android
        try {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            // Use a short timeout to ensure the speech engine is ready
            setTimeout(() => {
                // Set volume and rate for better chances on Android
                utterance.volume = 1;
                utterance.rate = 0.8; // Slightly slower for better understanding
                utterance.pitch = 1;
                
                // Speak the word
                window.speechSynthesis.speak(utterance);
            }, 100);
        } catch (e) {
            console.error("Speech synthesis failed on Android:", e);
        }
    } else {
        // Normal handling for other devices
        // Set voice to English if available
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang === 'en-US');
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        // Speak the word
        window.speechSynthesis.speak(utterance);
    }
}

// Function to trigger confetti animation
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Initialize the game
function init() {
    // Display first word
    displayWord(getRandomWord());
    
    // Add click event for the word to show answer
    wordElement.addEventListener('click', showAnswer);
    
    // Next word button
    nextButton.addEventListener('click', () => {
        displayWord(getRandomWord());
    });
    
    // Sound toggle
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundButton.style.backgroundColor = soundEnabled ? '#2ecc71' : '#3498db';
        soundButton.querySelector('.button-text').textContent = soundEnabled ? 'הפעל קול' : 'כבה קול';
    });
    
    // Help button
    helpButton.addEventListener('click', showAnswer);
    
    // Initialize speech synthesis on page load for Android
    if (/Android/i.test(navigator.userAgent)) {
        // Initialize speech synthesis with volume 0
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        window.speechSynthesis.speak(utterance);
    }
}

// Start the game when the page loads
window.addEventListener('load', init); 