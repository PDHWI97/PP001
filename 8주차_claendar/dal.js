// 달력 생성
const makeCalendar = (date) => {
  // 현재의 년도와 월 받아오기
  const nowYear = new Date(date).getFullYear();
  const nowMonth = new Date(date).getMonth() + 1;

  // 한달전의 마지막 요일
  const prevDay = new Date(nowYear, nowMonth - 1, 1).getDay();

  // 현재 월의 마지막 날 구하기
  const lastDay = new Date(nowYear, nowMonth, 0).getDate();

  // 남은 박스만큼 다음달 날짜 표시
  const limitDay = prevDay + lastDay;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = '';

  // 한달전 날짜 표시하기
  for (let i = 0; i < prevDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  // 이번달 날짜 표시하기
  for (let i = 1; i <= lastDay; i++) {
    htmlDummy += `<div>${i}</div>`;
  }

  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
  document.querySelector(`.dateTitle`).innerText = `${nowYear}년 ${nowMonth}월`;
}


const date = new Date();

makeCalendar("2022-10-01");

function sayHello() {
  var textBox = document.getElementById('info');

  if (textBox != null) {
    makeCalendar(textBox.value);
  }
}//제 손으로 직접 했습니다. 뿌듯뿌듯





// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
}

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
}
