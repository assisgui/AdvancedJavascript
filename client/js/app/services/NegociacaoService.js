class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }

    obterNegociacaoDaSemana(){
        return this._http.get('negociacoes/semana')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    obterNegociacaoDaSemanaAnterior(){
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da anterior');
            });
    }

    obterNegociacaoDaSemanaRetrasada(){
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da retrasada');
            });
    }

    obterNegociacoes(){
        return Promise.all([
            this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()
        ])
            .then(periodos => {
                return periodos
                    .reduce((dados, periodo) => dados.concat(periodo), []);
            })
            .catch(erro => {
                throw new Error(erro)
            });
    }
}