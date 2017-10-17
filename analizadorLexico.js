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

var _analyzeFile = function(){
    console.log("Reader: "+ fileLoaded);//esse fileLoad é o que tem o conteudo do arquivo nele que vamos trabalhar para botar a tabela
    //esse esquema daqui de baixo tirei do trabalho de IA que usamos pra mostrar o resultado do algoritmo do caxeiro viajante



    // Expressão regular que reconhece as variaveis prog 1 e prog 2------------
    var reVariavel = /\w+ = /g;
    var str1 = fileLoaded;
    var myArray1;

    while ((myArray1 = reVariavel.exec(str1)) !== null) {
        var result1 = 'Variáveis encontradas: ' + myArray1[0] + '. ';
        result1 += 'Finalizada na posição: ' + reVariavel.lastIndex;
        console.log(/\n/, result1);
    }

    //------------------------------------------------------------------------

    // Palavras reservadas prog 1 e prog 2 -----------------------------------
    var rePalavraResev = /enquanto|faca|escreve/g;
    var str2 = fileLoaded;
    var myArray2;

    while ((myArray2 = rePalavraResev.exec(str2)) !== null) {
        var result2 = 'Palavras reservadas encontradas: ' + myArray2[0] + '. ';
        result2 += 'Na posição: ' + rePalavraResev.lastIndex;
        console.log(result2);
    }

    //------------------------------------------------------------------------

    // Operadores lógicos prog1 e prog 2 -------------------------------------
    var reOpeLogic = /\-|\+|\*|\//g;
    var str3 = fileLoaded;
    var myArray3;

    while ((myArray3 = reOpeLogic.exec(str3)) !== null) {
        var result3 = 'Operadores lógicos encontrados: ' + myArray3[0] + '. ';
        result3 += 'Na posição: ' + reOpeLogic.lastIndex;
        console.log("----->" + result3);
    }
    //-------------------------------------------------------------------------

    // Demilimitadores prog 1 e prog 2-----------------------------------------
    var reDelimitadores = /\(\w*|w*\)|{w*|\w*}/g;
    var str4 = fileLoaded;
    var myArray4;

    while ((myArray4 = reDelimitadores.exec(str4)) !== null) {
        var result4 = 'Delimitadores encontrados: ' + myArray4[0] + '. ';
        result4 += 'Na posição: ' + reDelimitadores.lastIndex;
        console.log("<(((((()))))))>" + result4);
    }
    //------------------------------------------------------------------------

    // Terminei aqui!! Em console mostra tudo e funciona perfeitamente eu acho heheh. Só por na tabela


    var tbody =document.querySelector("#result-table");
    tbody.innerHTML = "";
    var id = 10;//quantidade de lexemas  
    var classe = {};
    var nome = "nome"; 
    var valor = {};
    classe.nome = "ClasseNome";
    valor.nome = "ValorNome";
    posicao = "Posição X";

    for (var i = 0; i < id; i++) {       
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var tdNome = document.createElement("td");             
            var tdClasse = document.createElement("td"); 
            var tdValor = document.createElement("td");
            var tdPosicao = document.createElement("td");            
           
            tdId.innerHTML = i + 1;
            tdNome.innerHTML = nome;
            tdClasse.innerHTML = classe.nome; 
            tdValor.innerHTML = valor.nome;
            tdPosicao.innerHTML = posicao;
            
            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdClasse);
            tr.appendChild(tdValor);
            tr.appendChild(tdPosicao);
            
            tbody.appendChild(tr);        
    }

   
};

window.onload = function () {
    _loadFile();
      
};



