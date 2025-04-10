import dom from '../shared/dom.js'

function userAvatar(user, size = 8)
{
  return dom.create(`
    <img src="../public/image/avatar/${user.avatar}.png" alt="${user.username} Avatar" class="w-${size} h-${size} rounded-full ml-2">
  `);
}

export default {
  userAvatar
};