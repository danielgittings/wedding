const main = {
  globals: {
    links: [],
    toggle: '',
    timeline: ''
  },

  init() {
    const menu = document.querySelector('#main-nav');
    scrollSpy(menu, 400, 'easeInOutSine', 77, 300);

    // media query change
    function WidthChange(mq) {
      if (!mq.matches) {
        main.globals.timeline = anime.timeline({
          targets: '#main-nav',
          translateX: ['110%', '15%'],
          loop: false,
          direction: 'reverse',
          autoplay: false,
          easing: 'easeOutBack',
          duration: 300,
          elasticity: 100,
          delay: 0
        });

        main.globals.timeline.add({
          targets: '#main-nav ul li a',
          translateX: ['50%', 0],
          loop: false,
          delay: (el, i) => i * 40,
          duration: 300
        });

        main.globals.toggle = document.getElementById('js-toggle');

        main.globals.toggle.onclick = () => {
          main.globals.timeline.play();
          main.globals.timeline.reverse();
          main.globals.toggle.classList.toggle('is-active');
        };

        const links = [...document.querySelectorAll('#main-nav ul li a')];

        links.forEach(link => {
          link.addEventListener('click', () => {
            main.globals.timeline.play();
            main.globals.timeline.reverse();
            main.globals.toggle.classList.remove('is-active');
          });
        });
      } else {
        main.globals.timeline = null;
      }
    }

    // media query event handler
    if (matchMedia) {
      const mq = window.matchMedia('(min-width: 720px)');
      mq.addListener(WidthChange);
      WidthChange(mq);
    }
  }
};

main.init();
