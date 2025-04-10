import dom from '../shared/dom.js';
import userComponent from './userComponent.js';

function scoreComponent(props)
{
  const {score = 0} = props;

  const component = dom.create(`
    <div class="text-center">
      <div class="text-5xl font-bold" id="score-a">${score}</div>
    </div>
  `);

  return component;
}

function pongComponent(props) {

  let {width = 640, height = 480, scoreA = 0, scoreB = 0} = props;

  const component = dom.create(`
    <div id="scoreboard" class="flex items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg">
      <!-- Player A Section -->
      <div class="flex flex-col items-center text-white">
      <div id="avatar-player-a" class="mt-2"></div>
      <div id="player-a" class="mt-2 text-lg font-extrabold">"${props.playerA.nickname}"</div>
      <div class="text-6xl font-bold">${scoreA}</div>
      </div>

      <!-- Vertical Divider -->
      <div class="h-20 w-2 bg-white mx-12"></div>

      <!-- Player B Section -->
      <div class="flex flex-col items-center text-white">
      <div id="avatar-player-b" class="mt-2"></div>
      <div id="player-b" class="mt-2 text-lg font-extrabold">"${props.playerB.nickname}"</div>
      <div class="text-6xl font-bold">${scoreB}</div>
      </div>
    </div>

    <!-- Pong Canvas -->
    <canvas id="pong" width="${width}" height="${height}" class="mt-6 mx-auto border-4 border-gray-600 rounded-xl shadow-2xl bg-gray-700"></canvas>
  `);

  dom.mount(component, '#avatar-player-a', userComponent.userAvatar(props.playerA, 20));
  dom.mount(component, '#avatar-player-b', userComponent.userAvatar(props.playerB, 20));
  
  return component;
}

export default pongComponent;