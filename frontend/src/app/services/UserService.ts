import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor() { }


    getUsers(): User[] {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers): [];
    }

    getUserById(userId: number): User | undefined {
        const usersString = localStorage.getItem('users');
        const usersObject = usersString ? JSON.parse(usersString) : []
        return usersObject.find((u: User) => u.id === userId);
    }

    //updates local stroage with latest users
    setUsers(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    updateUser(newUser: User): void {
        const users = this.getUsers();
        users.push(newUser);
        this.setUsers(users);
    }

    findLowestUserId(): number {
        const users = this.getUsers();
        const userIds = users.map(user => user.id);
        let lowestId = 1;
        while (userIds.includes(lowestId)) {
            lowestId++;
        }
        return lowestId;
    }

    createUser(username: string, email: string, password: string): void{
        const newUser = new User (
            this.findLowestUserId(),
            username,
            email,
            password,
        );
        this.updateUser(newUser);
        console.log(`${newUser.username} added`);
    }

    getUserNameById(id: number): string{
        const users = this.getUsers();
        const user = users.find(u => u.id === id);
        if (user){
            return user.username;
        } else 
        {console.log(`can't find user${id}`)};
        return 'unknown user';
    }



}