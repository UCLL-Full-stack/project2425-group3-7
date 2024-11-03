export class User {
    private id?: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private birthday: Date;
    private password: string;

    constructor(user:{id?: number, username: string, firstName: string, lastName: string, email: string, birthday: Date, password: string}) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.birthday = user.birthday;
        this.password = user.password;

    }
    validate(user:{username: string, firstName: string, lastName: string, email: string, birthday: Date, password: string}){
        if (!user.username || user.username.length === 0) {
            throw new Error('Username is required');
        }
        if (!user.firstName || user.firstName.length === 0) {
            throw new Error('First name is required');
        }
        if (!user.lastName || user.lastName.length === 0) {
            throw new Error('Last name is required');
        }
        if (!user.email || user.email.length === 0) {
            throw new Error('Email is required');
        }
        if (!user.birthday) {
            throw new Error('Birthday is required');
        }
        if (!user.password || user.password.length === 0) {
            throw new Error('Password is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
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