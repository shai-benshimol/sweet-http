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
        //Open Popup dialog with error message
    }
}

