import { ICard } from "../entities/card";

export interface ICardRepository {
    create: (card: ICard) => Promise<void>;
    listAll: () => Promise<ICard[]>;
    update: (card: ICard) => Promise<void>;
    get: (id: string) => Promise<ICard | null>;
    delete: (id: string) => Promise<void>;
}
