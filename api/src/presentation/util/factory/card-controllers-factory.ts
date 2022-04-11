import { ListCardsUseCase } from "../../../domain/usecases/card/list-cards/list-cards-usecase";
import { CreateCardUseCase } from "../../../domain/usecases/card/create-card/create-card-usecase";
import { CardRepository } from "../../../infra/database/typeorm/repository";
import { ListCardsController } from "../../controllers/card/list-card/list-cards-controller";
import { CreateCardController } from "../../controllers/card/create-card/create-card-controller";

export const makeControllers = () => {
    // Repository - Typeorm
    const cardRepository = new CardRepository();

    // Usecases
    const createCardUseCase = new CreateCardUseCase(cardRepository);
    const listCardsUseCase = new ListCardsUseCase(cardRepository);

    // Controllers
    const createCardControllerImpl = new CreateCardController(
        createCardUseCase
    );

    const listCardsControllerImpl = new ListCardsController(listCardsUseCase);

    return {
        create: createCardControllerImpl,
        list: listCardsControllerImpl,
    };
};
