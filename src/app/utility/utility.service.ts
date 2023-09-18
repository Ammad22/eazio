import { Injectable, ElementRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ShowBusyIndicator, HideBusyIndicator, SetIsUserLogedIn } from '../actions/global.actions';
import { GlobalState } from '../state/global.state';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    @Select(GlobalState.GetIsUserLogedIn) IsUserLogedIn$: Observable<boolean>;

    intervalIds: number[] = [];
    timeout: number = 2000;
    isClosedAllIntervals: boolean = false;

    constructor() {
    }

    stopAllIntervals(): boolean {
        this.timeout = 10000;
        this.isClosedAllIntervals = true;
        return this.isClosedAllIntervals;
    }

    setSessionStorage(key, value) {
        if (typeof value === 'string') {
            sessionStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    getSessionStorage(key, parse?: boolean) {
        const value = sessionStorage.getItem(key);
        if (parse) {
            return JSON.parse(value);
        } else {
            return value;
        }
    }

    setLocalStorage(key, value, stringify?: boolean) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    getLocalStorage(key, parse?: boolean) {
        const value = localStorage.getItem(key);
        if (parse) {
            return JSON.parse(value);
        } else {
            return value;
        }
    }

    showBusyIndicator(store: Store, message = 'Please wait...') {
        setTimeout(() => {
            store.dispatch(new ShowBusyIndicator(message));
        });
    }

    hideBusyIndicator(store: Store, message = '') {
        setTimeout(() => {
            store.dispatch(new HideBusyIndicator(message));
        });
    }
    IsUserLogedIn(store: Store, state: boolean) {
        setTimeout(() => {
            store.dispatch(new SetIsUserLogedIn(state));
        });
    }

    clearAllLocalStorage() {
        localStorage.clear();
    }
}
