import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor() { }

    // flag to check if a user is logged in

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem('authToken');
    }

    // login handler

    login(token: string): void {
        sessionStorage.setItem('authToken', token);
    }


    // logout handler

    logout(): void {
        sessionStorage.removeItem('authToken');
    }



}