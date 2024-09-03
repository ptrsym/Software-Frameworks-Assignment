import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private router: Router, private userService: UserService) { }

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

    // method to find a user's roles based on their active token

    getRoles(): string[] {
        const encodedToken = sessionStorage.getItem('authToken');
        if (encodedToken) {
            const decodedToken = atob(encodedToken);
            const user = JSON.parse(decodedToken);
            return user.roles || [];
        }
        return [];
    }

    private findUser(username: string, password: string): User | undefined {
        return this.userService.getUsers().find(u => u.username === username && u.password === password);

    }

    // login handler
    login(username: string, password: string): void {
        const user = this.findUser(username, password);
        if (user) {
            const token = this.generateToken(user);
            sessionStorage.setItem('authToken', token);
            this.router.navigate(['/dashboard']);
        }
    }

    // logout handler
    logout(): void {
        sessionStorage.removeItem('authToken');
        this.router.navigate(['/login']);
    }



}