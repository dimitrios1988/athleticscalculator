export class ProfileEntity {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;

  constructor(firstName, lastName, email, username) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Username = username;
  }
}
