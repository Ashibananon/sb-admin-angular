import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserService } from '@modules/auth/services';
import { User } from "@modules/auth/models";

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private userService: UserService) {}
    ngOnInit() {}

    doLogin(userid: string, password: string): void {
        this.userService.doLogin(userid, password);
    }
}
