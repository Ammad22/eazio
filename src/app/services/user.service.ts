import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UserInfo } from '../models/userInfo';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly userKey = 'user';

    saveUser(user: UserInfo, password: string) {
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'encryption-secret-key').toString();
        const userWithEncryptedPassword = { ...user, confirmPassword: encryptedPassword, password: encryptedPassword };
        localStorage.setItem(this.userKey, JSON.stringify(userWithEncryptedPassword));
    }

    getUser() {
        const userString = localStorage.getItem(this.userKey);
        if (userString) {
            const user: UserInfo = JSON.parse(userString);
            // Decrypt the password when retrieving it
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'encryption-secret-key').toString(CryptoJS.enc.Utf8);
            return { ...user, password: decryptedPassword, confirmPassword: decryptedPassword };
        }
        return null;
    }

    removeUser() {
        localStorage.removeItem(this.userKey);
    }
}
