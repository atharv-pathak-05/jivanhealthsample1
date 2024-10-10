

// const url = 'https://symptom-checker4.p.rapidapi.com/analyze';
// const apiKey = 'aebc3c754dmsh2bb61356b1c757ap159c2ejsn3b5ba8b8325e'; // Replace with your actual RapidAPI key

// document.addEventListener('DOMContentLoaded', function () {
//   const userInput = document.getElementById('userInput');
//   const chatLog = document.getElementById('chatLog');

//   function sendMessage() {
//     const userMessage = userInput.value;
//     if (userMessage.trim() === '') return;

//     // Append the user's input to the chat log
//     appendMessage('You', userMessage);
//     fetchData(userMessage);
//     userInput.value = '';
//   }

//   function fetchData(symptoms) {
//     const options = {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': apiKey,
//         'X-RapidAPI-Host': 'symptom-checker4.p.rapidapi.com',
//       },
//       body: JSON.stringify({
//         symptoms: symptoms,
//       }),
//     };

//     fetch(url, options)
//       .then((response) => response.json())
//       .then((data) => {
//         appendMessage('Jeevan', data);
//       })
//       .catch((error) => {
//         console.error(error);
//         appendMessage('Jeevan', 'An error occurred while fetching data.');
//       });
//   }

//   function appendMessage(sender, data) {
//     const messageDiv = document.createElement('div');
//     messageDiv.innerHTML = `<strong>${sender}:</strong>`;
    
//     if (data.potentialCauses) {
//       messageDiv.innerHTML += '<p><strong>Potential Causes:</strong></p>';
//       messageDiv.innerHTML += '<ul>';
//       data.potentialCauses.forEach((cause) => {
//         messageDiv.innerHTML += `<li>${cause}</li>`;
//       });
//       messageDiv.innerHTML += '</ul>';
//     }

//     if (data.followupQuestions) {
//       messageDiv.innerHTML += '<p><strong>Follow-up Questions:</strong></p>';
//       messageDiv.innerHTML += '<ul>';
//       data.followupQuestions.forEach((question) => {
//         messageDiv.innerHTML += `<li>${question}</li>`;
//       });
//       messageDiv.innerHTML += '</ul>';
//     }
//     else{
//       messageDiv.innerHTML += `<p>${data}</p>`;
//     }

//     // Add the message to the chat log
//     chatLog.appendChild(messageDiv);
//   }

//   document.getElementById('sendButton').addEventListener('click', sendMessage);
// });





// function clearChatLog() {
//   var chatLogElement = document.getElementById("chatLog");
//   chatLogElement.innerHTML = "";
// }

// // Assuming you want to clear the chat log when the "Clear" button is clicked
// var clearButton = document.getElementById("clearButton");
// clearButton.addEventListener("click", clearChatLog);




const url = 'https://symptom-checker4.p.rapidapi.com/analyze';
const apiKey = 'aebc3c754dmsh2bb61356b1c757ap159c2ejsn3b5ba8b8325e'; // Replace with your actual RapidAPI key

// Store chat history in an array
const chatHistory = [];

document.addEventListener('DOMContentLoaded', function () {
  const userInput = document.getElementById('userInput');
  const chatLog = document.getElementById('chatLog');

  function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    // Append the user's input to the chat log
    appendMessage('You', userMessage);
    updateChatHistory('You', userMessage);
    fetchData(userMessage);
    userInput.value = '';
  }

  function fetchData(symptoms) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'symptom-checker4.p.rapidapi.com',
      },
      body: JSON.stringify({
        symptoms: symptoms,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        appendMessage('Jeevan', data);
        updateChatHistory('Jeevan', JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        appendMessage('Jeevan', 'An error occurred while fetching data.');
        updateChatHistory('Jeevan', 'An error occurred while fetching data.');
      });
  }

  function appendMessage(sender, data) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong>`;
    
    if (data.potentialCauses) {
      messageDiv.innerHTML += '<p><strong>Potential Causes:</strong></p>';
      messageDiv.innerHTML += '<ul>';
      data.potentialCauses.forEach((cause) => {
        messageDiv.innerHTML += `<li>${cause}</li>`;
      });
      messageDiv.innerHTML += '</ul>';
    }

    if (data.followupQuestions) {
      messageDiv.innerHTML += '<p><strong>Follow-up Questions:</strong></p>';
      messageDiv.innerHTML += '<ul>';
      data.followupQuestions.forEach((question) => {
        messageDiv.innerHTML += `<li>${question}</li>`;
      });
      messageDiv.innerHTML += '</ul>';
    }
    else{
      messageDiv.innerHTML += `<p>${data}</p>`;
    }

    // Add the message to the chat log
    chatLog.appendChild(messageDiv);
  }

  // Function to update chat history
  function updateChatHistory(sender, message) {
    chatHistory.push({ sender, message });
  }

  // Function to display chat history in a popup
  function showChatHistory() {
    let historyPopup = window.open('', 'Chat History', 'width=400,height=400,scrollbars=yes,resizable=yes');

    historyPopup.document.write('<html><head><title>Chat History</title></head><body>');
    historyPopup.document.write('<h2>Chat History</h2>');
    
    for (const chat of chatHistory) {
      historyPopup.document.write(`<strong>${chat.sender}:</strong> ${chat.message}<br><br>`);
    }

    historyPopup.document.write('</body></html>');
  }

  document.getElementById('sendButton').addEventListener('click', sendMessage);
  document.getElementById('historyButton').addEventListener('click', showChatHistory);
});

function clearChatLog() {
  var chatLogElement = document.getElementById("chatLog");
  chatLogElement.innerHTML = "";
  // Clear chat history when clearing the chat log
  chatHistory.length = 0;
}

var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearChatLog);
