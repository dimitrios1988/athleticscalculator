import { MenuItemI } from '../shared/interfaces/menu-item.interface';

export class MenuItem implements MenuItemI{
    title?: string;
    path?: string;
    icon?: string;
}
