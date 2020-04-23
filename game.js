let items;
let Table
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
    Table=loadTable("data/1.csv","csv","header");
}

function guis(){
    let selflist=[];
    let leng=0;
    for(let i=0;i<items.length;i++){
        if (items[i][4]===1){
            selflist.push(i);
            leng+=1;
        }
        if(leng>=8){
            break;
        }
    }
    for(let i=0;i<selflist.length;i++){
        image(imagebed[items[selflist[i]][1]][selflist[i]], mouseX+50+i*25, mouseY+50, 20, 20);
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
    }
    if(keyIsPressed===false){
        time=0;
    }

    if (pocketSwitcher===true){
        scene=-1;
        let printlist=[];
        let point;
        for(let i=0;i<items.length;i++){
            if (items[i][4]===1) {
                printlist.push(i);
            }
        }
        for(let i=0;i<printlist.length;i++) {
            if (abs(mouseX - i%8*80+50)<25 && abs(mouseY-int(i/8)*80+50)<25 ){
                push();
                rotate(PI/8);
                image(imagebed[printlist[i]][items[printlist[i]][1]], i % 8 * 80 + 50, int(i / 8) * 80 + 50, 60, 60);
                text(itemword[printlist[i]][0],i % 8 * 80 + 50, int(i / 8) * 80 + 80);
                words(printlist[i]);
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



//mission control
function missions(){
    if(scene=0){

    }
    if(scene=1){

    }
}

//scene below
//let reX=-600;
let rex=0;//for test
function movement(){
    if (mouseX<100 && rex+2194>800){
        rex-=10;
    }
    if (mouseX>700 && rex<0){
        rex+=10;
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
    switch(_scene){
        case 0:
            //movement();
            scene0(rex);
        case 1:
            //movement();
            scene1(rex);
        case -1:
            let pass=0;
    }
}




function scene0(_x){
    image(backgrounds[0],-0,0,2194,540);
    pockets();
    let things;
    things=[[0  ,1],
            [100,100],
            [100,200]];//all things with x and y
    for(let i=0;i<things[0].length;i++){
        if(abs(mouseX-things[1][i])<20 && abs(mouseY-things[2][i])<20){
            text(itemword[items[things[0][i]][1]][things[0][i]],things[1][i],things[2][i]);
            if (mouseIsPressed && items[things[0][i]][5]===true && items[things[0][i]][3]===true){
                if (items[things[0][i]][3]===true){
                    items[things[0][i]][1]=1;
                    if (items[things[0][i]][4]!==-1) {
                        items[things[0][i]][4] = 1;
                    }
                }
            }
        }
        if (items[things[0][i]][2]===true){
            image(imagebed[items[things[0][i]][1]][things[0][i]],things[1][i]+_x,things[2][i]);
        }
    }
    //forward!
    if (mouseX+_x>2080 && abs(mouseY-270)<270 && items[32][3]===true){
        if(mouseIsPressed) {
            scene = 1;
        }
    }

}
function scene1(_x){
    pockets();
    let things=[[],[],[]];//all things with x and y
}

function mouseP(){
    let ss=mouseX+"::"+mouseY;
    text(ss,mouseX+10,mouseY+10);
}



//main framework
let scene=0;
function setup(){
    //createCanvas(800,600);
    createCanvas(2194,600);//for test
    items=Table.getArray();
    for(let i=0;i<items.length;i++){
        let a=items[i][1];
        let b=items[i][2];
        let c=items[i][3];
        let d=items[i][4];
        let e=items[i][5];
        if (a===0 || a===1){
            items[i][1]=int(a);
        }

        if(b===1){
            items[i][2]=true;
        }else{
            items[i][2]=false;
        }

        if(c===1){
            items[i][3]=true;
        }else{
            items[i][3]=false;
        }

        if (d===0 || d=== 1){
            items[i][4]=int(d);
        }

        if (e===0 || e===1){
            items[i][5]=int(e);
        }
    }
    print(items);
    print(imagebed);
}

function draw(){
    background(0);
    if (keyIsPressed && key==="f"){
        fullscreen(true);
        resizeCanvas(2194, windowHeight);
        background(0);
    }
    scenes(scene);
    guis();
}