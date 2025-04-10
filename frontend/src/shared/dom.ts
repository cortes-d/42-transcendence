function create(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild.cloneNode(true);
}

function mount(root, selector, component) {
  const target = root.querySelector(selector);
  if (target)
    target.appendChild(component);
  else
    console.warn(`No element matching selector "${selector}" found.`);
}

function clear(root, selector) {
  const target = root.querySelector(selector);
  if (target)
      target.innerHTML = '';
  else
      console.warn(`No element matching selector "${selector}" found.`);
}

function replace(root, selector, component) {
  const target = root.querySelector(selector);
  if (target)
      target.replaceWith(component);
  else
      console.warn(`No element matching selector "${selector}" found.`);
}

/*function mountAll(root, selector, component) {
  const targets = root.querySelectorAll(selector);  // This returns a NodeList
  if (targets.length > 0) {
    targets.forEach(target => {
      target.appendChild(component);  // Append the component to each matching element
    });
  } else {
    console.warn(`No elements matching selector "${selector}" found.`);
  }
}*/

export default {
  create,
  mount,
  replace,
  clear
}