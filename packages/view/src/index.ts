/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 09:15:13
 * @Description: Coding something
 */
import { Selon, selon } from 'selon';
import { SelonView } from './selon-view.js';

export { SelonView } from './selon-view.js';
export { Selon, selon } from 'selon';

if (typeof window !== 'undefined') {
    (window as any).selon = selon;
    (window as any).Selon = Selon;
    (window as any).SelonView = SelonView;
}

export default {
    Selon,
    selon,
    SelonView,
};