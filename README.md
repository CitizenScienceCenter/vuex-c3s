## Vuex-C3S

### What?

A small Vue plugin that integrates into your existing store, providing access to the Citizen Science API and allowing you to sync locally with your Vue site.

## How

```javascript
import c3s from 'vuex-c3s'

const apiURL = "https://api.petstore.io/openapi.json"
const serverURL = "https://api.petstore.com/api"
Vue.use(c3s.plugin, {store, apiURL, serverURL})

***

user: state => state.c3s.user.currentUser
```

## Store Structure

**NB**: Below, Store properties are camel case and submodules are title case

* C3S
    * client
    * host
    * User
        * user
        * currentUser
    * Project
        * projects
        * project
        * media
        * comments
    * Activity
        * activities
        * activity
        * media
        * comments
    * Task
        * tasks
        * task
        * media
        * comments
    * Media
        * media
        * medium
    * Comments
        * comments
        * comment
        
 ## Store Methods
 
 Each module has the following methods available:
 * get`Plural`**(**search**:JSON) - Retrieve all of the model, with a query object
 * get`Singular`(**id**:String) - Retrieve a single model matching the ID
 * create`Singular`(**model**: JSON) - Create an instance of the model
 * update`Singular`(**model**:JSON, **id**:String) - Update an instance of the model
 * delete`Singular`(**id**:String) - Delete an instance of the model
 
 e.g.:
 
 ```javascript
this.$store.dispatch('c3s/tasks/getTask', 'abc4e6')
```
