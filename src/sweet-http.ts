import 'cross-fetch/polyfill';

export namespace SweetHttp {
    export namespace Url {
        export class QueryString {

            private keyValMap: Map<string, string> = new Map<string, string>();

            add(key: string, value: string): QueryString {
                this.keyValMap.set(key, value);
                return this;
            }
            build(): string {
                let res: string = '?';
                this.keyValMap.forEach((value: string, key: string) => {
                    res += key + '=' + value + '&';
                });
                return res.slice(0, -1);
            }
        }
        export class Routing {

            private routes: Array<string> = new Array<string>();

            add(query: string): Routing {
                this.routes.push(query)
                return this;
            }
            build(): string {
                let res = "/";
                this.routes.forEach(route => {
                    res += route + '/';
                });
                return res.slice(0, -1);
            }
        }
    }

    export interface Activate {
        onProgress(apiName?: string): void;
        onSuccess(apiName?: string, data?: any, headers?: any): void;
        onError(apiName?: string, error?: any): void;
    }
    export interface Config{
        url:string;
        apiName?:string;
        headers?:{};
    }
    enum Method{
        Get = "GET",
        Post = "POST",
        Put = "Put",
        Delete = "Delete"
    }
    class Engine{
        static dispatch(method: Method, config: Config, activate: Activate, body?: any) {
            activate.onProgress(config.apiName);
            fetch(config.url, {
                method: method,
                body : method != Method.Get ? body : null,
                headers: config.headers ? config.headers : {}
            }).then(response => {
                response.json().then(res => {
                    activate.onSuccess(config.apiName, res, response.headers);
                })
            })
                .catch(error => {
                    activate.onError(config.apiName, error);
                })

        }
    }
    export class Get extends Engine {
        static launch(config: Config, activate: Activate) {
            this.dispatch(Method.Get,config,activate);
        }
    }
    export class Post extends Engine{
        static launch(config: Config,body:any, activate: Activate) {
            this.dispatch(Method.Post,config,activate,body);
        }
    }
    export class Put extends Engine {
        static launch(config: Config,body:any, activate: Activate) {
            this.dispatch(Method.Put,config,activate,body);
        }
    }
    export class Delete extends Engine {
        static launch(config: Config,body:any, activate: Activate) {
            this.dispatch(Method.Delete, config, activate, body);
        }
    }

}