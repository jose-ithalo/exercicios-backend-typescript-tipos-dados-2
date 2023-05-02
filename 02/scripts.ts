const fsLibrary = require('fs');

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | string | null;
}

const usuario: Usuario = {
    nome: 'Matheus Gonçalves',
    email: 'matheus@hotmail.com',
    cpf: '979-5741-164-94',
    profissao: 'Contador',
    endereco: {
        cep: '114-77-356',
        rua: 'Caetano Souza',
        bairro: 'Jd. Vila Bela',
        complemento: 'Casa B',
        cidade: 'São Paulo'
    }
}

const cadastrarUsuario = (usu: Usuario): string => {

    if (usu.endereco === "") {
        usu.endereco = null
    }

    try {

        const listJson: object[] = JSON.parse(fsLibrary.readFileSync('../bd.json'));

        listJson.push(usu);

        const usuariosJson: string = JSON.stringify(listJson);

        fsLibrary.writeFileSync('../bd.json', usuariosJson);

        return `Usuario ${usu.nome} cadastrado com sucesso.`;

    } catch (error) {
        return 'Erro ao cadastrar.';
    }

}

const listarUsuarios = (): object[] | string => {

    try {

        const usuarioLista: object[] = JSON.parse(fsLibrary.readFileSync('../bd.json'));

        return usuarioLista;

    } catch (error) {
        return 'Erro ao listar usuários'
    }
}

// console.log(cadastrarUsuario(usuario));
console.log(listarUsuarios());
