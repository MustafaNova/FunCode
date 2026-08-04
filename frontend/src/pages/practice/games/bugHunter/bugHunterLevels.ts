import userAuthImg from '../../../../assets/practice/bugHunter/user-authentication.png';
import shoppingCartImg from '../../../../assets/practice/bugHunter/shopping-cart.png';
import bankAccountImg from '../../../../assets/practice/bugHunter/bank-account.png';


export const BUG_HUNTER_LEVELS: bugHunterLevels = [
    {
        id: 'user-authentication',
        name: 'User Authentication',
        level: 1,
        image: userAuthImg,
        imgAlt: 'User Authentication bug hunter level'
    },
    {
        id: 'shopping-cart',
        name: 'Shopping Cart',
        level: 2,
        image: shoppingCartImg,
        imgAlt: 'Shopping Cart bug hunter level'
    },
    {
        id: 'bank-account',
        name: 'Bank Account',
        level: 3,
        image: bankAccountImg,
        imgAlt: 'Bank Account bug hunter level'
    }
]


type bugHunterLevels = {
    id: string,
    name: string,
    level: number,
    image: string,
    imgAlt: string
} []