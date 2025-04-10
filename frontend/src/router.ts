import dom from './shared/dom.js';

import homeView from './view/homeView.js';
import errorView from './view/errorView.js';

import pongView from './view/pongView.js';
import chatView from './view/chatView.js';

let view;

const Router = {
  state: {
    title: null
  },
  init: () => {
    // --- Preventing default behavior of links ---
    document.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", event => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      })
    });

    // --- Listens for history changes ---
    window.addEventListener('popstate', event => {
      Router.go(location.pathname, false);
    })

    // --- Process initial URL ---
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory)
      history.pushState({ route }, null, route);

    let view = null;
    switch (route) {
      case "/":
        Router.state.title = "Pong";
        view = pongView();
        break;
      case "/chat":
        Router.state.title = "Chat";
        view = chatView();
        break;
      case "/ranking":
        Router.state.title = "Ranking";
        break;
      default
        Router.state.title = "Pong";
        view = pongView();
        break;
    }

    if (view) {
        document.querySelector("title").innerText = Router.state.title;
        document.querySelector('[data-container="title"]').innerHTML = Router.state.title;

        // --- Set view ---
        dom.clear(document.body, '[data-container="content"]');
        dom.mount(document.body, '[data-container="content"]', view);

        // --- Highlighting the link of the current route in the navbar ---
        // The function should be moved to the component itself...
        const links = document.querySelectorAll('[data-component="navbar-link"]');
        let highlightedStyle = 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white';
        let defaultStyle = 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white';
        let activeLink = false;
        links.forEach(link => {
          if (link.getAttribute('href') === route)
          {
            link.className = highlightedStyle;
            activeLink = true;
          }
          else
            link.className = defaultStyle;
        });
        if (activeLink === false)
          links[0].className = highlightedStyle;
    }

    window.scrollX = 0;
  }
}

export default Router;