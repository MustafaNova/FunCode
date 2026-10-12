import { GetMyClanRes } from '../../use-cases/getMyClan/getMyClan.res';

export interface GetMyClanPort {
    getMyClan(userId: string): Promise<GetMyClanRes>
}
