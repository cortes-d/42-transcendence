import eventManager from './shared/event.js';
import dom from './shared/dom.js';
import mainView from './view/mainView.js';
import homeView from './view/homeView.js';
import errorView from './view/errorView.js';
import chatView from './view/chatView.js';
import pongView from './view/pongView.js';
import router from './router.js';

import mainComponent from './component/mainComponent.js';

// --- State ---
// Will be in a separate file (state.js)
const state = {
  notificationCount: 0,
  user: {
    username: 'john',
    avatar: 'm13',
  }
};

window.app = {};
app.router = router;
app.state = state;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
});

// --- Mount components in the DOM ---
dom.mount(document.body, '[data-container="navbar"]', mainComponent.navbarComponent(state));
dom.mount(document.body, '[data-container="sidebar-right"]', mainComponent.sidebarComponent(state));

// --- Event listeners ---
/*
window.addEventListener("notification", (event) => {
  app.state.notificationCount += 1;
  notificationBadge.textContent = app.state.notificationCount;
  notificationBadge.classList.remove("hidden");
});

window.addEventListener("notification-reset", (event) => {
  app.state.notificationCount = 0;
  notificationBadge.classList.add("hidden");
});
*/

/* --- Sending some test messages in the chat ---
const timestamp = new Date().toISOString();
const sender = "mickey";
const content = "hello this is mickey";

eventManager.dispatchEvent(new CustomEvent("pong", {
  detail: { 
    timestamp: timestamp, // Use a key for the timestamp
    sender: {username: "mickey", avatar: "m48"},
    content: "hello this is mickey"
  }
}));

eventManager.dispatchEvent(new CustomEvent("new-message", {
  detail: { 
    timestamp: timestamp, // Use a key for the timestamp
    sender: {username: "mickey", avatar: "m48"},
    content: "sending the first message through the event bus"
  }
}));
*/
