const bcryptSalt = 12;
const applicationSecret = 'Interv!ewDre@m APppl!cat!on SeCrEt';
const jwtTokenExpiresTime = '10h';
const jwtTokenExpiresInNumber = 36000;

exports.BCRYPT_SALT = bcryptSalt;
exports.APPLICATION_SECRET = applicationSecret;
exports.TOKEN_EXPIRES_TIME = jwtTokenExpiresTime;
exports.TOKEN_EXPIRES_TIME_NUMBER = jwtTokenExpiresInNumber;
