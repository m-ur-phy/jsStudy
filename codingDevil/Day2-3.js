// 5. 기본 연산자
// 나머지(%)를 어디에 쓸까?
// 홀짝 구분 또는 0~4 사이의 값만을 반환하고 싶을 때 등등

// 거듭제곱 **

// 우선순위
// *,/ > +,-

// 연산자 줄여서 쓰기
let num = 10;

// num = num + 5;
num += 5;

console.log(num);

// 증가 연산자, 감소 연산자
let n = 10;

let res = ++n; // -> 전위 연산자는 처음에
// let res = n++; -> 후위 연산자는 마지막에

console.log(res);

// 6. 비교 연산자, 조건문
// <, >, <=, >=, ==, !=
console.log(10 > 5);

// 동등 연산자
const a = 1;
const b = "1";

console.log(a == b);
console.log(a === b); // 타입까지 확인해주는 일치 연산자

// 가급적 동등 연산자 == 보단 일치연산자 === 를 쓰자

// 조건문 - if, else, else if
// 조건문 작성하기
// 20살 이상이면 '환영합니다', 이하면 '안녕히가세요'
// 추가 요구사항 : 19살이면 수능 잘치세요 라는 문구를 보여주기
const age = 19;

if (age > 19) {
  console.log("환영합니다");
} else if (age === 19) {
  console.log("수능 잘치세요");
} else {
  console.log("안녕히 가세요");
}

console.log("===========================");

// 7. 논리 연산자 (AND, OR, NOT)
// || (OR)
// 여러개 중 하나라도 true 면 true
// 즉, 모든 값이 false 일 때만 false 를 반환

// && (AND)
// 모든 값이 true 면 true
// 즉, 하나라도 false 면 false 를 반환

// ! (NOT)
// true 면 false
// false 면 true

// 평가
// OR 는 첫번째 true를 발견하는 즉시 평가를 멈춤
// 왜? -> 하나라도 true 면 true 이니까

// AND 는 첫번째 false를 발견하는 즉시 평가를 멈춤
// 왜? -> 하나라도 false 면 false 이니까

// 평가 시 처음에 가장 많이 거를 수 있는 순서대로 코드를 작성하는 것이 성능 최적화에 좋다.

// 비교 연산자에도 우선순위가 있다
// && > ||
// 남자이고, 이름이 Mike 이거나 성인이면 통과

const gender = "m";
const name = "jane";
const isAdult = true;

// if ((gender === "m" && name === "Mike") || isAdult) isAdult 가 true 이기 때문에.. OR 연산자에 따라 무조건 true
if (gender === "m" && (name === "Mike" || isAdult)) {
  // 일케 작성해주삼~
  console.log("통과");
} else {
  console.log("ㄴㄴ");
}

// 8. 반복문 (for, while, do while)
// 반복문 loop
// 동일한 작업을 여러번 반복

// for 문
// for(초기값; 조건문; 코드 실행 후 할 작업문){}
// 1부터 10까지 로그를 띄워보자
for (let i = 0; i <= 10; i++) {
  console.log(i);
}

// while 문
// while(조건식) {}
let i = 0;

while (i <= 10) {
  console.log(i);
  i++;
}

// do.. while 문
// while 문과의 차이는 코드 내용을 일단 한번은 실행한다는 것!!!
// do {
// 코드 내용~~
//  i++;
// }while(i < 10)

// 반복문 빠져나가는 방법
// break
// - 멈추고 빠져나옴

// continue
// - 멈추고 다음 반복으로 진행

// break 사용
while (true) {
  let answer = confirm("계속할까요?");
  if (!answer) {
    break;
  }
}

// contine 사용
for (let i = 0; i < 10; i++) {
  if (i % 2) {
    // 0 이 false, 1 이 true
    continue;
  }
  console.log(i);
}

// 9. switch
// case 가 다양할 경우 간결하게 쓸 수 있기 때문에 사용한다

// 사고 싶은 과일을 물어보고 가격 알려주기
// 사과 : 100원
// 바나나 : 200원
// 키위 : 300원
// 멜론 : 1000원
// 수박 : 1000원

let fruit = prompt("무슨 과일을 사고 싶나요??");

switch (fruit) {
  case "사과":
    console.log("100원 입니다.");
    break;
  case "바나나":
    console.log("200원 입니다.");
    break;
  case "키위":
    console.log("300원 입니다.");
    break;
  case "멜론":
  case "수박":
    console.log("1000원 입니다.");
    break;
  default:
    console.log("그런 과일은 없어요");
}

// 10. 함수
// function sayHello(name) {
//    console.log(`Hello, ${name}`);
// }

// 함수 함수명(매개변수) {
// 함수 실행코드;
// }

// 호출은 이렇게
// sayHello('MIKE');

// 함수의 장점
// 중복을 줄여준다
// 유지 보수가 쉬움

// 함수 예제 1
function showError() {
  alert("에러가 발생했습니다. 다시 시도해주세요.");
}

showError();

// 함수 예제 2 - 매개변수가 있는 함수
function sayHello(name) {
  const msg = `Hello, ${name}`;
  console.log(msg);
}

sayHello("Mike");

// 함수 예제 3 - 매개변수가 있고 없고
function hello(name) {
  let msg = "Hello"; // 함수 안에서만 사용하는 변수
  if (name) {
    // 값이 들어가면 true, 아니면 undefined 로 'Hello' 만 출력되는 거지
    msg += `, ${name}`;
  }
  console.log(msg);
}

hello();
hello("Mikey");

// 전역 변수와 지역 변수
let ms = "welcome"; // 전역 변수
console.log(ms);

function vType(name) {
  let ms = "Hello"; // 지역 변수
  console.log(ms + " " + name);
}

vType("MIKE");
console.log(ms);

// 매개 변수로 받은 값은 복사된 후 지역 변수가 된다.
// 전체 서비스에서 공통으로 받아야되는 값이 아니라면
// 지역 변수를 쓰는 습관을 들이자.

// return
// 값 반환용
// 반환 뒤 코드 절대 실행안됨

// 함수의 몇 가지 추가 팁
// 한 번에 한 작업에만 집중
// 읽기 쉽고 어떤 동작인지 알 수 있게 네이밍

// 11. 함수 표현식과 화살표 함수
// 함수 선언문 vs 함수 표현식

// 함수 선언문
function hello1() {
  console.log("hello");
}

// 함수 표현식
let hello2 = function () {
  console.log("hello");
};

// 차이는 무엇일까?
// 함수 선언문은 어디서든 호출이 가능하다
everyWhere(); // 호출문이 앞으로 왔음에도 불구하고 호출 가능

function everyWhere() {
  console.log("i can");
}
// 호이스팅

// 함수 표현식은 코드에 도달하면 생성된다
// 그렇기 때문에 표현식이 작성된 후에만 호출 될 수 있다.

/*
1. 함수 선언문 버전

showError();

function showError() {
  console.log("error");
}

2. 함수 표현식 버전

let showError = function () {
  console.log("error");
}

showError(); 표현식은 호이스팅 적용 XXX


3. 화살표 함수 버전

let showError = () => {
  console.log("error");
}

*/

// 화살표 함수 더 공부하기
/*

const sayHello = function (name) {
  const msg = `hello, ${name}`;
  console.log(msg)
}

위 예제를 화살표 함수로 바꿔보자!!!

const sayHello = (name) => {
  const msg = `hello, ${name}`;
  console.log(msg)
}

------------------------------

const add = function (num1, num2) {
  const result = num1 + num2;
  return result;
}

위 예제를 화살표 함수로 바꿔보자!!!

const add = (num1, num2) => (
  num1 + num2;
);

return 문이 한줄이라면

const add = (num1, num2) => num1 + num2;
이것도 가능하다!!!

*/

// 12. 객체 (Object)
// 객체 만들기
const superman = {
  name: "clark",
  age: 33
};

// 객체 접근!s
console.log(superman.name);
console.log(superman["age"]);

// 객체 추가
superman.hairColor = "black";
superman["hobby"] = "football";
console.log(superman);

// 객체 삭제
delete superman.age;
console.log(superman);

// 함수로 객체 반환하기
function makeObject(name, age) {
  return {
    name, // name: name
    age, // age: age
    hobby: "football"
  };
}

const Mike = makeObject("Mike", 30);
console.log(Mike);

// 프로퍼티 존재 여부 확인
console.log("age" in Mike);

// 객체 in
function isA(user) {
  if (
    !("age" in user) || // user 에 age 가 없거나
    user.age < 20
  ) {
    // 20살 미만이거나
    return false;
  }
  return true;
}

const Sarah = {
  name: "Sarah",
  age: 30
};

const Jay = {
  name: "Jay"
};

console.log(isA(Jay)); // 나이를 입력하지 않았는데 true 가 나올수 잇음 !('age' in user) 로 그런 경우 대비

// 객체 for ... in
const H = {
  name: "H",
  age: 20
};

for (x in H) {
  console.log(H); // H['age']
}
