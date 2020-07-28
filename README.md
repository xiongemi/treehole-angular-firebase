# Treehole Angular Firebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Add Your Own Firebase Config

Create a file named `firebase.config.ts` under `src` folder.
Add your own firebase config in this file, like

```
export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};
```

## Commands

- run locally: `npm run start`
- webpack-bundle-analyzer: `npm run build:stats` and `npm run analyze`
- deploy to github: `npm run deploy:github`
- run production build locally: `npm run build` and `http-server dist/treehole-angular-firebase/browser`
- deploy to firebase hosting: `npm run deploy:firebase`
- ssr build (not working right now): `npm run build:ssr` and `npm run serve:ssr`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
