import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";
import { BehaviorSubject } from "rxjs";

Injectable({
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

    getGroupById (id: number): Group | undefined {
        const groups = this.getGroups();
        return groups.find(group => group.id === id);
    }


}