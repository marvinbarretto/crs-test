import { Injectable, signal } from '@angular/core';
import { Animal, PetType } from '../shared/models/animals';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  // Hardcode the supersets
  private readonly dogSuperset: Animal[] = [
    { id: 1, name: 'Bulldog', traits: ['Loyal', 'Calm'] },
    { id: 2, name: 'Beagle', traits: ['Curious', 'Friendly'] },
    { id: 3, name: 'Labrador', traits: ['Friendly', 'Energetic'] },
    { id: 4, name: 'Poodle', traits: ['Intelligent', 'Alert'] },
    { id: 5, name: 'Golden Retriever', traits: ['Friendly', 'Reliable'] },
  ];

  private readonly catSuperset: Animal[] = [
    { id: 1, name: 'Persian', traits: ['Gentle', 'Quiet'] },
    { id: 2, name: 'Siamese', traits: ['Social', 'Playful'] },
    { id: 3, name: 'Maine Coon', traits: ['Gentle', 'Large'] },
    { id: 4, name: 'Sphynx', traits: ['Affectionate', 'Energetic'] },
    { id: 5, name: 'Bengal', traits: ['Active', 'Vocal'] },
  ];

  private readonly supersets = {
    [PetType.DOG]: this.dogSuperset,
    [PetType.CAT]: this.catSuperset
  };

  dogList = signal<Animal[]>(this.loadFromLocalStorage(PetType.DOG) || []);
  catList = signal<Animal[]>(this.loadFromLocalStorage(PetType.CAT) || []);

  private saveToLocalStorage(type: PetType, subset: Animal[]): void {
    const key = type === PetType.DOG ? 'dogList' : 'catList';
    localStorage.setItem(key, JSON.stringify(subset));
  }

  private loadFromLocalStorage(type: PetType): Animal[] | null {
    const key = type === PetType.DOG ? 'dogList' : 'catList';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  getSuperset(type: PetType): Animal[] {
    return [...(this.supersets[type])]
  }

  getSubset(type: PetType): Animal[] {
    return type === PetType.DOG ? this.dogList() : this.catList();
  }

  updateSubset(type: PetType, subset: Animal[]): void {
    if (type === PetType.DOG) {
      this.dogList.set(subset);
    } else {
      this.catList.set(subset);
    }
    this.saveToLocalStorage(type, subset);
  }

  addToSubset(subset: Animal[], animal: Animal): Animal[] {
    return subset.includes(animal) ? subset : [...subset, animal];
  }

  removeFromSubset(subset: Animal[], animal: Animal): Animal[] {
    return subset.filter(a => a !== animal);
  }

  removeAllFromSubset(type: PetType): Animal[] {
    return [];
  }
}
