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
        rua: 'Antônio Cáceres',
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

        const listJson: object[] = JSON.parse(fsLibrary.readFileSync('./bd.json'));

        listJson.push(usu);

        const usuariosJson: string = JSON.stringify(listJson);

        fsLibrary.writeFileSync('./bd.json', usuariosJson);

        return `Usuario ${usu.nome} cadastrado com sucesso.`;

    } catch (error) {
        return 'Erro ao cadastrar.';
    }

}

const listarUsuarios = (): object[] | string => {

    try {

        const usuarioLista: object[] = JSON.parse(fsLibrary.readFileSync('./bd.json'));

        return usuarioLista;

    } catch (error) {
        return 'Erro ao listar usuários'
    }
}

const detalharUsuario = (cpf: string): Usuario | string => {

    try {

        const usuarioLista: Usuario[] = JSON.parse(fsLibrary.readFileSync('./bd.json'));

        const usuarioEscolhido: Usuario | undefined = usuarioLista.find(usuario => {
            return usuario.cpf === cpf
        });

        if (!usuarioEscolhido) {
            return ('Usuario não encontrado');
        }

        return usuarioEscolhido;

    } catch (error) {
        return 'Erro ao procurar Usuário'
    }

}

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario | string => {

    try {

        const usuarioLista: Usuario[] = JSON.parse(fsLibrary.readFileSync('./bd.json'));

        const usuarioEscolhido: Usuario | undefined = usuarioLista.find(usuario => {
            return usuario.cpf === cpf
        });

        if (!usuarioEscolhido) {
            return ('Usuario não encontrado para atualização');
        }

        Object.assign(usuarioEscolhido, dados);

        const usuariosJson: string = JSON.stringify(usuarioLista);

        fsLibrary.writeFileSync('./bd.json', usuariosJson);

        return dados;

    } catch (error) {
        return 'Erro ao atualizar Usuário'
    }

}

const excluirUsuario = (cpf: string): string => {

    try {

        const usuarioLista: Usuario[] = JSON.parse(fsLibrary.readFileSync('./bd.json'));

        const usuarioEscolhido: Usuario | undefined = usuarioLista.find(usuario => {
            return usuario.cpf === cpf
        });


        if (!usuarioEscolhido) {
            return ('Usuario não encontrado');
        }

        const novaLista = usuarioLista.filter(usuario => {
            return usuario.cpf !== cpf;
        });

        const usuariosJson: string = JSON.stringify(novaLista);

        fsLibrary.writeFileSync('./bd.json', usuariosJson);

        return `Usuário ${usuarioEscolhido.nome} excluído com sucesso.`;

    } catch (error) {
        return 'Erro ao excluir Usuário'
    }
}

// console.log(cadastrarUsuario(usuario));

// console.log(listarUsuarios());
// console.log(detalharUsuario("741-441-145-21"));
// console.log(atualizarUsuario('979-5741-164-94', usuario));
// console.log(excluirUsuario("111-1111-111-10"));

