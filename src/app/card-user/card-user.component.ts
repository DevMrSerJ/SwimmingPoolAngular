import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user.component";

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {

  /**
   * Информация о пользователе.
   */
  @Input() user: User | undefined;

}
