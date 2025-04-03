var admin = require("firebase-admin");
var serviceAccount = require("../service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const auth=admin.auth();

module.exports = auth;