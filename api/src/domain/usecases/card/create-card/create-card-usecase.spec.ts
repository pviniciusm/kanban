import { List, ICard } from "./../../../entities/card";
/*
    Requisitos:

    Para inserir um card o título, o conteúdo e o nome da lista devem estar preenchidos, 
    o id não deve conter valor. Ao inserir retorne o card completo incluindo o id atribuído 
    com o statusCode apropriado. Caso inválido, retorne status 400.

*/

export interface CreateCardParams {
    title: string;
    content: string;
    list: List;
}

class CreateCardUseCase {
    async run(params: CreateCardParams) {
        if (params.content.length == 0 || params.content.length > 100) {
            throw new InvalidValueError("content");
        }

        if (params.title.length == 0 || params.title.length > 50) {
            throw new InvalidValueError("title");
        }
    }
}

class DomainError extends Error {
    constructor(message: string, public code?: number) {
        super(message);
        this.code = code ?? 400;
    }
}

class InvalidValueError extends DomainError {
    constructor(value: string) {
        super(`Value of ${value} is invalid.`);
    }
}

describe("create card use case tests", () => {
    const makeSut = () => {
        const sut = new CreateCardUseCase();
        const data = {
            content: "any_content",
            title: "any_title",
            list: List.toDo,
        };

        return { sut, data };
    };

    test("should throw InvalidValueError if content or title are empty", async () => {
        const { sut, data } = makeSut();

        data.title = "";

        expect(sut.run(data)).rejects.toThrowError(InvalidValueError);

        data.content = "";
        data.title = "abc";

        sut.run(data).catch((error) => {
            expect(error).toBeInstanceOf(InvalidValueError);
            expect(error.message).toEqual("Value of content is invalid.");
        });
    });

    test("should throw InvalidValueError if content length is bigger than 100 characters", async () => {
        const { sut, data } = makeSut();
        expect.assertions(1);

        data.content = "".padStart(101, "a");
        try {
            await sut.run(data);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidValueError);
        }
    });

    test("should throw InvalidValueError if title length is bigger than 50 characters", async () => {
        const { sut, data } = makeSut();
        expect.assertions(1);

        data.title = "".padStart(51, "a");
        try {
            await sut.run(data);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidValueError);
        }
    });
});
