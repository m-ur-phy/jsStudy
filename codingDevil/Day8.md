# 11장 - 클로저(Closure)

## 어휘적 환경(Lexical Environment)

<img width="517" alt="1" src="https://user-images.githubusercontent.com/87026989/177973394-da8429e9-f4c1-4f78-8946-6518c716b727.png">

- 코드가 선언되면 스크립트 환경에서 선언한 변수들이 Lexical 환경으로 올라간다.
- let 으로 선언된 변수도 호이스팅 되어서 올라가 있다.
    - 주의 할 점은 올라가만 있을 뿐, 초기화가 되어있지않기 때문에 사용할 수는 없다.
- 반면에 함수 선언문은 변수와 달리 바로 초기화 되어 사용할 수 있다.
    - 변수에 할당하는 함수 표현식은 불가능 하다!

<img width="517" alt="2" src="https://user-images.githubusercontent.com/87026989/177973421-595fb6b6-a873-40a3-af3c-b0de19afce30.png">

- `let one;` 이 실행되고, 아직 할당하지 않았기 때문에 초기값 `undefined` 를 갖는다. 이제 사용해도 에러는 발생하지 않는다.

<img width="517" alt="3" src="https://user-images.githubusercontent.com/87026989/177973449-fad42fe3-375e-4139-a597-4bbbddeafaeb.png">

- 이제 숫자 1이 할당되었다.

<img width="517" alt="4" src="https://user-images.githubusercontent.com/87026989/177973474-23c8aaae-611b-433a-a1cb-b9704ee64e8a.png">

- 바로 함수 실행문으로 넘어간다.
    - 함수 선언은 이미 초기에 실행되었기 때문이다.

<img width="517" alt="5" src="https://user-images.githubusercontent.com/87026989/177973505-7a826cb8-acc4-4b17-821f-4642218a3c50.png">

- 함수 실행으로 넘어가는 동시에 새로운 Lexical 환경이 생성된다.
- 이 Lexical 환경에서는 함수가 넘겨받은 매개변수와 지역변수들이 저장된다.

<img width="517" alt="6" src="https://user-images.githubusercontent.com/87026989/177973523-19ec593a-3a76-4a6b-b493-07a581d09be4.png">

- 즉, 함수가 호출되는 동안 함수 내부에서 받은 `내부 Lexical 환경`과 외부에서 받은 `전역 Lexical 환경`이 생기는 것이다.
- `내부 Lexical 환경`은 `외부 Lexical 환경`에 대한 참조를 가진다.
    - 코드에서 변수를 찾을 때 **내부**에서 먼저 변수를 찾고, 없다면 **외부**, 그래도 없다면 **전역 Lexical 환경**까지 범위를 넓혀서 찾는다.
    - 예를 들어 해당 코드에서 `one` 과 `num` 을 찾는다고 가정했을 때, 내부 Lexical 에서 먼저 찾고 `one`은 내부 Lexical 에 존재하지 않기 때문에 전역 Lexical 까지 가서 찾아낸다.

다른 예제를 한번 살펴보자

<img width="517" alt="7" src="https://user-images.githubusercontent.com/87026989/177973574-86c4dc3a-a983-4d34-8866-5f0718195f86.png">


- `return function(y)` 함수는 자신이 `y`를 가지고 있고, 상위 함수인 `makeAdder(x)` 의 매개변수인 `x` 에 접근할 수 있다.

<img width="517" alt="8" src="https://user-images.githubusercontent.com/87026989/177973629-8ff958a1-d61b-446e-bc01-0d23120d29f6.png">

- `add3` 함수가 생성된 이후에도, 상위 함수인 `makeAdder` 의 `x` 에 접근할 수 있다.

이러한 경우를 바로 Closure 이라고 한다.

## Closure?

- 함수와 그 함수의 렉시컬 환경의 조합이다.
- 함수가 생성될 당시의 외부 변수를 기억하고, 생성된 이후에도 계속 접근이 가능한 기능이다.

## Closure 예제

```jsx
function makeCounter() {
  let num = 0; // 은닉화

  return function () {
    return num++;
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
```

- `counter = makeCounter();`
- `makeCounter()` 함수는 숫자를 반환하는데, 그 숫자는 외부 함수의 변수이다.
- 숫자를 기억하면서 계속 ++ 를 진행해준다.
- 결과 값 즉, 수를 변경할 수 있을까? 불가능하다. 오직 카운터를 증가시키고 반환받을 뿐이다.
- 즉, `let num = 0;` 의 은닉화에 성공한 것이다.
    - 갑자기 99로 변화하거나, 100씩 증가하는 것은 불가능하다.

# 12장 - setTimeout / setInterval

## setTimeout?

- 일정 시간이 지난 후 함수를 실행한다.

```jsx
function fn(){
	console.log(3)
}

setTimeout(fn, 3000);
```

- 위 코드는 3초 후에 로그를 찍어준다.
- `setTimeout()` 함수는 두개의 매개변수를 받는다.
    - 첫번째는 일정시간이 지나면 실행되는 함수
    - 두번째는 시간이다. (3000 = 3s)
    

```jsx
setTimeout(function() {
	console.log(3)
}, 3000);
```

- 이와 같이 작성해도 동일한 결과를 얻을 수 있다.

```jsx
function showName(name) {
	console.log(name);
}

setTimeout(showName, 3000, "Mike");
//           함수      시간    인수
```

- 인수가 필요한 경우 다음과 같이 작성한다.

## clearTimeout

- 예정된 작업을 없앤다.

```jsx
function showName(name) {
	console.log(name);
}

const tId = setTimeout(showName, 3000, "Mike");
//                        함수      시간    인수

clearTimeout(tid); // 예정된 시간이 되기 전에 tId 코드를 실행하지 못하게 함
```

- `setTimeout` 은 실행되지 않는다.

## setInterval?

- 일정 시간 간격으로 함수를 반복한다.
- `setTimeout()` 과 사용법은 동일하나, 반복한다는 차이가 있다.

```jsx
function showName(name) {
	console.log(name);
}

const tId = setInterval(showName, 3000, "Mike");
// 3초마다 "Mike" ..3초.. "Mike" ..3초.. "Mike"
```

## clearInterval

- `setInterval()` 을 중단하고 싶을 때 사용한다.

```jsx
clearInterval(tId);
```

## 주의할 점

```jsx
setTimeout(function() {
	console.log(2)
}, 0); // delay 를 0으로 주었다

console.log(1);
```

- delay를 0으로 주어도 바로 실행되지 않는다.
- 다음과 같은 코드를 실행하면, 1이 먼저 출력되고 그 이후에 2가 출력된다.
- 이유는?
    - 현재 실행중인 스크립트가 종료된 이후 스케쥴링 함수를 실행하기 때문이다.
    - 그리고 또한 브라우저는 4ms~ 정도의 대기시간이 있기 때문이기도 하다.
    

## setInterval 예제

- 접속 시간을 알려주자 (단, 5초까지만)

```jsx
// setInterval, clearInterval

let num = 0;

function showTime() {
  console.log(`안녕하세요. 접속하신지 ${num++}초가 지났습니다!`);
  if (num > 5) {
    clearInterval(tId);
  }
}

const tId = setInterval(showTime, 1000);
```

<img width="471" alt="interval" src="https://user-images.githubusercontent.com/87026989/177973671-37bd57ee-d439-4823-823b-cb2e7751ba68.png">

# 13장 - call, apply, bind

## call, apply, bind?

- 함수 호출 방식과 관계없이 `this` 를 지정할 수 있다.

## call

- `call` 메서드는 모든 함수에서 사용할 수 있으며, `this` 를 특정 값으로 지정할 수 있다.

```jsx
const son = {
  name: "Son"
};

const kane = {
  name: "Kane"
};

function showThisName() {
  console.log(this.name);
}

showThisName(); // 반환 값 없음. 윈도우의 this 를 호출함
showThisName.call(son); // "Son"
showThisName.call(kane); // "Kane"
```

- 함수를 호출하면서 `call` 을 사용하고, `this` 로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 메서드 인 것 처럼 사용할 수 있다.
- `call` 의 첫번째 매개변수는 `this` 로 사용할 값이다.

다른 예제를 한번 살펴보자

```jsx
const son = {
  name: "Son"
};

function showThisName() {
  console.log(this.name);
}

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.call(son, 1992, "football player");
console.log(son); // {name: "Son", birthYear: 1992, occupation: "football player"}
```

- `update()` 함수를 이용하여 `son` 객체에 출생년도와, 직업을 넣어보았다.
- `call` 의 매개변수를 살펴보면,
    - 첫번째 매개변수는 `update()` 함수에서 `this` 로 사용될 값이다.
    - 두번째 매개변수부터는 `update()` 함수가 사용할 매개변수들을 순서대로 적은 것이다.

## apply

- `apply` 는 함수 매개변수를 처리하는 방법을 제외하면 `call` 과 완전히 같다.
- `call` 은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, `apply` 는 매개변수를 배열로 받는다.

```jsx
const son = {
  name: "Son"
};

function showThisName() {
  console.log(this.name);
}

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.apply(son, [1992, "football player"]); // 뒤의 매개변수들을 배열로 묶어준다
console.log(son); // {name: "Son", birthYear: 1992, occupation: "football player"}
```

- `apply` 는 배열 요소를 함수 매개변수로 사용할 때 유용하다.

```jsx
const nums = [3, 10, 1, 6, 4];
// const minNum = Math.min(...nums);
// const maxNum = Math.max(...nums);

const minNum = Math.min.apply(null, nums);
// = Math.min.apply(null, [3, 10, 1, 6, 4]);

const maxNum = Math.max.apply(null, nums);

console.log(minNum); // 1
console.log(maxNum); // 10
```

- `apply(null, nums)` 에서 `null` 값은 `this` 로 사용될 값인데, `Math.min` 이나 `Math.max` 메서드는 딱히 `this` 가 필요하지 않아서 아무 값이나 넣은 것이다.
- 이렇게 `apply` 를 사용하면 배열을 한번에 받아 사용할 때 유용하다.

```jsx
const nums = [3, 10, 1, 6, 4];
// const minNum = Math.min(...nums);
// const maxNum = Math.max(...nums);

const minNum = Math.min.call(null, ...nums); // ... spread
const maxNum = Math.max.call(null, ...nums);

console.log(minNum); // 1
console.log(maxNum); // 10
```

- `call` 은 차례대로 매개변수를 받아야 하기 때문에, `spread` 연산자를 이용해서 넣어주면된다.
- `call` 과 `apply` 는 매개변수를 받는 방법만 다를 뿐, 동작 방식은 같다.
- `call` 은 순서대로 직접 받고, `apply` 는 배열 형태로 받는다.

## bind

- 함수의 `this` 값을 영구히 바꿀 수 있다.

```jsx
const son = {
  name: "Son"
};

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

const updateSon = update.bind(son); // bind는 새로 바인딩할 함수를 하나 만든다.

updateSon(1992, "football player");
console.log(son); // {name: "Son", birthYear: 1992, occupation: "football player"}
```

- bind 는 새로 바인딩할 함수를 하나 만든다.
- 이 함수는 항상 `son` 을 `this` 로 받는다.

```jsx
const user = {
  name: "Son",
  showName: function () {
    console.log(`hello, ${this.name}`);
  }
};

user.showName(); // "hello, Son"

let fn = user.showName;

fn(); // 아무것도 나오지 않는다
```

- `fn` 에 할당 할 때, `this` 를 잃어버렸기 때문에 `fn();` 을 실행해도 아무것도 나오지 않는다.
- 이런 경우에 `this, apply, bind` 를 이용하여 해결해 줄 수 있다.

```jsx
const user = {
  name: "Son",
  showName: function () {
    console.log(`hello, ${this.name}`);
  }
};

user.showName(); // "hello, Son"

let fn = user.showName;

fn.call(user); // "hello, Son"
fn.apply(user); // "hello, Son"

let boundFn = fn.bind(user);
boundFn(); // "hello, Son"
```
