import { Component } from '@angular/core';
import { PetService } from './services/pet.service';
import { ListEditorComponent } from './shared/list-editor/list-editor.component';
import { Animal, PetType } from './shared/models/animals';
import { CommonModule } from '@angular/common';
import { PetListComponent } from './pet-list/pet-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PetListComponent, CommonModule],
  template: `
    <main>
      <h1>Springfield Ohio Pet Inventory</h1>
      <section class="lists">
        <app-pet-list [petType]="PetType.DOG"></app-pet-list>
        <app-pet-list [petType]="PetType.CAT"></app-pet-list>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  PetType = PetType;
}
