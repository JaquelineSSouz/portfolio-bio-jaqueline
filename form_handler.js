document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        responseMessage.style.display = 'none';
        responseMessage.textContent = '';

        let temErro = false;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput.value.trim() === '') {
            responseMessage.textContent = 'Por favor, preencha seu nome.';
            temErro = true;
        } else if (emailInput.value.trim() === '') {
            responseMessage.textContent = 'O campo E-mail é obrigatório';
            temErro = true;
        } else {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailInput.value)) {
                responseMessage.textContent = 'Por favor, insira um e-mail válido';
                temErro = true;
            }
        }

        if (!temErro && messageInput.value.trim() === '') {
            responseMessage.textContent = 'Por favor, escreva sua mensagem.';
            temErro = true;
        }

        if (temErro) {
            responseMessage.style.backgroundColor = '#f8d7da';
            responseMessage.style.color = '#721c24';
            responseMessage.style.display = 'block';
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost/Minha_bio/processa_formulario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data ),
            });

            const result = await response.json();

            if (response.ok && result.sucess) {
                responseMessage.textContent = 'Mensagem enviada com sucesso!';
                responseMessage.style.backgroundColor = '#d4edda';
                responseMessage.style.color = '#155724';
                form.reset();
            } else {
                responseMessage.textContent = `Erro ao enviar a mensagem: ${result.message ||'Erro desconhecido.'}`;
                responseMessage.style.backgroundColor = '#f8d7da';
                responseMessage.style.color = '#721c24';

            }
        } catch (error) {
            responseMessage.textContent = 'Ocorreu um erro de rede ou de servidor. Verifique se o XAPP está rodando e o caminho do arquivo PHP está correto. ';
            responseMessage.style.backgroundColor = '#f8d7da';
            responseMessage.style.color = '#721c24';
        } finally {
            responseMessage.style.display = 'block';
        }
    });   
});