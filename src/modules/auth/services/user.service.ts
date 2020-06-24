import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable(
    {providedIn: 'root'}
)
export class UserService {
    private static LOGIN_URL: string = "/auth/login";
    private static LOGOUT_URL: string = "/auth/logout";
    private static REGISTER_URL: string = "/auth/register";

    constructor(private httpclient: HttpClient) {
    }

    private set user(user: User) {
        if (user.id.length > 0 && user.sessionId.length > 0) {
            user.isLogin = true;
        } else {
            user.isLogin = false;
        }
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }

    private serializeUser(user: User | null): void {
        if (user == null) {
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_firstName");
            localStorage.removeItem("user_lastName");
            localStorage.removeItem("user_email");
            localStorage.removeItem("user_sessionId");
        } else {
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("user_firstName", user.firstName);
            localStorage.setItem("user_lastName", user.lastName);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_sessionId", user.sessionId);
        }
    }

    private deserializeUser(): User {
        let u: User = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            sessionId: "",
            isLogin: false
        };

        let user_id: string | null = localStorage.getItem("user_id");
        let user_firstName: string | null = localStorage.getItem("user_firstName");
        let user_lastName: string | null = localStorage.getItem("user_lastName");
        let user_email: string | null = localStorage.getItem("user_email");
        let user_sessionId: string | null = localStorage.getItem("user_sessionId");

        u.id = (user_id == null ? "" : user_id);
        u.firstName = (user_firstName == null ? "" : user_firstName);
        u.lastName = (user_lastName == null ? "" : user_lastName);
        u.email = (user_email == null ? "" : user_email);
        u.sessionId = (user_sessionId == null ? "" : user_sessionId);

        return u;
    }

    public doLogin(userid: string, password: string): void {
        this.httpclient.post(UserService.LOGIN_URL,);
        let u: User = {
            id: userid,
            firstName: userid,
            lastName: "Test",
            email: "",
            sessionId: "aaaaa",
            isLogin: false
        };

        this.serializeUser(u);
        this.user = u;
    }

    public doLogout(): void {
        let u: User = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            sessionId: "",
            isLogin: false
        };

        this.serializeUser(null);
        this.user = u;
    }

    public getDefaultUser(): void {
        this.user = this.deserializeUser();
    }
}
