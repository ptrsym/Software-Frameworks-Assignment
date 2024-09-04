import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";

Injectable({
    providedIn: 'root',
})

export class GroupService {


    getGroups(): Group[] {
        const groups = localStorage.getItem('groups');
        return groups ? JSON.parse(groups) : [];
    }

    getGroupById (id: number): Group | undefined {
        const groups = this.getGroups();
        return groups.find(group => group.id === id);
    }


}