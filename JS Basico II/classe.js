/**
 * As classes devem conter o mesmo nome dos arquivos!
 */

class porta {
    constructor (){
        let tranca = 'fechado'
        let macaneta = 'fechado'
    }
    

    abrirPorta(){
        this.tranca = 'aberta'
        this.macaneta = 'aberta'
        return  console.log('Abrindo a porta')

    }

    fecharPorta() {
        this.tranca = 'fechado'
        this.macaneta = 'fechado'
        return console.log('Fechando a porta')
    }
}

let portaAluminio = new porta