import userAuthImg from '../../../../assets/practice/bugHunter/user-authentication.png';
import shoppingCartImg from '../../../../assets/practice/bugHunter/shopping-cart.png';
import bankAccountImg from '../../../../assets/practice/bugHunter/bank-account.png';


export const BUG_HUNTER_LEVELS: bugHunterLevels = [
    {
        id: 'user-authentication',
        name: 'User Authentication',
        image: userAuthImg,
        imgAlt: 'User Authentication bug hunter level'
    },
    {
        id: 'shopping-cart',
        name: 'Shopping Cart',
        image: shoppingCartImg,
        imgAlt: 'Shopping Cart bug hunter level'
    },
    {
        id: 'bank-account',
        name: 'Bank Account',
        image: bankAccountImg,
        imgAlt: 'Bank Account bug hunter level'
    }
]


type bugHunterLevels = {
    id: string,
    name: string,
    image: string,
    imgAlt: string
} []