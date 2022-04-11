import { formatDate } from "./date-format";

export const removeUpdateLogger = (
    method: string,
    id: string,
    title: string,
    callback: any
) => {
    if (!["DELETE", "PUT"].includes(method.toUpperCase())) {
        return callback();
    }

    // to-do: mudar log após desenvolvimento do update e delete
    method = method.toUpperCase() === "DELETE" ? "Deletar" : "Alterar";

    console.log(
        `${formatDate(new Date())} - Card ${id} - ${title} - ${method}`
    );

    return callback();
};
