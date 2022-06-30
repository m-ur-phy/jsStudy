// 13. 객체(Object) - method, this
const superman = {
  name: "clark",
  age: 33,
  fly: function () {
    console.log("날아갑니다.");
  }
};

superman.fly(); // 날아갑니다
// 여기서 fly() 가 method!!!

// method
// 객체 프로퍼티로 할당 된 함수

// this
// 같은 객체 내에서 this를 이용하여 값을 불러올 수 있음

// 화살표 함수는 일반 함수와는 달리 자신만의 this를 가지지 않음
// 화살표 함수 내부에서 this 를 사용하면, 그 this 는 외부에서 값을 가져옴

// method this 예제
let boy = {
  name: "Mike",
  showName: function () {
    console.log(this.name); // this로 바꿔주면 해당 객체를 가르키기 때문에 메서드 활용시 this 를 잘 사용하는 것이 좋다
    // console.log(boy.name); // boy는 null 이기 때문에 오류
  }
};

let man = boy; // 객체 하나 더 생성하기

// man.name = "Tom"; // boy의 이름을 mike 에서 tom 으로 바꾼다

boy = null; // boy를 null 값으로 바꿔버린다면???
man.showName(); // 에러가 난다.

// 화살표 함수
let girl = {
  name: "J",
  sayThis: () => {
    console.log(this); // 오류남
  }
};

girl.sayThis();
// 객체의 메소드를 작성할 때는 화살표 함수로 작성하지 않는 것이 좋다

// 14. 배열(Array)
// 배열은 문자 뿐만 아니라, 숫자, 객체, 함수 등도 포함할 수 있음

// length : 배열의 길이
// students.length

// push() : 배열 끝에 추가
let days = ["월", "화", "수"];
days.push("목");
console.log(days);

// pop() : 배열 끝 요소 제거
let day = ["월", "화", "수"];
day.pop();
console.log(days);

// shift, unshift : 배열 앞에 제거/추가
// 추가
days.unshift("일");
console.log(days); // ['일', '월', '화', '수'];

// 제거
days.shift();
console.log(days); // ['월', '화', '수']

// 배열 반복문은 두 가지
// 일반 for 문과
// for of 문
// for in 과 헷갈리지 말자
// for of가 더 사용하기 좋음 for of 만 기억하자

// 배열 반복문 (일반 for)
for (let index = 0; index < days.length; index++) {
  console.log(days[index]);
}

// 배열 반복문 (for of)
for (let x of days) {
  console.log(x);
}

// 중급 1. 변수
// var vs let vs const

// var
// var 는 한 번 선언된 변수를 다시 선언할 수 있다
// var 는 선언하기 전에 사용할 수 있다 (호이스팅)
// 선언은 호이스팅 되지만 할당은 호이스팅 되지 않는다

// 호이스팅
// 스코프 내부 어디서든 변수 선언은 최상위에 선언된 것 처럼 행동하는 것

// 그렇다면 let 은?

/*
console.log(name); // 에러남 여긴 바로 TDZ
let name = "mike";
*/

// console.log(name) -> Temporal Dead Zone 할당 전에는 사용 불가
// const name = "Mike" // 함수 선언 및 할당
// console.log(name) -> 사용가능

// let 도 호이스팅이 존재한다
let age = 30;

function showAge() {
  console.log(age);

  let age = 20; // 함수 내부에 선언한 let age 가 호이스팅을 일으켜 문제가 되는 코드가 됨
}

showAge();

// 변수의 생성과정
// 1. 선언 단계
// 2. 초기화 단계
// 3. 할당 단계

// var
// 선언과 초기화가 동시에 된다

// let
// 선언과 초기화가 분리된다

// const
// 선언 +  초기화 + 할당이 전부 동시에

// 스코프!!!

// var
// 함수 스코프

// let, const
// 블록 스코프
// 블록 스코프란?
// 모든 코드 블록에서 선언된 변수는 코드 블록 내에서만 유효하며,
// 외부에서는 접근할 수 없다는 의미
// ex) 함수, if문, for문, while문, try/catch문 등

const userAge = 30;

if (userAge > 19) {
  var txt = "성인";
}

console.log(txt); // 성인! var는 밖에서도 사용가능하다. 하지만 사용하진 않는다.

// 반면에 함수 스코프는 var 을 쓰더라도 불가능
// 즉, 함수 스코프는 어떤 변수도 벗어날 수 없다고 생각하자
