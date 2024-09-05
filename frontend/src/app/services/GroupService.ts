import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class GroupService {


    private currentlyViewedGroup = new BehaviorSubject<Group | null>(null);
    currentGroup$ = this.currentlyViewedGroup.asObservable();


    setViewedGroup (group: Group | null): void {
        this.currentlyViewedGroup.next(group);
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
        } else {console.log('error finding group to apply to')}
            
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
                console.log(`${applyingId} removed from group ${appliedGroupId} at index ${applyingIdIndex}`);
            }
        } else {console.log('error finding group being applyied to')}
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
                console.log (`${userId} left ${groupId} successfully`);
            }
    } else {console.log('error leaving group')}
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
                console.log (`${userId} is no longer admin of ${groupId}`);
            }
    } else {console.log(`error leaving group as admin - ${userId} not an admin of group`)}
    }

    createGroup(groupName: string, creatorId: number): boolean {
        if (this.validateGroupName(groupName)) {
            const groups = this.getGroups();
            const newGroup = new Group(
                this.findLowestGroupId(groups),
                groupName,
                [creatorId],
                [],
                [creatorId]
            )
            groups.push(newGroup);
            this.setGroups(groups);
            return true;
            console.log(`created new group ${groupName} with ${creatorId} as admin`);
        } else {
            console.log(`error creating group ${groupName} already exists`);
            return false;  
    }
    }

    deleteGroup(groupId: number): void {
        const groups = this.getGroups();
        const groupIndex = groups.findIndex(group => group.id === groupId); //find group by Id

        if (groupIndex !== -1) {
            groups.splice(groupIndex, 1);
            this.setGroups(groups);
            console.log(`deleted group ${groupId}`);
    } else {console.log('error deleting group')}

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