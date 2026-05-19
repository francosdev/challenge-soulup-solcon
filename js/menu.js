const toggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav__lista');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const aberto = toggle.classList.toggle('aberto');
    nav.classList.toggle('aberta', aberto);
    document.documentElement.style.overflow = aberto ? 'hidden' : '';
    document.body.style.overflow = aberto ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('aberto');
      nav.classList.remove('aberta');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    });
  });
}

const links = document.querySelectorAll('.nav__link');
const pagina = window.location.pathname.split('/').pop() || 'index.html';

links.forEach(link => {
  if (link.getAttribute('href') === pagina) link.classList.add('ativo');
});
