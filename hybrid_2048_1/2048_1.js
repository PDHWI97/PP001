var Maps = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0)); // 2048 공간
var block = document.getElementsByClassName("backblock"); // 2048에 생성되는 div
var score = 0; // 점수 변수

//10% 확률로 값이 4인 div 생상 90% 값이 2인 div 생성 
function numberCreate(){
    var X = parseInt(Math.random() * 4);
    var Y = parseInt(Math.random() * 4);
    var varlue = parseInt(Math.random() * 10);

    if(Maps[X][Y] == ""){ // 만약 랜덤으로 지정한 위치의 값이 없을 경우
        if(varlue == 0)
        {
            Maps[X][Y]  = 4; // 10%확률로 4 생성
        }
        else
        Maps[X][Y] = 2; // 90% 확률로 2 생성
    for(var i = 0; i < 4; i++){ 
        for(var j = 0 ; j < 4; j++){
            var k = i * 4 + j; // [00,01,02,03],[10,11,12,13],[20,21,22,23],[30,31,32,33] 칸에서 각각 [0,1,2,3][4,5,6,7],[8,9,10,11],[12,13,14,15] 값을 위치표시를 위해 순서대로 가상으로 정해줬음
            if(Maps[i][j] != ""){ // 값이 존재 할 경우
                block[k].innerHTML = Maps[i][j]; // 해당 위치에다 innerHtml로 값을 표시해줌
            }
            else{
                block[k].innerHTML = "";
            }
        }
    }
}
else numberCreate();
}

function Left(){
    for( var i =0; i <4; i++){
        for( var j =0; j <= 3; j++){
            if(Maps[i][j] != ""){
                for(var k = j - 1; k >= 0; k--){
                    if(Maps[i][k] != ""){
                        if(Maps[i][k] == Maps[i][k+1]){
                            Maps[i][k] = Maps[i][k] * 2;
                            Maps[i][k + 1] = "";
                            break;
                        }
                        else break;
                    }
                    else{
                        Maps[i][k] = Maps[i][k+1];
                        Maps[i][k + 1] = "";
                        
                    }
                }
            }
        }
    }
    numberCreate();
}

function Right(){
    for( var i =0; i <4; i++){
        for( var j =3; j >= 3; j--){
            if(Maps[i][j] != ""){
                for(var k = j + 1; k <= 3; k++){
                    if(Maps[i][k] != ""){
                        if(Maps[i][k] == Maps[i][k-1]){
                            Maps[i][k] = Maps[i][k] * 2;
                            Maps[i][k-1] = "";
                            break;
                        }
                        else break;
                    }
                    else{
                        Maps[i][k] = Maps[i][k-1];
                        Maps[i][k-1] = "";
                        
                    }
                }
            }
        }
    }
    numberCreate();
}

function Up(){
    for( var i =0; i <4; i++){
        for( var j =0; j <4; j++){
            if(Maps[j][i] != ""){
                for(var k = j - 1; k >= 0; k--){
                    if(Maps[k][i] != ""){
                        if(Maps[k][i] == Maps[k + 1][i]){
                            Maps[k][i] = Maps[k][i] * 2;
                            Maps[k + 1][i] = "";
                            break;
                        }
                        else break;
                    }
                    else{
                        Maps[k][i] = Maps[k+1][i];
                        Maps[k+1][i] = "";
                        
                    }
                }
            }
        }
    }
    numberCreate();
}

function Down(){
    for( var i =0; i <4; i++){
        for( var j =3; j >= 0; j--){
            if(Maps[j][i] != ""){
                for(var k = j + 1; k <= 3; k++){
                    if(Maps[k][i] != ""){
                        if(Maps[k][i] == Maps[k-1][i]){
                            Maps[k][i] = Maps[k][i] * 2;
                            Maps[k-1][i] = "";
                            break;
                        }
                        else {
                            break;
                        }
                    }
                    else{
                        Maps[k][i] = Maps[k-1][i];
                        Maps[k-1][i] = "";
                       
                    }
                }
            }
        }
    }
    numberCreate();
}

function keylog(e){
    console.log(e.key);
    switch(e.key){
        case 'Enter':
            numberCreate();
            break;
        case 'ArrowRight':
            Right();
            break;
        case 'ArrowLeft':
            Left();
            break;
        case 'ArrowUp':
            Up()
            break;
        case 'ArrowDown':
            Down()
            break;
        default:            
            break;
    }
}

window.onkeydown = keylog;