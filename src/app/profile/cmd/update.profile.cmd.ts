export class UpdateProfileCmd {
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  Password?: string;

  constructor(data: {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    email: string;
  }) {
    if (!!data) {
      this.FirstName = data.firstName;
      this.LastName = data.lastName;
      this.Username = data.username;
      this.Email = data.email;
      this.Password = data.password;
    }
  }
}
