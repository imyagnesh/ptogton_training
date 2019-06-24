const a = { a: 1, b: 2, c: 3, d: { p: 1, q: 2, r: 3 } };

// a.d = 4;

// const b = {...a, c: 2}

// for (const key in x) {
//     console.log(key);
//     if(key === 'a') {
//         delete x[key]
//     }
// }

// console.log(x)

const {
  d: { q: y },
  ...props
} = a;

console.log(y);

console.log(props);

// const add = () => {
//     return params.reduce((previous, current) => {
//         return previous + current;
//     }, 0);

//     // let sum  = 0;

//     // for (let index = 0; index < params.length; index++) {
//     //     const element = params[index];
//     //     sum += element;

//     // }

//     // return sum;
// }

// console.log(add(1,2,3, 4, 5, 6, 7, 9));

const users = [
  {
    FN: "yagnesh",
    LN: "modh",
    gender: "male"
  },
  {
    FN: "rohit",
    LN: "sharmaa",
    gender: "male"
  },
  {
    FN: "dipika",
    LN: "padukone",
    gender: "female"
  }
];

const newUser = {
  FN: "Virat",
  LN: "Kohli",
  gender: "male"
};

const newUsers = [newUser, ...users];

const index = newUsers.findIndex(x => x.LN === "sharmaa");

console.log(index);

const updatedUsers = [
  ...newUsers.slice(0, index),
  { ...newUsers[index], LN: "sharma" },
  ...newUsers.slice(index + 1)
];
console.log(updatedUsers);

console.log(newUsers);

const users = [
  {
    FN: "yagnesh",
    LN: "modh",
    gender: "male"
  },
  {
    FN: "rohit",
    LN: "sharmaa",
    gender: "male"
  },
  {
    FN: "dipika",
    LN: "padukone",
    gender: "female"
  }
];

const newUser = {
  FN: "Virat",
  LN: "Kohli",
  gender: "male"
};

const newUsers = [newUser, ...users];

const index = newUsers.findIndex(x => x.LN === "sharmaa");

console.log(index);

const updatedUsers = [
  ...newUsers.slice(0, index),
  ...newUsers.slice(index + 1)
];

const newUsers1 = newUsers.filter(x => x.FN !== "rohit");

console.log(newUsers1);

console.log(updatedUsers);

console.log(newUsers);

const users = [
  {
    FN: "yagnesh",
    LN: "modh",
    gender: "male"
  },
  {
    FN: "rohit",
    LN: "sharmaa",
    gender: "male"
  },
  {
    FN: "dipika",
    LN: "padukone",
    gender: "female"
  },
  {
    FN: "Virat",
    LN: "Kohli",
    gender: "male"
  }
];

const newUsers = users.map(x => {
  if (x.gender === "male") {
    return { ...x, fullName: `${x.FN} ${x.LN}` };
  }
  return x;
});

console.log(newUsers);

const newUsers = users.map(x => {
  if (x.gender === "male") {
    return { ...x, fullName: `${x.FN} ${x.LN}` };
  }
  return x;
});

console.log(newUsers);

const groupBy = (data, itemName) => {
  return data.reduce((previous, current) => {
    (previous[current[itemName]] = previous[current[itemName]] || []).push(
      current
    );
    return previous;
  }, {});
};

console.log(groupBy(users, "gender"));

const a = 1;

const x = {
  a,
  b: 2,
  c() {
    return this.a + this.b;
  }
};

console.log(x.c());

class Animal {
  constructor(type = "animal") {
    this.type = type;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value.toUpperCase();
  }

  makeSound() {
    setTimeout(() => {
      console.log(this.type);
    }, 100);
  }
}

const a = new Animal();
console.log(a.type);
console.log(a.makeSound());

function* add() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

const gen = add();

for (const x of gen) {
  console.log(x);
}

const a = { a: 1, b: 2, c: 3 };

const b = [1, 2, 3, 4];

for (const [key, value] of Object.entries(a)) {
  console.log(key);
  console.log(value);
}
