import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "./UserService";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private router: Router, private userService: UserService) { }

    //setup and observable for the current user's role
    private currentUserRoleSubject = new BehaviorSubject<string | null> (null);
    userRole$ = this.currentUserRoleSubject.asObservable();


    // flag to check if a user is logged in
    isAuthenticated(): boolean {
        return !!sessionStorage.getItem('authToken');
    }

    //simulated token for phase 1 implementation
    private generateToken(user: any): string {
        const payload = JSON.stringify({
            id: user.id,
            username: user.username,
            roles: user.roles
        });
        return btoa(payload);
    }

    //find a user's roles based on their active token

    getRoles(): string[] {
        const encodedToken = sessionStorage.getItem('authToken');
        if (encodedToken) {
            const decodedToken = atob(encodedToken);
            const user = JSON.parse(decodedToken);
            return user.roles || [];
        }
        return [];
    }

    getUserById(): User | undefined {
        const encodedToken = sessionStorage.getItem('authToken');
       if (encodedToken) {
            try {
                const decodedToken = atob(encodedToken);
                const user = JSON.parse(decodedToken);
                const id = user.id;
                const usersString = localStorage.getItem('users');
                const usersObject = usersString ? JSON.parse(usersString) : [];
                return usersObject.find((u: User) => u.id === id);
            } catch (error) {
                console.error('Error decoding token or parsing users:', error);
                return undefined;
            }
        }
        return undefined;
    }

    // get the user roles and return the highest permission of the active token

    getPermissions(): string {
        const roles = this.getRoles();
        const permissionPrio = ['SuperAdmin', 'GroupAdmin', 'user']
        for (const permission of permissionPrio) {
            if (roles.includes(permission)) {
                return permission;
            }
            }
        return 'user';
        }
    
    //helper function for login to find a user from storage

    private findUser(username: string, password: string): User | undefined {
        return this.userService.getUsers().find(u => u.username === username && u.password === password);

    }

    // login handler store a token and redirect to dash on login

    login(username: string, password: string): boolean {
        const user = this.findUser(username, password);
        if (user) {
            const token = this.generateToken(user);
            sessionStorage.setItem('authToken', token);
            const userRole = this.getPermissions();
            this.currentUserRoleSubject.next(userRole);
            return true;
        }
        return false;
    }

    // logout handler
    logout(): void {
        sessionStorage.removeItem('authToken');
        this.currentUserRoleSubject.next(null);
        this.router.navigate(['/login']);
    }



}