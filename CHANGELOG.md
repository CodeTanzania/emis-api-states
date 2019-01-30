#### 0.7.0 (2019-01-30)

##### Chores

* **build:**  bundle library v0.7.0 ([a8691c5e](https://github.com/CodeTanzania/emis-api-states/commit/a8691c5eee1fa9dac22d42afba5f6f447b79550d))
* **package.json:**  update package version to 0.7.0 ([68ad9cc8](https://github.com/CodeTanzania/emis-api-states/commit/68ad9cc8cb870e54f59b372006eedae2bea51881))

##### New Features

* **action:**  add delete resource action ([e5562f94](https://github.com/CodeTanzania/emis-api-states/commit/e5562f94495b1ba136a15a721124d2a9e3fa9192))

##### Bug Fixes

* **actions:**
  *  make sort and clear sort action maintain page ([6eb82d34](https://github.com/CodeTanzania/emis-api-states/commit/6eb82d347ad8c6db4e2cae5d000169b2841b222e))
  *  expose clear resource sort as a thunk action ([85e22ba5](https://github.com/CodeTanzania/emis-api-states/commit/85e22ba5048e2f613547611375f527e94d6844b1))
  *  make pagination maintain set filter values ([eb402960](https://github.com/CodeTanzania/emis-api-states/commit/eb4029607112d8e6ff6d18358000a8bb4f0db046))

#### 0.6.1 (2019-01-29)

##### Chores

* **build:**  bundle library for version 0.6.1 ([0bdc8105](https://github.com/CodeTanzania/emis-api-states/commit/0bdc81056f40f971114d457844617c16bdf38c04))
* **package.json:**  update package version to 0.6.1 ([3cd79377](https://github.com/CodeTanzania/emis-api-states/commit/3cd79377d7437f128222163b6ef83b4297af5400))

##### Bug Fixes

* **app:**  load alertSource schema during initialization ([1a099919](https://github.com/CodeTanzania/emis-api-states/commit/1a099919f93e0f4e1f65264b20fd9483ea2bc181))

#### 0.6.0 (2019-01-29)

##### Chores

* **build:**  bundle library for v0.6.0 ([9475365b](https://github.com/CodeTanzania/emis-api-states/commit/9475365b2ff5866cb5331f87f6718504e7bb7741))
* **dependencies:**  update to latest version of api-client ([c836f69d](https://github.com/CodeTanzania/emis-api-states/commit/c836f69da208a6837b3a2237d2eaa742f7661333))
* **package.json:**  update package version to 0.6.0 ([138c81c0](https://github.com/CodeTanzania/emis-api-states/commit/138c81c014cfc8304144f92f5ac1c16408fa1b14))

##### New Features

* **alert source:**  add alert source resource ([af34f777](https://github.com/CodeTanzania/emis-api-states/commit/af34f777964faa6862eda22b4cfb959b270be193))

##### Bug Fixes

* **actions:**  expose clear filter as a thunk and not plain action ([326da61b](https://github.com/CodeTanzania/emis-api-states/commit/326da61b17a217f8df9035ad909d4899bac6b39f))

##### Refactors

* **actions:**  update clear filter action name ([9c8d79f7](https://github.com/CodeTanzania/emis-api-states/commit/9c8d79f7e798f5b8125e550ec9a4157e356c3a94))

#### 0.5.3 (2019-01-29)

##### Chores

* **build:**  bundle library for v0.5.3 ([3767b7d6](https://github.com/CodeTanzania/emis-api-states/commit/3767b7d60f1b0c76412df5e07a72dfe3373fb4d5))
* **package.json:**  update package version to 0.5.3 ([19d7d821](https://github.com/CodeTanzania/emis-api-states/commit/19d7d821cc1eddedf1f808e72485e1f7ba9e76b6))

##### Bug Fixes

* **actions:**  allow thunks to receive more than one param ([8d8671db](https://github.com/CodeTanzania/emis-api-states/commit/8d8671db05dba4c7059395327b696739df986ab2))

#### 0.5.2 (2019-01-28)

##### Chores

* **build:**  bundle library for v0.5.2 ([716e248d](https://github.com/CodeTanzania/emis-api-states/commit/716e248df8fac3708dade6f335fd8957e631f428))
* **package.json:**  update package version to 0.5.2 ([10339dee](https://github.com/CodeTanzania/emis-api-states/commit/10339dee6dba7d172b73ed4c9fe36fdab497a097))

##### Bug Fixes

* **actions:**  expose refresh thunk ([0c76a38e](https://github.com/CodeTanzania/emis-api-states/commit/0c76a38e98faa3ab190c1d16429a905a5877c372))

#### 0.5.1 (2019-01-28)

##### Chores

* **build:**  prepare v0.5.1 ([feb32379](https://github.com/CodeTanzania/emis-api-states/commit/feb323797841c009bd35ea5bfdad26dc101e0903))
* **package.json:**  update package version to 0.5.1 ([737be975](https://github.com/CodeTanzania/emis-api-states/commit/737be975613bfb89325425c97c66ee0624cf92dc))

##### Bug Fixes

* **thunk factory:**  reload on put and post success action ([642892f1](https://github.com/CodeTanzania/emis-api-states/commit/642892f1ae72e10764d0b887f3b97e4fd3351c52))

#### 0.5.0 (2019-01-28)

##### Chores

* **build:**  build release 0.5.0 ([97126977](https://github.com/CodeTanzania/emis-api-states/commit/97126977b10799d6d2af66ebd1ae41fd629632f6))
* **dependencies:**  update dependencies to latest versions ([f34633b7](https://github.com/CodeTanzania/emis-api-states/commit/f34633b74eda10840e998a2ce1b2a90f96f09bda))
* **package.json:**
  *  update version to 0.5.0 ([5f30b2e1](https://github.com/CodeTanzania/emis-api-states/commit/5f30b2e14c641d26163e35f55611eb77fc5b7363))
  *  fix issue with lint-staged hook ([88838da1](https://github.com/CodeTanzania/emis-api-states/commit/88838da1c8cc2cc8ff3c016f54074a876313afcb))
*  update lint-stage commit add . to commit add -A ([6f8a5a8f](https://github.com/CodeTanzania/emis-api-states/commit/6f8a5a8f3f566bdbb71cf3985b8b100ae12e652d))
*  force latest dependencies ([2d515d5a](https://github.com/CodeTanzania/emis-api-states/commit/2d515d5a781f84b42e316f89c6c1d26da3c8597a))

##### Continuous Integration

* **travis:**  fix external dependency issue ([47f45d38](https://github.com/CodeTanzania/emis-api-states/commit/47f45d38ce9987adf6218eb853cae808616bb20c))

##### New Features

* **thunk factory:**  add onSuccess and onError callback support ([113f30c0](https://github.com/CodeTanzania/emis-api-states/commit/113f30c0638244f8f36801d1b1bd043e3f565dbe))
* **schemas:**  allow loading schema on state initialization ([7d5f66eb](https://github.com/CodeTanzania/emis-api-states/commit/7d5f66eb3c299d2ee65c9aac05504fad823e7420))
* ***:**  add search,paginate,filter and sort shortcuts ([ce54b407](https://github.com/CodeTanzania/emis-api-states/commit/ce54b4070edeab0d86c1c51f6077af4297eaeb6b))

##### Bug Fixes

* **reducers:**  hide form when post/put action is successfully ([9c0f34f3](https://github.com/CodeTanzania/emis-api-states/commit/9c0f34f3127f0a97ce7c24efd2bb87cd93da917e))

#### 0.3.2 (2019-01-25)

##### Build System / Dependencies

* **rollup:**  remove unused external dependencies ([f76e104e](https://github.com/CodeTanzania/emis-api-states/commit/f76e104e66bcb28e27bc67923a3be1ac4afbbe44))

##### Chores

*  build library for release for 0.3.2 ([46a86f3c](https://github.com/CodeTanzania/emis-api-states/commit/46a86f3c6b77bd9098501431354fb4a98f24773a))
* **package.json:**  update package version to 0.3.2 ([88df0fbc](https://github.com/CodeTanzania/emis-api-states/commit/88df0fbc93ae52bfc74a3cc03e6aa3078f7191c5))
* **dependencies:**  use latest version of emis-api-client ([f64b8a58](https://github.com/CodeTanzania/emis-api-states/commit/f64b8a58158ef46e6363db7b766e805dbac3bc86))

##### Bug Fixes

* **incident type:**  remove the issue with incidentTypes ([96b0b5c0](https://github.com/CodeTanzania/emis-api-states/commit/96b0b5c0605d6ff73130636106b92fd413fee252))

#### 0.3.1 (2019-01-25)

##### Chores

* **package.json:**  bump to version 0.3.1 ([5b3e2251](https://github.com/CodeTanzania/emis-api-states/commit/5b3e2251762d1232eddde0e413a86feef85bc5b4))
*  rename list-stage for js ([e00c2db8](https://github.com/CodeTanzania/emis-api-states/commit/e00c2db821b08c7844ba7c2403701cfa292e3b75))
*  add code lint before commit ([338750ea](https://github.com/CodeTanzania/emis-api-states/commit/338750ea6ba5acdc9d3b545d602c46907affa791))
*  add commit link hook ([3458cda3](https://github.com/CodeTanzania/emis-api-states/commit/3458cda31c2e927daab648390b0664d3be5be11e))

##### New Features

*  add missing resources to the lib ([8a08865d](https://github.com/CodeTanzania/emis-api-states/commit/8a08865decc83b0522a7db47e192d4efaaae5a90))

##### Bug Fixes

* **incident type:**  fix a bug on generating incident type functions ([ed96c1d8](https://github.com/CodeTanzania/emis-api-states/commit/ed96c1d8659c05a7bec6445da5cd60ef61c6bfba))

#### 0.2.4 (2019-01-23)

##### Chores

*  force latest emis-api-client version ([88200b73](https://github.com/CodeTanzania/emis-api-states/commit/88200b73ec61d910f2fe68fcf0a5aa86b51b8eea))
*  update dependencies ([956444b1](https://github.com/CodeTanzania/emis-api-states/commit/956444b1a14c4499aea3c5a1696e4a167bd8cba3))
*  force latest dependencies ([918529e7](https://github.com/CodeTanzania/emis-api-states/commit/918529e7925710e4a440aaf2297b44d061dc368c))

##### Documentation Changes

* **readme:**
  *  update library description ([bd859cc2](https://github.com/CodeTanzania/emis-api-states/commit/bd859cc2e08bce3ca63000ed2b86dcb791523621))
  *  add a node about .env file ([3a79454b](https://github.com/CodeTanzania/emis-api-states/commit/3a79454bf51d0ae97e28af6ddc6065180bae31cb))
*  update usage docs ([b019d922](https://github.com/CodeTanzania/emis-api-states/commit/b019d922976c3e60c1eb203ca7ae5afd6cba0467))
* **index:**  add usage example for StoreProvider ([f5c83fe6](https://github.com/CodeTanzania/emis-api-states/commit/f5c83fe6714ef52f76cfad934abffafe008f469c))
* **helpers:**  correct a typo ([67d445a0](https://github.com/CodeTanzania/emis-api-states/commit/67d445a02bd214c785f9d9728c97949a8fdae0e1))
* **changelog:**  correct a typo ([4d1d59ee](https://github.com/CodeTanzania/emis-api-states/commit/4d1d59eeb8ae172227f9298e21d5cad4417b697a))
* **license:**  update license copyright usage period ([4dcd0cdf](https://github.com/CodeTanzania/emis-api-states/commit/4dcd0cdffa57641ba66cd929216ac7bb68a60b4d))

##### Bug Fixes

*  improve eslint config and refactoring for lint pass ([70ff4dc0](https://github.com/CodeTanzania/emis-api-states/commit/70ff4dc084cca9fab1c56cfb3ec343996a9a94d4))

##### Refactors

*  use helper function to generate string names ([7db44d09](https://github.com/CodeTanzania/emis-api-states/commit/7db44d09aef81c056972cb065bebc662f9a06cf0))

##### Tests

* **Connect:**  improve test coverage ([078cffeb](https://github.com/CodeTanzania/emis-api-states/commit/078cffeb206dcbc6e23c48a072b0bbc6d2745ee8))

# 0.2.3 / 15-04-2019

- Fix a bug on Connect function which prevented component to subscribe to store

# 0.2.2 / 14-01-2019

- Fix issues with connect function and rename it to Connect

# 0.1.0 / 14-01-2019

- Export simplified connect function for injecting props from redux store
- Export StoreProvider for the application with already configured store
- Export All actions `(select, closeForm,openForm, setSchema)` and `CRUD thunks` for API resources i.e activity,alert,assessment,feature,incident, incidentType,plan,procedure, questionnaire, resource, role, stakeholder
- Use latest version of emis-api-client
