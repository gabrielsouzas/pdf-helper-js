const { ipcRenderer, shell } = require('electron');

document.getElementById('mergeBtn').addEventListener('click', async () => {
  /**
   * A linha a seguir está pegando todos os arquivos que o usuário selecionou no input de arquivo, convertendo essa lista de arquivos em um array,
   * e criando um novo array contendo apenas os caminhos (path) desses arquivos.
   */

  const files = Array.from(document.getElementById('fileInput').files);

  // Filtra apenas arquivos com a extensão .pdf
  const pdfFiles = files.filter((file) => file.name.endsWith('.pdf'));

  if (pdfFiles.length === 0) {
    alert('Por favor, selecione apenas arquivos no formato .pdf.');
    return;
  }

  // Apenas os caminhos
  const filesPaths = pdfFiles.map((f) => f.path);

  if (filesPaths.length < 2) {
    alert('Por favor, selecione ao menos dois arquivo no formato PDF.');
    return;
  }

  /**
   * Essa linha envia uma mensagem para o processo principal do Electron através do canal channel e espera uma resposta do canal merge-pdf,
   * em que o processo principal em main.js deve estar ouvindo
   */
  const result = await ipcRenderer.invoke('merge-pdfs', filesPaths);

  if (result.success) {
    alert('Arquivos unidos com sucesso! Salvo em: ' + result.path);
  } else {
    alert('Erro: ' + result.message);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('github-link');

  link.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    shell.openExternal(link.href); // Abre o link no navegador padrão
  });
});
