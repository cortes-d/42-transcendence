import dom from '../shared/dom.js';
import userComponent from '../component/userComponent.js';
import eventManager from '../shared/event.js';

let chatContainer; // Declare chatContainer at a higher scope

function receiveMessage(event) {
  const { content, sender, timestamp } = event.detail; // Include timestamp
  console.log(`Received message from ${sender}:`, content);

  // Create a message object to pass to chatMessage
  const message = {
    content: content,
    user: sender,
    time: new Date(timestamp).toLocaleTimeString(), // Format the timestamp
    type: 'received' // Indicate that this is a received message
  };

  // Append the new message to the chat container
  chatContainer.appendChild(chatMessage(message, false));
}

function chatMessage(message, isSent = true) {
  const chatMessage = dom.create(`
    <div class="${isSent ? 'flex justify-end mb-2' : 'flex mb-2'}">
      <div class="${isSent ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} rounded-lg shadow-md p-3 max-w-xs">
        <p>${message.content}</p>
        <span class="text-xs ${isSent ? 'text-gray-300' : 'text-gray-400'}">${message.time}</span>
      </div>
      <div data-component="user-avatar"></div>
    </div>`
  );
  dom.mount(chatMessage, '[data-component=user-avatar]', userComponent.userAvatar(message.user));
  return chatMessage;
}

function chatComponent(messages) {
  eventManager.addEventListener("new-message", (event) => receiveMessage(event));

  chatContainer = dom.create(`
    <div class="max-w-md mx-auto"></div>
  `);

  messages.map(message => {
    if (message.type === 'sent')
      chatContainer.appendChild(chatMessage(message));
    else if (message.type === 'received')
      chatContainer.appendChild(chatMessage(message, false));
  });

  // Create the chat input and send button
  const chatInput = dom.create(`
    <div class="flex items-center space-x-2 mt-4">
      <input type="text" id="messageInput" class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
      <button id="sendButton" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">Send</button>
    </div>
  `);

  chatContainer.appendChild(chatInput);

  // Add event listener for the send button
  const sendButton = chatInput.querySelector('#sendButton');
  const messageInput = chatInput.querySelector('#messageInput');

  sendButton.addEventListener('click', () => {
    const content = messageInput.value.trim();
    if (content) {
      const timestamp = new Date().toISOString(); // Get the current timestamp
      const sender = { username: "mickey", avatar: "m48" }; // Example sender object

      // Dispatch the new message event
      eventManager.dispatchEvent(new CustomEvent("new-message", {
        detail: {
          timestamp: timestamp,
          sender: sender,
          content: content
        }
      }));

      // Clear the input field after sending
      messageInput.value = '';
    }
  });

  return chatContainer;
}

export default chatComponent;