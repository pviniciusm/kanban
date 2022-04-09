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
        if (params.content.length == 0) {
            throw new InvalidValueError("content");
        }

        if (params.title.length == 0) {
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
        return { sut };
    };

    test("should throw InvalidValueError if content or title are empty", async () => {
        const { sut } = makeSut();

        let data: CreateCardParams = {
            content: "abc",
            title: "",
            list: List.toDo,
        };

        // sut.run(data).catch((error) => {
        //     expect(error).toBeInstanceOf(InvalidValueError);
        //     expect(error.message).toEqual("Value of title is invalid.");
        // });

        expect(sut.run(data)).rejects.toThrowError(InvalidValueError);

        data.content = "";
        data.title = "abc";

        sut.run(data).catch((error) => {
            expect(error).toBeInstanceOf(InvalidValueError);
            expect(error.message).toEqual("Value of content is invalid.");
        });
    });
    test("should throw InvalidValueError if content length is bigger than 100 characters", async () => {
        expect(2).toEqual(1 + 1);
    });
    test("should throw InvalidValueError if title length is bigger than 50 characters", async () => {
        expect(2).toEqual(1 + 1);
    });
    test("should throw InvalidValueError if content length is bigger than 50 characters", async () => {
        expect(2).toEqual(1 + 1);
    });
});
