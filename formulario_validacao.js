document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formulario-contato');

    formulario.addEventListener('submit', function(event) {

        event.preventDefault();

        let temErro = false;

        const nomeInput = document.getElementById('nome');
        const nomeErro = document.getElementById('erro-nome');
        if (nomeInput.value.trim() === '') {
            nomeErro.textContent = 'Por favor, preencha seu nome.';
            temErro = true;
        } else {
            nomeErro.textContent = '';
        }

        const emailInput = document.getElementById('email');
        const emailErro = document.getElementById('erro-email');

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailErro.textContent = 'O campo E-mail é obrigatório.';
            temErro = true;
        } else if (!regexEmail.test(emailInput.value)) {
            emailErro.textContent = 'Por favor, insira um e-mail válido.' ;
            temErro = true;
        } else {
            emailErro.textContent = '';
        }

        const mensagemInput = document.getElementById('mensagem');
        const mensagemErro = document.getElementById('erro-mensagem');
        if (mensagemInput.value.trim() === '') {
            mensagemErro.textContent = 'Por favor, escreva sua mensagem';
            temErro = true;
        } else {
            mensagemErro.textContent = '';
        }

        if (!temErro) {
            alert('Mensagem enviada com sucesso!');
            formulario.reset();
        }
    });
});