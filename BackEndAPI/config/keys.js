// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

dbPassword = 'mongodb://127.0.0.1:27017/cont-api'

module.exports = {
    'secret':'myuniquesecret',
    mongoURI: dbPassword
};
