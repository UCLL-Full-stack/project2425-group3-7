export class User {
    private id?: number;
    private username: string;
    private name: string;
    private email: string;
    private birthday: Date;
    private password: string;

    constructor(user:{id?: number, username: string, name: string, email: string, birthday: Date, password: string}) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.birthday = user.birthday;
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

    getBirthday(): Date {
        return this.birthday;
    }

    getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.birthday === user.getBirthday() &&
            this.password === user.getPassword()
        );
    }
}