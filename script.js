'use strict';

async function updateBarHeight() {
  const response = await fetch('./data.json');
  const json = await response.json();
  let biggestBarValue = 0;
  let biggestBar;
  let curBar;

  for (let i = 0; i < barsEl.length; i++) {
    curBar = barsEl[i];
    curBar.classList.add('cur_bar');
    barsEl[i].style.height = `${json[i].amount * 3}px`;
    tl.from('.cur_bar', {
      height: 0,
      duration: 0.35,
      ease: 'bounce.out',
    });
    curBar.classList.remove('cur_bar');

    if (json[i].amount > biggestBarValue) {
      biggestBarValue = json[i].amount;
      biggestBar = barsEl[i];
    }
  }
  biggestBar.classList.add('biggestBar');
  tl.to('.biggestBar', {
    backgroundColor: 'hsl(186, 34%, 60%)',
    duration: 0.5,
  });
}

async function updateSpending() {
  const response = await fetch('./data.json');
  const json = await response.json();
  for (let i = 0; i < spendingEl.length; i++) {
    spendingEl[i].innerHTML = `$${json[i].amount}`;
  }
}

const tl = gsap.timeline();
const barsEl = document.querySelectorAll('.bar');
const spendingEl = document.querySelectorAll('.spending');
console.log(spendingEl);

updateBarHeight();
updateSpending();
