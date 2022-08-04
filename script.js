let candidatos = JSON.parse(localStorage.getItem("candidatos")) || [];

function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if (candidato.sexo == "Masculino") {
      document.getElementById("sexoMasculino").checked = true;
    } else {
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento
      .split("/")
      .reverse()
      .join("-");
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
    document.getElementById("skillbootstrap").checked =
      candidato.skills.bootstrap;
  }

  $("#candidatoModal").modal("show");
}

function fecharModal() {
  $("#candidatoModal").modal("hide");
  $("body").removeClass("modal-open");
  $("body").removeAttr("style");
  $(".modal-backdrop").remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = "";
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
  document.getElementById("skillbootstrap").checked = false;
}

function salvar() {
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document
    .getElementById("nascimento")
    .value.split("-")
    .reverse()
    .join("/");
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillbootstrap = document.getElementById("skillbootstrap").checked;

  // Fazer validações aqui

  // Validar CPF
  cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

  let soma = 0;
  soma += cpf[0] * 10;
  soma += cpf[1] * 9;
  soma += cpf[2] * 8;
  soma += cpf[3] * 7;
  soma += cpf[4] * 6;
  soma += cpf[5] * 5;
  soma += cpf[6] * 4;
  soma += cpf[7] * 3;
  soma += cpf[8] * 2;
  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) soma = 0;

  if (soma != cpf[9]) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifique o CPF ele está inválido ou faltando digito !",
    });
    return false;
  }

  soma = 0;
  soma += cpf[0] * 11;
  soma += cpf[1] * 10;
  soma += cpf[2] * 9;
  soma += cpf[3] * 8;
  soma += cpf[4] * 7;
  soma += cpf[5] * 6;
  soma += cpf[6] * 5;
  soma += cpf[7] * 4;
  soma += cpf[8] * 3;
  soma += cpf[9] * 2;
  soma = (soma * 10) % 11;
  if (soma == 10 || soma == 11) soma = 0;

  if (soma != cpf[10]) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "CPF inválido!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
    return false;
  }

  //Validar Nome
  if (nome == "" || nome.indexOf(" ") == -1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifique se foi preenchido o Nome Completo !",
    });
    return false;
  }

  //Validar Celular
  if (celular.length < 14) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifique o Celular ele está inválido ou faltando digito !",
    });
    return false;
  }

  //Validar Email
  if (email == "" || email.indexOf("@") == -1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifique o E-mail ele está inválido ou faltando digito !",
    });
    return false;
  }

  //Validar Data de nascimento
  if (nascimento == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifique se a Data foi preenchida !",
    });
    return false;
  }

  let diaS = nascimento[0] + nascimento[1];
  let mesS = nascimento[3] + nascimento[4];
  let anoS = nascimento[6] + nascimento[7] + nascimento[8] + nascimento[9];

  let dia = parseInt(diaS);
  let mes = parseInt(mesS);
  let ano = parseInt(anoS);

  let d = new Date();
  let ano_atual = d.getFullYear();
  let mes_atual = d.getMonth() + 1;
  let dia_atual = d.getDate();

  ano = +ano;
  mes = +mes;
  dia = +dia;
  quantos_anos = ano_atual - ano;

  if (mes_atual < mes || (mes_atual == mes && dia_atual < dia)) {
    quantos_anos--;
  }

  if (quantos_anos < 16) {
    Swal.fire({
      title: "Atenção!",
      text: "Você deve ser maior de 16 Anos para ser Candidato!",
      icon: "warning",
      showCancelButton: true,
    });
    return false;
  }

  //Validar Habilidades
  if (
    skillHtml == false &&
    skillCss == false &&
    skillJs == false &&
    skillbootstrap == false
  ) {
    Swal.fire({
      title: "Atenção!",
      text: "Você deve ao menos selecionar uma Habilidade",
      icon: "warning",
      showCancelButton: true,
    });
    return false;
  }

  // Fazer validações aqui

  let candidato = {
    id: id != "" ? id : new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo ? "Masculino" : "Feminino",
    nascimento: nascimento,
    skills: {
      html: skillHtml,
      css: skillCss,
      js: skillJs,
      bootstrap: skillbootstrap,
    },
  };

  if (id != "") {
    let checkCandidato = candidatos.find((e) => e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
  } else {
    candidatos.push(candidato);
  }
  localStorage.setItem("candidatos", JSON.stringify(candidatos));

  fecharModal();
  listarCandidatos();
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = "";

  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    let colunaNome = document.createElement("td");
    let colunaCelular = document.createElement("td");
    let colunaEmail = document.createElement("td");
    let colunaSexo = document.createElement("td");
    let colunaNascimento = document.createElement("td");
    let colunaSkills = document.createElement("td");
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");

    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.classList = "btn btn-outline-primary";
    botaoEditar.innerHTML = "<i class='fa-solid fa-pen-to-square  '></i>";
    botaoEditar.onclick = function () {
      console.log("editar");
      abrirModal(candidato);
    };

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.classList = "btn btn-outline-danger RemoveCon";
    botaoRemover.innerHTML = "<i class='fa-regular fa-trash-can '></i>";
    botaoRemover.onclick = function () {
      linha.remove();
    };

    let arrSkills = [];
    if (candidato.skills.html) {
      arrSkills.push("HTML");
    }
    if (candidato.skills.css) {
      arrSkills.push("CSS");
    }
    if (candidato.skills.js) {
      arrSkills.push("JS");
    }
    if (candidato.skills.bootstrap) {
      arrSkills.push("BootStrap");
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular));
    colunaEmail.appendChild(document.createTextNode(candidato.email));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(", ")));
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);

    tabela.appendChild(linha);
  }
}

listarCandidatos();

//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
