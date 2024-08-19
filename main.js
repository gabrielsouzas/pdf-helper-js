const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile('./src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Método principal de união dos pdfs, que fica escutando sua chamada no frontend, index.html (renderer.js)
ipcMain.handle('merge-pdfs', async (event, files) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    const mergedPdfBytes = await mergedPdf.save();
    const savePath = dialog.showSaveDialogSync({
      title: 'Salve o PDF unificado',
      defaultPath: 'PDF_Unificado.pdf',
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    if (!savePath) {
      return { success: false, message: 'Operação cancelada.' };
    }

    fs.writeFileSync(savePath, mergedPdfBytes);
    return { success: true, path: savePath };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
