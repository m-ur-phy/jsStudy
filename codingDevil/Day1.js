// 1. 변수
const name = "Mike";
let age = 30;

console.log(age);

// 자바스크립트에서 변수를 선언 할때
// 변하지 않는 값? const
// 변할 수 있는 값? let
// 웬만하면 const를 사용하고, 변할 여지가 있다면 let 으로 변경

// 변수 설정 규칙
// 첫째, 변수는 문자 숫자 $ _ 만 사용
// 둘째, 첫 글자는 숫자가 될 수 없다
// 셋째, 예약어는 사용할 수 없다
// 넷째, 가급적 상수는 대문자로
// 다섯째, 변수명은 읽기 쉽고 이해할 수 있게 선언한다

// 2. 자료형
// 문자형 string
const message = "I'm a girl";

// 백틱 활용하기
const message2 = `My name is ${name}`;
console.log(message2);

// 숫자형 number
const num = 30;

console.log(1 + 2); // 숫자형은 사칙연산이 가능하다
// 참고로 문자형과 숫자형을 더한다면 문자형으로 형변환된다.

// 숫자형을 0으로 나눈다면?
// infinity 무한대

// 문자형을 숫자형으로 나눈다면?
// NaN not a number

// 불리언 boolean
const a = true; // 참
const b = false; // 거짓

// Null 과 undefined
// null?
// 존재하지 않는 값

// undefined?
// 값이 할당되지 않음을 의미
// 변수를 선언하지 않고 아무것도 할당하지 않는다면 undefined

// typeof 연산자
// typeof? 변수의 자료형을 알아낼 수 있다.
console.log(typeof 3);

console.log(typeof null); // object
// null 의 typeof 결과는 object(객체)
// null 은 객체일까?
// 정답은 아니다.
// 자바스크립트 초기버전의 오류이지만 호환성을 위해 수정하지 않았다고 한다.

// 3. alert, prompt, confirm
// alert (알려줌)
// prompt (입력 받음)
// confirm (확인 받음)

const username = prompt("이름을 입력하세요.");
alert(`환영합니다 ${username}님!!!`);

// prompt 에 아무것도 입력하지 않는다면 Null

// prompt 기본 값 설정하기
// prompt(페이지 내용 말, 기본 값)
const reserve = prompt("예약일을 입력해주세요", "2022-06-27");
alert(`당신의 예약일은 ${reserve} 입니다`);

// confirm (prompt 와 달리 확인과 "취소" 버튼 두 가지가 뜬다)
const isAdult = confirm("당신은 성인 입니까?");

console.log(isAdult); // 확인 버튼을 누르면 true, 취소 버튼을 누르면 false를 반환한다.

// alert, prompt, confirm 의 단점
// 1. 스크립트 일시 정지
// 2. 스타일링이 불가능하다.

// 4. 형변환
// String() -> 문자형으로 변환
// Number() -> 숫자형으로 변환
// Boolean() -> 불린형으로 변환

// 수학과 영어의 점수를 입력받아 평균을 구하는 프로그램
const mathScore = prompt("수학 몇점?");
const engScore = prompt("영어 몇점?");
const result = mathScore + engScore / 2;

console.log(result); // 결과는 "4540";

// prompt 로 입력 받은 값은 문자형이었기 때문에
// "90" + "80" = "9080"
// "9080" / 2 = 4540 -> 자동 형 변환

// 명시적 형변환
// String() 문자형으로 형변환
console.log(
  String(3),
  String(true),
  String(false),
  String(null),
  String(undefined)
);

// Number() 숫자형으로 형변환
console.log(
  Number("1234"),
  Number(true), // 1
  Number(false) // 0
  // Number("123sdlfjaldfjalsdf") -> NaN
);

// Boolean() 불리언으로 형변환
// false 만 기억하자
// 숫자 0
// 빈 문자열 ""
// null
// undefined
// NaN
// 이외에는 전부 true 를 반환한다.

// true
console.log(Boolean(1), Boolean(123), Boolean("javascript"));

// false
console.log(
  Boolean(0),
  Boolean(""),
  Boolean(null),
  Boolean(undefined),
  Boolean(NaN)
);

// 버그 없는 코드를 위한
// 추가 주의사항 (그냥 암기)
Number(null); // 0
Number(undefined); // NaN

// 주의 사항
Number(0); // 숫자 0은 false
Number("0"); // 문자형 0은 true

Number(""); // 정말 빈 문자열만 false
Number(" "); // 공백이 있으면 true
