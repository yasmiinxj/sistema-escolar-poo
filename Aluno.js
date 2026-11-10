
class Aluno {
  #nome;
  #nota1;
  #nota2;
  #nota3;
  estado;
  media;

  constructor(nome, nota1, nota2, nota3) {
    this.#nome = nome;
    this.#nota1 = nota1;
    this.#nota2 = nota2;
    this.#nota3 = nota3;

    this.gerarMedia();
    this.gerarEstado();
  }

  gerarMedia() {
    let m = (this.#nota1 + this.#nota2 + this.#nota3) / 3;
    this.media = m;
    return m;
  }

  gerarEstado() {
    let est;

    if (this.media >= 6) {
      est = 'Aprovado';
    } else if (this.media >= 3) {
      est = 'Recuperação';
    } else {
      est = 'Reprovado';
    }

    this.estado = est;
    return est;
  }

  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  getNota1() {
    return this.#nota1;
  }

  setNota1(nota) {
    this.#nota1 = Number(nota);
    this.gerarMedia();
    this.gerarEstado();
  }

  getNota2() {
    return this.#nota2;
  }

  setNota2(nota) {
    this.#nota2 = Number(nota);
    this.gerarMedia();
    this.gerarEstado();
  }

  getNota3() {
    return this.#nota3;
  }

  setNota3(nota) {
    this.#nota3 = Number(nota);
    this.gerarMedia();
    this.gerarEstado();
  }
}
