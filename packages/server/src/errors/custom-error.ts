export class CustomError extends Error {
    readonly status: number;

    constructor(errorMessage: string, status: number){
        super(errorMessage);
        this.status = status
    }
}