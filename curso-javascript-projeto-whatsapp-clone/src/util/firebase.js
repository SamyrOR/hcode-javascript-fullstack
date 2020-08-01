const firebase = require('firebase');
require('firebase/firestore')

export class Firebase {
    constructor() {
        this._config = {
            apiKey: "AIzaSyDgtODxZd_B1A-1eLvjz3nk0fHJoAm5LgM",
            authDomain: "whatsapp-clone-91aae.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-91aae.firebaseio.com",
            projectId: "whatsapp-clone-91aae",
            storageBucket: "whatsapp-clone-91aae.appspot.com",
            messagingSenderId: "1062804954241",
            appId: "1:1062804954241:web:ee2fa6692520944b1c0180",
            measurementId: "G-ZJQPXT705V"
        }
        this.init()
    }

    init() {
        if(!window._initializedFirebase) {
            firebase.initializeApp(this._config);
            firebase.analytics();
            window._initializedFirebase = true
        }
    }
   
    static db(){
        return firebase.firestore();
    }
    
    static hd(){
        return firebase.storage();
    }

    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user

                s({
                    user,
                    token
                })
            }).catch(err => {
                f(err)
            })
        })
    }
}