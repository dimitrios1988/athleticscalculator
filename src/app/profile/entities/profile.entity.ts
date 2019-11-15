export class ProfileEntity {

    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;

    constructor(firstName, lastName, email) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;

    }
}