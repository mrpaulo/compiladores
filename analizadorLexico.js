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



