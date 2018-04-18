const main = {
   globals: {
    sections: {},
    sectionsArray: [],
    navHeight: '',
    links: [],
    i: 0
  },

  init() {
    main.globals.links = main.getLinks();
    main.addClickHandlers(main.globals.links);

    window.addEventListener("load", function() {
      main.globals.navHeight = main.getNavHeight();
      main.getOffsets(main.globals.links);
      main.initialActive();
    });

    window.addEventListener('resize', function(event){
      main.getOffsets(main.globals.links);
    });

    window.onscroll = function() {
      main.findActive();
    };
  },

  getLinks () {
    return [...document.querySelectorAll(".main-nav ul li a")];
  },

  getNavHeight() {
    return document.getElementById("main-nav").offsetHeight;
  },

  addClickHandlers(links) {
    links.forEach(item =>
      item.addEventListener("click", e => {
        e.preventDefault();
        let target = item.dataset.target;
        let targetSection = main.globals.sectionsArray.find(section => section.id === target);
        window.scroll({
          top: targetSection.offset,
          left: 0,
          behavior: "smooth"
        });
      })
    );
  },

  initialActive() {
    main.findActive();
  },

  findActive() {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    main.globals.sectionsArray.forEach(item => {
      if (item.offset <= scrollPosition + 250) {
        let actives = [...document.querySelectorAll('.active')];

        if (actives) {
          actives.forEach(item => {
            item.classList.remove('active');
          });
        }
        document.querySelector('a[href*="' + item.id + '"]').setAttribute('class', 'active');
      }
    });
  },

  // Get offsets of sections
  getOffsets (items) {
    main.globals.sectionsArray = [];
    items.forEach(item => {
      main.globals.sectionsArray.push({
        'id': item.dataset.target,
        'offset': document.querySelector(item.dataset.target).offsetTop - main.globals.navHeight
      });
    });
  }
};

main.init();
