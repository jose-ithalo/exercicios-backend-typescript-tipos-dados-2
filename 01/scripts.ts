const fs = require('fs');

type stringNumber = string | number;

function inserirArquivo(arq: stringNumber): void {

    try {

        const arqJson: stringNumber = JSON.stringify(arq);

        fs.writeFileSync('../bd.json', arqJson);

    } catch (error) {
        console.log('Erro ao inserir!');
    }
}


function lerArquivo(): unknown {

    try {

        const arqScript: stringNumber = JSON.parse(fs.readFileSync('../bd.json'));

        return arqScript;

    } catch (error) {
        console.log('Erro ao ler!');
    }
}

inserirArquivo(179);

console.log(lerArquivo());
