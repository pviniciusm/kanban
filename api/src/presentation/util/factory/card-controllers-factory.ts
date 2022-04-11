import { DeleteCardUseCase } from "./../../../domain/usecases/card/delete-card/delete-card-usecase";
import { UpdateCardUseCase } from "./../../../domain/usecases/card/update-card/update-card-usecase";
import { ListCardsUseCase } from "../../../domain/usecases/card/list-cards/list-cards-usecase";
import { CreateCardUseCase } from "../../../domain/usecases/card/create-card/create-card-usecase";
import { CardRepository } from "../../../infra/database/typeorm/repository";
import { ListCardsController } from "../../controllers/card/list-card/list-cards-controller";
import { CreateCardController } from "../../controllers/card/create-card/create-card-controller";
import { DeleteCardController } from "../../controllers/card/delete-card/delete-card-controller";
import { UpdateCardController } from "../../controllers/card/update-card/update-card-controller";

export const makeControllers = () => {
    // Repository - Typeorm
    const cardRepository = new CardRepository();

    // Usecases
    const createCardUseCase = new CreateCardUseCase(cardRepository);
    const listCardsUseCase = new ListCardsUseCase(cardRepository);
    const updateCardsUseCase = new UpdateCardUseCase(cardRepository);
    const deleteCardsUseCase = new DeleteCardUseCase(cardRepository);

    // Controllers
    const createCardControllerImpl = new CreateCardController(
        createCardUseCase
    );

    const listCardsControllerImpl = new ListCardsController(listCardsUseCase);
    const deleteCardControllerImpl = new DeleteCardController(
        deleteCardsUseCase
    );
    const updateCardControllerImpl = new UpdateCardController(
        updateCardsUseCase
    );

    return {
        create: createCardControllerImpl,
        list: listCardsControllerImpl,
        update: updateCardControllerImpl,
        delete: deleteCardControllerImpl,
    };
};
