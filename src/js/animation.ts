import { Rive } from '@rive-app/canvas';

const RIVE_TIMEVALUE_INPUTS = {
  morning: {
    name: 'morning',
    value: 0,
  },
  day: {
    name: 'day',
    value: 1,
  },
  sunset: {
    name: 'sunset',
    value: 2,
  },
  night: {
    name: 'night',
    value: 3,
  },
};

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const rainBtn = document.querySelector('.js-btn-rain') as HTMLButtonElement;
const morningBtn = document.querySelector('.js-btn-morning') as HTMLButtonElement;
const dayBtn = document.querySelector('.js-btn-day') as HTMLButtonElement;
const sunsetBtn = document.querySelector('.js-btn-sunset') as HTMLButtonElement;
const nightBtn = document.querySelector('.js-btn-night') as HTMLButtonElement;

treeAnimation();

function treeAnimation() {
  const riveAnime = new Rive({
    src: '/rive-test-tree/animation/tree.riv',
    canvas: canvas,
    autoplay: false,
    useOffscreenRenderer: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      riveAnime.resizeDrawingSurfaceToCanvas();
      initAnimation();
    },
  });

  function initAnimation() {
    const inputs = riveAnime.stateMachineInputs('State Machine 1');
    let rainInput, timeValueInput;
    inputs.forEach((input) => {
      rainInput = input.name === 'rain' ? input : rainInput;
      timeValueInput = input.name === 'timeValue' ? input : timeValueInput;
    });

    timeValueInput.value = RIVE_TIMEVALUE_INPUTS.morning.value;
    riveAnime.play();

    setTimeout(() => {
      moveFairy();
    }, 4000);

    rainBtn.addEventListener('click', () => {
      rainInput.value = !rainInput.value;
    });
    morningBtn.addEventListener('click', () => {
      timeValueInput.value = RIVE_TIMEVALUE_INPUTS.morning.value;
    });
    dayBtn.addEventListener('click', () => {
      timeValueInput.value = RIVE_TIMEVALUE_INPUTS.day.value;
    });
    sunsetBtn.addEventListener('click', () => {
      timeValueInput.value = RIVE_TIMEVALUE_INPUTS.sunset.value;
    });
    nightBtn.addEventListener('click', () => {
      timeValueInput.value = RIVE_TIMEVALUE_INPUTS.night.value;
    });
  }

  // マウスに妖精がついてくるアニメーション
  function moveFairy() {
    let x = 0;
    let y = 0;
    let raf;
    const offsetX = -150;
    const offsetY = -100;

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    window.addEventListener('mousemove', (e) => {
      if (!riveAnime) {
        return false;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);

      let currentX = e.clientX + offsetX;
      let currentY = e.clientY + offsetY;
      // currentXを0~1に正規化
      currentX = currentX / window.innerWidth;
      currentY = currentY / window.innerHeight;

      const inputs = riveAnime.stateMachineInputs('State Machine 1');

      function update() {
        if (!inputs) {
          return false;
        }
        x = lerp(x, currentX, 0.05);
        y = lerp(y, currentY, 0.05);
        inputs.forEach((input) => {
          if (input.name === 'inputsMouseX') {
            input.value = x * 100;
          }
          if (input.name === 'inputsMouseY') {
            input.value = y * 100;
          }
        });
        raf = requestAnimationFrame(update);
      }
    });
  }
}
