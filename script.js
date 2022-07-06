'use strict';

async function updateBarHeight() {
  const response = await fetch('./data.json');
  const json = await response.json();
  for (let i = 0; i < barsEl.length; i++) {
    barsEl[i].style.height = `${json[i].amount * 2.5}px`;
  }

  gsap.from('.bar', {
    height: 0,
    duration: 1.5,
    ease: 'bounce.out',
  });
}

const barsEl = document.querySelectorAll('.bar');

updateBarHeight();
