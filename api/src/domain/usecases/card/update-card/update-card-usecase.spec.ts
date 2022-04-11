import {
    MockCardRepository,
    MockCardRepositoryWithData,
} from "./../../../repositories/mock/mock-card-repository";
import { ICardRepository } from "../../../repositories/card-repository";
import { List } from "../../../entities/card";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";
import { NotFoundError } from "../../../util/errors/not-found-error";
import { UpdateCardParams, UpdateCardUseCase } from "./update-card-usecase";

describe("update card usecase tests", () => {
    const makeSut = (repository?: ICardRepository) => {
        const repo = repository ?? new MockCardRepository();
        const sut = new UpdateCardUseCase(repo);

        const data: UpdateCardParams = {
            id: "any_id",
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

    test("should throw InvalidValueError if id is empty", async () => {
        const { sut, data } = makeSut();

        data.id = "";

        try {
            await sut.run(data);
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidValueError);
            if (error instanceof InvalidValueError) {
                expect(error.message).toEqual("Value of id is invalid.");
            }
        }
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

    test("should throw NotFoundError if card is not on database", async () => {
        const { sut, data } = makeSut();
        expect.assertions(1);

        try {
            await sut.run(data);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    test("should return void if everything is ok", (done) => {
        const { sut, data } = makeSut(new MockCardRepositoryWithData());

        sut.run(data).then(() => done());
    });
});
