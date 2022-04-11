import { ICard, List } from "./../../../domain/entities/card";

export const dataMapper = (card: ICard) => {
    return {
        titulo: card.title,
        id: card.id,
        conteudo: card.content,
        lista: Object.keys(List)[Object.values(List).indexOf(card.list)],
    };
};
