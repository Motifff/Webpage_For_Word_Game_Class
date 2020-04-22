let items=[[],[],[],[],[]];
let itemword=[[],[]];
let imagebed=[[],[]];
let hold=-1;
let noiseback;
let backgrounds=[];

function preload(){
    backgrounds[0]=new loadImage("data/hotelback.png");
}

function guis(){
    let selflist=[];
    let leng=0;
    for(let i=0;i<items[0].length;i++){
        self.list[i].push(i)
        leng+=1;
        if(leng>=8){
            break;
        }
    }
    for(let i=0;i<8;i++){

    }
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
                if (items[4][i]===true) {
                    printlist.push(i);
                }
            }
            for(let i=0;i<printlist.length;i++) {
                if (abs(mouseX - i%8*80+50)<25 && abs(mouseY-int(i/8)*80+50)<25 ){
                    push();
                    rotate(PI/8);
                    image(imagebed[items[printlist[i]][1]][printlist[i]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 60, 60);
                    text(itemword[0][printlist[i]],i % 8 * 80 + 50, int(i / 8) * 80 + 80);
                    pop();
                    if (mouseIsPressed){
                        hold=printlist[i];
                    }
                }else{
                    image(imagebed[items[printlist[i]][1]][printlist[i]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 50, 50);
                    //标号，模式
                }
            }
        }else{
            scene=scenetmp;
        }
    }
}
function words(_n){
    image(noiseback,0,0);
    image(imagebed[items[1][_n]][_n],500,width/2,400,400);
    let s=itemword[items[1][_n]];
    for(let i=0;i<int(s.length/10)+1;i++){
        let ss=[];
        for(let j=i;j<10;j++){
            ss=ss+s[j];
        }
        text(ss, 1500, int(i / 8) * 20 + 200);
    }
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
            scene0(reX);
        case 1:
            scene1(reX);
        case -1:


    }
}


function scene0(_x){
    image(backgrounds[0],-0,0,2194,540);
    pockets();
    let things=[[],
                [],
                []];//all things with x and y
    for(let i=0;i<thing[0].length;i++){
        if(abs(mouseX-things[1][i])<20 && abs(mouseY-things[2][i])<20){
            text(itemword[items[1][things[0][i]]][things[0][i]],things[1][i],things[2][i]);
            if (mouseIsPressed){
                if (items[3][things[0][i]]===true){
                    items[2][things[0][i]]=1;
                }
            }
        }
        image(imagebed[items[1][things[0][i]]][things[0][i]],things[1][i],things[2][i]);
    }
    //forward!
    if (mouseX>2080 && abs(mouseY-270)<270){
        if(mouseIsPressed)
        scene=1;
    }

}
function scene1(_x){
    pockets();
    let things=[[],[],[]];//all things with x and y
}




//main framework
let scene=0;
function setup(){
    createCanvas(2194,600);
}

function draw(){
    background(0);
    if (keyIsPressed && key==="f"){
        fullscreen(true);
        resizeCanvas(2194, windowHeight);
        background(0);
    }
    scenes(scene);
}