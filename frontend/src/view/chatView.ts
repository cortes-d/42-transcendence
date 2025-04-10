import dom from '../shared/dom.js';
import chatComponent from '../component/chatComponent.js';

function chatView() {
  
  const messages = [
    {
      type: 'received',
      content: 'Hello! How are you?',
      user: { username: 'User  1', avatar: 'f25' },
      time: '10:00 AM'
    },
    {
      type: 'sent',
      content: 'I’m good, thanks! How about you?',
      user: { username: 'User  2', avatar: 'm13' },
      time: '10:01 AM'
    },
    {
      type: 'received',
      content: 'I’m doing well, thank you!',
      user: { username: 'User  1', avatar: 'f25' },
      time: '10:02 AM'
    },
    {
      type: 'sent',
      content: 'Glad to hear that!',
      user: { username: 'User  2', avatar: 'm13' },
      time: '10:03 AM'
    },
    {
      type: 'received',
      content: 'What are you guys up to?',
      user: { username: 'User  3', avatar: 'm33' },
      time: '10:04 AM'
    }
  ];

  return chatComponent(messages);
}
export default chatView;
