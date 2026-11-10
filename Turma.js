
class Turma {
  curso;
  professor;
  alunos;

  constructor(curso, professor) {
    this.curso = curso;
    this.professor = professor;
    this.alunos = [];
  }

  matricular(aluno) {
    this.alunos.push(aluno);
  }

  listarAlunos() {
    return this.alunos;
  }
}
