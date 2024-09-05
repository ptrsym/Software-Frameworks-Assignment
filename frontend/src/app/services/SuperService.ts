import { Injectable } from "@angular/core";
import { UserService } from "./UserService";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class SuperService {

    constructor(private userService: UserService) { }

    promoteUser(userId: number, role: string): void {

        // get userlist and find the index of the user in the list with the id
        const users = this.userService.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        // error if not found (shouldn't)
        if (userIndex === -1) {
            throw new Error('user not found');
        }

        // add the new role only if the role doesnt already exist
        const user = users[userIndex];
        if (!user.roles.includes(role)) {
            user.roles.push(role);
        }

        // replace the entry in the users array with the updated user and store it
        users[userIndex] = user;
        this.userService.setUsers(users);
    }

    demoteUser(userId: number): void {
        const users = this.userService.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            throw new Error('user not found');
        }

        const user = users[userIndex];
        user.roles = user.roles.filter(role => role !== 'GroupAdmin');

        users[userIndex] = user;
        this.userService.setUsers(users);
    }

    deleteUser(userId: number): void {
        let users = this.userService.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            throw new Error('user not found');
        }
        users.splice(userIndex, 1);
        this.userService.setUsers(users);
    }
}