import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from "../environments/environment";

@Injectable()
export class HttpService{

  /**
   * Конструктор.
   * @param http http клиент для отправки запросов.
   */
  constructor(private http: HttpClient){ }

  /**
   * Получить всех пользователей Creatio.
   */
  getUsers(){
    return this.http.get(environment.apiCreatio.mainUrl);
  }

  /**
   * Получить информацию о конкретном пользователе.
   * @param id Id пользователя.
   */
  getInfoUser(id: string){
    return this.http.get(environment.apiCreatio.mainUrl + id);
  }

  /**
   * Создать пользователя.
   * @param body Объект пользователя.
   */
  createUser(body: any){
    return this.http.post(environment.apiCreatio.mainUrl, body);
  }

  /**
   * Изменить параметры пользователя.
   * @param id Id пользователя.
   * @param body Объект, описывающий пользователя.
   */
  editUser(id: string, body: any){
    return this.http.put(environment.apiCreatio.mainUrl + id, body);
  }

  /**
   * Установить активность пользователя.
   * @param id Id пользователя.
   * @param body Объект, описывающий пользователя.
   */
  setActiveUser(id:string, body:any){
    return this.http.post(environment.apiCreatio.mainUrl + id, body);
  }

  /**
   * Получить наименование города.
   * @param longitude Долгота.
   * @param latitude Широта.
   */
  getNameCity(longitude: number, latitude: number) {
    return this.http.get(environment.apiCity.urlCity + latitude + "&lon=" + longitude + "&appid=" + environment.apiCity.key);
  }

  /**
   * Получить прогноз погоды.
   * @param longitude Долгота.
   * @param latitude Широта.
   */
  getWeather(longitude: number, latitude: number) {
    return this.http.get(environment.apiCity.urlWeather + latitude + "&lon=" + longitude + "&appid=" + environment.apiCity.key);
  }
}
