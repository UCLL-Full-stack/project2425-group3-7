import { User } from "../../model/user";

test("given: valid values for review, when: review is created, then: review is created with those values", () => {
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
    });

    // then
    expect(user.getUsername()).toEqual("slimmerik");
    expect(user.getFirstName()).toEqual("Slimme");
    expect(user.getLastName()).toEqual("Rik");
    expect(user.getEmail()).toEqual("slimme.rik@gmail.com");
    expect(user.getBirthday()).toEqual(birthday);
    expect(user.getPassword()).toEqual("Slimme-Rik123");
});