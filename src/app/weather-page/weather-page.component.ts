import { Component, OnInit } from '@angular/core';

import {HttpService} from "../http.service";

/**
 * Модель погоды.
 */
interface Weather {
  date: string,
  dayTemperature: number,
  nightTemperature: number,
  humidity: number,
  windSpeed: number,
  clouds: number,
  pop: number
}

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: [
    './weather-page.component.css',
    "../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
  ],
  providers: [HttpService]
})
export class WeatherPageComponent implements OnInit {

  /**
   * Массив моделей проноза погоды.
   */
  public weather: Weather[] = [];

  /**
   * Долгота.
   * @private
   */
  private _longitude: number = 0;

  /**
   * Широта.
   * @private
   */
  private _latitude: number = 0;

  /**
   * Наименование города, в котором находится пользователь.
   * @private
   */
  private _nameCity: string = "";

  /**
   * Конструктор.
   * @param httpService Сервис для работы с http запросами.
   */
  constructor(private httpService: HttpService) { }

  /**
   * Инициализация компонента при генерации.
   */
  ngOnInit(): void {
    this.setLocation();
  }

  /**
   * Получить и установить широту и долготу местоположения пользователя.
   */
  setLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this._longitude = position.coords.longitude;
        this._latitude = position.coords.latitude;

        this.sendMessageForGetCity();
        this.sendMessageForGetWeather();
      });
    } else {
      console.log("Получить геоданные не удалось.");
      alert("Геоданные получить не удалось.\nРазрешите использовать геоданные и перезагрузите страницу");
    }
  }

  /**
   * Получить долготу.
   */
  public getLongitude(): number {
    return this._longitude;
  }

  /**
   * Получить широту.
   */
  public getLatitude(): number {
    return this._latitude;
  }

  /**
   * Получить название города.
   */
  public getNameCity(): string {
    return this._nameCity;
  }

  /**
   * Отправить запрос для установки названия города.
   * @private
   */
  private sendMessageForGetCity(): void {
    this.httpService.getNameCity(this._longitude, this._latitude).subscribe(
      (data:any) => {
        this._nameCity = data.name;
      },
      (error) => {
        alert("Возникла ошибка. Посмотреть консоль.");
        console.log(error);
      });
  }

  /**
   * Отправить запрос для получения прогноза погоды в текущей местности.
   * @private
   */
  private sendMessageForGetWeather(): void {
    this.httpService.getWeather(this._longitude, this._latitude).subscribe(
      (data:any) => {
        data.daily.forEach((i: any) => this.weather.push(
          {
            date: new Date(i.dt * 1000).toDateString(),
            dayTemperature: i.temp.day,
            nightTemperature: i.temp.night,
            humidity: i.humidity,
            windSpeed: i.wind_speed,
            clouds: i.clouds,
            pop: i.pop * 100
          }
        ));
      },
      (error) => {
        alert("Возникла ошибка. Посмотреть консоль.");
        console.log(error);
      });
  }
}
