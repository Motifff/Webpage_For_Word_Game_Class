let items;
let Table;
let itemword=[[],[]];
let interaction=[[],[]];
let imagebed=[[],[]];
let hold=-1;
let noiseback;
let backgrounds=[];

function preload(){
    backgrounds[0]=new loadImage("data/scene0.png");
    backgrounds[1]=new loadImage("data/scene1.png");
    imagebed[0][0]=new loadImage("data/jttp.png");
    imagebed[0][1]=new loadImage("data/rjb.png");
    imagebed[0][2]=new loadImage("data/jjxj.png");
    imagebed[0][3]=new loadImage("data/rjb2.png");
    imagebed[0][4]=new loadImage("data/rjb2.png");
    imagebed[0][5]=new loadImage("data/uddoor1.png");
    imagebed[0][6]=new loadImage("data/uddoor1.png");
    imagebed[0][7]=new loadImage("data/key.png");
    imagebed[0][8]=new loadImage("data/rjb.png");
    imagebed[0][9]=new loadImage("data/rjb2.png");
    imagebed[0][10]=new loadImage("data/rjb2.png");
    imagebed[0][11]=new loadImage("data/uddoor1.png");
    imagebed[0][12]=new loadImage("data/uddoor2.png");
    Table=loadTable("data/1.csv","csv","header");
}

function guis(){
    let selflist=[];
    let leng=0;
    for(let i=0;i<items.length;i++){
        if (items[i][4]===1){
            selflist.push(int(i));
            leng+=1;
        }
        if(leng>=8){
            break;
        }
    }
    for(let i=0;i<selflist.length;i++){
        image(imagebed[items[selflist[i]][2]][selflist[i]], 400+50+i*25, mouseY+50, 20, 20);
    }
}

let pocketSwitcher=false;
let time=0;
function pockets(){
    let scenetmp=scene;
    if (keyIsPressed === true && key==='p') {
        if (time===0){
            pocketSwitcher = !pocketSwitcher;
            time=1;
        }
    }else if(keyIsPressed===false && time===1){
        time=0;
    }
    if (pocketSwitcher===true){
        //scene=-1;
        fill(0,100);
        rect(0,0,1090,1080);
        let printlist=[];
        let point;
        for(let i=0;i<items.length;i++){
            if (items[i][5]===1) {
                printlist.push(int(i));
            }
        }
        for(let i=0;i<printlist.length;i++) {
            if (abs(mouseX - i%8*80+50)<50 && abs(mouseY-int(i/8)*80+50)<50){
                push();
                translate(i % 8 * 80 + 50, int(i / 8) * 80 + 50);
                rotate(PI/3.0);
                image(imagebed[items[printlist[i]][1]][printlist[i]],0 ,0, 60, 60);
                //text(itemword[printlist[i]][0],i % 8 * 80 + 50, int(i / 8) * 80 + 80);
                words(printlist[i]);
                pop();
                if (mouseIsPressed){
                    hold=printlist[i];
                }
            }else{
                let b=printlist[i];
                let a=int(items[printlist[i]][2]);
                image(imagebed[a][b], i % 8 * 80 + 50, int(i / 8) * 80 + 50,50,50);
                //标号，模式
            }
        }
    }else{
        scene=scenetmp;
    }

}

function words(_n){
    //image(noiseback,0,0);
    image(imagebed[items[_n][1]][_n],500,width/2,400,400);
    let s=itemword[items[_n][1]];
    for(let i=0;i<int(s.length/10)+1;i++){
        let ss="";
        for(let j=i;j<10;j++){
            ss=ss+s[i+j];
        }
        text(ss, 600, int(i / 8) * 20 + 200);
    }
}

let show_mode=false;
function showItem(_n){
    if (_n!==-1) {
        if (show_mode) {
            fill(0, 100);
            rect(0, 0, 1090, 1080);
            image(imagebed[items[_n][2]][_n], 200, 150, 300, 300);
        }
        if (keyIsPressed) {
            show_mode = false;
            show_thing=-1;
        }
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
let rex=-100;
//let rex=-0;//for test
function movement(){
    if (mouseX<100 && rex<0){
        rex+=10;
    }
    if (mouseX>700 && rex+sceneWid>800){
        rex-=10;
    }
}

function dialogs(_b){
    let bpos=[items[6][_b],items[7][_b]];
    for(let i=0;i<interaction[_b].length;i++){
        while(mouseIsPressed===false){

        }
        let ss=interaction[_b][i];
        for(let j=0;j<int(ss.length/10)+1;j+=10){
            let s="";
            for(let k=0;k<10;k++){
                s=s+ss[j+k];
            }
            text(s,bpos[0],bpos[1]+30*i);
        }
    }
}

function scenes(_scene){
    if (_scene===0){
        movement();
        scene0(rex);
    }
    if (_scene===1){
        movement();
        scene1(rex);
    }
}

let show_thing=-1;
function basicScene(_x){
    let things=[[],[],[]];
    for (let i=0;i<items.length;i++){
        if(int(items[i][6])===scene+1){
            things[0].push(int(items[i][0]));
            things[1].push(int(items[i][7]));
            things[2].push(int(items[i][8]));
        }
    }
    for(let i=0;i<things[0].length;i++){
        if(abs(mouseX-(things[1][i]+_x))<20 && abs(mouseY-things[2][i])<40){
            //text(itemword[items[things[0][i]][1]][things[0][i]],things[1][i]+_x,things[2][i]);
            if (mouseIsPressed && items[things[0][i]][4]===true && items[things[0][i]][3]===true){
                if (items[things[0][i]][3]===true){
                    items[things[0][i]][4]=1;
                    if (items[things[0][i]][5]!==-1) {
                        items[things[0][i]][5] = 1;
                        items[things[0][i]][3]=false;
                    }
                }
                show_mode=true;
                show_thing=things[0][i];
            }
        }
        if (items[things[0][i]][3]===true){
            image(imagebed[items[things[0][i]][2]][things[0][i]],things[1][i]+_x,things[2][i],50,50);
        }
    }
    showItem(show_thing);
}

let sceneWid=0;
function scene0(_x){
    image(backgrounds[0],_x,0,1741,428.5);
    sceneWid=1741;
    basicScene(_x);
    //forward!
    if (mouseX-_x>1553 && abs(mouseY-270)<270 && items[6][3]===true){
        if(mouseIsPressed) {
            scene = 1;
            rex=-20;
        }
    }

}
function scene1(_x){
    pockets();
    image(backgrounds[1],_x,0,1203,428.5);
    sceneWid=1203;
    basicScene(_x);
    if ((mouseX-_x)>68 && (mouseX-_x)<241 && mouseIsPressed){
        scene=0;
    }
}

function mouseP(){
    let x=mouseX-rex;
    let y=mouseY-rex;
    let ss=x+"::"+y;
    fill(255);
    text(ss,mouseX+10,mouseY+10);
}



//main framework
let scene=0;
function setup(){
    createCanvas(windowWidth,windowHeight);
    //createCanvas(2194,600);//for test
    items=Table.getArray();
    for(let i=0;i<items.length;i++){
        items[i][0]=int(items[i][0]);
        items[i][1]=items[i][1];;
        items[i][2]=int(items[i][2]);
        if(items[i][3]==='1'){
            items[i][3]=true;
        }else{
            items[i][3]=false;
        }
        if(items[i][4]==='1'){
            items[i][4]=true;
        }else{
            items[i][4]=false;
        }
        items[i][5]=int(items[i][5]);
        items[i][6]=int(items[i][6]);
        items[i][7]=int(items[i][7]);
        items[i][8]=int(items[i][8]);

    }

}

function draw(){
    background(0);
    if (keyIsPressed && key==="f"){
        fullscreen(true);
        resizeCanvas(2194, windowHeight);
        background(0);
    }
    scenes(scene);
    //guis();
    pockets();
    mouseP();
    fill(0,0,0);
    rect(800,0,1000,windowHeight);
    print(items);
}