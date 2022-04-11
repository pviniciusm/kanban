import { ICardRepository } from "../../../repositories/card-repository";
import {
    MockCardRepository,
    MockCardRepositoryWithData,
} from "../../../repositories/mock/mock-card-repository";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";
import { NotFoundError } from "../../../util/errors/not-found-error";
import { DeleteCardParams, DeleteCardUseCase } from "./delete-card-usecase";

describe("update card usecase tests", () => {
    const makeSut = (repository?: ICardRepository) => {
        const repo = repository ?? new MockCardRepository();
        const sut = new DeleteCardUseCase(repo);

        const data: DeleteCardParams = {
            id: "any_id",
        };

        return { sut, data };
    };

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
