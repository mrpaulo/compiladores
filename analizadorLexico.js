var fileLoaded;

var _loadFile = function () {
    //Check the support for the File API support
    var fileContents = document.getElementById('filecontents');
    fileContents.style.display = "none";
    var divResult = document.getElementById('result');
    divResult.style.display = "none";
    var labelResult = document.getElementById('labelResult');
    labelResult.style.display = "none";
    var labelFile = document.getElementById('labelFile');
    labelFile.style.display = "none";
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    fileContents.style.display = "block";
                    divResult.style.display = "block";
                    labelResult.style.display = "block";
                    labelFile.style.display = "block";
                    fileContents.innerText = fileReader.result;
                    fileLoaded = fileReader.result;
                    divResult = _analyzeFile();
                }
                fileReader.readAsText(fileTobeRead);

            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }

}

var _analyzeFile = function () {
    // console.log("Reader: "+ fileLoaded);//esse fileLoad é o que tem o conteudo do arquivo nele que vamos trabalhar para botar a tabela
    //esse esquema daqui de baixo tirei do trabalho de IA que usamos pra mostrar o resultado do algoritmo do caxeiro viajante
    var id = 0;//quantidade de lexemas  
    var classe = [];
    var nome = [];
    var valor = [];
    var posicao = [];



    // Expressão regular que reconhece as variaveis prog 1 e prog 2------------
    var reVariavel = /\w+ = /g;
    var str1 = fileLoaded;
    var myArray1;
    var nVar = 0;
    var pos = [];
    var y = 0;

    while ((myArray1 = reVariavel.exec(str1)) !== null) {
        var result1 = 'Variáveis encontradas: ' + myArray1[0] + '. ';
        nome.push(myArray1);
        console.log("Nome: "+nome);
        result1 += 'Finalizada na posição: ' + reVariavel.lastIndex;
        console.log(result1);
        pos.push(reVariavel.lastIndex);
        id = id + 1;
        nVar = nVar + 1;
        //------------------------------------------------------------------------
        //Tabela 1
        var tbody = document.querySelector("#result-table");
        tbody.innerHTML = "";

        for (var i = 0; i < id; i++) {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdClasse = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");

            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome[i];           
            
            tdClasse.innerHTML = "Variável";
            tdValor.innerHTML = "valor";
            tdPosicao.innerHTML = pos[i];

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);

            tbody.appendChild(tr);
        }
        //fim tabela -----------------------------------------------------
    };




//------------------------------------------------------------------------

// Palavras reservadas prog 1 e prog 2 -----------------------------------
var rePalavraResev = /enquanto|faca|escreve/g;
var str2 = fileLoaded;
var myArray2;
var nPa = 0;
var nome2 = [];
var valor2 = [];
var pos2 = [];

while ((myArray2 = rePalavraResev.exec(str2)) !== null) {
    var result2 = 'Palavras reservadas encontradas: ' + myArray2[0] + '. ';
    nome2.push(myArray2);
    result2 += 'Finalizada na posição: ' + rePalavraResev.lastIndex;
    pos2.push(rePalavraResev.lastIndex);
    console.log(result2);
    id = id + 1;
    nPa = nPa + 1;

    //------------------------------------------------------------------------
        //Tabela 2
        var tbody2 = document.querySelector("#result-table2");
        tbody2.innerHTML = "";

        for (var i = 0; i < nPa; i++) {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdClasse = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");

            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome2[i];           
            
            tdClasse.innerHTML = "Palavra reservada";
            tdValor.innerHTML = "valor";
            tdPosicao.innerHTML = pos2[i];

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);

            tbody2.appendChild(tr);
        }
        //fim tabela -----------------------------------------------------
}

//------------------------------------------------------------------------

// Operadores lógicos prog1 e prog 2 -------------------------------------
var reOpeLogic = /\-|\+|\*|\/|\<|\>/g;
var str3 = fileLoaded;
var myArray3;
var nOp = 0;
var nome3 = [];
var valor3 = [];
var pos3 = [];

while ((myArray3 = reOpeLogic.exec(str3)) !== null) {
    var result3 = 'Operadores lógicos e condicionais encontrados: ' + myArray3[0] + '. ';
    nome3.push(myArray3);
    result3 += 'Finalizada na posição: ' + reOpeLogic.lastIndex;
    pos3.push(reOpeLogic.lastIndex);
    console.log("----->" + result3);
    id = id + 1;
    nOp = nOp + 1;

        //Tabela 3
        var tbody3 = document.querySelector("#result-table3");
        tbody3.innerHTML = "";

        for (var i = 0; i < nOp; i++) {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdClasse = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");

            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome3[i];           
            
            tdClasse.innerHTML = "Operadores lógicos ou condicionais";
            tdValor.innerHTML = nome3[i];
            tdPosicao.innerHTML = pos3[i];

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);

            tbody3.appendChild(tr);
        }
        //fim tabela -----------------------------------------------------
}
//-------------------------------------------------------------------------

// Demilimitadores prog 1 e prog 2-----------------------------------------
var reDelimitadores = /\(|\)|\{|\}/g;
var str4 = fileLoaded;
var myArray4;
var nDe = 0;
var nome4 = [];
var valor4 = [];
var pos4 = [];

while ((myArray4 = reDelimitadores.exec(str4)) !== null) {
    var result4 = 'Delimitadores encontrados: ' + myArray4[0] + '. ';
    nome4.push(myArray4);
    result4 += 'Finalizada na posição: ' + reDelimitadores.lastIndex;
    pos4.push(reDelimitadores.lastIndex);
    console.log("<(((((()))))))>" + result4);
    id = id + 1;
    nDe = nDe + 1;

        //Tabela 4
        var tbody4 = document.querySelector("#result-table4");
        tbody4.innerHTML = "";

        for (var i = 0; i < nDe; i++) {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdClasse = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");

            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome4[i];           
            
            tdClasse.innerHTML = "Delimitadores";
            tdValor.innerHTML = nome4[i];
            tdPosicao.innerHTML = pos4[i];

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);

            tbody4.appendChild(tr);
        }
        //fim tabela -----------------------------------------------------
}
//------------------------------------------------------------------------

// valores prog 1 e 2----------------------------------------------------
var reValores = /\= \d+\d/g;
var str5 = fileLoaded;
var myArray5;
var nDe = 0;
var nome5 = [];
var valor5 = [];
var pos5 = [];

while ((myArray5 = reValores.exec(str5)) !== null) {
    var result5 = 'Valores encontrados: ' + myArray5[0] + '. ';
    nome5.push(myArray5);
    result5 += 'Finalizada na posição: ' + reValores.lastIndex;
    pos5.push(reValores.lastIndex);
    console.log("<(--|||--)>" + result5);
    id = id + 1;
    nDe = nDe + 1;

        //Tabela 5
        var tbody5 = document.querySelector("#result-table4");
        tbody5.innerHTML = "";

        for (var i = 0; i < nDe; i++) {
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");
            var tdClasse = document.createElement("td");
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");

            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome5[i];           
            
            tdClasse.innerHTML = "Valores";
            tdValor.innerHTML = nome5[i];
            tdPosicao.innerHTML = pos5[i];

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);

            tbody5.appendChild(tr);
        }
        //fim tabela -----------------------------------------------------
}



// var tbody = document.querySelector("#result-table");
// tbody.innerHTML = "";

// for (var i = 0; i < id; i++) {
//     var tr = document.createElement("tr");
//     var tdId = document.createElement("td");
//     var tdNome = document.createElement("td");
//     var tdClasse = document.createElement("td");
//     var tdValor = document.createElement("td");
//     var tdPosicao = document.createElement("td");

//     tdId.innerHTML = i + 1;
//     for (var y = 0; y < nVar; y++) {
//         tdNome.innerHTML = nome;
//     }
//     tdClasse.innerHTML = classe;
//     tdValor.innerHTML = valor;
//     tdPosicao.innerHTML = posicao;

//     tr.appendChild(tdId);
//     tr.appendChild(tdNome);
//     tr.appendChild(tdClasse);
//     tr.appendChild(tdValor);
//     tr.appendChild(tdPosicao);

//     tbody.appendChild(tr);
// }


};

window.onload = function () {
    _loadFile();

};



