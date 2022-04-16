import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: 'start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  /**
   * Конструктор.
   * @param router Объект для работы с роутингом.
   */
  constructor(private router: Router) { }

  /**
   * Инициализация компонента при генерации.
   */
  ngOnInit(): void {
  }

  /**
   * Переход на основную страницу работы системы.
   * @constructor
   */
  StartWork(): void {
    this.router.navigateByUrl('/user');
  }
}
