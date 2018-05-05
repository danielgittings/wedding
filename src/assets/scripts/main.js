const main = {
  globals: {
    sections: {},
    sectionsArray: [],
    navHeight: '',
    links: [],
    toggle: '',
    i: 0,
    bottom: false,
  },

  init() {
    main.globals.links = main.getLinks();
    main.globals.toggle = main.getToggle();

    main.addClickHandlers(main.globals.links);
    main.addToggleHandlers(main.globals.toggle);

    window.addEventListener('load', () => {
      main.globals.navHeight = main.getNavHeight();
      main.getOffsets(main.globals.links);
      main.initialActive();
    });

    window.addEventListener('resize', () => {
      main.getOffsets(main.globals.links);
    });

    window.onscroll = () => {
      main.checkBottom();
      main.findActive();
    };
  },

  getLinks() {
    return [...document.querySelectorAll('.main-nav ul li a')];
  },

  getToggle() {
    return document.getElementById('js-toggle');
  },

  addToggleHandlers(toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      main.globals.navHeight = 0;
      main.getOffsets(main.globals.links);
      //main.addClickHandlers(main.globals.links);
      const nav = document.getElementById('main-nav');
      nav.classList.toggle('open');
      toggle.classList.toggle('is-active');
    });
  },

  getNavHeight() {
    return document.getElementById('main-nav').offsetHeight;
  },

  addClickHandlers(links) {
    links.forEach(item =>
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const { target } = item.dataset;
        const targetSection = main.globals.sectionsArray.find(section => section.id === target);
        window.scroll({
          top: targetSection.offset,
          left: 0,
          behavior: 'smooth',
        });
      }));
  },

  initialActive() {
    main.findActive();
  },

  checkBottom() {
    // var d = document.documentElement;
    // var offset = d.scrollTop + window.innerHeight;
    // var height = d.offsetHeight;

    // if (offset === height) {
    //   main.globals.bottom = true;
    // } else {
    //   main.globals.bottom = false;
    // }
  },

  findActive() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    main.globals.sectionsArray.forEach((item) => {
      if (main.globals.bottom) {
        const actives = [...document.querySelectorAll('.active')];

        if (actives) {
          actives.forEach((active) => {
            active.classList.remove('active');
          });
        }

        document.querySelector('a[href*="question"]').setAttribute('class', 'active');
      } else if (item.offset <= scrollPosition + 250) {
        const actives = [...document.querySelectorAll('.active')];

        if (actives) {
          actives.forEach((active) => {
            active.classList.remove('active');
          });
        }
        document.querySelector(`a[href*="${item.id}"]`).setAttribute('class', 'active');
      } else {

      }
    });
  },

  // Get offsets of sections
  getOffsets(items) {
    main.globals.sectionsArray = [];
    items.forEach((item) => {
      main.globals.sectionsArray.push({
        id: item.dataset.target,
        offset: document.querySelector(item.dataset.target).offsetTop - main.globals.navHeight,
      });
    });
  },
};

main.init();
