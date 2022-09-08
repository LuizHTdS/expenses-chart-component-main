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

const toggleSpending = function () {
  this.parentElement.children[0].classList.toggle('hidden');
  isActive++;

  if (isActive > 1) {
    isActive = 0;
  }

  if (isActive && this.classList.length > 1) {
    this.style.backgroundColor = 'hsl(186, 34%, 70%)';
  } else if (!isActive && this.classList.length > 1)
    this.style.backgroundColor = 'hsl(186, 34%, 60%)';
  else if (isActive && this.classList.length <= 1) {
    this.style.backgroundColor = 'hsl(10, 79%, 75%)';
  } else if (!isActive && this.classList.length <= 1) {
    this.style.backgroundColor = 'hsl(10, 79%, 65%)';
  }
};

const tl = gsap.timeline();
const barsEl = document.querySelectorAll('.bar');
const spendingEl = document.querySelectorAll('.spending');

let isActive = 0;

updateBarHeight();
updateSpending();

for (let i = 0; i < barsEl.length; i++) {
  barsEl[i].addEventListener('mouseover', toggleSpending);
}

for (let i = 0; i < barsEl.length; i++) {
  barsEl[i].addEventListener('mouseleave', toggleSpending);
}
