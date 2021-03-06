/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

export interface IUserFragment {
    userID: number;
    name: string;
    photoUrl: string;
    dateLastActive: string | null;
}

export interface IUser extends IUserFragment {
    email: string;
    emailConfirmed: boolean;
    showEmail: boolean;
    bypassSpam: boolean;
    banned: number;
    dateInserted: string;
    dateUpdated: string | null;
    roles: [
        {
            roleID: number;
            name: string;
        }
    ];
    hidden: boolean;
    rankID?: number | null;
    rank?: {
        rankID: number;
        name: string;
        userTitle: string;
    };
}

export interface IRequestPasswordOptions {
    email: string;
}
