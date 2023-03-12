/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 09:15:13
 * @Description: Coding something
 */
import { Selon, selon } from './selon.js';

export { Selon, selon } from './selon.js';

if (typeof window !== 'undefined') {
    (window as any).selon = selon;
    (window as any).Selon = Selon;
}

export default {
    selon,
    Selon,
};