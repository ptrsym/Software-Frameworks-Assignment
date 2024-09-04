export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    roles: string[];
    groups: number[];

    constructor (
      id: number,
      username: string, 
      email: string,
      password: string, 
      roles: string[] = ['user'], 
      groups: number[] = [], 
      profilePicture: string = ''
   ) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.roles = roles;
            this.groups = groups;
            this.profilePicture = profilePicture;
         }

}