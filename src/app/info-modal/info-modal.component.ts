import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user.component";

/**
 * Модель информационного модального окна.
 */
export interface InfoModal {
  users: User[];
  errorText: string;
  successText: string;
  titleModal: string;
  isResponseReceived: boolean;
  isView: boolean;
}

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  /**
   * Информация для отображения на модальном окне.
   */
  @Input()
  public infoModal: InfoModal | undefined;

  /**
   * Конструктор.
   */
  constructor() { }

  /**
   * Инициализация компонента при генерации.
   */
  ngOnInit(): void {
  }

}
