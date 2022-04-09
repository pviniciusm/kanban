export enum List {
    toDo = "T",
    doing = "P",
    done = "D",
}

export interface ICard {
    id: string;
    title: string;
    content: string;
    list: List;
}
