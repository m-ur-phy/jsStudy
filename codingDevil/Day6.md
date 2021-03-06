# 5장 - 숫자, 수학 method (Number, Math)

## `toString()` : 진수 변환

- 10진수 → 2진수/16진수
- 숫자를 문자열로 반환해준다.
- 괄호 안에 변환하고 싶은 진수의 수를 입력해주면 10진수의 문자가 2진수 또는 16진수로 변환되어 반환한다.

```jsx
let num = 10;

num.toString(); // "10"
num.toString(2); // "1010" 2진수로 변환

let num2 = 255;

num2.toString(16); // "ff" 16진수로 변환
```

# Math

- 수학과 관련된 프로퍼티와 메소드들을 가지고 있는 내장 객체

## `Math.ceil()` : 올림

```jsx
let num1 = 5.1;
let num2 = 5.7;

Math.ceil(num1); // 6
Math.ceil(num2); // 6
```

- 소숫점 수에 상관없이 무조건 올림

## `Math.floor()` : 내림

```jsx
let num1 = 5.1;
let num2 = 5.7;

Math.floor(num1); // 5
Math.floor(num2); // 5
```

- 소숫점 수에 상관없이 무조건 내림

## `Math.round()` : 반올림

```jsx
let num1 = 5.1;
let num2 = 5.7;

Math.round(num1); // 5
Math.round(num2); // 6
```

- 일반적인 반올림

## `toFixed()` : 소수점 자릿수

```jsx
let userRate = 30.1234;

userRate.toFixed(2); // 소수점 둘째 자리(2) 까지
// "30.12"

userRate.toFixed(0); // 소수점 없애기
// "30"

userRate.toFixed(6); // 자리수보다 큰 수
// "30.123400"
```

- 숫자를 인수로 받아 그 숫자만큼 소숫점 이하 수에 반영한다.
- 소수점 개수보다 큰 수를 받게 되면 그만큼 0으로 채워준다.
- 문자열로 반환하기 때문에 Number() 메소드를 이용하여 숫자열로 다시 변환해서 사용하는 경우가 많다.

## `isNaN()` : NaN인지 판별

```jsx
let x = Number("x"); // NaN
```

- isNaN() 만이 NaN 값을 판별할 수 있다.

## `parseInt()` : 문자열을 숫자로

```jsx
let margin = "10px" // 숫자+문자열

parseInt(margin); // 10
Number(margin); // NaN
```

- 문자열을 숫자로 변환한다.
- 주의할 점은 문자가 혼용되어 있어도 동작한다.
- 그러나 문자열이 가장 앞글자로 시작되면 바로 NaN 값을 반환한다.

- 그렇지만 parseInt()는 두 번째 인수를 받아서 진수를 지정할 수 있다.

```jsx
let redColor = "f3";

parseInt(redColor, 16); // 243

```

- “f3” 을 16진수로 변환하여 243이라는 값을 반환하였다.

## `parseFloat()` : 문자열을 숫자로

```jsx
let padding = "18.5%"

parseInt(padding); // 18
parseFloat(padding); // 18.5
```

- parseInt() 와 동일하게 동작하지만 부동 소수점을 반환한다.

## `Math.random()` : 무작위 숫자 생성

```jsx
Math.random(); // 0.282727388483
Math.random(); // 0.672816334
```

- 0 ~ 1 사이의 무작위 숫자를 생성한다.

- 만약 1 ~ 100 사이의 임의의 숫자를 뽑고싶다면?

```jsx
Math.floor(Math.random()*100)+1
```

## `Math.max() / Math.min()` : 최댓값 / 최솟값

```jsx
Math.max(6, -1, 2.2, 10); // 10
Math.min(6, -1, 2.2, 10); // -1
```

- 최댓값과 최솟값을 구한다.

## `Math.abs()` : 절대값

```jsx
Math.abs(-1); // 1
```

- 절대값을 구한다.

## `Math.pow(n, m)` : 제곱

```jsx
Math.pow(2, 10); // 1024
```

- n의 m승 값을 구한다

## `Math.sqrt()` : 제곱근

```jsx
Math.sqrt(16); // 4
```

- 루트

# 6장 - 문자열 method

## ` : 백틱

```jsx
let desc = `이제와 뒤늦게
무엇을 더 보태려 하나
귀 기울여 듣지 않고
달리 보면 그만인 것을
못 그린 내 빈 곳
무엇으로 채워지려나
차라리 내 마음에 비친
내 모습 그려가리`;
```

- 여러줄 작성 가능

## `.length` : 길이

```jsx
let desc = '안녕하세요';
desc.length // 6
```

## `toUpperCase() / toLowerCase()` : 대문자 / 소문자

```jsx
let desc = "Hi guys. Nice to meet you.";

desc.toUpperCase(); // 대문자 만들기
// "HI GUYS. NICE TO MEET YOU."

desc.toLowerCase(); // 소문자 만들기
// "hi guys. nice to meet you."
```

## `str.indexOf(text)` : 몇번째 위치?

```jsx
let desc = "Hi guys. Nice to meet you.";
//          0123456789 ...14

desc.indexOf('to'); // 14
desc.indexOf('man'); // -1 찾는 문자가 없을 때
```

- 문자를 인수로 받아 몇번째에 위치하는지 알려준다.
- 찾는 문자가 없을 때는 -1을 반환한다.
- 주의할 점은 여러개의 문자가 있어도 첫 번째만 반환한다는 것이다.

```jsx
if(desc.indexOf("HI")) {
	console.log("HI 가 포함된 문장입니다."); // 안나옴
}
```

- 위 코드는 indexOf(”HI”) 가 0(false)을 반환하기 때문에 실행되지 않는다.

```jsx
if(desc.indexOf("HI") > -1) {
	console.log("HI 가 포함된 문장입니다."); // 안나옴
}
```

- 항상 -1 보다 큰가? 로 확인해야 한다.

## `str.slice(n, m)` : n부터 m까지 문자열 반환

```jsx
let desc = "abcdefg";

desc.slice(2) // "cdefg"
desc.slice(0, 5) // "abcde"
desc.slice(2, -2) // "cde"
```

- slice(n, m)
    - n
        - 시작점
    - m
        - 없으면 문자열 끝까지
        - 양수면 그 숫자까지 (포함하지 않음 -1)
        - 음수면 끝에서부터 셈

## `str.substring(n, m)` : n부터 m까지 문자열 반환

```jsx
let desc = "abcdefg";

desc.substring(2, 5); // "cde"
desc.substring(5, 2); // "cde"
```

- n 과 m 사이의 문자열을 반환한다.
- slice 와 유사하지만 n 과 m 을 바꿔도 동작한다.
- 음수를 허용하지 않는다. 음수는 0으로 인식한다.

## `str.substr(n, m)` : n부터 시작해서 m 개의 문자열 반환

```jsx
let desc = "abcdefg";

desc.substr(2, 4); // "cdef"
desc.substr(-4, 2); // "cde"
```

- n 부터 시작해서 m 개를 가져온다.

## `str.trim()` : 앞 뒤 공백 제거

```jsx
let desc = " coding         ";

desc.trim(); // "coding"
```

- 보통 사용자에게 입력을 받을 때 사용한다.

## `str.repeat(n)` : n번 반복

```jsx
let hello = "hello!";

hello.repeat(3); // "hello!hello!hello!"
```

## 문자열 비교

```jsx
1 < 3 // true
"a" < "c" // true

"a".codePointAt(0); // 97
String.fromCodePoint(97) // "a"
```

## 문자열 메소드 예제 - `slice()`

- 목차 리스트에서 문자열만 뽑고 싶은데??

```jsx
let list = [
  "01. 들어가며",
  "02. JS의 역사",
  "03. 자료형",
  "04. 함수",
  "05. 배열"
];

let newList = [];

for (let i = 0; i < list.length; i++) {
  newList.push(list[i].slice(4)); // 5번째 글자부터 끝까지
}

console.log(newList);
// ["들어가며", "JS의 역사", "자료형", "함수", "배열"]
```

## 문자열 메소드 예제 - `indexOf()`

- 금칙어는 콜라!

```jsx
// 금칙어 : 콜라

function hasCola(str) {
  if (str.indexOf("콜라") > -1) {
    console.log("금칙어가 있습니다! 금칙어! 금칙어!");
  } else {
    console.log("통과");
  }
}

hasCola("탄산은? 사이다!"); // "통과"
hasCola("콜라 콜라 콜라 콜라"); // "금칙어가 있습니다! 금칙어! 금칙어!"
```

## 문자열 메소드 예제 - `includes()`

- 문자가 있으면 true, 없으면 false 반환

```jsx
// 금칙어 : 콜라
// includes
// 문자가 있으면 true
// 없으면 false 반환

function hasCola(str) {
  if (str.includes("콜라")) {
    console.log("금칙어가 있습니다! 금칙어! 금칙어!");
  } else {
    console.log("통과");
  }
}

hasCola("탄산은? 사이다!"); // "통과"
hasCola("콜라 콜라 콜라 콜라"); // "금칙어가 있습니다! 금칙어! 금칙어!"
```

# 7장 - 배열 method 1

## 잠깐 복습!

`push()` : 뒤에 삽입

`pop()` : 뒤에 삭제

`unshift()` : 앞에 삽입

`shift()` : 앞에 삭제

## `arr.splice(n, m)` : 배열의 특정 요소 지움

```jsx
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2); // 1자리(2번째)부터 2개 지워라

console.log(arr); // [1, 4, 5]
```

- n
    - 시작
- m
    - 개수

## `arr.splice(n, m, x)` : 특정 요소 지우고 추가

```jsx
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 3, 100, 200); // 1자리(2번째)부터 3개를 지우고 그 자리에 100과 200을 차례로 넣어라

console.log(arr); // [1, 100, 200, 5]
```

- 두 번째 자리에 0을 넣게 되면 아무것도 지우지 않고 새로운 요소를 추가할 수 있다.

```jsx
let arr = ["나는", "손흥민", "입니다"];
arr.splice(1, 0, "대한민국", "축구선수"); // 1자리(2번째) 와 0 자리 사이에 들어 가게 된다

console.log(arr); // ["나는", "대한민국", "축구선수", "손흥민", "입니다"]
```

## `arr.splice()` : 삭제된 요소 반환

```jsx
let arr = [1, 2, 3, 4, 5];
let result = arr.splice(1, 2) // 1자리(2번째)부터 2개 지워라

console.log(arr); // [1, 4, 5]
console.log(result); // [2, 3]
```

## `arr.slice(n, m)` : n부터 m까지 반환

```jsx
let arr = [1, 2, 3, 4, 5];
arr.slice(1, 4); // [2, 3, 4]
```

- n부터 m까지 반환한다.
- 여기서 m 은 m-1 까지를 의미한다.

- 만약 괄호 안에 아무것도 넣지 않는다면?

```jsx
let arr = [1, 2, 3, 4, 5];
let arr2 = arr.slice();

console.log(arr2); // [1, 2, 3, 4, 5]
```

- 배열이 복사된다.

## `arr.concat(arr2, arr3 .. )` : 합쳐서 새 배열 반환

```jsx
let arr = [1, 2];

arr.concat([3, 4]); // [1, 2, 3, 4]
arr.concat([3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
arr.concat([3, 4], 5, 6); // [1, 2, 3, 4, 5, 6] 하나만 배열, 나머지가 숫자 값이더라도 반환 하는 값은 동일하다
```

## `arr.forEach(fn)` : 배열 반복

- forEach 는 함수를 인수로 받는다. 그 함수에는 세 가지의 매개변수가 존재한다.
    1. item (해당 요소)
        - ex) Mike, Tom, Jane
    2. index
        - ex) 0, 1, 2
    3. arr (해당 배열 자체)
        - ex) users
- 보통 첫번째와 두번째만 사용한다.

```jsx
let arr = ["Mike", "Tom", "Jane"];

arr.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
});

// "1. Mike"
// "2. Tom"
// "3. Jane"
```

## `arr.indexOf() / arr.lastIndexOf()` : 해당 요소의 인덱스 반환

```jsx
let arr = [1, 2, 3, 4, 5, 1, 2, 3];

arr.indexOf(3); // 2
arr.indexOf(3, 3); // (시작위치, 찾을 값) 7
arr.lastIndexOf(3); // 7

```

- 문자열에서 사용한 `IndexOf()` 와 같다.
- `lastIndexOf()` 끝에서부터

## `arr.includes()` : 포함하고 있는지 확인

```jsx
let arr = [1, 2, 3];

arr.includes(2); // true
arr.includes(8); // false
```

- 굳이 인덱스 반환이 필요 없다면 `includes()` 를 이용하자

## `arr.find(fn) / arr.findIndex(fn)` : 찾자 또

- `indexOf()` 처럼 찾는다는 의미는 동일하나, 좀 더 복잡한 연산이 가능하게 함수를 전달할 수 있다.
    - ex) 짝수만 찾기
- `find()`
    - 주의 할점은 첫번째 true 값만 반환하고 끝이다. 또한, 찾는 값이 없다면 undefined 를 반환한다.
- `findIndex()`
    - 찾으면 인덱스 값, 없으면 -1

```jsx
// find
// 짝수를 찾아보자
let arr = [1, 2, 3, 4, 5];

const result = arr.find((item) => {
  return item % 2 === 0; // 2로 나누었을 때, 나머지가 0인 수 = 짝수
});

console.log(result); // 2
```

```jsx
// find / findIndex
// 미성년자를 찾아보자
let userList = [
  { name: "Mike", age: 30 },
  { name: "Jane", age: 27 },
  { name: "Tom", age: 10 }
];

const result = userList.find((user) => { // findIndex 를 이용하면 2 반환
  if (user.age < 19) {
    return true;
  }
  return false;
});

console.log(result); // {name: "Tom", age: 10}
```

## `arr.filter(fn)` : 만족하는 모든 요소를 배열로 반환

- `find()` 는 하나만 찾았음
- 조건을 만족하는 모든 요소를 가져오고 싶을 때 사용

```jsx
// filter
// 짝수를 찾아보자
let arr = [1, 2, 3, 4, 5, 6];

const result = arr.filter((item) => {
  return item % 2 === 0; // 2로 나누었을 때, 나머지가 0인 수 = 짝수
});

console.log(result); // [2, 4, 6]
```

- 배열로 반환해 준다.

## `arr.reverse()` : 역순으로 재정렬

```jsx
let arr = [1, 2, 3, 4, 5];

arr.reverse(); // [5, 4, 3, 2, 1]
```

- 최근 가입된 유저 / 가장 최근에 작성된 글 등을 보여줄 때 사용한다.

## `arr.map(fn)` : 함수를 받아 기능 시행 후 새 배열 반환

- 함수를 받아 특정 기능을 시행하고, 새로운 배열을 반환한다.

```jsx
// arr.map()
// 미성년자 누구냐!

let userList = [
  { name: "Mike", age: 30 },
  { name: "Jane", age: 27 },
  { name: "Tom", age: 10 }
];

let newUserList = userList.map((user, index) => {
  return Object.assign({}, user, { // 새로운 Object 만들어 주기 {} 초기 값 선언 해주고 user 넣고 ...
    id: index + 1,
    isAdult: user.age > 19
  });
});

console.log(newUserList);
console.log(userList); // 기존의 userList 는 변경되지 않음
```

<img width="471" alt="스크린샷 2022-07-04 오후 10 43 57" src="https://user-images.githubusercontent.com/87026989/177170420-a8e5fbaf-64cc-403b-9a1b-cd12f4051773.png">

## 배열 method 예제 - `join() / split()`

```jsx
// join

let arr = ["안녕", "나는", "손흥민"];

let result = arr.join("-"); // 전달하는 값으로 연결 시켜줄 수 있다

console.log(result); // "안녕-나는-손흥민"
```

- 배열을 합쳐서 문자열로 만들어주는 `join()`

```jsx
// split

const users = "Mike,Jane,Tom,Son";

const result = users.split(","); // 전달하는 값으로 분리 시켜줄 수 있다

console.log(result); ["Mike", "Jane", "Tom", "Son"]
```

- 잘라서 배열을 만들어주는 `split()`

## 배열 method 예제 - `isArray()`

```jsx
// Array.isArray()

let user = {
  name: "Mike",
  age: 30
};

let userList = ["Mike", "Tom", "Jane"];

console.log(typeof user); // object
console.log(typeof userList); // object

console.log(Array.isArray(user)); // false
console.log(Array.isArray(userList)); // true
```

- `typeOf()` 를 이용하여 객체와 배열을 비교 해도 답은 동일하게 object 가 나온다.
- 그렇기 때문에 **배열인지 아닌지**를 구분하기 위해서 사용하는 method이다.
- `isArray()` 를 이용하면 배열은 true, 배열이 아닌 것은 false 가 나오게 된다.
