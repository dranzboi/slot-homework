import {Module, ValidationPipe} from '@nestjs/common';
import {SlotServer} from "./application/service/SlotServer";
import {HealthController} from "./application/http/HealthController";
import {GameController} from "./application/http/GameController";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Config} from "./Config";
import {Session} from "./domain/entity/Session";
import {Account} from "./domain/entity/Account";
import {APP_FILTER, APP_PIPE} from "@nestjs/core";
import {EntityNotFoundFilter} from "./application/filter/EntityNotFoundFilter";
import {CheatingRewardManager} from "./domain/reward-manager/CheatingRewardManager";

@Module({
    imports: [
        TypeOrmModule.forRoot(<any>Config.db),
        TypeOrmModule.forFeature([
            Session,
            Account
        ]),
    ],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                transform: true,
                forbidUnknownValues: true,
                validationError: {target: false}
            })
        },

        {
            provide: APP_FILTER,
            useClass: EntityNotFoundFilter,
        },

        // ChanceBasedRewardManager.provide(),
        CheatingRewardManager.provide(),
        SlotServer
    ],
    controllers: [
        GameController,
        HealthController
    ]
})
export class AppModule {}
