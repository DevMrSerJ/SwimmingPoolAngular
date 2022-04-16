// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /**
   * Константы для работы с api получения прогноза погоды.
   */
  apiCity: {
    /**
     * Токен.
     */
    key: "055ac60fbb6d05cdcbaf79410f07d5a7",

    /**
     * Api получения наименования города.
     */
    urlCity: "https://api.openweathermap.org/data/2.5/weather?lang=ru&lat=",

    /**
     * Api получения погоды.
     */
    urlWeather: "https://api.openweathermap.org/data/2.5/onecall?lang=ru&units=metric&lat="
  },

  /**
   * Константы для работы с api Creatio.
   */
  apiCreatio: {
    /**
     * Основной адрес обращения.
     */
    mainUrl: "https://localhost:44320/api/v2/Users/"
  },

  /**
   * Константы для работы с api отображения географической карты.
   */
  mapBox: {
    /**
     * Токен.
     */
    accessKey: "pk.eyJ1IjoiZGV2bXJzZXJqIiwiYSI6ImNsMGdzM2FtMjAwbXgzY2xlNWpndzBlM3MifQ.DhNg2ng15Rav6iVhXx_rCA"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
