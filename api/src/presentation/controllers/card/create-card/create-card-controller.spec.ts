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
                title: "any_title",
                content: "any_content",
                list: List.toDo.toString(),
            },
        };

        return { sut, request: { ...request } };
    };

    test("should return code 400 if no title is provided", async () => {
        const { sut, request } = makeSut();

        request.body.title = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 400 if no content is provided", async () => {
        const { sut, request } = makeSut();

        request.body.content = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 400 if no list is provided", async () => {
        const { sut, request } = makeSut();

        request.body.list = undefined;

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
