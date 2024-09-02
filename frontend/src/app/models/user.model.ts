export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: string[];
    groups: string[];

    constructor (id: number, username: string, email: string,
         password: string, roles: string[], groups: string[]) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.roles = roles;
            this.groups = groups;
         }

}