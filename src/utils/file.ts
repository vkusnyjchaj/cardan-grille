function downloadFile(
  content: BlobPart,
  fileName: string,
  contentType: string,
) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function openFile() {
  return new Promise((resolve: (file: Promise<string>) => void, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      const file = input.files ? input.files[0].text() : null;

      if (file) {
        resolve(file);
      } else {
        reject('File is empty.');
      }
    };

    input.click();
  });
}

export { downloadFile, openFile };
