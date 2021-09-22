// Déclaration des variables globales 
var compteur = 0;
var imgsprite;
var spritesheet = new Image();
let nbLife = 4;
let strLife = "";
spritesheet.src = "images/bonhomme.png";

window.addEventListener("load", function afficherSprite() {
    //Création du canvas et de sonic
    var imgsprite = document.createElement('canvas');
    imgsprite.id = "sonic";
    imgsprite.style.width = "108px";
    imgsprite.style.height = "140px";
    imgsprite.style.background = "url(" + spritesheet.src + ")";
    document.getElementById("jeu").appendChild(imgsprite);
    life();
});

function texte_taille(taille) {
    var liElement = document.getElementsByTagName('li');
    for (var i = 0; i < liElement.length; i++) {
        liElement[i].style.fontSize = taille+"px";
    }
}

function fond_jeu(nomImage) {
    document.body.style.backgroundImage = "url('images/"+ nomImage +".jpg')";
}

function afficherQuitter() {
    document.getElementById("quitter").addEventListener('click', function () {
        if (confirm("Es-tu certains de vouloir quitter?"))
            window.close();
    });
}

function afficherRegles() {
    document.getElementById("regle").addEventListener('click', function () {
        alert(
            "Voici les règles : \n"+
            "Le but du jeu est de toucher les pièces pour gagner 1 point et les billets pour gagner 3 points \n"+
            "Attention toucher une bombe vous fait perdre 1 vie et 1 point \n"+
            "Au bout de 3 vie perdue la partie est terminée \n"+
            "Pour commencer à jouer appuyé sur la touche D \n"+
            "Bonne chance et bon jeu 😉"
        );
    });
}

function demandeNom() {
    let text;
    let person = prompt("Entrer votre nom :");
    if (person == null || person == "") {
        window.alert("Veuillez entrer votre nom");
    }
    else
    {
        text = "Bienvenue " + person;
    }

    document.getElementById("nom").innerHTML = text;
}

addEventListener('keydown', function(event)
{
    imgsprite = document.getElementById("sonic");
    var key_press=String.fromCharCode(event.keyCode);
    if (key_press=="D")
    {
        imgsprite.style.animation = "walk-right 0.9s steps(8) infinite";
        document.getElementById("fond").style.animation="roll-along-right linear 15.0s infinite";
        drop();
    }
});

function createPiece() {
    const piece = document.createElement("div");
    piece.classList.add('piece');
    piece.classList.add('obj');
    piece.style.top = Math.random() * 65 + 11 + "vh";
    piece.style.animationDuration = Math.random() * 2 + 3 + "s";
    piece.innerText = '🪙';

    piece.addEventListener('click', () =>{
        toucher(1);
        piece.remove();
    })

    document.body.appendChild(piece);
    setTimeout(() => {
        piece.remove();
    }, 5000);
}

function createBillet() {
    const billet = document.createElement("div");
    billet.classList.add('billet');
    billet.classList.add('obj');
    billet.style.top = Math.random() * 65 + 11 + "vh";
    billet.style.animationDuration = Math.random() * 2 + 3 + "s";
    billet.innerText = '💵';

    billet.addEventListener('click', () =>{
        toucher(3);
        billet.remove();
    })

    document.body.appendChild(billet);
    setTimeout(() => {
        billet.remove();
    }, 5000);
}

function createBomb() {
    const bombe = document.createElement("div");
    bombe.classList.add('bombe');
    bombe.classList.add('obj');
    bombe.style.top = Math.random() * 65 + 11 + "vh";
    bombe.style.animationDuration = Math.random() * 2 + 3 + "s";
    bombe.innerText = '💣';

    bombe.addEventListener('click', () =>{
        toucher(-1);
        bombe.remove();
    })

    document.body.appendChild(bombe);
    setTimeout(() => {
        bombe.remove();
    }, 5000);
}

function drop(){
    const creaOBJ = setInterval(()=>{
        let rand = Math.random() * 100
        if (rand <= 50) {
            createPiece()
        }
        else if (rand > 50 && rand <= 80 ){
            createBillet()
        }
        else {
            createBomb()
        }
    }, 1000);
}

function toucher(nbPoint){
    compteur=compteur+nbPoint;
    document.getElementsByClassName("score").innerHTML = compteur;
    if (nbPoint == -1) {
        life();
    }
}

function life(){
    nbLife = nbLife - 1;
    strLife = "";
    for (let index = 0; index < nbLife; index++) {
        strLife = strLife + " 💛 ";
    }  
    if (nbLife == 0) {
        window.cancelAnimationFrame(jeu);
        alert("Vous avez perdu, votre score est de "+ compteur);
    }
    document.getElementsByClassName("life")[0].innerHTML = strLife;
}