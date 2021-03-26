# Treehole Angular Firebase

A discussion forum using Angular as frontend and Firebase as backend:

![sreenshot](https://github.com/xiongemi/treehole-angular-firebase/blob/master/src/assets/images/screenshot.png?raw=true)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Tech Stack

- Frontend: Angular
- Component Library: ng-zorro-antd (Ant Design of Angular)
- Backend: Firebase, integrate using AngularFire
- Frontend Session: uuid
- Internalization: @ngx-translate
- State Management: NGXS
- CSS library: tachyons

## Add Your Own Firebase Config

Create a file named `firebase.config.ts` under `src` folder.
Add your own firebase config in this file, in below format

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

## Firestore Cloud Data Structure

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

- <span class="material-icons notranslate" aria-hidden="true" translate="no">collections_bookmark</span> posts
  - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> post1
  - id: "Ebd1BwdaNqniLCsy0xOb"
  - uuid: "e51d2784-b163-41af-9e66-0bbec811fc63"
  - title: "post title"
  - message: "This is a first line for a new Forum. \nThis is a second line for a new Forum."
  - language: "en"
  - createdAt: "2021-02-04T06:17:38.936Z"
  - likesCount: 3
  - dislikesCount: 4
  - commentsCount: 3
    - <span class="material-icons notranslate" aria-hidden="true" translate="no">collections_bookmark</span> likes
      - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> like1
        - id: "L0svxEZDEiQEl2Djof1R"
        - uuid: "0fbfd447-49f5-4e2c-bbc7-bc8afb8a62a2"
        - createdAt: "2021-02-04T06:17:38.936Z"
      - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> like2
        - ...
    - <span class="material-icons notranslate" aria-hidden="true" translate="no">collections_bookmark</span> dislikes
       - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> dislike1
         - id: "niZDMC5yu9WBXW45p0Ny"
         - uuid: "0fbfd447-49f5-4e2c-bbc7-bc8afb8a62a2"
         - createdAt: "2021-02-04T06:17:38.936Z"
      - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> dislike2
        - ...
    - <span class="material-icons notranslate" aria-hidden="true" translate="no">collections_bookmark</span> comments
      - <span class="material-icons notranslate" aria-hidden="true" translate="no">class</span> comment1
