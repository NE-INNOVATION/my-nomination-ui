import { Injectable } from "@angular/core";

export enum Environment {
    Prod = 'prod',
    Staging = 'staging',
    Test = 'test',
    Dev = 'dev',
    Local = 'local',
  }
  
  @Injectable({ providedIn: 'root' })
  export class EnvService {
    private _env: Environment;
    private _apiUrl: string;
  
    get env(): Environment {
      return this._env;
    }
  
    get apiUrl(): string {
      return this._apiUrl;
    }
  
    constructor() {}
  
    init(): Promise<void> {
      return new Promise(resolve => {
        this.setEnvVariables();
        resolve();
      });
    }
  
    private setEnvVariables(): void {
      const hostname = window && window.location && window.location.hostname;
  
      if (/^.*localhost.*/.test(hostname)) {
        this._env = Environment.Local;
        this._apiUrl = 'https://localhost:5001/';
      } else if (/^stage.apps.awsopenshift.ne-innovation/.test(hostname)) {
        this._env = Environment.Staging;
        this._apiUrl = 'http://my-nomination-api-my-nomination-stage.apps.awsopenshift.ne-innovation.com/';
      } else if (/^apps.awsopenshift.ne-innovation/.test(hostname)) {
        this._env = Environment.Prod;
        this._apiUrl = 'http://my-nomination-api-my-nomination.apps.awsopenshift.ne-innovation.com/';
      } else {
        console.warn(`Cannot find environment for host name ${hostname}`);
      }
    }
  }