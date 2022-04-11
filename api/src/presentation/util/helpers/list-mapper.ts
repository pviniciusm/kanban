import { List } from "./../../../domain/entities/card";
export const listMapper = (index: string) => {
    switch (index) {
        case "ToDo":
            return List.ToDo;
        case "Doing":
            return List.Doing;
        case "Done":
            return List.Done;
        default:
            return undefined;
    }
};
