import { CreateCardParams, CreateCardUseCase } from "./create-card-usecase";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";
import { List, ICard } from "./../../../entities/card";
import { MockCardRepository } from "../../../repositories/mock/mock-card-repository";

describe("create card use case tests", () => {
    const makeSut = () => {
        const mockRepository = new MockCardRepository();

        const sut = new CreateCardUseCase(mockRepository);
        const data: CreateCardParams = {
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

    test("should return a created Card object if all provided data is ok", async () => {
        const { data, sut } = makeSut();

        expect.assertions(4);

        const result: ICard = await sut.run(data);
        expect(result).not.toBeFalsy();
        expect(result.id).not.toBeFalsy();
        expect(result.content).toEqual(data.content);
        expect(result.title).toEqual(data.title);
    });
});
