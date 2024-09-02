export class Channel {
    id: number;
    name: string;
    bannedId: number[];
    groupId: number;

    constructor(id: number, name: string, bannedId: number[], groupId: number) {
        this.id = id;
        this.name = name;
        this.bannedId = bannedId;
        this.groupId = groupId;   
    }
}