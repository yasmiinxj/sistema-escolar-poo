
let turmas = [];

function listarAluno() {
  Interface.listar();
}

function btnSalvarAluno() {
  Interface.salvarAluno();
}

function btnSalvarTurma() {
  const turma = Interface.salvarTurma();

  if (turma !== null) {
    turmas.push(turma);
    Interface.atualizarTurmas();
  }
}
