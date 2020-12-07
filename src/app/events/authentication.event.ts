export class AuthenticationEvent {

    constructor(public isLogin: boolean, public isLogout: boolean = false) {}
    public isValid(): boolean {
        return this.isLogin !== this.isLogout;
    }
}