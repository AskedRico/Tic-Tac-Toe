const cellak = document.querySelectorAll(".cella")
const StatusText = document.querySelector("#status")
const ujragomb = document.querySelector("#ujra")

const Winconcs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""] //x | o
let currentP = "X";
let fut = false;


Jatek_Betoltes();



function Jatek_Betoltes(){
    fut = true;
    cellak.forEach(x=>x.onclick = Valaszt)
    ujragomb.onclick = Ujrainditas;
    StatusText.textContent = `${currentP} köre`;
}


function Valaszt(){
    const cellaindex = this.getAttribute("index")
    if(options[cellaindex] != "" || !fut){
        return
    }
    else{
        Cella_frissites(this,cellaindex)
        Gyoztes();
        
    }

}


function Cella_frissites(cella,index){
    options[index] = currentP;
    cella.textContent = currentP;
    if(currentP == "X"){
        cellak[index].classList.add("X");
    }
    else if(currentP == "O"){
        cellak[index].classList.add("O");
    }
    

}


function Jatekos_valtas(){
    if(currentP == "X"){
        currentP ="O"
    }
    else{
        currentP = "X";
    }
    StatusText.textContent = `${currentP} köre`;

}


function Gyoztes(){
    let gyozelem = false;
    for(let i = 0; i< Winconcs.length;i++){
        const con = Winconcs[i]
        let Acella = options[con[0]]
        let Bcella = options[con[1]]
        let Ccella = options[con[2]]
        if(Acella==""|| Bcella == ""|| Ccella == ""){
            gyozelem = false;
            continue;
           
        }
        if(Acella == Bcella && Bcella ==  Ccella){
            gyozelem = true;
            cellak[con[0]].classList.add("wincella");
            cellak[con[1]].classList.add("wincella");
            cellak[con[2]].classList.add("wincella");
            break;
        }
    }

    if(gyozelem){
        StatusText.textContent = `${currentP} győzött!`;
        //console.log("Parkszájd")
        fut = false;
    }
    else if(!(options.includes(""))){
        StatusText.textContent = `Döntetlen!`;
        //console.log("Döntetlen")
        cellak.forEach(x=>x.classList.add("draw"))
        fut = false;
    }
    else{
        Jatekos_valtas();
    }
    

}
function Ujrainditas(){
    fut = true;
    options = ["", "", "", "", "", "", "", "", ""]
    currentP = "X";
    StatusText.textContent = `${currentP} köre`
    cellak.forEach(x=>x.textContent="");
    cellak.forEach(x=>x.classList.remove("X"));
    cellak.forEach(x=>x.classList.remove("O"));
    cellak.forEach(x=>x.classList.remove("wincella"));
    cellak.forEach(x=>x.classList.remove("draw"));

}