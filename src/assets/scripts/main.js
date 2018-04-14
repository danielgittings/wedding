const main = {
  init() {
    const links = [...document.querySelectorAll('.main-nav ul li a')];
    links.forEach(item => item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(item.dataset.target).scrollIntoView({ behavior: 'smooth' });
    }));
  }
}

main.init();
