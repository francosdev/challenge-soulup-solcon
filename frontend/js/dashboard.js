// Scroll reveal específico do frame do dashboard.
(function () {
  var frame = document.getElementById('dashboardFrame');
  if (!frame) return;
  if (!('IntersectionObserver' in window)) {
    frame.classList.add('revelado');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        frame.classList.add('revelado');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  io.observe(frame);
})();
