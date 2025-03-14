export interface UserAccount { 
    userId: string; 
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    isEmailVerified: boolean;
}