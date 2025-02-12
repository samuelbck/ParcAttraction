import { Component, OnInit } from '@angular/core';
import { CritiqueService } from '../Service/critique.service';
import { AttractionService } from '../Service/attraction.service';
import { CritiqueInterface } from '../Interface/critique.interface';
import { AttractionInterface } from '../Interface/attraction.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.scss']
})
export class CritiqueComponent implements OnInit {
  critiques: CritiqueInterface[] = [];
  attractions: AttractionInterface[] = [];
  newCritique: CritiqueInterface = { attractionId: 0, nom: '', prenom: '', texte: '', note: 1 };

  constructor(
    private critiqueService: CritiqueService,
    private attractionService: AttractionService
  ) {}

  ngOnInit(): void {
    this.loadCritiques();
    this.loadAttractions();
  }

  loadCritiques(): void {
    this.critiqueService.getCritiques().subscribe(
      (data) => this.critiques = data,
      (error) => console.error('Erreur de chargement des critiques', error)
    );
  }

  loadAttractions(): void {
    this.attractionService.getAllAttraction().subscribe(
      (data) => this.attractions = data,
      (error) => console.error('Erreur de chargement des attractions', error)
    );
  }

  getAttractionName(attractionId: number): string {
    const attraction = this.attractions.find(a => a.attraction_id === attractionId);
    return attraction ? attraction.nom : 'Attraction inconnue';
  }

  onSubmit(): void {
    if (!this.newCritique.nom || !this.newCritique.texte) return;

    this.critiqueService.addCritique(this.newCritique).subscribe(
      (data) => {
        this.critiques.push(data);
        this.newCritique = { attractionId: 0, nom: '', prenom: '', texte: '', note: 1  };
      },
      (error) => console.error('Erreur lors de l\'ajout', error)
    );
    this.loadAttractions();
    this.loadCritiques();
  }
}