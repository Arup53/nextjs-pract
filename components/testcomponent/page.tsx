interface Testprop {
  name: string;
  age: number;
}

interface User {
  user: Testprop;
}

export default function Test({ user }: User) {
  return (
    <div>
      This is for testing types of typescript, {user.name} & {user.age}
    </div>
  );
}
