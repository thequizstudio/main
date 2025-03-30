// Ensure this code only runs in the browser (not on the server)
if (typeof document !== 'undefined') {
  // Get references to the DOM elements
  const sendButton = document.getElementById('send-button');
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.getElementById('messages-container');
  const usernameInput = document.getElementById('username'); // Username input
  const toggleModeButton = document.getElementById('toggle-mode'); // Dark mode toggle button

  // Function to create and display a new message
  function displayMessage(message) {
    const username = usernameInput.value.trim() || 'Anonymous'; // Fallback to 'Anonymous' if no name entered
    const timestamp = new Date().toLocaleTimeString(); // Get the current time

    // Create a new div for the message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Include username and timestamp
    messageDiv.innerHTML = `<strong>${username}:</strong> ${message} <span class="timestamp">(${timestamp})</span>`;

    // Append the message to the messages container
    messagesContainer.appendChild(messageDiv);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Save message to localStorage
    saveMessage(message, username, timestamp);
  }

  // Function to handle the sending of a message
  function sendMessage() {
    const message = messageInput.value.trim();

    if (message !== '') {
      // Display the message
      displayMessage(message);

      // Clear the input field
      messageInput.value = '';
    }
  }

  // Function to load messages from localStorage
  function loadMessages() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(msg => displayMessage(msg.message, msg.timestamp, msg.username));
  }

  // Function to save messages to localStorage
  function saveMessage(message, username, timestamp) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push({ message, username, timestamp });
    localStorage.setItem('messages', JSON.stringify(savedMessages));
  }

  // Load previous messages when the page loads
  window.onload = loadMessages;

  // Event listeners
  sendButton.addEventListener('click', sendMessage);

  // Event listener for the Enter key (to send message without clicking the button)
  messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  // Dark Mode Toggle
  toggleModeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('chat-room').classList.toggle('dark-mode');
  });
}
