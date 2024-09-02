export class Group {
    id: number;
    name: string;
    memberId: number[];
    userAppId: number[];
    adminId: number[];

    constructor (id: number, name: string,
        memberId: number[], userAppId: number[], adminId: number[]) {

        this.id = id;
        this.name = name;
        this.memberId = memberId;
        this.userAppId = userAppId;
        this.adminId = adminId;
    }
}