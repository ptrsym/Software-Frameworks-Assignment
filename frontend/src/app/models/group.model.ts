export class Group {
    id: number;
    name: string;
    memberId: number[];
    pendingUserId: number[];
    adminId: number[];

    constructor (id: number, name: string,
        memberId: number[], pendingUserId: number[], adminId: number[]) {

        this.id = id;
        this.name = name;
        this.memberId = memberId;
        this.pendingUserId = pendingUserId;
        this.adminId = adminId;
    }
}