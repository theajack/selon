import { selon } from 'packages/selon';

selon([ { name: 'user1', age: 15 }, { name: 'user2', age: 20 } ])
    .select('name')
    .where('age<18')
    .run();