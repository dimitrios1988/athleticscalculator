export class User {

    Id: number;

    FirstName: string;

    LastName: string;

    Email: string;

    Status: string;

    constructor(firstName, lastName, email) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;

    }
}