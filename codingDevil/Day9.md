# 14장 - 상속, 프로토타입 (Prototype)

```jsx
const user = {
  name: "Son"
};

console.log(user.name); // "Son"

console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("age")); // fals
```

- `hasOwnProperty()`
    - 객체 내에 프로퍼티가 있냐? 를 물어본다.
- 그런데 hasOwnProperty() 는 만든 적이 없는데, 어떻게 사용 가능한걸까?

<img width="292" alt="1" src="https://user-images.githubusercontent.com/87026989/178038159-80fb0a7e-1858-4abc-80a9-421b280eb228.png">

- 어! 여깄다!

### `_proto_`

- 이것을 바로 프로토타입(Prototype) 이라고 한다.

## 상속과 프로토타입

상속의 개념을 이용하여 다음의 예제를 한 번 살펴보자

```jsx
const bmw = {
  color: "red",
  wheels: 4,
  navigation: 1,
  drive() {
    console.log("drive...");
  }
};

const benz = {
  color: "black",
  wheels: 4,
  drive() {
    console.log("drive...");
  }
};

const audi = {
  color: "blue",
  wheels: 4,
  drive() {
    console.log("drive...");
  }
};
```

- 세 객체의 wheels 와 drive 는 동일하다.
- 공통된 부분을 어떻게 처리할 수 있을까?

```jsx
const car = {
  // car 라는 상위 개념의 객체
  wheels: 4,
  drive() {
    console.log("drive...");
  }
};

const bmw = {
  color: "red",
  navigation: 1
};

const benz = {
  color: "black"
};

const audi = {
  color: "blue"
};

// car 가 bmw, benz, audi 의 프로토타입이 된다
// = bmw, benz, audi 는 car 의 상속을 받는다
bmw._proto_ = car;
benz._proto_ = car;
audi._proto_ = car;
```

- `car` 라는 상위 개념의 객체를 추가해준다.
- 이후 `car` 가 `bmw, benz, audi` 의 프로토타입 즉, `car` 의 상속을 받을 수 있게 `bmw._proto_ = car;` 를 작성해준다.

- console 창에서 `bmw.wheels;` 를 찾는다고 가정해보자.
- 우선적으로 `bmw` 객체 내부에서 `wheels` 프로퍼티를 찾는다.
- 찾게되면 거기서 탐색을 멈추고, 만약 없다면 **프로토타입**에서 확인한다.

<img width="292" alt="2" src="https://user-images.githubusercontent.com/87026989/178038191-38bc2ca4-b488-44ab-849e-031da6c379f6.png">

```jsx
const car = {
  wheels: 4,
  drive() {
    console.log("drive...");
  }
};

const bmw = {
  color: "red",
  navigation: 1
};

bmw._proto_ = car;

const x5 = {
  color: "white",
  name: "x5"
};

x5._proto_ = bmw;
```

- 상속은 계속 될 수 있다.

<img width="587" alt="3" src="https://user-images.githubusercontent.com/87026989/178038239-35a40b6e-2233-4aa7-892f-e55c90bf0b35.png">

- 그림으로 보면 이렇게 확인 할 수 있다.
- 오른쪽에서 왼쪽으로 상위로 요소를 찾아내는 과정이라고 생각하면 된다.
- 이것을 `Prototype Chain` 이라고 한다.

## 생성자 함수와 프로토타입

```jsx
// const car = {
//   wheels: 4,
//   drive() {
//     console.log("drive..");
//   }
// };

const Bmw = function (color) {
  this.color = color;
};

Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
  console.log("drive...");
};

const x5 = new Bmw("red");
const z4 = new Bmw("blue");

// x5._proto_ = car;
// z4._proto_ = car;
```

- 생성자 함수를 이용하면, 주석 처리한 부분을 일일이 처리해주지 않아도 된다.
- 즉, 중복처리에 유용하다.
- 생성자 함수가 새로운 객체를 만들어 낼 때, 그 객체는 생성자의 인스턴스라고 불린다.
    - 자바스크립트에서는 이를 편리하게 확인할 수 있는 `instanceof` 연산자를 제공하고 있다.
    - `instanceof` 를 이용해서 객체와 생성자를 비교할 수 있고, 이는 해당 객체가 그 생성자로부터 생성된 것인지를 판단해서 `true` 혹은 `false`를 반환한다.

<img width="304" alt="4" src="https://user-images.githubusercontent.com/87026989/178038276-1359b5eb-825c-4a5e-a6fb-b621dff5519f.png">


- `z4` 는 `Bmw` 로 생성되었다.
- 그래서 `Bmw` 의 인스턴스다.
- `z4 instanceof Bmw` 를 하면 `Bmw` 를 이용해서 `z4`를 만들었는지 알 수 있다.

<img width="304" alt="5" src="https://user-images.githubusercontent.com/87026989/178038290-b1d7bc49-4aaf-43be-8053-a10db220655e.png">

- 이렇게 생성자로 만들어진 인스턴스 (`z4`) 는 `constructor` 라는 프로퍼티가 존재한다.
- `constructor` 는 생성자 즉, `Bmw` 를 가리킨다.

```jsx
Bmw.prototype = {
  wheels: 4,
  drive() {
    console.log("drive..");
  },
  navigation: 1,
  stop() {
    console.log("STOP!");
  }
};
```

- 이런식으로 한 번에 프로토타입을 덮어 쓸 수 있다. 그러나 이 경우엔 `constructor` 를 찾을 수 없다.
- 그래서 상위에 있는 방식 (하나씩 프로퍼티를 추가하는) 을 사용하는 것이 좋다.

```jsx
Bmw.prototype = {
  constructor : Bmw, // constructor 명시!
  wheels: 4,
  drive() {
    console.log("drive..");
  },
  navigation: 1,
  stop() {
    console.log("STOP!");
  }
```

- 이렇게 `constructor` 을 명시해줘도 좋다.
- 이처럼 자바스크립트는 명확한 `constructor` 를 보장하지는 않는다. 개발자에 의해서 언제든 수정 될 수 있음을 알아두어야 한다.

## 클로저

```jsx
const Bmw = function (color) {
  this.color = color;
};

const x5 = new Bmw("red");
```

- 이런 코드가 있으면 누구나 마음대로 내부의 코드를 바꿀 수 있다는 단점이 존재한다.

<img width="304" alt="6" src="https://user-images.githubusercontent.com/87026989/178038346-929ca4ee-0da0-4fec-8c66-e6d2192b7417.png">


- 이럴 때 클로저를 이용한다.

```jsx
const Bmw = function (color) {
  const c = color;
  this.getColor = function() {
    console.log(c); // 상위 lexical c 를 참조
  };
};

const x5 = new Bmw("red");
```

<img width="304" alt="7" src="https://user-images.githubusercontent.com/87026989/178038407-eb1a2f9f-04fd-451e-83ec-437033543e29.png">

- 코드를 이렇게 바꾸면, 초기에 세팅했던 color 값을 얻을 수만 있고, 바꿀 수 있는 방법은 없다.
- `getColor()` 함수는 생성될 당시의 context 를 기억하는 것이다.

# 15장 - 클래스 (Class)

- Class 는 ES6 에 추가된 스펙이다.

```jsx
// 기본 생성자 함수를 이용하여 생성
const User = function (name, age) {
  this.name = name;
  this.age = age;
  this.showName = function () {
    console.log(this.name);
  };
};

const mike = new User("Mike", 30);

// class 를 이용하여 생성
class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name);
  }
}

const tom = new User2("Tom", 19);
```

- Class 톺아보기
    - `new` 를 통해 호출했을 때, 내부에서 정의된 내용으로 객체를 생성하는 것은 동일하다.
    - `class` 라는 키워드를 사용한다.
    - `constructor` 가 존재한다 (객체를 만들어주는 생성자 메소드)
    - `showName()` 처럼 클래스 내에 정의된 메소드는 User2의 프로토타입에 저장된다.
        - `mike` 는 객체 내부에 `showName()` 이 있고,
        - `tom` 은 프로토타입 내부에 `showName()` 이 존재한다.

- 생성자 함수를 클래스의 결과와 동일하게 (`showName()` 이 프로토타입으로 가게) 하고 싶다면 다음과 같이 진행하면 된다.

```jsx
// 기본 생성자 함수를 이용하여 생성
const User = function (name, age) {
  this.name = name;
  this.age = age;
  // this.showName = function () {
  //   console.log(this.name);
  // };
};

User.prototype.showName = function () {
  console.log(this.name);
};

const mike = new User("Mike", 30);

// class 를 이용하여 생성
class User2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name);
  }
}

const tom = new User2("Tom", 19);
```

### 그렇다면 왜? Class 가 탄생한 것일까?

- 이전시간에 배웠듯이, 생성자 함수에서 `new` 를 붙이지 않고 호출하면 `undefined` 값이 나타난다.
- `undefined` 값을 반환할 뿐 에러는 뜨지 않는다.
- 그 러 나
- Class 는 `new` 를 붙이지 않고 호출하면 바로 TypeError 가 나타난다!

<img width="443" alt="8" src="https://user-images.githubusercontent.com/87026989/178038472-0c96ff9b-2782-490b-8152-e78b00050b5e.png">

- 생성자 함수로 만든 mike 의 `constructor` 과
- 클래스로 만든 tom 의 `constructor` 를 비교해보면
- tom 의 `constructor` 는 `class` 라고 명시되어있고, 이 경우에 `new` 없이 호출하면 에러가 발생되도록 설계되어있다.

<img width="444" alt="9" src="https://user-images.githubusercontent.com/87026989/178038489-06f15156-7671-48c0-8cd2-d63697d15781.png">

- `for in 문` 을 이용해서 둘 다 순회해 보아도 차이를 확인할 수 있다.
- mike 는 `name, age` 그리고 프로토타입에 있는 `showName` 까지 전부 확인할 수 있다.
- 반면 tom 은 `name` 과 `age` 만 보여준다.
- `for in 문`은 프로토타입에 포함된 프로퍼티들을 다 보여주고, 객체가 가지고 있는 프로퍼티만 감별하기 위해서 `hasOwnProperty()` 를 사용했어야 했다.
- 하지만 클래스의 메소드는 `for in 문`에서 제외된다.

## Class : 상속

- 클래스의 상속?
- 생성자 함수의 경우는 프로토타입을 이용해서 상속을 구현했었다.
- 클래스는 `extends` 키워드를 사용한다.

```jsx
// extends

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive...");
  }
  stop() {
    console.log("STOP!");
  }
}

class Bmw extends Car {
  park() {
    console.log("PARK");
  }
}

const z4 = new Bmw("blue");
```

<img width="214" alt="10" src="https://user-images.githubusercontent.com/87026989/178038515-ee0755d0-8c92-46e1-9fc5-b0d8262578c7.png">

- Car 클래스에서 선언한 `color` 와 `wheels` 가 객체에 들어있고,
- 프로토타입을 보면 `park` 가 있다.
    - `Bmw extends Car` 클래스 내부 메소드 `park()` 는 프로토타입으로 들어간다
- `drive` 와 `stop` 은 `_proto_` 의 `_proto_` 에 들어가 있다.

## Class : 메소드 오버라이딩

```jsx
// 메소드 오버라이딩(method overriding)

class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

class Bmw extends Car {
  park() {
    console.log("PARK~");
  }
  stop() {
    super.stop(); // 부모의 메소드를 그대로 사용하면서, 확장하고 싶을 때 사용하는 super
    // car 의 stop 을 사용한 것
		console.log("OFF!")
  }
}

const z4 = new Bmw("blue");
```

<img width="182" alt="11" src="https://user-images.githubusercontent.com/87026989/178038552-06cb8528-2e98-4302-bdf5-84dc1ff79d7e.png">

- 부모의 메소드를 그대로 사용하면서, 내용을 확장하고 싶을 땐
- `super` 키워드를 이용하여 확장해주면 된다.
- `super` 를 사용하지 않게되면 그냥 덮어쓰게 된다.
- `super.메소드명` 을 이용하여 부모클래스에 정의된 메소드를 사용할 수 있다.
- 이런 방식을 바로 **오버라이딩**이라고 한다.

## 생성자(constructor) 오버라이딩

```jsx
// 생성자 오버라이딩(constructor overriding)

class Car {
  constructor(color) {
    // {} class의 constructor 는 빈 객체를 만들어주고 this로 이 객체를 가르키게 된다.
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive..");
  }
  stop() {
    console.log("STOP!");
  }
}

class Bmw extends Car {
  // extends 를 이용한 자식 클래스는 빈 객체를 만든 후 this 에 할당하는 작업을 건너 뛴다
  constructor(color) {
    super(color); // 항상 super 키워드로 부모 클래스의 constructor 를 실행해 줘야 한다 그리고 또한 동일한 인수를 넣어주는 작업을 진행해야한다
    this.navigation = 1;
  }
  park() {
    console.log("PARK~");
  }
  stop() {
    super.stop(); // 부모의 메소드를 그대로 사용하면서, 확장하고 싶을 때 사용하는 super
    console.log("OFF!");
  }
}

const z4 = new Bmw("blue");
```

- 생성자 오버라이딩은 extends 를 이용한 클래스에서 사용된다.
- `Car` 클래스의 `constructor` 는 빈 객체({ })를 우선적으로 만들어주고, `this` 로 이 객체를 가르키게된다.
- 하지만 extends 를 이용한 자식 클래스는 그 과정을 생략한다.
- 항상 `super` 키워드로 부모 클래스의 `constructor` 를 실행해 줘야 한다 그리고 또한 동일한 인수를 넣어주는 작업을 진행해야한다.

```jsx
// 자식 클래스
class Bmw extends Car {
	constructor(...args){ // 만약 constructor 가 없으면
		super(...args); // 이 두 줄이 있는 것처럼 행동한다
	}
	park() {
	console.log("PARK");
	}
}
```

# 16장 - 프로미스 (Promise)

- 엽떡 주문하고 될 때까지 앉아서 물어보는 것보다 전화번호 남기고 다되거나 취소되면 다시 연락 주세요~ 하고 전화번호 남기고 가는게 더 낫다.
- 이럴 때 사용하는 것이 바로 프로미스!

```jsx
const pr = new Promise((resolve, reject) => {
	// code
});
```

- `new Promise` 로 생성한다.
- 함수를 전달받는데, 인수는 `resolve` 와 `reject` 이다.
    - `resolve` 는 성공한 경우에 실행되는 함수
    - `reject` 는 실패한 경우에 실행되는 함수
- 이렇게 어떤 일이 완료된 이후 실행되는 함수를 **callback** 함수라고 한다.

<img width="1241" alt="12" src="https://user-images.githubusercontent.com/87026989/178038588-bbdf3f05-5f3c-4e07-a8eb-159c2792e09a.png">

- `new Promise` 객체가 반환하는 `promise` 객체는 `state` 와 `result` 를 프로퍼티로 받는다.
- `state` 는 초기에 `pending(대기)` 였다가, `resolve(value)` (성공!) 가 호출되면 `fulfilled` 가 된다. 이때의 `result` 는 `resove` 함수로 전달된 값. `value` 이다.
- 만약 `reject(error)` (실패!) 가 되면 `rejected` 가 된다. 이때의 `result` 는 `reject` 함수로 전달된 `error` 이다.

## 판매자의 코드

- 성공

```jsx
const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 3000);
});
```

<img width="1191" alt="13" src="https://user-images.githubusercontent.com/87026989/178038609-7c483778-0bc3-4b72-9b37-4eb3ed5d0d2d.png">

- 실패

```jsx
const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("error..."));
  }, 3000);
});
```

<img width="1191" alt="14" src="https://user-images.githubusercontent.com/87026989/178038629-c46c241d-317f-4a99-9b1f-bf113bd20771.png">

- 판매자의 코드는 3초동안 무언가를 하고, 성공인지 실패인지를 알려준다.

## 소비자의 코드

```jsx
const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK!");
  }, 3000);
});

pr.then(
  function (result) {}, // 이행되었을 때 실행 resolve의 value 값
  function (err) {} // 거부되었을 때 실행 error 값
);
```

- `then` 을 이용해서 `resolve` 와 `reject` 를 처리해줄 수 있다.

```jsx
const pr = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK!");
  }, 3000);
});

pr.then(
  function (result) {
    console.log(result + "가지러 가자!");
  }, // 이행되었을 때 실행 resolve의 value 값
  function (err) {
    console.log("다시 주문...");
  } // 거부되었을 때 실행 error 값
);
```

- 이 코드는 `resolve` 가 실행되었기 때문에, 두 번째 콜 백을 반환하지 않는다.

## catch / finally

- catch
    - 에러가 발생한 경우만 사용할 수 있다. 즉, `reject` 인 경우만사용이 가능하다!

```jsx
pr.then(
	function(result) {}
).catch(
	function(err) {}
)
```

- 이렇게 catch 로 명확하게 구분해 주는 것이 더 가독성에 좋고, 이런 경우 첫번째 함수를 실행했다 나타나는 에러도 잡아낼 수 있기 때문에 catch 문을 이용하는 것을 권장한다.

- finally
    - finally는 이행이든 거부든 처리가 완료되면 항상 실행된다.
    - 로딩화면 같은 것을 없앨 때 유용하다.

```jsx
pr.then(
	function(result) {}
).catch(
	function(err) {}
).finally(
  function(){
    console.log("---주문 끝---")
  }
)
```

## 예제 - callback hell

```jsx
const f1 = (callback) => {
  setTimeout(function () {
    console.log("1번 주문 완료");
    callback();
  }, 1000);
};

const f2 = (callback) => {
  setTimeout(function () {
    console.log("2번 주문 완료");
    callback();
  }, 3000);
};

const f3 = (callback) => {
  setTimeout(function () {
    console.log("3번 주문 완료");
    callback();
  }, 2000);
};

// 이것이 바로 콜백 지옥의 시작점!
console.log("시작");
f1(function () {
  f2(function () {
    f3(function () {
      console.log("끝");
    });
  });
});
```

<img width="221" alt="15" src="https://user-images.githubusercontent.com/87026989/178038665-35086efd-7a41-4155-81c3-a26b8e4ba3b5.png">

- 와 콜백 지옥이 시작되었다!

## 지옥 탈출을 위한 Promise

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

<img width="221" alt="16" src="https://user-images.githubusercontent.com/87026989/178038709-46646535-871c-4c6a-8bc8-f89bb395e46d.png">

- 연결 연결 연결 이것을 프로미스 체이닝이라고 한다.
- 뎁스가 깊어지는 콜백 헬에 빠지지 않는다.

- 만약 실패하면???

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
      rej("손님 죄송한데 제가 음식을 다 엎었어요~! 야호!!");
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

<img width="364" alt="17" src="https://user-images.githubusercontent.com/87026989/178038743-4728fdb3-1d77-4cc2-8ede-e30c08be93fa.png">

- f2 에 일부러 실패 결과를 주었더니 f2 에서 종료된 것을 확인할 수 있었다. (3번 f3 이 실행되지 않았음)

## 한번에 받기 - Promise.all

- 만약 1초 짜리 2초 짜리 3초 짜리 음식을 동시에 주문했는데 총 6초가 나온다면??
    - 이게 무슨?
- 원래 식당의 순리는 3초때 한번에 나온다.
- 그렇게 만들어보자! 이 때 사용하는 것이 바로 **Promise.all**!

```jsx
// 상위 코드는 동일 ~

// Promise.all
console.time("x"); // 시간 재기
Promise.all([f1(), f2(), f3()]).then((res) => {
  console.log(res); // ["1번 손님 식사 가져가세요!", "2번 손님 식사 가져가세요!", "3번 손님 식사 가져가세요!"]
  console.timeEnd("x"); // 대략 3초
});
```

- 주의할 점은 하나라도 `reject` 결과가 나타나면 단 하나의 결과도 얻지 못한다.
- 하나의 정보라도 누락되었을 때 페이지를 보여주면 안되는 경우 사용한다.

## 경주하기 - Promise.race

```jsx
// 상위 코드는 동일 ~

// Promise.race
console.time("x"); // 시간 재기
Promise.all([f1(), f2(), f3()]).then((res) => {
  console.log(res); // "1번 손님 식사 가져가세요!"
  console.timeEnd("x"); // 대략 1초
});
```

- 말 그대로 경주다. 가장 빠른 값을 반환한다.
- f2 나 f3 에 reject 값이 존재하더라도, 가장 빠른 f1 의 값을 반환하고 종료하기 때문에 무시된다.
