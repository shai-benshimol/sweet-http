# sweet-http

Small Typescript Http Request Callback Based on Fetch!


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

##### Using NPM
```bash
$ npm install --save sweet-http
```
##### Using Yarn
```bash
$ yarn add sweet-http
```
## Usage
* [Implementation](#Implemetation)
* [URL Generation](#Url-Generation)
  * [Routing](#Routing)
  * [QueryString](#QueryString)
* [Http GET](#Http-GET)
* [Http POST](#Http-POST)
* [Http PUT](#Http-PUT)
* [Http DELETE](#Http-DELETE)

## Implemetation
```typescript
import { SweetHttp } from "sweet-http";

class Api implements SweetHttp.Activate {
    constructor(){
       ...
    }
    onProgress(apiName?: string): void {
       ...
    } 
    onSuccess(apiName?: string , data?: any,headers?:any): void {
       
    }
    onError(apiName?: string , error?: any): void {
       ...
    }
}
```

## Url Generation
### Routing
```Typescript
let url = "https://baseurl" + new SweetHttp.Url.Routing().add("login").add("id").build()

// Output
https://baseurl/login/id
```
### QueryString
```Typescript
let url = "https://baseurl" + new SweetHttp.Url.QueryString().add("q","login").add("id","123").build()

// Output
https://baseurl?q=login&id=123
```
## Http GET
```Typescript
import { SweetHttp } from "../sweet-http";

interface User {
    id: string;
    email: string;
    age: number;
    isActive: boolean;
}
class Api implements SweetHttp.Activate {

    private readonly url: string = 'https://base_url/users';
    private readonly login: string = "login-api";
    private readonly logout: string = "logout-api"

    onClickLogin(id: string) {
        SweetHttp.Get.launch({
            url: this.url + new SweetHttp.Url.Routing().add(id).build(),
            apiName: this.login
        }, this);
    }
    onClickLogout(id: string) {
        SweetHttp.Get.launch({
            url: this.url + new SweetHttp.Url.Routing().add(id).build(),
            apiName: this.logout
        }, this);
    }
    onProgress(apiName?: string): void {
        //Do somthing on progress
    }
    onSuccess(apiName?: string, data?: any, headers?: any): void {
       
        switch (apiName) {
            
            case this.login: 
                let user: User = data;
                break;
       
            case this.logout:
                // Go to login page
                break;
        }
    }
    onError(apiName?: string, error?: any): void {
        //You can handle error by apiName and display message accordingly.
    }
}
```
## Http POST
```Typescript
class Api implements SweetHttp.Activate {

    private readonly url: string = 'https://base_url/users';
    private readonly postUser: string = "postUser";

    constructor(){
        let user:User = {
            email:"john@doe.com",
            age:50,
            isActive:true
        }

        SweetHttp.Post.launch({
            url: this.url,
            apiName: this.postUser
        }, user, this);
    }
    onProgress(apiName?: string): void {
        //Do somthing on progress
    }
    onSuccess(apiName?: string, data?: any, headers?: any): void {
       
        let token = headers["Authorization"];
    }
    onError(apiName?: string, error?: any): void {
        //You can handle error by apiName and display message accordingly.
    }
}
```
## Http PUT
```Typescript
class Api implements SweetHttp.Activate {

    private readonly url: string = 'https://base_url/users';
    private readonly putUser: string = "putUser";

    constructor(){
        let user:User = {
            id:"xxx",
            email:"john@doe.com",
            age:21,
            isActive:false
        }

        SweetHttp.Put.launch({
            url: this.url,
            apiName: this.postUser
        }, user, this);
    }
    onProgress(apiName?: string): void {
        //Do somthing on progress
    }
    onSuccess(apiName?: string, data?: any, headers?: any): void {
       
        console.log(data.message)
    }
    onError(apiName?: string, error?: any): void {
        //You can handle error by apiName and display message accordingly.
    }
}
```
## Http DELETE
```Typescript
class Api implements SweetHttp.Activate {

    private readonly url: string = 'https://base_url/users';
    private readonly deleteUser: string = "deleteUser";

    constructor(){

        SweetHttp.delete.launch({
            url: this.url,
            apiName: this.postUser
        }, user.id, this);
    }
    onProgress(apiName?: string): void {
        //Do somthing on progress
    }
    onSuccess(apiName?: string, data?: any, headers?: any): void {
       
        console.log(data.message)
    }
    onError(apiName?: string, error?: any): void {
        //You can handle error by apiName and display message accordingly.
    }
}
```