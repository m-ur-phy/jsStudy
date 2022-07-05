# 8장 - 배열 method 2 (sort, reduce)

## `arr.sort()` : 배열 재정렬

- 배열 재정렬
- 주의! 배열 자체가 변경됨
- 인수로 정렬 로직을 담은 함수를 받음

```jsx
/* arr.sort() 배열 재정렬 */

let arr = [1, 5, 4, 2, 3]; // 문자열도 동일하게 잘 적용된다

arr.sort();

console.log(arr); // [1, 2, 3, 4, 5]
```

- 배열은 정렬 시 문자열로 치부하기 때문에 앞 숫자를 기준으로 정렬된다.

```jsx
let arr = [27, 8, 5, 13];

arr.sort();

console.log(arr); // [13, 27, 5, 8]
```

- `sort()` 는 함수를 인수로 받는다.
- 이를 이용하여 위에서 잘못된 정렬을 바로 잡아보자!

```jsx
let arr = [27, 8, 5, 13];

function fn(a, b) {
  return a - b;
}

arr.sort(fn);

console.log(arr); // [5, 8, 13, 27]
```

= 동일하게 화살표 함수를 사용해서 만든 것

```jsx
let arr = [27, 8, 5, 13];

arr.sort((a, b) => {
  return a - b;
});

console.log(arr); // [5, 8, 13, 27]
```

- [5, 8, 13, 27] 로 잘 정렬된 것을 확인할 수 있다.
- 어떻게 된걸까?
    - 두 인수 a 와 b 를 받아서 양수인지 음수인지 0인지만 판별해주면 된다.
    - a > b 는 양수
    - a < b 는 음수
    - = 는 0
    - a 가 작으면 a 를 return 값으로 보낸다.
    - b 가 작으면 b 를 return 값으로 보낸다.
    - 0을 반환하면 가만히 있는다.
- 순서는 다음과 같다.

```jsx
let arr = [27, 8, 5, 13]; // 원래 배열

// arr.sort(함수)에서 일어나는 일

// 27과 8 비교
// 8 27
// -> 8, 27, 5, 13

// 8과 5 비교
// 5 8
// -> 5, 8, 27, 13

// 5와 13 비교
// 13 5
// -> 5, 8, 27, 13 (변화 없음)

// 8과 13 비교
// 13 8
// -> 5, 8, 27, 13 (변화 없음)

// 27과 13 비교
// 13 27
// -> 5, 8, 13, 27
```

## `arr.reduce()` : 배열

- 인수로 함수를 받는다
- (누적 계산값, 현재값) ⇒ { return 계산값 };

- 그동안 배열의 모든 수를 합치고 싶다면 이 방식을 사용했어야 했다.

```jsx
/* arr.reduce() 배열 재정렬 */
// 배열의 모든 수 합치기

let arr = [1, 2, 3, 4, 5];

// 배열을 합치려면??
// for, for of, forEach

let result = 0;
arr.forEach((num) => {
  result += num;
});

console.log(result);
```

- 그러나 `reduce()` 는 이를 좀 더 간결하게 해결해준다.

```jsx
/* arr.reduce() 배열 재정렬 */
// 배열의 모든 수 합치기

let arr = [1, 2, 3, 4, 5];

const result = arr.reduce((prev, cur) => {
  return prev + cur;
}, 0); // 초기 값은 0으로 설정 (optional)

console.log(result); // 15
```

- (누적계산값, 현재값) ⇒ {
    
    return 누적계산값 + 현재값;
    
    }, 초기값);
    
- 초기값 0 즉, 누적 계산 값이 0 인 상태에서 현재 값 1이 들어간다.
- 누적 계산 값이 1인 상태에서 현재 값 2가 들어가 누산값이 3이 된다.
- 계속 반복 ~ 결과는 15가 나온다.

## 배열 method 예제 - `arr.reduce()`

### 성인만 뽑아서 새로운 배열을 만들어보자

```jsx
// 성인만 뽑아서 새로운 배열 만들어보기

let userList = [
  { name: "Mike", age: 30 },
  { name: "Tom", age: 10 },
  { name: "Jane", age: 27 },
  { name: "Sue", age: 26 },
  { name: "Harry", age: 42 },
  { name: "Steve", age: 60 }
];

let result = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    prev.push(cur.name);
  }
  return prev;
}, []); // 초기값은 []

console.log(result); // ["Mike", "Jane", "Sue", "Harry", "Steve"]
```

- 초기값 `[]` 빈 배열에 미성년자를 제외한(cur.age > 19) 현재 값(이름)들을 넣어서 누산 값을 산출한다.

### 나이의 합을 구해보자

```jsx
// 성인만 뽑아서 새로운 배열 만들어 보기

let userList = [
  { name: "Mike", age: 30 },
  { name: "Tom", age: 10 },
  { name: "Jane", age: 27 },
  { name: "Sue", age: 26 },
  { name: "Harry", age: 42 },
  { name: "Steve", age: 60 }
];

let result = userList.reduce((prev, cur) => {
  return (prev += cur.age); // 누산값 = 누산값 + 나이
}, 0);

console.log(result); // 196
```

- 다음과 같이 작성해주면 된다!

### 이름이 세글자인 사람을 찾아보자!

```jsx
// 이름이 세글자인 사람 찾기
// 내게는 이 세상 젤 슬픈 세 글자~~~~~~

let userList = [
  { name: "Mike", age: 30 },
  { name: "Tom", age: 10 },
  { name: "Jane", age: 27 },
  { name: "Sue", age: 26 },
  { name: "Harry", age: 42 },
  { name: "Steve", age: 60 }
];

let result = userList.reduce((prev, cur) => {
  if (cur.name.length === 3) {
    prev.push(cur.name);
  }
  return prev;
}, []);

console.log(result); // ["Tom", "Sue"]
```

+) `arr.reduceRight();`

- reduce() 와 기능은 동일하지만 오른쪽부터 연산한다.

# 9장 - 구조 분해 할당 (Destructuring assignment)

- 구조 분해 할당 구문은 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식

```jsx
let [x, y] = [1, 2];

console.log(x); // 1
console.log(y); // 2
```

- x 값에 1이 들어가고, y 값에 2가 들어간다.
- 다음의 예제로 더 자세히 살펴보자.

```jsx
let users = ["Mike", "Tom", "Jane"];

let [user1, user2, user3] = users;
// 이 코드는 다음과 같다
// let user1 = users[0];
// let user2 = users[1];
// let user3 = users[2];

console.log(user1); // "Mike"
console.log(user2); // "Tom"
console.log(user3); // "Jane"
```

### 기본값

- 만약 해당하는 값이 없다면?

```jsx
let [a, b, c] = [1, 2]; // c 에 undefined 할당

let [a=3, b=4, c=5] = [1, 2]; // 기본 값을 설정
console.log(a); // 1
console.log(b); // 2
console.log(c); // 5 (기본 값으로 설정해놓은 값이 반환된다)
```

- 맨 첫 라인의 c 에는 undefined 가 할당된다.
- 이를 방지하기 위해 기본 값을 설정한다.

### 일부 반환값 무시

- 일부 반환값을 무시하는 방법

```jsx
let [user1, ,user2] = ["Mike", "Tom", "Jane", "Tony"];
// 1-tom, 3-tony 는 무시당함

console.log(user1); // "Mike"
console.log(user2); // "Jane"
```

- 공백과 쉼표를 이용하여 일부 반환 값을 무시할 수 있다.

### 바꿔치기

- 값을 변환할 때 임시 변수를 사용하지 않고 한번에 바꿔치기 할 수 있다.

```jsx
let a = 1;
let b = 2;

[a, b] = [b, a]; 

console.log(a); // 2
console.log(b); // 1
```

지금까지 배열 구조 분해에 대해서 알아보았다.

### 객체 구조 분해

```jsx
let user = {name: "Mike", age: 30};

let {name, age} = user; // let {age, name} = user; 도 동일하게 동작한다
// 이 코드는 다음과 같다
// let name = user.name;
// let age = user.age;

console.log(name); // "Mike"
console.log(age); // 30
```

- 객체 구조 분해는 순서가 상관 없다.

### 새로운 변수 이름으로 할당

```jsx
let user = {name: "Mike", age: 30};

// let {name, age} = user;
let {name: userName, age: userAge} = user;

console.log(userName); // "Mike"
console.log(userAge); // 30
```

### 기본값

```jsx
let user = {name: "Mike", age: 30}

let {name, age, gender = "male"} = user; 
```

- 객체 구조 할당도 기본값을 설정해줄 수 있다.
- 이 경우는 할당 할 user에 해당하는 프로퍼티가 없을 때 즉, undefined 가 반환될 상황에서만 적용된다.

```jsx
let user = {
	name: "Jane",
	age: 18,
	gender: "female"
};

let {name, age, gender = "male"} = user;

console.log(gender); // "female"
```

- 이러한 경우에는 적용되지 않는다.
- 이미 있으니까 ^^

# 10장 - 나머지 매개변수, 전개 구문 (Rest parameters, Spread syntax)

## 나머지 매개변수 (Rest parameters)

- `…` 으로 사용한다

### 인수 전달

```jsx
function showName(name){
	console.log(name);
}

showName("Mike"); // "Mike"
showName("Mike", "Tom"); // "Mike"

showName(); // undefined
```

- 함수에 인수를 전달 할 때, 인수의 개수는 제한이 없다.
- 즉, 0개를 넣어도 2개 이상을 넣어도 상관 없다는 말이다.

- 인수를 접근하는 방법은 두 가지가 존재한다.
    - arguments 사용하기
    - 나머지 매개 변수 사용하기

1. arguments
    - 함수로 넘어 온 모든 인수에 접근한다.
    - 함수 내에서 이용 가능한 지역 변수
    - length / index
    - Array 형태의 객체임
    - 즉, 배열 내장 메서드 없음 (forEach, map 등을 사용할 수 없다)
    
    ```jsx
    function showName(name) {
    	console.log(arguments.length);
    	console.log(arguments[0]);
    	console.log(arguments[1]);
    }
    
    showName("Mike", "Tom");
    // 2
    // "Mike"
    // "Tom"
    ```
    

1. 나머지 매개변수(Rest parameters)
    - es6 이상의 환경에서는 나머지 매개변수를 사용하는 것을 권장한다.
    
    ```jsx
    function showName(...names){
    	console.log(names);
    }
    
    showName(); // []
    showName("Mike"); // ["Mike"]
    showName("Mike", "Tom"); // ["Mike", "Tom"]
    ```
    
    - 정해지지 않은 인수를 배열로 나타낼 수 있게 해준다.

## 나머지 매개변수 예제

### 전달 받은 모든 수를 더하는 함수를 만들어보자

```jsx
// 나머지 매개변수
// 전달 받은 모든 수를 더해야 함

function add(...numbers) {
  let result = 0;
  numbers.forEach((num) => (result += num));
  console.log(result);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
```

- arguments 와 달리 `forEach()` 나 `reduce()` 등 도 사용할 수 있다.
- 왜냐하면 전달 받은 인자를 배열로 돌려주기 때문

```jsx
function add(...numbers) {
  let result = numbers.reduce((prev, cur) => prev + cur);
	console.log(result);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
```

- `reduce()` 버전

### user 객체를 만들어 주는 생성자 함수 만들기

```jsx
// 나머지 매개변수
// user 객체를 만들어 주는 생성자 함수를 만들어봅시다!!!

function User(name, age, ...skills) {
  this.name = name;
  this.age = age;
  this.skills = skills;
}

const user1 = new User("Mike", 30, "html", "css");
const user2 = new User("Tom", 20, "JS", "React");
const user3 = new User("Mike", 10, "English");

console.log(user1);
console.log(user2);
console.log(user3);
```

<img width="640" alt="스크린샷 2022-07-05 오후 11 49 56" src="https://user-images.githubusercontent.com/87026989/177362995-b5007ca3-e313-43e1-bd88-af5ce1d763eb.png">

- 참고로 생성자 함수는 맨 마지막에 작성해야 한다.

## 전개 구문 (Spread syntax) : 배열

```jsx
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [...arr1, ...arr2];
// ...arr1 -> 1, 2, 3 을 풀어서 쓴 것. ...arr2 -> 4, 5, 6 을 풀어서 쓴 것.

console.log(result); // [1, 2, 3, 4, 5, 6]
```

- 오? 배열이 합쳐졌다?
- 다른 예제도 보자

```jsx
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [0, ...arr1, ...arr2, 7, 8, 9];

console.log(result); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
```

- 전개 구문을 사용하여 쉽게 배열을 활용할 수 있다.

## 전개 구문 (Spread syntax) : 객체

```jsx
let user = {name: "Mike"}
let mike = {...user, age: 30}

console.log(mike) // {name: "Mike", age: 30}
```

- 객체도 가능하다.

### 전개 구문을 이용한 복제

```jsx
let arr = [1, 2, 3]
let arr2 = [...arr]; // [1, 2, 3]

let user = {name: "Mike", age: 30};
let user2 = {...user};

user2.name = "Tom";

console.log(user.name); // "Mike"
console.log(user2.name); // "Tom"
```

- 원래의 객체에 영향을 받지 않는 즉, 아예 별개의 객체를 복제하여 생성한 것을 확인할 수 있다.

## 전개 구문 (Spread syntax) 예제

### array 를 수정해보자

- 전개 구문을 사용하지 않고 수정하는 방법~

```jsx
// arr1 을 [4, 5, 6, 1, 2, 3] 으로

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

arr2.reverse().forEach((num) => { // arr 앞에서 부터 돌면서 앞으로 다시 넣어줌 -> 6, 5, 4 되어서 다시 또 revers() 로 정렬해줘야됨
  arr1.unshift(num);
});

console.log(arr1); // [4, 5, 6, 1, 2, 3]
```

- 전개구문을 사용하면?!?!?!?!?!?

```jsx
// 전개 구문
// arr1 을 [4, 5, 6, 1, 2, 3] 으로

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

arr1 = [...arr2, ...arr1];

console.log(arr1); // [4, 5, 6, 1, 2, 3]
```

- 와 너무 간단해요!!!

### 객체 예제도 해보자

- 전개 구문 사용하지 않고 해보기~

```jsx
// user 에 info 를 넣고
// fe 와 lang 을 스킬로 묶어서 만들어 보세요

let user = { name: "Mike" };
let info = { age: 30 };
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

user = Object.assign({}, user, info, {
  skills: [] // 빈 객체도 하나 생성해줍니다~
});

fe.forEach((item) => { // 돌려서 넣어~
  user.skills.push(item);
});

lang.forEach((item) => { // 돌려돌려 넣어~
  user.skills.push(item);
});

console.log(user);
```

- 전개 구문 사용해보기~

```jsx
// user 에 info 를 넣고
// fe 와 lang 을 스킬로 묶어서 만들어 보세요

let user = { name: "Mike" };
let info = { age: 30 };
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

user = {
  ...user,
  ...info,
  skills: [...fe, ...lang]
};

console.log(user);
```

<img width="640" alt="스크린샷 2022-07-06 오전 12 18 46" src="https://user-images.githubusercontent.com/87026989/177363078-26694936-5d2a-4512-ace6-279d6afd13fc.png">


- 결과는 동일하다.
- 하지만 전개 구문을 이용해서 너무 짧고 쉽게 객체를 수정해 줄 수 있었다.
- 전개 구문… 신세계다…

## TIP!

- Lodash 는 유용한 기능들을 모아놓은 라이브러리 실무에서 많이 사용된다.
- 상황에 맞춰 메소드를 잘 사용하는 것도 능력이다!
