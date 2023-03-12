/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 09:15:13
 * @Description: Coding something
 */
import { selon } from 'packages/selon';

const d = selon([ { name: 'user1', age: 15 }, { name: 'user2', age: 20 } ])
    .select('name')
    .where(item => item.age > 18)
    .run();

console.log(d);

