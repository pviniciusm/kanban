import { List } from "../../../../domain/entities/card";
import { MockCardRepository } from "../../../../domain/repositories/mock/mock-card-repository";
import { CreateCardUseCase } from "../../../../domain/usecases";
import { HttpRequest } from "../../../util/contracts/http-data";
import { CreateCardController } from "./create-card-controller";

describe("create card controller tests", () => {
    const makeSut = () => {
        const repository = new MockCardRepository();
        const useCase = new CreateCardUseCase(repository);
        const sut = new CreateCardController(useCase);

        const request: HttpRequest = {
            body: {
                titulo: "any_titulo",
                conteudo: "any_conteudo",
                lista: List.toDo.toString(),
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

    test("should return code 201 if request is ok", async () => {
        const { sut, request } = makeSut();

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(201);
        expect(response.ok).toBeTruthy();
        expect(response.identifier).toEqual("Success");
    });
});
