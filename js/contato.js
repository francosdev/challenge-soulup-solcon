const form = document.getElementById('form-contato');
if (!form) throw new Error('Formulário não encontrado');

const campos = {
  nome: { el: form.querySelector('#nome'), erro: form.querySelector('#erro-nome'), min: 3 },
  email: { el: form.querySelector('#email'), erro: form.querySelector('#erro-email') },
  assunto: { el: form.querySelector('#assunto'), erro: form.querySelector('#erro-assunto') },
  mensagem: { el: form.querySelector('#mensagem'), erro: form.querySelector('#erro-mensagem'), min: 20 },
};

function validarEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function mostrarErro(campo, msg) {
  campo.el.classList.add('erro');
  campo.el.classList.remove('sucesso');
  campo.erro.textContent = msg;
  campo.erro.classList.add('visivel');
  return false;
}

function limparErro(campo) {
  campo.el.classList.remove('erro');
  campo.el.classList.add('sucesso');
  campo.erro.classList.remove('visivel');
  return true;
}

function validarCampo(key) {
  const campo = campos[key];
  const valor = campo.el.value.trim();

  if (!valor) return mostrarErro(campo, 'Este campo é obrigatório.');

  if (key === 'email' && !validarEmail(valor))
    return mostrarErro(campo, 'Informe um e-mail válido.');

  if (campo.min && valor.length < campo.min)
    return mostrarErro(campo, `Mínimo de ${campo.min} caracteres.`);

  return limparErro(campo);
}

Object.keys(campos).forEach(key => {
  campos[key].el.addEventListener('blur', () => validarCampo(key));
  campos[key].el.addEventListener('input', () => {
    if (campos[key].el.classList.contains('erro')) validarCampo(key);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const validos = Object.keys(campos).map(k => validarCampo(k));

  if (validos.every(Boolean)) {
    const sucesso = document.getElementById('form-sucesso');
    form.style.display = 'none';
    sucesso.classList.add('visivel');
  }
});
