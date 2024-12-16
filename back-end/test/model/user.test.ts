import { User } from "../../model/user";

test("given: valid values for user, when: user is created, then: user is created with those values", () => {
    // given
    const birthday = new Date("2000-01-01");

    // when
    const user = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
        role: "user",
        reviews: [],
    });

    // then
    expect(user.getUsername()).toEqual("slimmerik");
    expect(user.getFirstName()).toEqual("Slimme");
    expect(user.getLastName()).toEqual("Rik");
    expect(user.getEmail()).toEqual("slimme.rik@gmail.com");
    expect(user.getBirthday()).toEqual(birthday);
    expect(user.getPassword()).toEqual("Slimme-Rik123");
});

test("given: missing username, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "",
            firstName: "Slimme",
            lastName: "Rik",
            email: "slimme.rik@gmail.com",
            birthday: new Date("2000-01-01"),
            password: "Slimme-Rik123",
            role: "user",
            reviews: [],
        });
    }).toThrow("Username is required");
});

test("given: missing first name, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "slimmerik",
            firstName: "",
            lastName: "Rik",
            email: "slimme.rik@gmail.com",
            birthday: new Date("2000-01-01"),
            password: "Slimme-Rik123",
            role: "user",
            reviews: [],
        });
    }).toThrow("First name is required");
});

test("given: missing last name, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "slimmerik",
            firstName: "Slimme",
            lastName: "",
            email: "slimme.rik@gmail.com",
            birthday: new Date("2000-01-01"),
            password: "Slimme-Rik123",
            role: "user",
            reviews: [],
        });
    }).toThrow("Last name is required");
});

test("given: missing email, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "slimmerik",
            firstName: "Slimme",
            lastName: "Rik",
            email: "",
            birthday: new Date("2000-01-01"),
            password: "Slimme-Rik123",
            role: "user",
            reviews: [],
        });
    }).toThrow("Email is required");
});

test("given: missing birthday, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "slimmerik",
            firstName: "Slimme",
            lastName: "Rik",
            email: "slimme.rik@gmail.com",
            birthday: null as any,
            password: "Slimme-Rik123",
            role: "user",
            reviews: [],
        });
    }).toThrow("Birthday is required");
});

test("given: missing password, when: user is created, then: an error is thrown", () => {
    expect(() => {
        new User({
            username: "slimmerik",
            firstName: "Slimme",
            lastName: "Rik",
            email: "slimme.rik@gmail.com",
            birthday: new Date("2000-01-01"),
            password: "",
            role: "user",
            reviews: [],
        });
    }).toThrow("Password is required");
});
