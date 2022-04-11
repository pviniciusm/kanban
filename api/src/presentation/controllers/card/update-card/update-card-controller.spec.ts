import { ICardRepository } from "./../../../../domain/repositories/card-repository";
import { UpdateCardUseCase } from "./../../../../domain/usecases/card/update-card/update-card-usecase";
import { List } from "../../../../domain/entities/card";
import {
    MockCardRepository,
    MockCardRepositoryWithData,
} from "../../../../domain/repositories/mock/mock-card-repository";
import { HttpRequest } from "../../../util/contracts/http-data";
import { UpdateCardController } from "./update-card-controller";

describe("create card controller tests", () => {
    const makeSut = (repository?: ICardRepository) => {
        const repo = repository ?? new MockCardRepository();
        const useCase = new UpdateCardUseCase(repo);
        const sut = new UpdateCardController(useCase);

        const request: HttpRequest = {
            body: {
                titulo: "any_titulo",
                conteudo: "any_conteudo",
                lista: List.toDo.toString(),
            },
            params: {
                id: "abc",
            },
        };

        return { sut, request: { ...request } };
    };

    test("should return code 400 if no titulo is provided", async () => {
        const { sut, request } = makeSut();

        request.body.titulo = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 400 if no conteudo is provided", async () => {
        const { sut, request } = makeSut();

        request.body.conteudo = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 400 if no list is provided", async () => {
        const { sut, request } = makeSut();

        request.body.lista = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 400 if no Id is provided", async () => {
        const { sut, request } = makeSut();

        request.params.id = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 200 if request is ok", async () => {
        const { sut, request } = makeSut(new MockCardRepositoryWithData());

        const response = await sut.handle(request);

        expect(response).toBeDefined();
        expect(response.code).toEqual(200);
        expect(response.ok).toBeTruthy();
        expect(response.identifier).toEqual("Success");
    });
});
