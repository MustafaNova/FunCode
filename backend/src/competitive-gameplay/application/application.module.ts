import { Module } from '@nestjs/common';
import { BATTLE_MANAGER_PORT } from './tokens';
import { BattleManagerService } from './use-cases/battle-manager/battle-manager.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TaskService } from './use-cases/validator/validator.uc';

@Module({
    imports: [InfrastructureModule],
    controllers: [],
    providers: [
        {
            provide: BATTLE_MANAGER_PORT,
            useClass: BattleManagerService,
        },
        TaskService,
    ],
    exports: [BATTLE_MANAGER_PORT],
})
export class ApplicationModule {}
