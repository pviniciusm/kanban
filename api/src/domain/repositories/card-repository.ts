import { ICard } from "../entities/card";

export interface ICardRepository {
    create: (card: ICard) => Promise<void>;
    listAll: () => Promise<ICard[]>;
}
