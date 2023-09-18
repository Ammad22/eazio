export class ShowBusyIndicator {
    static readonly type = '[Core] ShowBusyIndicator';

    constructor(public currentTask = 'Please wait...') {
    }
}

export class HideBusyIndicator {
    static readonly type = '[Core] HideBusyIndicator';

    constructor(public currentTask = '') {
    }
}

export class SetIsUserLogedIn {
    static readonly type = '[SetIsUserLogedIn] action';
    constructor(public IsUserLogedIn: boolean) { }
}