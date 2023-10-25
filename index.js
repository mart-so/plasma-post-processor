const fs = require('fs');

const inputFile = './input.nc';  // Cambia esto por la ruta de tu archivo .nc
const outputFile = './output.nc'; // Ruta del archivo de salida

fs.readFile(inputFile, 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    let output = '';
    const lines = data.split('\n');

    for (let line of lines) {
        if (line.startsWith('G0')) {
            // Apaga el spindle antes del movimiento rápido
            output += 'S0\n';
            output += line + '\n';
            // Bajar el eje Z a la posición 0, encender el spindle y subir el eje Z a la posición 2
            output += 'G1 Z0 F500\n'; // Asegúrate de ajustar la velocidad de avance F según tus necesidades
            output += 'S1\n'; // Encender el spindle
            output += 'G1 Z2 F500\n'; // Ajusta la velocidad de avance y la posición de Z según necesidades
        } else {
            output += line + '\n';
        }
    }

    fs.writeFile(outputFile, output, 'utf8', function (err) {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }

        console.log('Archivo procesado y guardado como:', outputFile);
    });
});
