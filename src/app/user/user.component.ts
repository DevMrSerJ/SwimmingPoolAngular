import {Component} from '@angular/core';
import {HttpService} from "../http.service";
import {InfoModal} from "../info-modal/info-modal.component";
import {InputModal} from "../input-modal/input-modal.component";
declare var $ :any;

/**
 * Модель пользователя.
 */
export interface User {
  id: string;
  login: string;
  active: boolean;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [HttpService]
})

export class UserComponent {

  /**
   * Название модального окна.
   */
  private titleModal: string = "";

  /**
   * Необходимость отображения информационного модального окна.
   */
  private isViewInfo: boolean = false;

  /**
   * Необходимость отображения модального окна с полями ввода.
   */
  private isViewInput: boolean = false;

  /**
   * Текст кнопки для запуска запросов на сервер.
   */
  private titleButtonStart: string = "";

  /**
   * Текст ошибки.
   */
  private errorText: string = "";

  /**
   * Текст успешного выполнения запроса.
   */
  private successText: string = "";

  /**
   * Массив карточек с информацией о пользователях.
   */
  private user: User[] = [];

  /**
   * Описание первого поля для ввода.
   */
  private titleIdName: string = "";

  /**
   * Описание второго поля для ввода.
   */
  private titleLoginName: string = "";

  /**
   * Описание третьего поля для ввода.
   */
  private titleActiveName: string = "";

  /**
   * Получен ли ответ от сервера.
   */
  private isResponseReceived: boolean = true;

  /**
   * Делегат обработки запросов.
   * @param request Массив параметров из формы ввода информации.
   */
  public processingModal = (request: string[]) => {};

  /**
   * Конструктор.
   */
  constructor(private httpService: HttpService) {}

  /**
   * Инициализация компонента при генерации.
   */
  ngOnInit(): void {
  }

  /**
   * Получить описывающий объект для информациооного модального окна.
   */
  getInfoModal(): InfoModal {
    return {
      users: this.user,
      errorText: this.errorText,
      successText: this.successText,
      titleModal: this.titleModal,
      isResponseReceived: this.isResponseReceived,
      isView: this.isViewInfo
    };
  }

  /**
   * Получить описывающий объект для информациооного модального окна.
   */
  getInputModal(): InputModal {
    return {
      titleModal: this.titleModal,
      titleIdName: this.titleIdName,
      titleLoginName: this.titleLoginName,
      titleActiveName: this.titleActiveName,
      errorText: this.errorText,
      titleButtonStart: this.titleButtonStart,
      isView: this.isViewInput
    };
  }

  /**
   * Установить пустые строки для описания и названия.
   */
  setEmptyTitle(): void {
    this.titleModal = "";
    this.errorText = "";

    this.user = [];

    this.titleIdName = "";
    this.titleLoginName = "";
    this.titleActiveName = "";
  }

  /**
   * Установить значения по умолчанию для поля с текстом ошибки и успеха.
   * И показать диалоговые окна для ввода данных.
   */
  setDefaultTextAndShowDialog(): void {
    this.errorText = "";
    this.successText = "";
    this.isResponseReceived = false;

    this.isViewInfo = true;
    this.isViewInput = true;
  }

  /**
   * Получить информацию обо всех пользователях Creatio.
   */
  getAllUsers(): void {
    this.setEmptyTitle();

    this.titleModal = "Получить всех пользователей";
    this.titleButtonStart = "получить данные";
    this.isResponseReceived = false;

    this.isViewInput = true;

    this.httpService.getUsers().subscribe(
      (data:any) => {
        this.isResponseReceived = true;
        data.forEach((i: string) => this.user.push(
          {
            id: "",
            login: "",
            active: true,
            name: i,
            age: -1,
            address: "",
            phone: "",
            email: ""
          }
        ));
      },
      (error) => {
        this.errorText = error.message
        console.log(error)
      });
  }

  /**
   * Показать модальное окно для информации о конкретном пользователе.
   */
  showModalOneUser(): void {
    this.setEmptyTitle();

    this.titleModal = "Получить информацию о пользователе";
    this.titleButtonStart = "получить данные";
    this.titleIdName = "Id пользователя";

    this.isViewInfo = true;

    this.processingModal = this.getOneUser;
  }

  /**
   * Получить информацию о конкретном пользователе в Creatio.
   * @param request Массив параметров из формы ввода информации.
   */
  getOneUser(request: string[]): void {
    this.setDefaultTextAndShowDialog();

    this.httpService.getInfoUser(request[0]).subscribe(
      (data:any) => {
        this.isResponseReceived = true;
        data.forEach((i: any) => this.user.push(
          {
            id: i.id,
            login: i.login,
            active: i.active,
            name: i.name,
            age: i.age,
            address: i.address,
            phone: i.phone,
            email: i.email
          }
        ));
      },
      (error) => {
        this.errorText = error.message
        console.log(error)
      });
  }

  /**
   * Показать модальное окно для создания нового пользователя Creatio.
   */
  showModalCreateUser(): void {
    this.setEmptyTitle();

    this.titleModal = "Создать нового пользователя";
    this.titleButtonStart = "создать";
    this.titleIdName = "ФИО";
    this.titleLoginName = "Логин";

    this.isViewInfo = true;

    this.processingModal = this.createUser;
  }

  /**
   * Создать нового пользователя в Creatio.
   * @param request Массив параметров из формы ввода информации.
   */
  createUser(request: string[]): void {
    this.setDefaultTextAndShowDialog();

    let body = {
      name: request[0],
      login: request[1]
    }

    this.httpService.createUser(body).subscribe(
      (data:any) => {
        this.isResponseReceived = true;
        this.successText = "Запись успешно создана";
      },
      (error) => {
        this.errorText = error.message;
        console.log(error);
      });
  }

  /**
   * Показать модальное окно для создания нового пользователя Creatio.
   */
  showModalEditUser(): void {
    this.setEmptyTitle();

    this.titleModal = "Изменить пользователя";
    this.titleButtonStart = "изменить";
    this.titleIdName = "Id пользователя";
    this.titleLoginName = "Id контакта";

    this.isViewInfo = true;

    this.processingModal = this.editCurrentUser;
  }

  /**
   * Изменить существующего пользователя Creatio.
   * @param request Массив параметров из формы ввода информации.
   */
  editCurrentUser(request: string[]): void {
    this.setDefaultTextAndShowDialog();

    let body = {
      id: request[1],
      name: "test",
      age: 0,
      address: "",
      phone: "",
      email: ""
    }

    this.httpService.editUser(request[0], body).subscribe(
      (data:any) => {
        this.isResponseReceived = true;
        this.successText = "Контакт изменен";
      },
      (error) => {
        this.errorText = error.message;
        console.log(error);
      });
  }

  /**
   * Показать модальное окно для создания нового пользователя Creatio.
   */
  showModalEditActivityUser(): void {
    this.setEmptyTitle();

    this.titleModal = "Изменить активность пользователя";
    this.titleButtonStart = "изменить";
    this.titleIdName = "Id пользователя";
    this.titleActiveName = "Активность";

    this.isViewInfo = true;

    this.processingModal = this.editActivityUser;
  }

  /**
   * Изменить существующего пользователя Creatio.
   * @param request Массив параметров из формы ввода информации.
   */
  editActivityUser(request: string[]): void {
    this.setDefaultTextAndShowDialog();

    let active = request[3] == "true";

    this.httpService.setActiveUser(request[0], active).subscribe(
      (data:any) => {
        this.isResponseReceived = true;
        this.successText = "Активность задана";
      },
      (error) => {
        this.isResponseReceived = true;
        this.errorText = error.message;
        console.log(error);
      });
  }
}
