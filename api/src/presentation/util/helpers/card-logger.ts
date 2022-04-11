import { formatDate } from "./date-format";

export const removeUpdateLogger = (
    method: string,
    id: string,
    title: string,
    callback: any
) => {
    if (!["GET", "UPDATE"].includes(method.toUpperCase())) {
        callback();
    }

    // to-do: mudar log após desenvolvimento do update e delete
    method = method.toUpperCase() === "GET" ? "Listar" : "Alterar";

    console.log(
        `${formatDate(new Date())} - Card ${id} - ${title} - ${method}`
    );

    callback();
};
