// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//initialize firebase

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBjyWK7eorJaa7oIEwKAeW6rQ3WzLaq1Vo",
    authDomain: "miapp-158221.firebaseapp.com",
    databaseURL: "https://miapp-158221.firebaseio.com",
    projectId: "miapp-158221",
    storageBucket: "gs://miapp-158221.appspot.com/",
    messagingSenderId: "231674641543"
  } 
};



