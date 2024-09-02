export class Group {
    id: number;
    name: string;
    members: string[];
    applications: string[];
    admins: string[];

    constructor (id: number, name: string,
        members: string[], applications: string[], admins: string[]) {

        this.id = id;
        this.name = name;
        this.members = members;
        this.applications = applications;
        this.admins = admins;
    }
}