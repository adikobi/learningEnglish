// DOM Elements
const wordElement = document.getElementById('word');
const emojiOptionsElement = document.getElementById('emoji-options');
const translationElement = document.getElementById('translation');
const correctEmojiElement = document.getElementById('correct-emoji');
const nextButton = document.getElementById('next-word');
const soundButton = document.getElementById('sound-toggle');
const level2Button = document.getElementById('level2-toggle');

// Game state
let soundEnabled = true;
let currentWord = null;
let showingAnswer = false;
let level2Enabled = false; // New state for level 2 words

// Dictionary of words with translations and emojis
const words = {
    // Level 1 - Basic words
    // Animals
    'dog': { translation: 'כלב', emoji: '🐕', level: 1 },
    'cat': { translation: 'חתול', emoji: '🐈', level: 1 },
    'bird': { translation: 'ציפור', emoji: '🐦', level: 1 },
    'fish': { translation: 'דג', emoji: '🐠', level: 1 },
    'lion': { translation: 'אריה', emoji: '🦁', level: 1 },
    'elephant': { translation: 'פיל', emoji: '🐘', level: 1 },
    'giraffe': { translation: 'ג\'ירף', emoji: '🦒', level: 1 },
    'monkey': { translation: 'קוף', emoji: '🐒', level: 1 },
    'turtle': { translation: 'צב', emoji: '🐢', level: 1 },
    'butterfly': { translation: 'פרפר', emoji: '🦋', level: 1 },
    'bear': { translation: 'דוב', emoji: '🐻', level: 1 },
    'tiger': { translation: 'נמר', emoji: '🐅', level: 1 },
    'panda': { translation: 'פנדה', emoji: '🐼', level: 1 },
    'zebra': { translation: 'זברה', emoji: '🦓', level: 1 },
    'cow': { translation: 'פרה', emoji: '🐄', level: 1 },
    'pig': { translation: 'חזיר', emoji: '🐖', level: 1 },
    'sheep': { translation: 'כבשה', emoji: '��', level: 1 },
    
    // Nature
    'tree': { translation: 'עץ', emoji: '🌳', level: 1 },
    'flower': { translation: 'פרח', emoji: '🌸', level: 1 },
    'sun': { translation: 'שמש', emoji: '☀️', level: 1 },
    'moon': { translation: 'ירח', emoji: '🌙', level: 1 },
    'star': { translation: 'כוכב', emoji: '⭐', level: 1 },
    'cloud': { translation: 'ענן', emoji: '☁️', level: 1 },
    'rain': { translation: 'גשם', emoji: '🌧️', level: 1 },
    'snow': { translation: 'שלג', emoji: '❄️', level: 1 },
    'mountain': { translation: 'הר', emoji: '⛰️', level: 1 },
    'sea': { translation: 'ים', emoji: '🌊', level: 1 },
    'ocean': { translation: 'אוקיינוס', emoji: '🌊', level: 1 },
    
    // Food
    'apple': { translation: 'תפוח', emoji: '🍎', level: 1 },
    'banana': { translation: 'בננה', emoji: '🍌', level: 1 },
    'orange': { translation: 'תפוז', emoji: '🍊', level: 1 },
    'strawberry': { translation: 'תות', emoji: '🍓', level: 1 },
    'watermelon': { translation: 'אבטיח', emoji: '🍉', level: 1 },
    'pizza': { translation: 'פיצה', emoji: '🍕', level: 1 },
    'ice cream': { translation: 'גלידה', emoji: '🍦', level: 1 },
    'cake': { translation: 'עוגה', emoji: '🍰', level: 1 },
    'bread': { translation: 'לחם', emoji: '🍞', level: 1 },
    'milk': { translation: 'חלב', emoji: '🥛', level: 1 },
    'grapes': { translation: 'ענבים', emoji: '🍇', level: 1 },
    'carrot': { translation: 'גזר', emoji: '🥕', level: 1 },
    'cheese': { translation: 'גבינה', emoji: '🧀', level: 1 },
    'egg': { translation: 'ביצה', emoji: '🥚', level: 1 },
    'honey': { translation: 'דבש', emoji: '🍯', level: 1 },
    
    // Objects
    'house': { translation: 'בית', emoji: '🏠', level: 1 },
    'car': { translation: 'מכונית', emoji: '🚗', level: 1 },
    'book': { translation: 'ספר', emoji: '📚', level: 1 },
    'ball': { translation: 'כדור', emoji: '⚽', level: 1 },
    'phone': { translation: 'טלפון', emoji: '📱', level: 1 },
    'computer': { translation: 'מחשב', emoji: '💻', level: 1 },
    'clock': { translation: 'שעון', emoji: '⏰', level: 1 },
    'key': { translation: 'מפתח', emoji: '🔑', level: 1 },
    'umbrella': { translation: 'מטרייה', emoji: '☂️', level: 1 },
    'gift': { translation: 'מתנה', emoji: '🎁', level: 1 },
    'camera': { translation: 'מצלמה', emoji: '📷', level: 1 },
    'bicycle': { translation: 'אופניים', emoji: '🚲', level: 1 },
    'train': { translation: 'רכבת', emoji: '🚂', level: 1 },
    
    // Colors
    'red': { translation: 'אדום', emoji: '🔴', level: 1 },
    'blue': { translation: 'כחול', emoji: '🔵', level: 1 },
    'green': { translation: 'ירוק', emoji: '🟢', level: 1 },
    'yellow': { translation: 'צהוב', emoji: '🟡', level: 1 },
    'purple': { translation: 'סגול', emoji: '🟣', level: 1 },
    'orange': { translation: 'כתום', emoji: '🟠', level: 1 },
    'brown': { translation: 'חום', emoji: '🟤', level: 1 },
    'black': { translation: 'שחור', emoji: '⚫', level: 1 },
    'white': { translation: 'לבן', emoji: '⚪', level: 1 },
    
    // Family
    'mom': { translation: 'אמא', emoji: '👩', level: 1 },
    'dad': { translation: 'אבא', emoji: '👨', level: 1 },
    'sister': { translation: 'אחות', emoji: '👭', level: 1 },
    'brother': { translation: 'אח', emoji: '👦', level: 1 },
    'baby': { translation: 'תינוק', emoji: '👶', level: 1 },
    'grandma': { translation: 'סבתא', emoji: '👵', level: 1 },
    'grandpa': { translation: 'סבא', emoji: '👴', level: 1 },
    
    // Weather
    'wind': { translation: 'רוח', emoji: '💨', level: 1 },
    'storm': { translation: 'סערה', emoji: '⛈️', level: 1 },
    
    // Additional words
    'heart': { translation: 'לב', emoji: '💗', level: 1 },
    'pencil': { translation: 'עיפרון', emoji: '✏️', level: 1 },

    // Level 2 - Additional categories
    // Body Parts
    'head': { translation: 'ראש', emoji: '👤', level: 2 },
    'hand': { translation: 'יד', emoji: '✋', level: 2 },
    'foot': { translation: 'רגל', emoji: '🦶', level: 2 },
    'eye': { translation: 'עין', emoji: '👁️', level: 2 },
    'nose': { translation: 'אף', emoji: '👃', level: 2 },
    'mouth': { translation: 'פה', emoji: '👄', level: 2 },
    'ear': { translation: 'אוזן', emoji: '👂', level: 2 },
    'hair': { translation: 'שיער', emoji: '💇', level: 2 },

    // Clothing
    'shirt': { translation: 'חולצה', emoji: '👕', level: 2 },
    'pants': { translation: 'מכנסיים', emoji: '👖', level: 2 },
    'dress': { translation: 'שמלה', emoji: '👗', level: 2 },
    'shoes': { translation: 'נעליים', emoji: '👟', level: 2 },
    'hat': { translation: 'כובע', emoji: '🧢', level: 2 },
    'socks': { translation: 'גרביים', emoji: '🧦', level: 2 },
    'coat': { translation: 'מעיל', emoji: '🧥', level: 2 },

    // House
    'chair': { translation: 'כיסא', emoji: '🪑', level: 2 },
    'bed': { translation: 'מיטה', emoji: '🛏️', level: 2 },
    'fire': { translation: 'אש', emoji: '🔥', level: 2 },

    // Numbers
    'one': { translation: 'אחד', emoji: '1️⃣', level: 2 },
    'two': { translation: 'שתיים', emoji: '2️⃣', level: 2 },
    'three': { translation: 'שלוש', emoji: '3️⃣', level: 2 },
    'four': { translation: 'ארבע', emoji: '4️⃣', level: 2 },
    'five': { translation: 'חמש', emoji: '5️⃣', level: 2 },
    'six': { translation: 'שש', emoji: '6️⃣', level: 2 },
    'seven': { translation: 'שבע', emoji: '7️⃣', level: 2 },
    'eight': { translation: 'שמונה', emoji: '8️⃣', level: 2 },
    'nine': { translation: 'תשע', emoji: '9️⃣', level: 2 },
    'ten': { translation: 'עשר', emoji: '🔟', level: 2 },

    // Feelings
    'happy': { translation: 'שמח', emoji: '😊', level: 2 },
    'sad': { translation: 'עצוב', emoji: '😢', level: 2 },
    'angry': { translation: 'כועס', emoji: '😠', level: 2 },
    'scared': { translation: 'מפחד', emoji: '😨', level: 2 },
    'tired': { translation: 'עייף', emoji: '😴', level: 2 },
    'hungry': { translation: 'רעב', emoji: '😋', level: 2 },
    'surprised': { translation: 'מופתע', emoji: '😲', level: 2 },

    // Seasons
    'summer (עונת השנה)': { translation: 'קיץ', emoji: '☀️', level: 2 },
    'winter (עונת השנה)': { translation: 'חורף', emoji: '❄️', level: 2 },
    'autumn (עונת השנה)': { translation: 'סתיו', emoji: '🍂', level: 2 },
    'spring (עונת השנה)': { translation: 'אביב', emoji: '🌸', level: 2 },

    // Days of the Week
    'Sunday': { translation: 'ראשון', emoji: '1️⃣', level: 2 },
    'Monday': { translation: 'שני', emoji: '2️⃣', level: 2 },
    'Tuesday': { translation: 'שלישי', emoji: '3️⃣', level: 2 },
    'Wednesday': { translation: 'רביעי', emoji: '4️⃣', level: 2 },
    'Thursday': { translation: 'חמישי', emoji: '5️⃣', level: 2 },
    'Friday': { translation: 'שישי', emoji: '6️⃣', level: 2 },
    'Saturday': { translation: 'שבת', emoji: '7️⃣', level: 2 },

    // Musical Instruments
    'guitar': { translation: 'גיטרה', emoji: '🎸', level: 2 },
    'piano': { translation: 'פסנתר', emoji: '🎹', level: 2 },
    'violin': { translation: 'כינור', emoji: '🎻', level: 2 },
};

// Function to get a random word based on current level
function getRandomWord() {
    const availableWords = Object.entries(words).filter(([_, data]) => 
        data.level === 1 || (data.level === 2 && level2Enabled)
    );
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex][0];
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

    // Add speaker button next to the word
    const speakerButton = document.createElement('button');
    speakerButton.className = 'speaker-button';
    speakerButton.innerHTML = '🔊';
    speakerButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent word click event
        speakWord(word);
    });
    
    // Create word container if it doesn't exist
    let wordContainer = document.querySelector('.word-with-speaker');
    if (!wordContainer) {
        wordContainer = document.createElement('div');
        wordContainer.className = 'word-with-speaker';
        wordElement.parentNode.replaceChild(wordContainer, wordElement);
        wordContainer.appendChild(wordElement);
    }
    
    // Add or update speaker button
    const existingSpeaker = wordContainer.querySelector('.speaker-button');
    if (existingSpeaker) {
        wordContainer.removeChild(existingSpeaker);
    }
    wordContainer.appendChild(speakerButton);
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
    if (showingAnswer) {
        // If answer is already shown, just play the sound
        if (soundEnabled) {
            speakWord(currentWord);
        }
        return;
    }
    
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

// Function to toggle level 2 words
function toggleLevel2() {
    level2Enabled = !level2Enabled;
    level2Button.classList.toggle('active');
    level2Button.querySelector('.button-text').textContent = level2Enabled ? 'מילים מתקדמות' : 'מילים בסיסיות';
    
    // Get a new word when toggling levels
    currentWord = getRandomWord();
    displayWord(currentWord);
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
    
    // Sound toggle button
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundButton.classList.toggle('active');
        soundButton.querySelector('.button-text').textContent = soundEnabled ? 'כבה שמע' : 'הפעל שמע';
    });
    
    // Level 2 toggle button
    level2Button.addEventListener('click', toggleLevel2);
    
    // Initialize speech synthesis on page load for Android
    if (isAndroid) {
        speechSynthesis.cancel();
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance('');
            utterance.volume = 0;
            speechSynthesis.speak(utterance);
        }, 100);
    }
}

// Start the game when the page loads
window.addEventListener('load', init); 