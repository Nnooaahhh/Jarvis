const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';

let listening = false;

if (annyang) {
    const commands = {
        'Jarvis': () => {
            if (!listening) {
                startListening();
            }
        },
        'Bye': () => {
            if (listening) {
                stopListening();
            }
        }
    };

    annyang.addCommands(commands);
    annyang.start();
}

recognition.onstart = function () {
    document.getElementById('container').classList.add('listening');
    document.getElementById('status').textContent = 'Status: Listening';
    listening = true;
}

recognition.onend = function () {
    document.getElementById('container').classList.remove('listening');
    document.getElementById('status').textContent = 'Status: Sleeping';
    listening = false;
}

function startListening() {
    recognition.start();
    listening = true;
    document.getElementById('container').classList.add('listening');
    document.getElementById('status').textContent = 'Status: Listening';
    console.log("Listening...");
}

function stopListening() {
    recognition.stop();
    listening = false;
    document.getElementById('container').classList.remove('listening');
    document.getElementById('status').textContent = 'Status: Sleeping';
    console.log("Stopped listening.");
}

function speak(response) {
    const synth = window.speechSynthesis;

    if ('speechSynthesis' in window) {
        const voices = synth.getVoices();
        const maleVoice = voices.find(voice => voice.name === 'Microsoft David Desktop - English (United States)');

        if (maleVoice) {
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.voice = maleVoice;
            synth.speak(utterance);
        } else {
            console.error("Male voice not found. Using default voice.");
            synth.speak(new SpeechSynthesisUtterance(response));
        }
    } else {
        console.error("Speech synthesis is not supported in this browser.");
    }
}

function handleUserInput(userInput) {
    const responseDiv = document.getElementById('response');
    let response = '';

    if (userInput.toLowerCase().includes('hello')) {
        response = 'Hello! How can I help you?';
    } else if (userInput.toLowerCase().includes('how are you')) {
        response = "I'm just a computer program, but I'm here to assist you.";
    } else if (userInput.toLowerCase().includes('goodbye')) {
        response = 'Goodbye! Have a great day!';
        speak(response);
    } else if (userInput.toLowerCase().includes('send an email to')) {
        const recipient = userInput.split('send an email to ')[1];
        const emailLink = `mailto:${recipient}`;
        response = `Sure, I'll open your email client to send an email to ${recipient}.`;
        window.location.href = emailLink;
    } else if (userInput.toLowerCase().includes('open google and search for')) {
        const query = userInput.split('open google and search for ')[1];
        if (query) {
            response = `Opening Google and searching for ${query}.`;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        } else {
            response = "I'm sorry, I didn't catch the search query.";
        }
    } else {
        response = "I'm sorry, I didn't understand that.";
    }

    responseDiv.textContent = `Jarvis: ${response}`;
    speak(response);
}

// Wake Up Button Click Event
document.getElementById('wakeButton').addEventListener('click', startListening);
