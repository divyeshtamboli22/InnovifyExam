export class User {
    constructor(
        public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public mobile?: number,
        public dateOfBirth?: string,
        public address?: string,
        public avatar?: string
    ) { }
}