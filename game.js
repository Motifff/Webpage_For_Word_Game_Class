let items=[[],[],[],[]];
let itemword=[[],[]];
let imagebed=[[],[]];
let hold=-1;
let noiseback;

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
                    rotate(PI/8);
                    image(imagebed[printlist[i]][items[printlist[i]][1]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 60, 60);
                    text(itemword[printlist[i]][0],i % 8 * 80 + 50, int(i / 8) * 80 + 80);
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
function words(_n){
    let s=itemword[items[_n][1]];
    for(let i=0;i<int(s.length/10)+1;i++){
        let ss=[];
        for(let j=i;j<10;j++){
            ss=ss+s[j];
        }
        text(ss,1500,int(i/8)*20+200);
    }
}

function introductions(_n){
    image(noiseback,0,0);
    image(imagebed[_n][items[_n][1]],500,width/2,400,400);
    words(_n);
}

//mission control
function missions(){
    if(scene=0){

    }
    if(scene=1){

    }
}

//scene below
let reX=0;
function scenes(_scene){
    switch(_scene){
        case 0:
            relativepos();
            scene0(reX);
        case 1:
            relativepos();
            scene1(reX);
        case -1:

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
    let things=[[],[],[]];//all things with x and y
}
function scene1(_x){
    pockets();
    let things=[[],[],[]];//all things with x and y
}




//main framework
let scene=0;
function setup(){
    createCanvas(1920,1080);
}

function draw(){
    scenes(scene);
}