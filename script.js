function sendMsg() {
    var userInput = document.getElementById("userInput").value;
    var chatBox = document.getElementById("chat-box");
    var userMsg = "<p>You: " + userInput + "</p>";
    var botMsg = getResponse(userInput);
    chatBox.innerHTML += userMsg;
    chatBox.innerHTML += "<p id='bot'>Jarvis: " + botMsg + "</p>";
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("userInput").value = "";
}

function getResponse(userInput) {
    if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        return "Hello! How are you today?";
    } else if (userInput.includes("how are you")) {
        return "I'm doing well, thank you for asking!";
    } else if (userInput.toLowerCase().includes("good") || userInput.toLowerCase().includes("fine")) {
        return "That's great!";
    } else if (userInput.toLowerCase().includes("not good") || userInput.toLowerCase().includes("not well")) {
        return "I'm sorry to hear that. Is there anything I can help you with?";
    } else {
        var result = evaluateExpression(userInput);
        if (result !== null) {
            return "The result is: " + result;
        } else {
            return "I'm sorry, I didn't understand that. Can you please rephrase?";
        }
    }
}

function evaluateExpression(userInput) {
    try {
        var expression = userInput.replace(/[^-()\d/*+.]/g, ''); // Remove any characters that are not digits or operators
        return eval(expression); // Using eval for simplicity, consider using a safer method in production
    } catch (error) {
        return null;
    }
}
