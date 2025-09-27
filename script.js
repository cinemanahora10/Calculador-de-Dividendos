// Array para guardar os ativos adicionados
let ativos = [];

// Seleção dos elementos do HTML
const nomeAtivoInput = document.getElementById('nomeAtivo');
const numCotasInput = document.getElementById('numCotas');
const valorDividendoInput = document.getElementById('valorDividendo');
const dataDividendoInput = document.getElementById('dataDividendo');
const tabelaAtivosBody = document.querySelector('#tabelaAtivos tbody');
const resultadoTotal = document.getElementById('resultadoTotal');
const adicionarAtivoBtn = document.getElementById('adicionarAtivo');
const gerarRelatorioBtn = document.getElementById('gerarRelatorio');

// Função para adicionar ativo à lista
adicionarAtivoBtn.addEventListener('click', () => {
    const nomeAtivo = nomeAtivoInput.value.trim();
    const numCotas = parseFloat(numCotasInput.value);
    const valorDividendo = parseFloat(valorDividendoInput.value);
    const dataDividendo = dataDividendoInput.value;

    // Validação básica
    if (!nomeAtivo || isNaN(numCotas) || isNaN(valorDividendo) || !dataDividendo) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const total = numCotas * valorDividendo;

    // Adiciona ao array
    ativos.push({ nomeAtivo, numCotas, valorDividendo, total, dataDividendo });

    // Atualiza a tabela
    atualizarTabela();

    // Limpa os campos
    nomeAtivoInput.value = '';
    numCotasInput.value = '';
    valorDividendoInput.value = '';
    dataDividendoInput.value = '';
});

// Função para atualizar a tabela
function atualizarTabela() {
    tabelaAtivosBody.innerHTML = ''; // Limpa a tabela

    ativos.forEach(ativo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ativo.nomeAtivo}</td>
            <td>${ativo.numCotas}</td>
            <td>R$ ${ativo.valorDividendo.toFixed(2)}</td>
            <td>R$ ${ativo.total.toFixed(2)}</td>
            <td>${ativo.dataDividendo}</td>
        `;
        tabelaAtivosBody.appendChild(row);
    });
}

// Função para gerar relatório
gerarRelatorioBtn.addEventListener('click', () => {
    if (ativos.length === 0) {
        alert('Nenhum ativo adicionado para gerar relatório.');
        return;
    }

    // Soma total de dividendos
    const totalDividendos = ativos.reduce((acc, ativo) => acc + ativo.total, 0);

    // Pega o mês e ano do primeiro ativo como referência
    const primeiraData = ativos[0].dataDividendo; // YYYY-MM
    const [ano, mesNumero] = primeiraData.split('-');
    const meses = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];
    const mes = meses[parseInt(mesNumero) - 1];

    resultadoTotal.textContent = `No mês de ${mes} de ${ano} você recebeu R$ ${totalDividendos.toFixed(2)} de dividendos.`;
});
