import db from "./firebaseInit"
var access_token = ""


function token() {
    db.collection("Users")
        .doc("105818491592653")
        .get()
        .then((doc) => {
            this.access_token = doc.data().access_token;
        });
}

export default access_token