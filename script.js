
document.getElementById('search-button').addEventListener('click', () => {
    const cepInput = document.getElementById('cep-input').value;
    const resultContainer = document.getElementById('cep-result');

    if (!/^\d{8}$/.test(cepInput)) {
        resultContainer.innerHTML = '<p style="color: red;">Por favor, insira um CEP válido com 8 dígitos.</p>';
        resultContainer.classList.add('fadeUp');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do CEP.');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                resultContainer.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
            } else {
                resultContainer.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
            resultContainer.classList.add('fadeUp');
        })
        .catch(error => {
            resultContainer.innerHTML = '<p style="color: red;">Erro ao buscar o CEP. Tente novamente.</p>';
            resultContainer.classList.add('fadeUp');
            console.error(error);
        });
});
