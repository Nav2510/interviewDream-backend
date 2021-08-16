const bcryptSalt = 12;
const applicationSecret = 'Interv!ewDre@m APppl!cat!on SeCrEt';
const jwtTokenExpiresTime = '1h';
const jwtTokenExpiresInNumber = 3600;

exports.BCRYPT_SALT = bcryptSalt;
exports.APPLICATION_SECRET = applicationSecret;
exports.TOKEN_EXPIRES_TIME = jwtTokenExpiresTime;
exports.TOKEN_EXPIRES_TIME_NUMBER = jwtTokenExpiresInNumber;
