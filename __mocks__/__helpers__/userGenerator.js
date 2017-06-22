const faker = require('faker');
const randomstring = require('randomstring');

/**
 *
 * @param {string} [gender]   - "male" or "female". If not provided, then will be choose randomly
 */
function generate({gender}) {
    let firstName;
    let lastName;

    gender = gender ? gender : Math.random() < 0.5 ? 'Female' : 'Male';

    firstName = faker.name.firstName(gender);
    lastName  = faker.name.lastName(gender);

    return { authResponse: { access_token: `ya29.AHES${randomstring.generate({length: 60,  charset: 'alphabetic'})}`}
           , profile: { email   : faker.internet.email(firstName, lastName)
                      , id      : randomstring.generate({length: 20,  charset: 'alphabetic'})
                      , imageURL: faker.internet.avatar()
                      , name    : faker.name.findName(firstName, lastName, gender)}};
}



module.exports.default = generate;
