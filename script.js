// Function to send user message and receive response
async function sendMessage() {
  var userInput = document.getElementById("userInput").value;

  // Process user input and generate a response
  var response = await generateResponse(userInput);

  // Display the user message
  displayMessage("User: " + userInput);

  // Simulate typing effect before displaying the chatbot's response
  simulateTyping(function () {
    // Display the chatbot's response
    displayMessage("JeevanBot: " + response);

    // Save the chatbot's response to chat log
    chatBot.chatLog.push("JeevanBot: " + response);

    // Check if chat log exceeds maximum messages
    if (chatBot.chatLog.length > chatBot.chatMax) {
      chatBot.chatLog.shift(); // Remove the oldest message
    }

    // Increment response count
    chatBot.responseCount++;

    // Check if response count exceeds limit
    if (chatBot.responseCount >= 105) {
      disableChat();
    }
  });

  // Clear the user input
  document.getElementById("userInput").value = "";

  // Check for conversation end
  if (userInput.toLowerCase() === "bye") {
    displayMessage("JeevanBot: Goodbye! Have a great day!");
    disableChat();
  }
}

// Function to generate a response based on user input
async function generateResponse(userInput) {
  const apiKey = "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"; // Replace with your OpenAI API key
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userInput }],
  });

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
  });

  if (response.ok) {
    const data = await response.json();
    const reply = data.choices[0].message.content;
    return reply;
  } else {
    throw new Error("Failed to send message to ChatGPT");
  }
}

// Function to simulate typing effect
function simulateTyping(callback) {
  var typingDelay = 1200; // Adjust typing delay before response (in milliseconds)
  var chatLog = document.getElementById("chatLog");
  var typingMessage = document.createElement("p");
  typingMessage.className = "typing-animation";
  typingMessage.textContent = "JeevanBot is typing...";

  chatLog.appendChild(typingMessage);
  chatLog.scrollTop = chatLog.scrollHeight;

  setTimeout(function () {
    chatLog.removeChild(typingMessage);
    callback();
  }, typingDelay);
}

// Function to display a message in the chat log
function displayMessage(message) {
  var chatLog = document.getElementById("chatLog");
  var messageElement = document.createElement("p");
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to view chat history
function viewChatHistory() {
  var chatLog = document.getElementById("chatLog");
  var chatHistory = chatBot.chatLog.join("\n");

  if (chatHistory !== "") {
    alert("Chat History:\n\n" + chatHistory);
  } else {
    alert("No chat history available.");
  }
}

// Function to clear the chat log
function clearChatLog() {
  var chatLog = document.getElementById("chatLog");
  chatLog.innerHTML = "";
  chatBot.chatLog = [];
}

// CSS styles for the typing animation
var styles = `
  .typing-animation {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 2s linear;
  }
`;

// Inject the CSS styles into the document
var styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Define the chatbot object
var chatBot = {
  chatLog: [],
  chatMax: 16,
  responseCount: 0,
};

// Function to disable the chat input field
function disableChat() {
  document.getElementById("userInput").disabled = true;
}

// Function to handle the user pressing enter in the input field
document.getElementById("userInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Function to display a greeting message when the page loads
window.onload = function () {
  displayMessage("JeevanBot: Welcome! How can I assist you?");
};


function displayTypingAnimation() {
  var modal = document.getElementById("typingModal");
  modal.style.display = "block";
}

// Function to hide the typing animation modal
function hideTypingAnimation() {
  var modal = document.getElementById("typingModal");
  modal.style.display = "none";
}

