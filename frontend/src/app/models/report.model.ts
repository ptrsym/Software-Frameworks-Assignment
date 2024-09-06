// A schema for reports issued by GroupAdmins against users they have banned.

export class Report {

    id: number;
    issuerId: number;
    reportedId: number;
    description: string;
    ack: boolean;

    constructor (
        id: number,
        issuerId: number,
        reportedId: number,
        description: string,
        ack: boolean = false
        ) 
        {
            this.id = id;
            this.issuerId = issuerId;
            this.reportedId = reportedId;
            this.description = description;
            this.ack = ack;
        }
}