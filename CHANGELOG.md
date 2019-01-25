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
