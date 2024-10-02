# Just some test project with nested forms
> This document describes how to set up development environment to build and test web application based on angular.

Before starting the development ensure that you are familiar with next documents  [Angular Style Guide](https://angular.io/guide/styleguide) as they describe code conduct on this project.

**Content**
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting up Dev](#setting-up-dev)
- [Project Structure](#project-structure)
- [Built With](#built-with)


<a name="getting-started"></a>
## Getting started


<a name="prerequisites"></a>
### Prerequisites
To start development you must have follow packages installed:
* [Node.js](https://nodejs.org/en/) - to execute build commands and run tests;
* [angular-cli](https://cli.angular.io/) - to scaffold common application entities.


<a name="setting-up-dev"></a>
### Setting up Dev

To start development create new feature branch from main.  
To start up development you have to do the next steps:
1) install dependencies;
2) execute angular-cli build command;

```
npm install
npm start
```


<a name="project-structure"></a>
## Project Structure
This project follows angular best practices for project structure [Example Application](https://github.com/gothinkster/angular-realworld-example-app).

#### Base angular module structrure
```
├── features/users/                            ← module directory
|  ├── animation/                              ← all animation that are used in this module
|  |  ├── fade-in-animation.ts
|  |  └── ...
|  ├── components/                             ← all components related to particular angular module
|  |  ├── filter-news/                         ← component's folder structure
|  |  |  ├── filter-news.component.ts
|  |  |  ├── filter-news.component.scss
|  |  |  ├── filter-news.component.html
|  |  |  └── filter-news.component.spec.ts
|  |  └── ...
|  ├── constants/                              ← some predefined constants values, like list of options for
|  |  |                                          select widjet, config object...
|  |  ├── user-table.constant.ts
|  |  ├── news-types-list.constant.ts
|  |  └── ...
|  ├── directives/                             ← all directives related to particular angular module
|  |  ├── mouse-position-spy/
|  |  |  ├── mouse-position-spy.direactive.ts
|  |  |  └── mouse-position-spy.direactive.spec.ts
|  |  └── ...
|  ├── mocks/                                  ← some hardcoded api data, that are used for development or testing porpuse
|  |  ├── user.mock.ts
|  |  ├── news-feed.mock.ts 
|  |  └── ...
|  ├── pipes/                                  ← all pipes related to particular angular module
|  |  ├── date-formatter/
|  |  |  ├── date-formatter.pipe.ts
|  |  |  └── date-formatter.pipe.spec.ts
|  |  └── ...
|  ├── routes/                                 ← all components related to particular angular module and are using in
|  |  |                                          the routing
|  |  ├── users/
|  |  |  ├── users.component.ts
|  |  |  ├── users.component.scss
|  |  |  ├── users.component.html
|  |  |  └── users.component.spec.ts
|  |  └── ...
|  ├── services/                               ← all services related to particular angular module
|  |  ├── users.service.ts
|  |  ├── users.service.spec.ts
|  |  └── ...
|  ├── types/                                  ← interfaces and types that defines shape of some data
|  |  ├── select-option.type.ts
|  |  ├── permission.type.ts 
|  |  └── ...
|  ├── utils/                                  ← some other staff, that you do not know where put to
|  |  ├── random.string.util.ts
|  |  ├── array.utility.ts 
|  |  └── ...
|  ├── users.module.ts                ← module config
|  └── users-routing.module.ts        ← module for route configuration
```

<a name="built-with"></a>
## Built With
List of libraries and plugins that used in application.
* [Angular](https://angular.io)
* [TypeScript](http://www.typescriptlang.org/)
* [Rx.js](https://rxjs-dev.firebaseapp.com/)
* [Bootstrap](https://getbootstrap.com/)
* [bootstrap-icons](https://icons.getbootstrap.com/)
* [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

