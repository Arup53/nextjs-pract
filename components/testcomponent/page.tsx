interface Testprop {
  name: string;
  age: number;
}

interface User {
  user: Testprop;
}

export default function Test({ user: { name, age } }: User) {
  return (
    <div>
      This is for testing types of typescript, {name} & {age}
    </div>
  );
}
