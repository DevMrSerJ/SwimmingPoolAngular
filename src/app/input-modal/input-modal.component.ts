import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

/**
 * Модель модального окна с полями ввода информации.
 */
export interface InputModal {
  titleModal: string;
  titleIdName: string;
  titleLoginName: string;
  titleActiveName: string;
  errorText: string;
  titleButtonStart: string;
  isView: boolean;
}

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {

  /**
   * Информация для отображения на модальном окне.
   */
  @Input()
  public inputModal: InputModal | undefined;

  /**
   * Событие для отправки значений запроса родительскому компоненту.
   */
  @Output()
  public sendRequest = new EventEmitter<string[]>();

  /**
   * Форма для работы с полями ввода информации.
   */
  public workUserForm!: FormGroup;

  /**
   * Конструктор
   * @param fb Создатель форм.
   */
  constructor(private fb: FormBuilder) { }

  /**
   * Инициализация компонента при генерации.
   */
  ngOnInit(): void {
    this.workUserForm = this.fb.group({
      idName: "",
      loginName: "",
      thirdName: false
    });
  }

  /**
   * Обработка нажатия кнопки на модальном окне.
   */
  processingModal(): void {
    let request = [
      this.workUserForm.value.idName,
      this.workUserForm.value.loginName,
      `${this.workUserForm.value.thirdName}`
    ];

    this.sendRequest.emit(request);

    this.setEmptyInput();
  }

  /**
   * Установить значения по умолчанию для полей input.
   */
  setEmptyInput(): void {
    this.workUserForm.value.idName = "";
    this.workUserForm.value.loginName = "";
    this.workUserForm.value.activeName = false;
  }
}
