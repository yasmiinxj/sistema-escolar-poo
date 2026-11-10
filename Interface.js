
class Interface {
  static pegarElementos() {
    this.btnCadastrar = document.getElementById('btn-cadastrar');
    this.tabCadastrar = document.getElementById('tab-cadastrar');
    this.btnListar = document.getElementById('btn-listar');
    this.tabListar = document.getElementById('tab-listar');
    this.btnCadastrarTurma = document.getElementById('btn-cadastrar-turma');
    this.tabCadastrarTurma = document.getElementById('tab-cadastrar-turma');
  }

  static cadastrar() {
    Interface.pegarElementos();

    this.btnListar.classList.remove('active');
    this.btnCadastrarTurma.classList.remove('active');
    this.btnCadastrar.classList.add('active');

    this.tabListar.classList.remove('active');
    this.tabCadastrarTurma.classList.remove('active');
    this.tabCadastrar.classList.add('active');
  }

  static cadastrarTurma() {
    Interface.pegarElementos();

    this.btnListar.classList.remove('active');
    this.btnCadastrarTurma.classList.add('active');
    this.btnCadastrar.classList.remove('active');

    this.tabListar.classList.remove('active');
    this.tabCadastrarTurma.classList.add('active');
    this.tabCadastrar.classList.remove('active');
  }

  static salvarTurma() {
    const curso = document.getElementById('curso').value;
    const prof = document.getElementById('prof').value;

    if (curso.trim() === '' || prof.trim() === '') {
      alert('Preencha o curso e o professor.');
      return null;
    }

    const t = new Turma(curso, prof);

    alert('Turma cadastrada!');
    document.getElementById('curso').value = '';
    document.getElementById('prof').value = '';

    return t;
  }

  static salvarAluno() {
    const valorTurma = document.getElementById('turma').value;

    if (valorTurma === '' || !turmas[Number(valorTurma)]) {
      alert('Selecione uma turma antes de cadastrar o aluno.');
      return null;
    }
    
    const turmaSelecionada = Number(valorTurma);

    const nome = document.getElementById('nome').value.trim();
    const n1 = Number(document.getElementById('n1').value);
    const n2 = Number(document.getElementById('n2').value);
    const n3 = Number(document.getElementById('n3').value);

    if (nome === '') {
      alert('Informe o nome do aluno.');
      return null;
    }

    if (
      document.getElementById('n1').value === '' ||
      document.getElementById('n2').value === '' ||
      document.getElementById('n3').value === '' ||
      [n1, n2, n3].some(n => !Number.isFinite(n) || n < 0 || n > 10)
    ) {
      alert('Informe notas válidas entre 0 e 10.');
      return null;
    }

    const aluno = new Aluno(nome, n1, n2, n3);

    turmas[turmaSelecionada].matricular(aluno);

    alert('Aluno cadastrado!');

    document.getElementById('nome').value = '';
    document.getElementById('n1').value = '';
    document.getElementById('n2').value = '';
    document.getElementById('n3').value = '';

    return aluno;
  }

  static atualizarTurmas() {
    const select = document.getElementById('turma');

    if (!select) return;

    select.innerHTML = '<option value="">Selecione uma turma</option>';

    for (let i = 0; i < turmas.length; i++) {
      select.innerHTML +=
        `<option value="${i}">${turmas[i].curso} - ${turmas[i].professor}</option>`;
    }
  }

  static listar() {
    Interface.pegarElementos();

    this.btnListar.classList.add('active');
    this.btnCadastrar.classList.remove('active');
    this.btnCadastrarTurma.classList.remove('active');

    this.tabListar.classList.add('active');
    this.tabCadastrar.classList.remove('active');
    this.tabCadastrarTurma.classList.remove('active');

    let lista = '';

    for (let i = 0; i < turmas.length; i++) {
      lista += `<h3>${turmas[i].curso} - ${turmas[i].professor}</h3>`;
      lista += '<table>';
      lista += '<tr><th>Nome</th><th>N1</th><th>N2</th><th>N3</th><th>Média</th><th>Situação</th><th>Ações</th></tr>';

      const alunos = turmas[i].listarAlunos();

      for (let j = 0; j < alunos.length; j++) {
        const aluno = alunos[j];

        lista += `
          <tr>
            <td>${aluno.getNome()}</td>
            <td>${aluno.getNota1()}</td>
            <td>${aluno.getNota2()}</td>
            <td>${aluno.getNota3()}</td>
            <td>${aluno.media.toFixed(2)}</td>
            <td>${aluno.estado}</td>
            <td><button onclick="Interface.editarNota(${i}, ${j})">Editar notas</button></td>
          </tr>`;
      }

      lista += '</table>';
    }

    if (turmas.length === 0) {
      lista = '<p>Nenhuma turma cadastrada.</p>';
    }

    document.getElementById('alunos').innerHTML = lista;
  }

  static editarNota(i, j) {
    const aluno = turmas[i].alunos[j];

    const n1 = prompt('Digite a nova Nota 1:', aluno.getNota1());
    if (n1 === null) return;

    const n2 = prompt('Digite a nova Nota 2:', aluno.getNota2());
    if (n2 === null) return;

    const n3 = prompt('Digite a nova Nota 3:', aluno.getNota3());
    if (n3 === null) return;

    const notas = [n1, n2, n3].map(Number);

    if (
      [n1, n2, n3].some(n => n.trim() === '') ||
      notas.some(n => !Number.isFinite(n) || n < 0 || n > 10)
    ) {
      alert('Informe notas válidas entre 0 e 10.');
      return;
    }

    aluno.setNota1(notas[0]);
    aluno.setNota2(notas[1]);
    aluno.setNota3(notas[2]);

    alert('Notas atualizadas!');
    Interface.listar();
  }
}
