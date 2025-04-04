var admin = require("firebase-admin");
var serviceAccount = require("../node_modules/service.json");
const { initializeApp } = require("firebase-admin/app");

const firebaseapp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const auth = admin.auth();

module.exports = {firebaseapp,admin};
