'use strict';

async function updateBarHeight() {
  const response = await fetch('./data.json');
  const json = await response.json();
  let biggestBarValue = 0;
  let biggestBar;
  for (let i = 0; i < barsEl.length; i++) {
    barsEl[i].style.height = `${json[i].amount * 2.5}px`;
    if (json[i].amount > biggestBarValue) {
      biggestBarValue = json[i].amount;
      biggestBar = barsEl[i];
    }
  }
  biggestBar.classList.add('biggestBar');
  const tl = gsap.timeline();
  tl.from('.bar', {
    height: 0,
    duration: 1.25,
    ease: 'bounce.out',
  }).to('.biggestBar', {
    backgroundColor: 'hsl(186, 34%, 60%)',
    duration: 0.5,
  });
}

const barsEl = document.querySelectorAll('.bar');

updateBarHeight();
