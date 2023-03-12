/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-12 17:42:35
 * @Description: Coding something
 */
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const apiData = require('./apiData.min copy');

const { Attribute, BQL, JQL } = apiData;

function generateHTML (list) {
    return list.map((item, index) => {
        const { title, intro, test, func, howUse, code } = item;

        return `### ${index}. ${title}

${intro}

${func}

\`${howUse}\`

\`\`\`html
${code}
\`\`\`

`;
    });
}

writeFileSync(resolve(__dirname, './bql.md'), generateHTML(BQL).join('\n'));