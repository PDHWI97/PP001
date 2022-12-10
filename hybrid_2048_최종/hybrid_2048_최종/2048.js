const cell = document.querySelectorAll(`.cell`);
let cellLength = cell.length;
let board = new Array(6);
const scoreText = document.querySelector('#score');

let score = 0;

let overCheck = 1;
let numCheck = 1;

let isUsable = 0;


for(let i=0;i<6;i++){
    board[i]=new Array(6);
}

for(let i = 0; i < 6; i++) {
    for(let j = 0; j < 6; j++) {
        if(i == 0 || j == 0 || i == 5 || j == 5) {
            board[i][j] = 1;
        }
    }
}

console.log(board);
init();


//게임의 초기 세팅을 해주는 함수
function init() {
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            board[i][j] = 0;
        }
    }
    initRnd();
    //randomNum();
    //randomNum();
    update();
    initBtns();
}

function initBtns() {
    document.getElementById("btnStart").innerHTML = "게임 시작";
    document.getElementById("btnReset").innerHTML = "재시작";
}

//행동을 할 때 마다 보이는 부분을 바꾸는 함수
function update() {  
    let cnt = 0;
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            cell[cnt].innerHTML = board[i][j] == 0 ? "" : board[i][j];
            coloring(cnt);
            cnt++;
        }
    }
    setScore();
}

function setScore() {
    scoreText.innerHTML = "Score : " + score;
}

//값에 따라 색을 바꿔주는 함수
function coloring(cnt) { 
    //cell[cnt].style.border = "solid black 1px";
    switch(cell[cnt].innerHTML) {
        case "2":
            cell[cnt].style.backgroundColor = "#0278AE";
            break;
        case "4":
            cell[cnt].style.backgroundColor = "#51ADCF";
            break;
        case "8":
            cell[cnt].style.backgroundColor = "#3D72A6";
            break;    
        case "16":
            cell[cnt].style.backgroundColor = "#7579E7";
            break;
        case "32":
            cell[cnt].style.backgroundColor = "#9AB3F5";
            break;
        case "64":
            cell[cnt].style.backgroundColor = "#B088F9";
            break;
        case "128":
            cell[cnt].style.backgroundColor = "#c4fb6d";
            break;
        case "256":
            cell[cnt].style.backgroundColor = "#0be881";
            break;
        case "512":
            cell[cnt].style.backgroundColor = "#34e7e4";
            break;
        case "1024":
            cell[cnt].style.backgroundColor = "#cd84f1";
            break;
        case "2048":
            cell[cnt].style.backgroundColor = "#F8EFBA";
            break;
        default:
            if(cell.innerHTML > 2048) {
                cell[cnt].style.backgroundColor = "#7d5fff";
            }
            else {
                cell[cnt].style.backgroundColor = "#808e9b";
            }    
    }
}

//시작버튼 눌렀을 때 게임을 활성화하고 보드판을 보여주는 함수
function startBtnListener(){
    isUsable = 1;
    document.getElementById('gameAreaLine').style.display = 'flex';
}

//게임을 리셋하는 함수 (새로고침)
function resetBtnListener(){
    window.location.reload();
}


//랜덤위치에 2를 넣어주는 함수
function randomNum() {
    ranPlaceX = Math.floor(Math.random() * 4 + 1);
    ranPlaceY = Math.floor(Math.random() * 4 + 1);
    if(board[ranPlaceX][ranPlaceY] == 0) {
        board[ranPlaceX][ranPlaceY] = 2;
    }
    else {
        randomNum();
    }
    update();
}


// 게임의 최초 상태를 랜덤으로 지정하는 함수
function initRnd(){
    // 0~2까지의 랜덤값을 도출
    rnd_pick = Math.floor(Math.random() * 3);    
    // X좌표값 수신
    posX = getRandomPos();
    // Y좌표값 수신
    posY = getRandomPos();
    // 위에서 도출한 랜덤값이 0이라면
    if (rnd_pick == 0) {
        // X,Y좌표에 2 하나 기입
        board[posX][posY] = 2;
    // 랜덤값이 1이면
    }else if (rnd_pick == 1) {
        // X,Y 좌표에 4 하나 기입
        board[posX][posY] = 4;
    // 랜덤값이 2면
    }else if (rnd_pick == 2) {
        // A좌표값 수신
        posA = getRandomPos();
        // B좌표 선언
        var posB;
        // A좌표와 X좌표가 같으면
        if(posA == posX) {
            // B좌표의 랜덤값 수신 (Y좌표와 다르게 수신)
            posB = getNewRandomPos(posY);
        // 다르면
        }else{
            // B좌표 랜덤값 수신
            posB = getRandomPos();
        }
        board[posX][posY] = 2;
        board[posA][posB] = 4;
    }    
    update();
}

//랜덤위치를 리턴하는 함수
function getRandomPos(){
    return Math.floor(Math.random() * 4 + 1);
}

// 새로운 랜덤 포지션 받기
function getNewRandomPos(posY){ // 기존 posY를 파라미터로 수신
    // 랜덤 돌려 res에 저장
    res = Math.floor(Math.random() * 4 + 1);
    // 랜덤 돌린 res와 posY가 같다면
    if (res == posY){
        // 재귀 실행 (다를때까지 무한으로 돌려서 다르게 나올때 리턴)
        return getNewRandomPos(res);
    // 다르면
    }else{
        // 리턴
        return res;
    }
}

function moveLeftNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[i][j] != 0) {
                k = j;
                while(1) {
                    if(board[i][k-1] != 0) {
                        break;
                    }
                    board[i][k-1] = board[i][k];
                    board[i][k] = 0;
                    k--;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveLeft() {
    gameOver();
    moveLeftNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                numCheck = 0;

                board[i][j] *= 2;
                board[i][j+1] = 0;
            }
        }
    }
    if(!numCheck) {
        moveLeftNum();
        randomNum();
        update();
    }
}

function moveUpNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(board[k-1][i] != 0) {
                        break;
                    }
                    board[k-1][i] = board[k][i];
                    board[k][i] = 0;
                    k--;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveUp() {
    gameOver();
    moveUpNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[j][i] == board[j+1][i] && board[j][i] != 0) {
                board[j][i] *= 2;
                board[j+1][i] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        moveUpNum();
        randomNum();
        update();
    }
}

function moveRightNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 0; j--) {
            if(board[i][j] != 0) {
                k = j;
                while(1) {
                    if(board[i][k+1] != 0) {
                        break;
                    }
                    board[i][k+1] = board[i][k];
                    board[i][k] = 0;
                    k++;
                    numCheck = 0;
                }
            }
        }
    }
}

function moveRight() {
    gameOver();
    moveRightNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j >1; j--) {
            if(board[i][j] == board[i][j-1] && board[i][j] != 0) {

                board[i][j] *= 2;
                board[i][j-1] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {
        moveRightNum();
        randomNum();
        update();
    }
}

function moveDownNum() {
    let k;

    numCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 0; j--) {
            if(board[j][i] != 0) {
                k = j;
                while(1) {
                    if(board[k+1][i] != 0) {
                        break;
                    }
                    board[k+1][i] = board[k][i];
                    board[k][i] = 0;
                    k++; 
                    numCheck = 0;
                }
            }
        }
    }
}

function moveDown(){
    gameOver();
    moveDownNum();

    for(let i = 1; i < 5; i++) {
        for(let j = 4; j > 1; j--) {
            if(board[j][i] == board[j-1][i] && board[j][i] != 0) {

                board[j][i] *= 2;
                board[j-1][i] = 0;
                numCheck = 0;
            }
        }
    }
    if(!numCheck) {     
        moveDownNum();
        randomNum();
        update();
    }
}

function rowCheck() {
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[i][j] == board[i][j+1]) {
                overCheck = 0;
            }
        }
    }
}

function columnCheck() {
    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 4; j++) {
            if(board[j][i] == board[j+1][i]) {
                overCheck = 0;
            }
        }
    }
}

function gameOver() {
    let fullCheck = 1;

    for(let i = 1; i < 5; i++) {
        for(let j = 1; j < 5; j++) {
            if(board[i][j] == 0) {
                fullCheck = 0; //리셋
            }
        }
    }
    rowCheck();
    columnCheck();
    if(fullCheck && overCheck) {
        // 게임 종료 문구 출력
        document.getElementById("gameoverLine").style.display = "block";
        // 게임을 비활성화
        isUsable = 0;
    }

    overCheck = 1;
}

//방향키 먹는곳
window.addEventListener("keydown", (e)=> {
    const keyCode = e.keyCode;
    //게임 활성화 여부를 체크
    if (isUsable != 0){ // 활성화 되어있다면
        if(keyCode == 37) {
            moveLeft();
            score += 1
            scoreText.innerHTML = score;
        }
        else if(keyCode == 38) {
            moveUp();
            score += 1
            scoreText.innerHTML = score;
        }
        else if(keyCode == 39) {
            moveRight();
            score += 1
            scoreText.innerHTML = score;
        }
        else if(keyCode == 40) {
            moveDown();
            score += 1
            scoreText.innerHTML = score;
        }
    }
    setScore();
});

startGameBtn.addEventListener('click', () => {
    modalEl.style.display = 'none'
})

Restart.addEventListener('click', () => {
    window.location.reload();
})