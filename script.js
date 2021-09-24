'use-strict';

// Adding cookie message

// create Element
const message = document.createElement('div');

// add class
message.classList.add('cookie-message');

// adding Text
// message.textContent = 'We are known by our actions not by the words';

// addind Element with text
message.innerHTML =
  'We are known by our work. <button class=btn btn--close--cookie--message>got it!</button>';

//   adding to the Header
const header = document.querySelector('.header');
// header.prepend(message); //for top
header.append(message); //for bottom

// deleting Element
document
  .querySelector('.cookie-message')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// styling

//Styling cookie message
message.style.width = '120%';
message.style.backgroundColor = 'grey';
message.style.color = 'white';
// console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//  styling properties
document.documentElement.style.setProperty('--color-primary', 'skyblue ');

//Stying logo
const logo = document.querySelector('.nav__logo');
logo.style.width = '12rem';
logo.style.height = '10rem';
logo.style.backgroundColor = '#f3f3f3';

// Attributes
// console.log(logo.src);
// console.log(logo.alt);

// non-standard

// logo.getAttribute('designer'); //undefined as it is not there in html
// logo.setAttribute('rajnikant');
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
// console.log(link.getAttribute('href'));

// dataattribute
// console.log(logo.dataset.versionNumber);

// Starting project from below//////////////////////////////////////////////////////////////

// Modal
const btnOpen = document.querySelector('.btn--show-modal');
const btnClose = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpen.addEventListener('click', showModal);
btnClose.addEventListener('click', closeModal);

// Smoooth Scrolling///////////////////////////////////////////////////////////////////
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('.section');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Effects
const container = document.querySelector('.nav');
const linksContainer = document.querySelector('.nav__links');
const links = document.querySelector('.nav__link');

// random color generator
// rgb(255, 255,255);  //color is a number between 0 and 255
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// // page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// MODERN way of doing page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  if (e.target.classList.contains('.nav__link')) {
    // console.log('link');
    e.preventDefault();

    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const nav = document.querySelector('.nav');

const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

//implimentaing sticky navigation
// const initialCord = section1.getBoundingClientRect();
// console.log(initialCord);

// window.addEventListener('scroll', function (e) {
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// STICKY NAV-INSERTION OBSERVER API

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    document.querySelector('.sticky').style.height = '10rem';
  } else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//Lazy Loading Images
const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

imageTargets.forEach(img => imgObserver.observe(img));

//Making an slider component||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');
const slider = document.querySelector('.slider');

let curSlide = 0;
let maxSlide = slides.length;

// slider.style.transform = 'scale(0.2) translateX(-600px)';
// slider.style.overflow = 'visible';

//common function

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
//same as above function

// Creating dots below the slider

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(d => d.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"] `)
    .classList.add('dots__dot--active');
};

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});

//starting condition
const init = function () {
  goToSlide(0);
  createDots();
  activateDots(0);
};

init();

// Next slide   -100,0,100,200

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDots(curSlide);
};

// previous slide

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDots(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//keydown event
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
  activateDots(curSlide);
});
