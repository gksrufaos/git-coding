// 정답과 게이머가 입력한 값 비교 함수 --> 함수가 숫자별로 비교해야함, 카운트 갯수를 별도로 구성
/*
스트라이크
숫자와 위치가 같아야 한다.
정답배열에 입력한 숫자가 포함되어있을때.. 위치가 같으면...
볼
숫자만 같으면 된다.
아웃
숫자도 위치도 달라야한다.
*/
var gameRoundNum = 3;
var answerValArr = [];
var processBtn = document.querySelector('.processBtn');
var startBtn = document.querySelector('.start');
var round = 0;

// 게임 시작 랜덤 숫자 3개 받아오기
function start(){
  round = 0;
  // 랜덤숫자 3개 받아오는 함수 호출
  var radomNum = pickRandomNum();
  // 정답 hidden 값에 넣는  함수
  drawRandomNum(radomNum);
  // 화면 초기화 함수
  init();
}

// 랜덤숫자 3개 받아오는 함수
function pickRandomNum(){
  for(var i = 0; i < gameRoundNum; i++){
    // 랜덤숫자 중복체크 함수 호출
    var chkDupNum = checkDuplicateNum();
    answerValArr[i] = chkDupNum;
  }
  return answerValArr;
}

// 랜덤숫자 중복체크 함수
function checkDuplicateNum(){
  var answerVal = 0;
  var isDupCheck = true;
  while(isDupCheck){
     answerVal = String(Math.floor(Math.random() * 10)); // 0~9에서 중복이 아닐때까지 숫자 계속 뽑기
    if(!answerValArr.includes(answerVal)){
      isDupCheck = false;
    }
  }
  return answerVal;
}

// 정답 hidden 값에 넣는  함수
function drawRandomNum(randomNumVal){
  var gameAnswerTxt = document.getElementById('gameAnswer');
  gameAnswerTxt.value = randomNumVal;
}

// 게이머가 숫자를 입력하고 전송을 클릭 했을때 프로세스 함수
function baseBallProcess(){
  // 게이머가 입력한 값 배열에 넣는 함수 호출 --> 첫번째 프로세스
  var gameInputNum = inputNumber();
  // validation 함수 호출
  if(validateChk(gameInputNum)){
    // 정답과 게이머가 입력한 값 비교 프로세스 호출
    var compareProc = compareProcess(gameInputNum);
    // round 별 html 그리는 함수 호출 (x=0 strike, x=1 ball, x=2 out)
    drawInputNum(gameInputNum, compareProc);
    //게임 끝났는지 확인하는 함수
    checkEndGame(compareProc[0]);
  }
}

// 초기화
function init(){
  alert('게임이 시작됩니다.');

  var ul = document.getElementById("drawWrapUl");

  ul.innerHTML = '';
  document.getElementById('inputNum01').value = '';
  document.getElementById('inputNum02').value = '';
  document.getElementById('inputNum03').value = '';
}

// 게이머가 입력한 값 배열에 넣기
function inputNumber(){
  var num1 = document.getElementById('inputNum01');
  var num2 = document.getElementById('inputNum02');
  var num3 = document.getElementById('inputNum03');
  var numArr = [];
  numArr[0] = num1.value;
  numArr[1] = num2.value;
  numArr[2] = num3.value;

  return numArr;
}

 // validation 함수
function validateChk(gameInputNum){
  if(round < 10) {
    if(document.getElementById('gameAnswer').value === ""){
        alert("게임 시작! 버튼을 클릭하세요.");
        return false;
    }
    if(gameInputNum[0] === "" || gameInputNum[1] === "" || gameInputNum[2] === ""){
        alert("숫자를 입력하세요.");
        return false;
    }
    if(gameInputNum[0] === gameInputNum[1] || gameInputNum[0] === gameInputNum[2] || gameInputNum[1] === gameInputNum[2]){
        alert("각각 다른 숫자를 입력하세요.");
        return false;
    }
    if(gameInputNum[0] > 10 || gameInputNum[1] > 10 || gameInputNum[2] > 10){
        alert("입력된 숫자는 0~9 범위어야 합니다.");
        return false;
    }
    // 라운드 계산
    round = round + 1;
    return true;
  } else {
    return false;
  }
}

// 정답과 게이머가 입력한 값 비교 프로세스 함수
function compareProcess(gameInputNumArr){
  var strike = 0, ball = 0, out = 0;
  for(var inx = 0; inx < gameRoundNum; inx++){
    // 정답과 게이머가 입력한 숫자 비교 하는 함수 호출
    var compareVal = compareValue(inx, gameInputNumArr);
    // 스트라이크, 볼, 아웃 계산 하는 함수
    if(compareVal === "S"){
      strike += calculateCnt();
    }
    if(compareVal === "B"){
      ball += calculateCnt();
    }
    if(compareVal === "O"){
      out += calculateCnt();
    }
  }
  return [strike, ball, out];
}

// 정답과 게이머가 입력한 숫자 비교 하는 함수
function compareValue(inx, gameInputNumArr){
	if(isStrike(inx, gameInputNumArr)){
    return "S";
	}
	if(isBall(inx, gameInputNumArr)){
    return "B";
	}
  if(!isStrike(inx, gameInputNumArr) && !isBall(inx, gameInputNumArr)){
    return "O";
  }
}

//스트라이크 판별하는 함수
function isStrike(idx, gameInputNumArr){
  if(answerValArr[idx] === gameInputNumArr[idx]){
    return true;
  } else {
    return false;
  }
}

//볼 판별하는 함수
function isBall(idx, gameInputNumArr){
  for(var idxs = 0; idxs < gameRoundNum; idxs++){
    if(answerValArr[idx] === gameInputNumArr[idxs]){
      return true;
    }
  }
  return false;
}

// count 계산 하는 함수
function calculateCnt(){
  var cnt = 0;
  cnt++;
  return cnt;
}

// round 별 html 그리는 함수
function drawInputNum(gameInputNumArr, roundResult){
  var ul = document.getElementById("drawWrapUl");
  var li = document.createElement('li');
  li.className="addLi";
  var span = document.createElement('span');
  var valueTxt = document.createTextNode(gameInputNumArr + " - " + roundResult[0] + "strike " + roundResult[1] + "ball " + roundResult[2] + "out");
  li.appendChild(valueTxt);
  ul.appendChild(li);
}

function checkEndGame(correct){
  if(round < 10){ // 10라운드 전에 3스트라이크가 됐을경우
    if(correct === 3){
      round = 10;
      alert("게임승리! :)");
      return true;
    } else {
      return false;
    }
  } else { // 10라운드 이후에도 3스트라이크가 아닐경우
    if(correct !== 3){
      alert("게임실패ㅠ");
      return true;
    } else {
      return false;
    }
  }
}

//게임시작 클릭 이벤트
startBtn.addEventListener('click', start);
//전송 클릭 이벤트
processBtn.addEventListener('click', baseBallProcess);
