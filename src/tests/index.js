const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function mergePDFs() {
  // Carrega os PDFs
  const pdf1Bytes = fs.readFileSync('path/to/first.pdf');
  const pdf2Bytes = fs.readFileSync('path/to/second.pdf');

  // Cria um novo documento PDF
  const mergedPdf = await PDFDocument.create();

  // Carrega os documentos existentes
  const pdf1 = await PDFDocument.load(pdf1Bytes);
  const pdf2 = await PDFDocument.load(pdf2Bytes);

  // Copia todas as páginas do primeiro PDF
  const copiedPages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
  copiedPages1.forEach((page) => {
    mergedPdf.addPage(page);
  });

  // Copia todas as páginas do segundo PDF
  const copiedPages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
  copiedPages2.forEach((page) => {
    mergedPdf.addPage(page);
  });

  // Salva o novo documento PDF
  const mergedPdfBytes = await mergedPdf.save();

  // Escreve o PDF combinado no sistema de arquivos
  fs.writeFileSync('path/to/merged.pdf', mergedPdfBytes);
}

mergePDFs();
