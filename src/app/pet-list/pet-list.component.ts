import { Component, Input } from '@angular/core';
import { PetService } from '../services/pet.service';
import { PetType } from '../shared/models/animals';
import { ListEditorComponent } from '../shared/list-editor/list-editor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [ListEditorComponent, CommonModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.scss'
})
export class PetListComponent {
  @Input() petType!: PetType;
  isModalVisible = false;
  PetType = PetType;

  constructor(public petService: PetService) {}

  openEditor(): void {
    this.isModalVisible = true;
  }

  closeEditor(): void {
    this.isModalVisible = false;
  }
}
