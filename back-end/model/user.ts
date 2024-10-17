export class User {
    private id?: number;
    private username: string;
    private name: string;
    private email: string;
    private age: number;
    private password: string;

    constructor(user:{id?: number, username: string, name: string, email: string, age: number, password: string}) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getAge(): number {
        return this.age;
    }

    getPassword(): string {
        return this.password;
    }
}