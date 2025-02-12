import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { CritiqueInterface } from '../Interface/critique.interface';
import { CritiqueService } from '../Service/critique.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  critiques: CritiqueInterface[] = [];
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction()

  constructor(
    private critiqueService: CritiqueService,
    private attractionService: AttractionService
  ) {}

  ngOnInit(): void {
    this.loadCritiques();
  }

  loadCritiques(): void {
    this.critiqueService.getCritiques().subscribe(
      (data) => this.critiques = data,
      (error) => console.error('Erreur de chargement des critiques', error)
    );
  }

  moyenneNotes(attractionId: number | null): number {
    if (attractionId === null) {
      return 0;
    }
  
    const critiquesAttraction = this.critiques.filter(
      (critique: CritiqueInterface) => critique.attractionId === attractionId
    );
  
    if (critiquesAttraction.length === 0) {
      return 0;
    }
  
    const totalNotes = critiquesAttraction.reduce(
      (sum: number, critique: CritiqueInterface) => sum + critique.note,
      0
    );
  
    return totalNotes / critiquesAttraction.length;
  }

  getStars(rating: number): any[] {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    const emptyStars = maxStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }
}
