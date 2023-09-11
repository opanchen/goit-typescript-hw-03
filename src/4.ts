class Key {
  private signature: number;

  constructor() {
    this.signature = Math.floor(Math.random() * 10);
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: true | false;
  protected key: Key;
  private tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
    this.door = false;
  }

  comeIn(guest: Person): void {
    if (this.door) {
      this.tenants.push(guest);
      console.log("Welcome!\n Be careful, buddy. Close and lock the door");
      this.door = false;
    } else {
      console.log("Can't come in. The door is closed.");
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Open.");
    } else {
      console.log("Wrong key.");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

const anotherKey = new Key();
const stranger = new Person(anotherKey);

house.openDoor(stranger.getKey());
house.comeIn(stranger);

export {};
