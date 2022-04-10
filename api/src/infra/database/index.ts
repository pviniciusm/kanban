export interface Connection {
    init(): Promise<void>;
    getConnection(): any;
}
