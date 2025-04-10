import dom from '../shared/dom.js';
import userComponent from '../component/userComponent.js';

function sidebarComponent(state)
{
  let isOpen = false;

  const component = dom.create(`
    <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" style="display: none;">
      <!--
        Background backdrop, show/hide based on slide-over state.

        Entering: "ease-in-out duration-500"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-500"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!--
              Slide-over panel, show/hide based on slide-over state.

              Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
            <div class="pointer-events-auto relative w-screen max-w-md">
              <!--
                Close button, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                  From: "opacity-0"
                  To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                  From: "opacity-100"
                  To: "opacity-0"
              -->
              <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden">
                  <span class="absolute -inset-2.5"></span>
                  <span class="sr-only">Close panel</span>
                  <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div class="px-4 sm:px-6">
                  <h2 class="text-base font-semibold text-gray-900" id="slide-over-title">Panel title</h2>
                </div>
                <div class="relative mt-6 flex-1 px-4 sm:px-6">
                  <!-- Your content -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);

  // --- Dispatch event : Toggle right sidebar ---
  component.querySelector("button").addEventListener("click", () => {
    window.dispatchEvent(new Event("sidebar-right-toggle"));
  });

  // --- Listen event : Toggle right sidebar ---
  window.addEventListener("sidebar-right-toggle", (event) => {
    isOpen = !isOpen;
    component.style.display = isOpen ? 'block' : 'none';
  });

  return component;
}

function navbarComponent(state) {
  const component = dom.create(`
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Left side: Logo and main links -->
          <div class="flex items-center">
            <div class="shrink-0">
              <img class="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <!-- Desktop menu (hidden on mobile) -->
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a data-component="navbar-link" href="/pong">Pong</a>
                <a data-component="navbar-link" href="/chat">Chat</a>
                <a data-component="navbar-link" href="/ranking">Ranking</a>
              </div>
            </div>
          </div>

          <!-- Right side: User profile and notifications -->
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button data-component="notification-bell" type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <!-- Notification bell -->
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <!-- Notification badge -->
                <span data-component="notification-badge" hidden class="hidden absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">0</span>
              </button>
              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button type="button" class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menu</span>
                    <div data-component="user-avatar"></div>
                  </button>
                </div>

                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  `);

  // --- Query selectors --- 
  const links = component.querySelectorAll('[data-component="navbar-link"]');
  const notificationBadge = component.querySelector('[data-component="notification-badge"]');
  const notificationBell = component.querySelector('[data-component="notification-bell"]');

  component.update = (currentUri) => {
    let highlight = false;
    let defaultClasses = 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white';
    let highlightedClasses = 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white';

    console.log("update " + currentUri);
    links.forEach(link => {
      if (link.getAttribute('href') === currentUri) {
        highlight = true;
        link.className = highlightedClasses;
      }
      else
        link.className = defaultClasses;
    });
    if (highlight === false)
      links[0].className = highlightedClasses;
  };

  dom.mount(component, '[data-component="user-avatar"]', userComponent.userAvatar(state.user, 8));

  // --- Dispatch event : Toggle right sidebar ---
  notificationBell.addEventListener("click", () => {
    window.dispatchEvent(new Event("sidebar-right-toggle"));
  });

  // --- Event listener : New notification ---
  window.addEventListener("notification", (event) => {
    app.state.notificationCount += 1;
    notificationBadge.textContent = app.state.notificationCount;
    notificationBadge.classList.remove("hidden");
  });

  // --- Event listener : Notification reset ---
  window.addEventListener("notification-reset", (event) => {
    app.state.notificationCount = 0;
    notificationBadge.classList.add("hidden");
  });

  return component;
}

export default {
  navbarComponent,
  sidebarComponent
};