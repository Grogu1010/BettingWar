(function () {
  document.documentElement.classList.add('js-enabled');

  const onReady = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#primary-navigation');

    if (!menuToggle || !menu) {
      return;
    }

    menu.classList.add('menu-collapsible');

    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('menu-open');
    };

    const toggleMenu = () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('menu-open', !isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);

    menu.addEventListener('click', (event) => {
      if (event.target.classList.contains('menu-button')) {
        closeMenu();
      }
    });

    const handleResize = () => {
      if (window.matchMedia('(min-width: 769px)').matches) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
