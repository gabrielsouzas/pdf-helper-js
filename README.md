# Aplicativo de Unificação de PDFs com Electron

Este projeto de código aberto é uma aplicação desktop simples construída com Electron que permite aos usuários mesclar vários arquivos PDF em um único documento. A aplicação utiliza a biblioteca PDF-lib para manipulação de PDFs.

## Funcionalidades

- **Selecionar Arquivos PDF**: Escolha múltiplos arquivos PDF do seu computador.
- **Mesclar PDFs**: Combine os PDFs selecionados em um único documento.
- **Salvar PDF Mesclado**: Salve o PDF mesclado no local desejado.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 14 ou superior)
- [npm](https://www.npmjs.com/)

## Tecnologias Utilizadas

- [Electron](https://www.electronjs.org/pt/): Framework para construir aplicativos desktop multiplataforma com JavaScript, HTML e CSS.
- [PDF-lib](https://pdf-lib.js.org/): Biblioteca JavaScript para criar e modificar documentos PDF.

## Como Funciona

1. **Configuração do Electron:** O framework Electron é inicializado e uma janela é criada para exibir o arquivo index.html.
2. **Interface do Usuário:** Os usuários podem selecionar vários arquivos PDF por meio de um input de arquivo.
3. **Mesclagem de PDFs:** Quando o botão de mesclagem é clicado, os PDFs selecionados são enviados para o processo principal do Electron.
4. **Salvar o Resultado:** O PDF mesclado é salvo no local escolhido pelo usuário.
