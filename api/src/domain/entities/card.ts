export enum List {
    "ToDo" = "T",
    "Doing" = "P",
    "Done" = "D",
}

export interface ICard {
    id: string;
    title: string;
    content: string;
    list: List;
}
