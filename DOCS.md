## Modules

<dl>
<dt><a href="#module_C3SPlugin">C3SPlugin</a></dt>
<dd><p>Loading primary plugin and setting up
the install method to link in to Vue instance</p>
</dd>
<dt><a href="#module_c3s">c3s</a></dt>
<dd></dd>
<dt><a href="#module_c3s/media">c3s/media</a></dt>
<dd></dd>
<dt><a href="#module_c3s/member">c3s/member</a></dt>
<dd></dd>
<dt><a href="#module_c3s/project">c3s/project</a></dt>
<dd><p>store/modules/project.js</p>
</dd>
<dt><a href="#module_c3s/submission">c3s/submission</a></dt>
<dd></dd>
<dt><a href="#module_c3s/task">c3s/task</a></dt>
<dd></dd>
<dt><a href="#module_c3s/user">c3s/user</a></dt>
<dd></dd>
</dl>

<a name="module_C3SPlugin"></a>

## C3SPlugin
Loading primary plugin and setting up
the install method to link in to Vue instance


* [C3SPlugin](#module_C3SPlugin)
    * [~C3SPlugin](#module_C3SPlugin..C3SPlugin)
    * [~modules](#module_C3SPlugin..modules)
    * [~install(Vue, options)](#module_C3SPlugin..install)

<a name="module_C3SPlugin..C3SPlugin"></a>

### C3SPlugin~C3SPlugin
**Kind**: inner property of [<code>C3SPlugin</code>](#module_C3SPlugin)  
<a name="module_C3SPlugin..modules"></a>

### C3SPlugin~modules
Modules array to list
the name of the submodule
and the file to import

**Kind**: inner constant of [<code>C3SPlugin</code>](#module_C3SPlugin)  
<a name="module_C3SPlugin..install"></a>

### C3SPlugin~install(Vue, options)
Setup function for the plugin, must provide a store and a Swagger file URL

**Kind**: inner method of [<code>C3SPlugin</code>](#module_C3SPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| Vue | <code>Provided</code> |  |
| options | <code>Object</code> | Expects the store and Swagger URL |

<a name="module_c3s"></a>

## c3s

* [c3s](#module_c3s)
    * [module.exports](#exp_module_c3s--module.exports) ⏏
        * [~actions](#module_c3s--module.exports..actions) : <code>object</code>
        * [~mutations](#module_c3s--module.exports..mutations) : <code>object</code>
            * [.SET_API(state, client)](#module_c3s--module.exports..mutations.SET_API)
            * [.SET_HOST(state, h)](#module_c3s--module.exports..mutations.SET_HOST)
        * [~state](#module_c3s--module.exports..state)
        * [~getters](#module_c3s--module.exports..getters)

<a name="exp_module_c3s--module.exports"></a>

### module.exports ⏏
api

**Kind**: Exported member  
<a name="module_c3s--module.exports..actions"></a>

#### module.exports~actions : <code>object</code>
actions

**Kind**: inner namespace of [<code>module.exports</code>](#exp_module_c3s--module.exports)  
<a name="module_c3s--module.exports..mutations"></a>

#### module.exports~mutations : <code>object</code>
mutations

**Kind**: inner namespace of [<code>module.exports</code>](#exp_module_c3s--module.exports)  

* [~mutations](#module_c3s--module.exports..mutations) : <code>object</code>
    * [.SET_API(state, client)](#module_c3s--module.exports..mutations.SET_API)
    * [.SET_HOST(state, h)](#module_c3s--module.exports..mutations.SET_HOST)

<a name="module_c3s--module.exports..mutations.SET_API"></a>

##### mutations.SET\_API(state, client)
Set Swagger API client in store

**Kind**: static method of [<code>mutations</code>](#module_c3s--module.exports..mutations)  

| Param | Type |
| --- | --- |
| state | <code>Provided</code> | 
| client | <code>Object</code> | 

<a name="module_c3s--module.exports..mutations.SET_HOST"></a>

##### mutations.SET\_HOST(state, h)
Set host for Base Path

**Kind**: static method of [<code>mutations</code>](#module_c3s--module.exports..mutations)  

| Param | Type |
| --- | --- |
| state | <code>Provided</code> | 
| h | <code>String</code> | 

<a name="module_c3s--module.exports..state"></a>

#### module.exports~state
**Kind**: inner constant of [<code>module.exports</code>](#exp_module_c3s--module.exports)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [client] | <code>Object</code> | <code></code> | 
| [host] | <code>String</code> |  | 

<a name="module_c3s--module.exports..getters"></a>

#### module.exports~getters
getters

**Kind**: inner constant of [<code>module.exports</code>](#exp_module_c3s--module.exports)  
<a name="module_c3s/media"></a>

## c3s/media
<a name="module_c3s/member"></a>

## c3s/member
<a name="module_c3s/project"></a>

## c3s/project
store/modules/project.js

<a name="module_c3s/submission"></a>

## c3s/submission
<a name="module_c3s/task"></a>

## c3s/task
<a name="module_c3s/user"></a>

## c3s/user
