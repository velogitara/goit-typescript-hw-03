import { constructors } from './../node_modules/@web/dev-server-core/src/dom5/modification';
// У цьому завдання вам належить реалізувати сценарій життя, де людина, ключ і будинок взаємодіють один з одним.

// Ключ (Key): Створіть клас Key. У нього має бути одна приватна властивість signature, яка генерується випадково при створенні об'єкта цього класу (наприклад Math.random()).
//  Також цей клас повинен мати метод getSignature, який повертає значення властивості signature.✅

// Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу Key і зберігає їх у приватному властивості key.✅
//  Клас Person повинен мати метод getKey, який повертає збережений ключ.

// Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door, яка може бути відкрита (true), або закрита (false),✅
// і key, яка зберігає об'єкт класу Key. ✅
// У цьому класі також повинен бути метод comeIn, який додає об'єкт класу Person у масив tenants,
//  якщо door відкрита. Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor, який приймає об'єкт класу Key.

// Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House. Реалізуйте метод openDoor у цьому класі.
//  Якщо ключ, переданий цьому методу, збігається з ключем, збереженим як key, то двері відчиняються.

// Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій, в якому людина приходить додому.

// Наприклад, ось так:

class Key {
    private signature: number;
    private constructor(signature?: number) {
        this.signature = signature ?? Math.random();
        console.log('🔑 Ключ создан с подписью:', this.signature);
    }
    static createKey(): Key {
        return new Key(); // Статичний метод для створення нового ключа
    }

    static cloneFromKey(originalKey: Key): Key {
        // создаём подделку с той же подписью
        return new Key(originalKey.getSignature());
    }

    getSignature(): number {
        return this.signature;
    }
}
class Person {
    private key: Key;
    constructor(key: Key) {
        this.key = key;
    }
    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    door: boolean = false;
    key: Key;
    tenants: Person[] = [];

    constructor(key: Key) {
        this.key = key;
    }

    comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
            console.log('Person has come in!');
        } else {
            console.log('Door is closed!');
        }
    }
    getTenants(): Person[] {
        return this.tenants;
    }
    abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    constructor(key: Key) {
        super(key); // Передаём ключ в родительский конструктор
    }

    openDoor(key: Key): void {
        if (key === this.key) {
            this.door = true;
            console.log('Door is now open.');
        } else {
            this.door = false;
            console.log('Wrong key!');
        }
    }
}

// 🎬 Симуляция "жизни"
const key = Key.createKey();
const person = new Person(key);
const house = new MyHouse(key);
house.openDoor(person.getKey());
house.comeIn(person);

const clonedKey = Key.cloneFromKey(key); // 🧑‍🎤 ключ-подделка
const stranger = new Person(clonedKey);

house.openDoor(stranger.getKey()); // ❌ Wrong key!
house.comeIn(stranger); // ❌ не пустят

console.log('Tenants in the house:', house.getTenants());

export {};
