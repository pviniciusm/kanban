import { ICard, List } from "../../entities/card";
import { InvalidValueError } from "../errors/invalid-value-error";

interface CardFields {
    title: string;
    content: string;
    list: List;
    id?: string;
}

export const validateCardFields = (card: CardFields) => {
    if (card.content.length == 0 || card.content.length > 100) {
        throw new InvalidValueError("content");
    }

    if (card.title.length == 0 || card.title.length > 50) {
        throw new InvalidValueError("title");
    }

    if (!Object.values(List).includes(card.list)) {
        throw new InvalidValueError("list");
    }
};
