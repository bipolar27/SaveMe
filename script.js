
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US'; // Set the language
recognition.interimResults = false; // Get final results only
recognition.maxAlternatives = 1; // Get only the best match

let accumulatedTranscript = '';

//const keywords = []; // Add your keywords here

// Initialize an empty array to store the words
let keywords = ['help', 'emergency', 'danger', 'assist'];

// Function to add the word to the array and display it
function addWord() {
    const inputField = document.getElementById("wordInput");
    const word = inputField.value.trim(); // Get the word from the input field and trim any whitespace

    if (word !== "") {
        keywords.push(word); // Add the word to the array

        // Display the word in the list
        const wordList = document.getElementById("wordList");
        const listItem = document.createElement("li");
        listItem.textContent = word;
        wordList.appendChild(listItem);

        inputField.value = ""; // Clear the input field
        inputField.focus(); // Set focus back to the input field
    }
}

// Optional: Allow pressing Enter to add the word
document.getElementById("wordInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      addWord();
  }
});


recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    accumulatedTranscript += transcript + ' '; // Accumulate the transcript
    console.log('Accumulated Transcript:', accumulatedTranscript);

    checkForKeywords(transcript); // Check for keywords in the transcript
};

function checkForKeywords(transcript) {
    const lowerTranscript = transcript.toLowerCase(); // Convert to lowercase for case-insensitive matching
    for (let keyword of keywords) {
        if (lowerTranscript.includes(keyword.toLowerCase())) {
            alert(`Keyword detected: ${keyword}`);
            break; // Stop checking after the first match
        }
    }
}

function saveTranscriptAsFile() {
    const a = document.createElement('a');
    const blob = new Blob([accumulatedTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'transcript.txt';
    a.click();

    //accumulatedTranscript = ''; // Clear the accumulated transcript after saving
}

setInterval(saveTranscriptAsFile, 10000); // Save the transcript every 10 seconds

recognition.onend = function() {
    recognition.start(); // Restart immediately
};

function startSpeechRecognition() {
    recognition.start();
    console.log('Speech recognition started');
}

startSpeechRecognition(); // Start the initial recognition
