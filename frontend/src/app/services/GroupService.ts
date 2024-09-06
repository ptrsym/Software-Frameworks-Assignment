import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";
import { Channel } from "../models/channel.model";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class GroupService {

    constructor() {}
    

    private currentlyViewedGroup = new BehaviorSubject<Group | null>(null);
    currentGroup$ = this.currentlyViewedGroup.asObservable();

    private channelsSubject = new BehaviorSubject<Channel[]>(this.getChannels());
    channels$ = this.channelsSubject.asObservable();



    private updateChannels(): void{
        const channels = this.getChannels();
        this.channelsSubject.next(channels);
    }

    getChannels(): Channel[] {
        const channels = localStorage.getItem('channels');
        return channels ? JSON.parse(channels): [];
    }


    addChannelToGroup(groupId: number, channelId: number): void{
        const group = this.currentlyViewedGroup.value;
        if (group) {
            const groups = JSON.parse(localStorage.getItem('groups') || '[]');
            const groupIndex = groups.findIndex((g: Group) => g.id === groupId);
            if (groupIndex !== -1) {
                if(!groups[groupIndex].channelId.includes(channelId)) {
                    groups[groupIndex].channelId.push(channelId);
                }
                this.setGroups(groups);
                this.setViewedGroup(groups[groupIndex]);
            }
        } else {
            console.error(`Group with ID ${groupId} not found`);
        }
    }

    removeChannelFromGroup(groupId: number, channelId: number): void {
        const group = this.currentlyViewedGroup.value;
        if (group) {
            const groups = JSON.parse(localStorage.getItem('groups') || '[]');
            const groupIndex = groups.findIndex((g: Group) => g.id === group.id);
            if (groupIndex !== -1) {
                groups[groupIndex].channelId = groups[groupIndex].channelId.filter((id: number) => id !== channelId);
                this.setGroups(groups);
                this.updateChannels();
            }
        }else {
            console.error(`Group with ID ${groupId} not found`)
        }
    }
    
    setViewedGroup (group: Group | null): void {
        this.currentlyViewedGroup.next(group);
    }

    approveApplication(userId: number): void {
        const group = this.currentlyViewedGroup.value;
        if (group) {
            const groups = JSON.parse(localStorage.getItem('groups') || '[]');
            const groupIndex = groups.findIndex((g: Group) => g.id === group.id);
            if (groupIndex !== -1) {
                groups[groupIndex].pendingUserId = group.pendingUserId.filter(id => id !== userId);
                if (!groups[groupIndex].memberId.includes(userId)) {
                    groups[groupIndex].memberId.push(userId);
                }
                this.setGroups(groups);
                this.currentlyViewedGroup.next(group);
            }
        }
    }

    rejectApplication(userId: number): void {
        const group = this.currentlyViewedGroup.value;
        if (group) {
            const groups = JSON.parse(localStorage.getItem('groups') || '[]');
            const groupIndex = groups.findIndex((g: Group) => g.id === group.id);
            if (groupIndex !== -1) {
                groups[groupIndex].pendingUserId = group.pendingUserId.filter(id => id !== userId);
            }
            this.setGroups(groups);
            this.currentlyViewedGroup.next(group);
        }
    }
        

    getGroups(): Group[] {
        const groups = localStorage.getItem('groups');
        return groups ? JSON.parse(groups) : [];
    }

    setGroups(groups: Group[]): void{
       localStorage.setItem('groups', JSON.stringify(groups));
    }

    getGroupByGroupId (id: number): Group |  undefined {
        return this.getGroups().find(group => group.id === id);
    }

    getObservableGroupByGroupId(groupId: number): Observable<Group> {
        const groups = JSON.parse(localStorage.getItem('groups') || '[]');
        const group = groups.find((g: Group) => g.id === groupId);
        return of(group);
      }


    getGroupsByUserId(userId: number): Group[] {
        const groups = this.getGroups();
        return groups.filter(group => group.memberId.includes(userId));
    }


    applyToGroup(groupId: number, applyingId: number): void {
        const groups = this.getGroups();
        const appliedGroupIndex = groups.findIndex(group => group.id === groupId); //find group by Id
        if (appliedGroupIndex !== -1){
            const appliedGroup = groups[appliedGroupIndex];
            if (!appliedGroup.pendingUserId.includes(applyingId) && !appliedGroup.memberId.includes(applyingId)) { //if not alreeady applied to or a member of
                appliedGroup.pendingUserId.push(applyingId); // add application 
                groups[appliedGroupIndex] = appliedGroup; // update the groups array
                this.setGroups(groups); // store updated groups
            }
        }
            
        }

    removeApplication(appliedGroupId: number, applyingId: number): void {
        const groups = this.getGroups();
        const appliedGroupIndex = groups.findIndex(group => group.id === appliedGroupId); //find group by Id

        if (appliedGroupIndex !== -1) {
            const appliedGroup = groups[appliedGroupIndex];
            //check if the applyingId exists in pending
            if (appliedGroup.pendingUserId.includes(applyingId)){       
                const applyingIdIndex = appliedGroup.pendingUserId.findIndex(id => id === applyingId);  // find the index of the applyingId in the pending array
                
                // remove the applyingId from the pending array
                appliedGroup.pendingUserId.splice(applyingIdIndex, 1);
                
                // update the groups array with the modified applied group
                groups[appliedGroupIndex] = appliedGroup;

                // save the groups array
                this.setGroups(groups);
            }
        }
    }


    leaveGroup(groupId: number, userId: number): void {
        const groups = this.getGroups();
        const groupIndex = groups.findIndex(group => group.id === groupId); //find group by Id

        if (groupIndex !== -1) {
            const groupToLeave = groups[groupIndex];

            if (groupToLeave.memberId.includes(userId)){
                
                const indexOfMember = groupToLeave.memberId.findIndex(id => id === userId);

                groupToLeave.memberId.splice(indexOfMember, 1);

                groups[groupIndex] = groupToLeave;

                this.setGroups(groups);

            }
    } 
    }


    leaveGroupAdmin(groupId: number, userId: number): void {
        const groups = this.getGroups();
        const groupIndex = groups.findIndex(group => group.id === groupId); //find group by Id

        if (groupIndex !== -1) {
            const groupToLeave = groups[groupIndex];

            if (groupToLeave.adminId.includes(userId)){
                
                const indexOfMember = groupToLeave.adminId.findIndex(id => id === userId);

                groupToLeave.adminId.splice(indexOfMember, 1);

                groups[groupIndex] = groupToLeave;

                this.setGroups(groups);
            }
    } 
    }

    createGroup(groupName: string, creatorId: number): boolean {
        if (this.validateGroupName(groupName)) {
            const groups = this.getGroups();
            const newGroup = new Group(
                this.findLowestGroupId(groups),
                groupName,
                [creatorId],
                [],
                [creatorId],
                []
            )
            groups.push(newGroup);
            this.setGroups(groups);
            return true;
        } else {
            return false;  
    }
    }

    deleteGroup(groupId: number): void {
        const groups = this.getGroups();
        const groupIndex = groups.findIndex(group => group.id === groupId); //find group by Id

        if (groupIndex !== -1) {
            groups.splice(groupIndex, 1);
            this.setGroups(groups);
        
    } 

}
    
    private findLowestGroupId(groups: Group[]) :number {
        let lowestId = 1;

        while (groups.some(group => group.id === lowestId)) {
            lowestId++;
        }
        return lowestId;
    }

    private validateGroupName (name: string) :boolean {
        const groups = this.getGroups();

        return !groups.some(group => group.name === name);
    }
}