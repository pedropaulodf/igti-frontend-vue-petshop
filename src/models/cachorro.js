const Cachorro = class {
  constructor() {
    this.nome = '';
    this.idade = 0;
    this.raca = '';
    this.servico = {
      nome: '',
      observacoes: '',
      finalizados: false,
      extra: false,
      data: '',
    };
    this.servicoFinalizado = false;
  }
}

export default Cachorro;