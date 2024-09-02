export class Channel {
    id: number;
    name: string;
    banlist: string[];
    groupId: number;

    constructor(id: number, name: string, banlist: string[], groupId: number) {
        this.id = id;
        this.name = name;
        this.banlist = banlist;
        this.groupId = groupId;   
    }
}