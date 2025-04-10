import pongComponent from '../component/pongComponent.js';
function pongView() {
  return pongComponent({ playerA: { avatar: 'm18', nickname: "Pong warrior"}, playerB: { avatar: 'f02', nickname: "Faster than light" } });
}
export default pongView;
