export class RegisterUserCmd {
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Password: string;

    constructor(data: {
        FirstName: string,
        LastName: string,
        Username: string,
        Email: string,
        Password: string,
    }) {
        if (!!data) {
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.Email = data.Email;
            this.Username = data.Username;
            this.Password = data.Password;
        }
    }
}