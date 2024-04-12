const tabela = document.getElementById('funcionarios');
let nomeF = document.getElementById('nome'),
    carg = document.getElementById('cargo'),
    sal = document.getElementById('salario');
let btn = document.querySelector('.btn');

let editId;
let isEditedFunc = false;

let Funcs = JSON.parse(localStorage.getItem("funcionarios"));

function exibir() {
    let trTag = "";
    if (Funcs) {
        Funcs.forEach((func, id) => {
            if (id == 0) {
                trTag += `<tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Salário</th>
                            <th></th>
                        </tr>`;
            }
            let formatSal = Number.parseFloat(func.salario).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            trTag += `<tr id="${id}" class="value">
                        <td data-tittle="Nome">${func.nome}</td>
                        <td data-tittle="Cargo">${func.cargo}</td>
                        <td data-tittle="Salário">${formatSal}</td>
                        <td class="funcMenu">
                            <i id="edit" onclick="editFunc(${id}, '${func.nome}', '${func.cargo}', ${func.salario})" class="material-symbols-outlined">edit</i>
                            <i id="del" onclick="deleteFunc(${id})" class="material-symbols-outlined">delete</i>
                        </td>
                    </tr>`;
        });
    }
    tabela.innerHTML = trTag || `<tr>
                                    <th>Nome</th>
                                    <th>Cargo</th>
                                    <th>Salário</th>
                                    <th>Editar</th>
                                </tr>`;
}
exibir();

function registrar() {
    let nomeFunc = nomeF.value.trim();
    let cargoFunc = carg.value.trim();
    let salFunc = sal.value;
    if (!isEditedFunc) {
        if (!Funcs) {
            Funcs = [];
        }
        let funcInfo = { nome: nomeFunc, cargo: cargoFunc, salario: salFunc };
        Funcs.push(funcInfo);
    }
    else {
        Funcs[editId].nome = nomeFunc;
        Funcs[editId].cargo = cargoFunc;
        Funcs[editId].salario = salFunc;
        btn.value = 'Cadastrar';
        isEditedFunc = false;
        editId = 0;
    }
    nomeF.value = "";
    carg.value = "";
    sal.value = "";
    localStorage.setItem("funcionarios", JSON.stringify(Funcs));
    exibir();
}

function deleteFunc(Id) {
    Funcs.splice(Id, 1);
    localStorage.setItem("funcionarios", JSON.stringify(Funcs));
    exibir();
}

function editFunc(Id, Nome, Cargo, Salario) {
    editId = Id;
    isEditedFunc = true;
    nomeF.value = Nome;
    carg.value = Cargo;
    sal.value = Salario;
    btn.value = 'Editar';
}

function validar() {
    if (nomeF.value == "" || carg.value == "" || sal.value == "") {
        alert("Preencha todos os campos!");
    }
    else if (sal.value <= 0) {
        alert("O salário deve ser maior que 0");
    }
    else {
        registrar();
    }
}