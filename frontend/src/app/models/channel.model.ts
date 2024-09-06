export class Channel {
    id: number;
    name: string;
    bannedId: number[];
    groupId: number;
    activeUsers: number[];

    constructor(id: number, name: string, bannedId: number[], groupId: number, activeUsers: number[] = []) {
        this.id = id;
        this.name = name;
        this.bannedId = bannedId;
        this.groupId = groupId;
        this.activeUsers = activeUsers;   
    }
}