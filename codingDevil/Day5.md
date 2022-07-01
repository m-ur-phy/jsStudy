# 2장 - 생성자 함수

## 생성자 함수?

- 비슷한 객체를 여러 개 만들어야 하는 상황에 사용하는 것이 바로 **생성자 함수**
- 생성자 함수는 첫글자를 대문자로 해주는 것이 관례이다

<aside>
📎 생성자 함수는 붕어빵 틀이나 와플 팬이라고 생각하면 된다

생성되는 객체들이 바로 와플과 붕어빵

</aside>

### 예제

```jsx
// 생성자 함수 : 상품 객체를 생성해보자

function Item(title, price) {
  // this = {}; -> new 로 호출하면 실행되는 알고리즘
  this.title = title;
  this.price = price;
  this.showPrice = function () {
    console.log(`가격은 ${price}원 입니다.`);
  };

  // return this; -> new 로 호출하면 실행되는 알고리즘
}

const item1 = new Item("인형", 3000);
const item2 = new Item("가방", 4000); 
const item3 = new Item("지갑", 9000);

console.log(item1, item2, item3);

item3.showPrice();
```

### 결과
<img width="644" alt="1" src="https://user-images.githubusercontent.com/87026989/176913170-3b987d68-1b57-425c-9c5d-f8d2456abee3.png">

객체가 잘 생성되었고, item.showPrice(); 가 잘 호출된 것을 확인할 수 있다.

만약, 호출 시 new 를 붙이지 않는다면?

```jsx
const item1 = new Item("인형", 3000); // new 를 붙여주지 않았다 === 단순히 객체를 호출할 뿐임 Undefined
```

<img width="644" alt="2" src="https://user-images.githubusercontent.com/87026989/176913214-32bf536d-dba3-4ea6-b02f-ebc80a33efdd.png">


undefined 결과가 나타난다.

그 이유는 new 로 호출하면 실행되는 알고리즘

`this = {};` 와

`return this;`

가 실행되지 않기 때문이다.

즉, 단순히 객체 만을 호출하는 것이고 return 값이 없어 undefined 의 결과가 나타난 것이다.

# 3장 - 객체 메소드(Object methods), 계산된 프로퍼티(Computed property)

## Computed property?

```jsx
let a = 'age';

const user = {
	name : 'Mike',
	age : 30
}
```

- 왼쪽의 age 키 대신, 변수 a에 저장된 값을 대괄호로 묶어서 불러와 사용할 수도 있다.
- 이것을 바로 **Computed property (계산된 프로퍼티)** 라고 부른다.

```jsx
const user = {
	[1 + 4] : 5,
	["안녕"+"하세요"] : "Hello"
}
```

- key 값에 식 자체를 넣는 것도 가능하다

## 객체에서 사용하는 메소드

### `Object.assign()` : 객체 복제

```jsx
const user = {
	name : 'Mike',
	age : 30
}

const newUser = Object.assign({}, user); // 객체 동일하게 복제하기
```

- 단순히 `const cloneUser = user;` 을 하게되면 객체가 복사되는 것이 아니라 그 참조 값만 복사 된다. 그리고 또한 프로퍼티 수정 시 cloneUser 의 값을 수정해 주었을 때, user 의 값도 수정되는 경우가 발생하게 된다.
- `Object.assign({}, user);` 이런식으로 복제하게 되면 `{ }` 의 빈 객체에 `user` 가 병합되므로 객체 자체를 동일하게 복제할 수 있다.
- 이렇게 생성된 복제 객체는 이전의 user 객체와 같지 않다. 즉 새로운 newUser 객체인 것이다.
- `newUser != user`

```jsx
const user = {
	name : 'Mike'
}

const info1 = {
	age : 30,
}

const info2 = {
	gender : 'male',
}

Object.assign(user, info1, info2)
```

- 두 개 이상의 객체도 합칠 수 있다.
- user 에 info1, info2 를 합쳐준다

### `Object.keys()` : 키 배열 반환

```jsx
const user = {
  name: "Mike",
  age: 30,
  gender: "male"
};

Object.keys(user); // ["name", "age", "gender"]
```

- key 값을 배열로 반환한다.

### `Object.values()` : 값 배열 반환

```jsx
const user = {
  name: "Mike",
  age: 30,
  gender: "male"
};

Object.values(user); // ["Mike", 30, "male"]
```

- value 값을 배열로 반환한다.

### `Object.entries()` : 키 / 값 배열 반환

```jsx
const user = {
  name: "Mike",
  age: 30,
  gender: "male"
};

Object.entries(user); // [["name", "Mike"], ["age", 30], ["gender", "male"]]
```

- key : value 쌍을 전부 배열로 반환한다.

### `Object.fromEntries()` : 키/값 배열을 객체로

```jsx
const arr = 
[
		["name", "Mike"], 
		["age", 30], 
		["gender", "male"]
];

Object.fromEntries(arr); // { name: "Mike", age: 30, gender: "male" }
```

- key : value 쌍의 배열을 전부 객체로 반환한다.

### computed property 예제

```jsx
function makeObj(key, val) {
  return {
    [key]: val
  };
}

const obj = makeObj("성별", "male");

console.log(obj); // {성별: "male"}
```

- 어떤것이 key 가 될지 모르는 객체를 만들 때 유용하다.

# 4장 - 심볼(Symbol)

## Symbol?

- 객체 프로퍼티 key 값은 문자형과 심볼 두 가지를 이용해서 만들 수 있다.
- Symbol 은 **유일한 식별자**를 만들 때 사용한다.
    - **유일성**이 보장된다.
    - 즉, 전체 코드중 딱 하나

```jsx
const a = Symbol(); // new를 붙이지 않는다
const b = Symbol();

console.log(a) // Symbol()
console.log(b) // Symbol()
```

- 왼쪽 예제에서와 같이 console로 a 와 b 에 할당된 값을 확인해보면 둘 다 Symbol() 로 같아보인다.
- 그러나 연산자를 이용해서 확인해보면 다른 값인 것을 알 수 있다.

```jsx
const id = Symbol('id');
const user = {
	name : 'Mike',
	age : 30,
	[id] : 'my id'
}

user // {name: "Mike", age: 30, Symbol(id): "myid"}
user[id] // "myid"
```

- 다음의 코드를 입력 했을 때, Symbol 형의 프로퍼티 key 가 제대로 나오는 것을 알 수 있다.
- 그러나 객체에서 사용하는 메서드 `Object.keys(user);` 등을 사용하면 프로퍼티 값은 나타나지 않는다.
- 이러한 특성은 특정 객체의 원본 데이터는 건드리지 않고 프로퍼티를 추가할 수 있다.

## `Symbol.for()` : 전역 심볼

- 전역 변수처럼 이름이 같을 시 같은 객체를 가르켜야 할 때 사용하는 전역 심볼
- 하나의 심볼만 보장받을 수 있음
- 없으면 만들고, 있으면 가져오기 때문이다.
- Symbol 함수는 매번 다른 Symbol 값을 생성하지만, Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol 을 공유한다.

```jsx
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

id1 === id2; // true

Symbol.keyFor(id1) // "id" 
```

- 전과 달리 동등한 값임을 알 수 있다
- keyFor 을 이용하면 생성 시 적어주었던 이름을 알 수 있다. (전역 심볼로 생성된 값만)

### 일반 심볼의 이름을 알고 싶다면?

```jsx
const id = Symbol('id 입니다.')

id.description; // "id 입니다."
```

- `.description` 이용

## 숨겨진 Symbol key 보는 법

```jsx
const id = Symbol('id');
const user = {
	name : 'Mike',
	age : 30,
	[id] : 'myid'
}

Object.getOwnPropertySymboles(user); // [Symbol(id)]
Reflect.ownKeys(user); // ["name", "age", Symbol(id)]
```

- `Object.getOwnPropertySymboles()` → 숨겨진 Symbol key 만
- `ownKeys()` → 숨겨진 Symbol 을 포함한 객체의 모든 키를 보여줌
- 대부분의 라이브러리는 이러한 메서드를 사용하지 않으니 마음 편하게 유일한 식별자를 만들기 위해 심볼을 사용하자

### Symbol 예제

```jsx
const user = {
  name: "Mike",
  age: 30
};

// 내가 작업
// user.showName = function () {}; -> 결과 값이 His showName is function () {}. 죨라 엉망~
const showName = Symbol("show name");
user[showName] = function () {
  console.log(this.name);
};

user[showName]();

// 사용자가 접속하면 보는 메세지
for (let key in user) {
  console.log(`His ${key} is ${user[key]}.`);
}
```

### 결과

<img width="318" alt="3" src="https://user-images.githubusercontent.com/87026989/176913321-aa2a3735-1381-451f-8c0c-eaca696b169b.png">

- 심볼로 추가한 메소드는 숨겨지고, 다른 사람의 코드를 침범하지도 않는다.
- 심볼을 사용하는 이유가 바로 이 때문이다.
