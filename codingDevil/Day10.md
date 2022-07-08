# 17장 - async, await

- `async, await` 를 사용하면 `promise` 의 `then` 메소드를 체인 형식으로 호출 할 때보다 가독성이 좋아진다.

## async

- 함수 앞에 `async` 키워드를 붙여주면 항상 `promise` 를 반환한다.

```jsx
async function getName() {
  return Promise.resolve("Tom");
}

getName().then((name) => {
  console.log(name); // "Tom"
});
```

- 예외가 발생하면 `rejected` 상태의 promise 가 반환된다.

```jsx
async function getName() {
  // return Promise.resolve("Tom");
  throw new Error("err...");
}

getName().catch((err) => {
  console.log(err); // Error: err...
});
```

## await

```jsx
function getName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

async function showName() {
  const result = await getName("Mike"); // await 키워드 오른쪽에는 프로미스가 오고, 그 프로미스가 처리될 때까지 기다린다.
  console.log(result);
}

console.log("시작"); // "시작"
showName(); // 1초뒤... "Mike"
```

- `await` 키워드는 `async` 함수 내부에서만 사용 가능하다.
- `await` 키워드 오른쪽에는 프로미스가 오고, 그 프로미스가 처리될 때까지 기다린다.
- 그래서 해당 코드는 1초 후에 “Mike” 가 찍힌다.

## 예제

- 저번에 Promise 로 구현한 주문 시스템 코드를 `async` 와 `await` 로 바꿔보자

```jsx
const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 손님 식사 가져가세요!");
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 손님 식사 가져가세요!");
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 손님 식사 가져가세요!");
    }, 2000);
  });
};

// 프로미스 체이닝 (Promises chaining)
console.log("시작");
f1()
  .then((res) => f2(res))
  .then((res) => f3(res))
  .then((res) => console.log(res))
  .catch(console.log)
  .finally(() => {
    console.log("끝");
  });
```

- 프로미스 체이닝 부분을 `async, await` 를 사용해서 바꿔보자!!!

```jsx
const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 손님 식사 가져가세요!");
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 손님 식사 가져가세요!");
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 손님 식사 가져가세요!");
    }, 2000);
  });
};

console.log("시작");
async function order() {
  const result1 = await f1();
  const result2 = await f2(result1);
  const result3 = await f3(result2);
  console.log(result3);
  console.log("종료");
}

order();
```

<img width="364" alt="1" src="https://user-images.githubusercontent.com/87026989/178051997-4ae4d743-ab1b-444a-8910-2d4d3c5a1e0c.png">

- promise then 을 사용하는 것보다 가독성이 좋다.
- 대부분의 상황에서 `async, await` 를 사용하는 것을 추천

- 이번 상황에서도 `reject` 값을 줘보자!

```jsx
const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 손님 식사 가져가세요!");
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      // res("2번 손님 식사 가져가세요!");
      rej(new Error("err...")); // 일부러 에러 줘버리기~!
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 손님 식사 가져가세요!");
    }, 2000);
  });
};

console.log("시작");
async function order() {
  try {
    const result1 = await f1();
    const result2 = await f2(result1);
    const result3 = await f3(result2);
    console.log(result3);
  } catch (e) {
    console.log(e);
  }
  console.log("종료");
}

order();
```

<img width="364" alt="2" src="https://user-images.githubusercontent.com/87026989/178052016-93a205ee-a3dd-49d3-ab90-e2be2ec1b682.png">

- promise 에서는 `catch` 를 사용했지만 `async, await` 에서는 `try catch 문` 을 사용한다.

+) `async, await` 함수 내부에서도 비동기 함수를 병렬로 실행할 수 있다.

# 18장 - Generator

## Generator?

- 함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능
- 신기하다

```jsx
function* fn() {
  yield 1;
  yield 2;
  yield 3;
  return "finish";
}

const a = fn();
```

- Generator 는 `function` 옆에 `*` 을 달아주면서 만들고, 내부에 `yield` 키워드를 사용한다.
- `yield` 에서 함수의 실행을 멈출 수 있다.
- Generator 함수를 실행하면 Generator 객체가 반환된다.
    - Generator 객체는 `next` 메소드가 있다.

```jsx
function* fn() {
	console.log(1);
  yield 1;
	console.log(2);
  yield 2;
	console.log(3);
	console.log(4);
  yield 3;
  return "finish";
}

const a = fn();
```

<img width="198" alt="3" src="https://user-images.githubusercontent.com/87026989/178052065-ac4e4619-7319-4c58-95a2-f535131bef5d.png">

- 값이 다 반환된 이후에도 `a.next();` 를 시행하면 `value: undefined` 를 반환하고, `done: true` 가 나오게 된다.

## Generator - iterable

### iterable (반복이 가능하다)

- `Symbol.iterator` 메서드가 있다.
- `Symbol.iterator` 는 `iterator` 를 반환해야 한다.

### iterator

- `next` 메서드를 가진다.
- `next` 메서드는 `value` 와 `done` 속성을 가진 객체를 반환한다.
- 작업이 끝나면 `done` 은 `true` 가 된다.

```jsx
function* fn() {
  yield 4;
  yield 5;
  yield 6;
}

const a = fn();
```

```jsx
a[Symbol.iterator]() === a;
// true
```

- 바로 위 코드는 `Symbol.iterator` 를 실행한 값이 자기 자신이라는 것을 의미한다. 즉, Generator 는 `iterable` 객체임을 의미한다.

```jsx
for(let num of a){
	console.log(num);
}
// 4
// 5
// 6
```

- 이렇게 `for of 문`을 실행 할 수 있다.
- 문자열도 가능하다.

## Generator - next() 에 인수 전달

- `next()` 메서드에 인수를 전달 해 보자

```jsx
function* fn() {
  const num1 = yield "첫번째 숫자를 입력해주세요";
  console.log(num1);

  const num2 = yield "두번째 숫자를 입력해주세요";
  console.log(num2);

  return num1 + num2;
}

const a = fn();
```

- 다음의 코드가 있을 때

```jsx
a.next(); // "첫번째 숫자를 입력해주세요"
a.next(2); // "두번째 숫자를 입력해주세요"
a.next(4); // {value: 6, done: true}
```

- 이런식으로 인수를 전달해 줄 수 있다.
- Generator 는 외부로 부터 값을 입력 받을 수도 있다는 것을 보여줌,,,

## Generator - 값을 미리 만들어 두지 않음

- Generator 는 값을 미리 만들어 놓지 않는다. 메모리 관리 측면에서 효율적인 방식이다.
- 필요한 순간에만 연산해서 값을 주기 때문에 아래의 코드도 가능하다.

```jsx
function* fn() {
	let index = 0;
	while (true) {
		yield index++;
	}
}

const a = fn();
```

```jsx
a.next();
// {value: 0, done: false}
a.next();
// {value: 1, done: false}
```

- 원래 같았으면 계~~ 속 도는데, 돌지 않는다.
- `a.next();` 로 호출할때마다만! 값을 주기 때문이다!
- Generator 는 필요한 값만 그때 그때 생성한다.

## Generator - yield*

- `yield*` 을 이용해서 다른 함수 불러오기

```jsx
function* gen1() {
  yield "W";
  yield "o";
  yield "r";
  yield "l";
  yield "d";
}

function* gen2() {
  yield "Hello,";
  yield* gen1(); // gen1 을 호출하고 있다
  yield "!";
}
```

```jsx
console.log(...gen2());
// "Hello, W o r l d !"
```

## Generator 정리

- Generator 는 다른 작업을 하다가 다시 돌아와서 `next()` 해주면 진행이 멈췄던 부분부터 이어서 실행할 수 있다는 장점을 가진 기능
- Redux Saga 에서 활발하게 사용
