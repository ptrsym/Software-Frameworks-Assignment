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

}