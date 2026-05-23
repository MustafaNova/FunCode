import { StartCoursePort } from '../../ports/inbound/startCourse.port';
import { StartCourseCmd } from './startCourse.cmd';
import { ActiveScreenRepositoryPort } from '../../ports/outbound/activeScreenRepository.port';
import { UserRepoPort } from '../../ports/outbound/userRepo.port';

export class StartCourseUC implements StartCoursePort {
    constructor(
        private readonly activeScreenRepo: ActiveScreenRepositoryPort,
        private readonly userRepo: UserRepoPort,
    ) {}

    async execute(cmd: StartCourseCmd): Promise<void> {
        await this.activeScreenRepo.initActiveScreen(
            cmd.userId,
            cmd.course,
        );
        this.userRepo.markOnboardingCompleted(cmd.userId);
    }
}
