// Fallback de imagem: mostra iniciais quando foto não carrega
document.querySelectorAll('.integrante-avatar img').forEach(img => {
  img.addEventListener('error', () => {
    const avatar = img.closest('.integrante-avatar');
    const nome = img.getAttribute('alt') || '';
    const partes = nome.trim().split(' ');
    const iniciais = partes.length >= 2
      ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
      : nome.slice(0, 2).toUpperCase();
    img.style.display = 'none';
    avatar.setAttribute('data-iniciais', iniciais);
    avatar.classList.add('sem-foto');
  });
});

// FAQ acordeon
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const aberto = item.classList.contains('aberto');

    document.querySelectorAll('.faq-item.aberto').forEach(i => i.classList.remove('aberto'));
    if (!aberto) item.classList.add('aberto');
  });
});

// Animação de entrada via IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .pilar-card, .step__conteudo, .integrante-card, .stat-item, .skill-ramo').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Inicializa os ícones Lucide em toda a página
if (typeof lucide !== 'undefined') lucide.createIcons();

// Barras de progresso animadas
document.querySelectorAll('.progresso__barra').forEach(barra => {
  const alvo = barra.getAttribute('data-valor') || '0';
  barra.style.width = '0%';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { barra.style.width = alvo + '%'; }, 200);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(barra);
});

// SporeField e MyceliumDivider — inicializados após todos os scripts carregarem
window.addEventListener('load', function () {
  // SporeField: instância protegida contra duplicação via canvas._sporeField
  if (typeof SporeField !== 'undefined') {
    new SporeField('mycelium-bg');
  }

  // MyceliumDivider: auto-detecta qualquer .mycelium-divider canvas no DOM
  if (typeof MyceliumDivider !== 'undefined') {
    document.querySelectorAll('.mycelium-divider canvas[id]').forEach(function (c) {
      new MyceliumDivider(c.id);
    });
  }
});
