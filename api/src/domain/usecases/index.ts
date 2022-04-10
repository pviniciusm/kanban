export interface UseCase {
    run(params: any): Promise<any>;
}

export * from "./card";
