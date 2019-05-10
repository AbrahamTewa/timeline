#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');

// CLI : generate user
{
    // eslint-disable-next-line global-require,import/no-internal-modules
    const generator = require('../__mocks__/__helpers__/userGenerator').default;

    const generateUserOptions = {
        filename : {
            alias : 'f',
            type  : 'string',
        },
        gender : {
            alias   : 'g',
            choices : ['random', 'male', 'female'],
            default : 'random',
            type    : 'string',
        },
    };

    function generateUserCli(argv) {
        const user = generator({ gender : { m : 'male', f : 'female' }[argv.gender] });

        if (argv.filename) {
            fs.writeFileSync(`${__dirname}/../__mocks__/__data__/users/${argv.filename}`, JSON.stringify(user));
        }
        else {
            // eslint-disable-next-line no-console
            console.log(user);
        }
    }

    yargs.usage('$0 <cmd> [args]')
        .command('generate user',
            'Generate random user data',
            generateUserOptions,
            generateUserCli);
}

// noinspection BadExpressionStatementJS
// eslint-disable-next-line no-unused-expressions
yargs.help().argv;
