import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Animal, PetType } from '../models/animals';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';


@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.scss'
})
export class ListEditorComponent implements OnInit {
  @Input() petType!: PetType;
  @Output() closeEditor = new EventEmitter<void>();

  PetType = PetType;
  superset: Animal[] = [];
  subset: Animal[] = [];

  petService = inject(PetService);

  ngOnInit() {
    this.superset = this.petService.getSuperset(this.petType);
    this.subset = this.petService.getSubset(this.petType);
  }

  addToSubset(animal: Animal) {
    this.subset = this.petService.addToSubset(this.subset, animal);
    console.log(`Added to subset: ${animal.name}`);
  }

  removeFromSubset(animal: Animal) {
    this.subset = this.petService.removeFromSubset(this.subset, animal);
    console.log(`Removed from subset: ${animal.name}`);
  }

  removeAllFromSubset() {
    this.subset = this.petService.removeAllFromSubset(this.petType);
  }

  addAllFromSuperset() {
    this.subset = this.petService.getSuperset(this.petType);
  }

  applyChanges() {
    this.petService.updateSubset(this.petType, this.subset);
    this.closeEditor.emit();
  }

  close() {
    this.closeEditor.emit();
  }
}
