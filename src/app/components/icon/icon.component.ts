import {Component, Input} from '@angular/core';
import {IconType} from "../../models/icon-type.type";
import {Note} from "../../models/note.model";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() type: IconType | undefined;

  getIconForType(type: IconType | undefined): string {
    if (!type) return '';

    switch (type) {
      case 'Message':
        return 'message';
      case 'Phone':
        return 'phone';
      case 'Coffee':
        return 'local_cafe';
      case 'Beer':
        return 'local_bar';
      case 'Meeting Note':
        return 'person';
      default:
        return 'note';
    }
  }
}
