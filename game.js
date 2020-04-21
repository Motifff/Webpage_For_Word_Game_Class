let items=[[],[],[]];
let itemword=[[],[]];
let imagebed=[[],[]];
let hold=-1;

function preload(){

}

function guis() {

}

let pocketSwitcher=false;
function pockets(){
    let scenetmp=scene;
    if (keyIsPressed === true && key==='p'){
        pocketSwitcher=!pocketSwitcher;
        if (pocketSwitcher===true){
            scene=-1;
            let printlist=[];
            let point;
            for(let i=0;i<items[0].length;i++){
                if (items[i][2]===true) {
                    printlist.push(i);
                }
            }
            for(let i=0;i<printlist.length;i++) {
                if (abs(mouseX - i%8*80+50)<25 && abs(mouseY-int(i/8)*80+50)<25 ){
                    push();
                    image(imagebed[printlist[i]][items[printlist[i]][1]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 60, 60);
                    pop();
                    if (mouseIsPressed){
                        hold=printlist[i];
                    }
                }else{
                    image(imagebed[printlist[i]][items[printlist[i]][1]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 50, 50);
                    //标号，模式
                }
            }
        }else{
            scene=scenetmp;
        }
    }



}
//mission control
function missions(){

}

//scene below
let reX=0;
function scenes(_scene){
    switch(_scene){
        case 0:
            relativepos();
            scene0(reX);
        case 1:
            scene1(reX);
    }
}
function relativepos(){
    if (mouseX<100){
        reX-=10;
    }
    if (mouseX>1820){
        rex+=10;
    }
}

function scene0(_x){
    pockets();
}
function scene1(_x){
    pockets();
}




//main framework
let scene=0;
function setup(){
    createCanvas(1920,1080);
    imageMode(CENTER);
}

function draw(){
    scenes(scene);
}