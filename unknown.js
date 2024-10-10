function appendMessage(sender, data) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong>`;

    if (sender === 'You') {
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
     } else {
        messageDiv.innerHTML = `<strong>${sender}:</strong>`;
     }
    // Check if the data contains potential causes or follow-up questions
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

    // Add the message to the chat log
    chatLog.appendChild(messageDiv);
  }