import { Component, OnInit } from '@angular/core';
import { CritiqueService } from '../Service/critique.service';
import { AttractionService } from '../Service/attraction.service';
import { ActivatedRoute } from '@angular/router';
import { CritiqueInterface } from '../Interface/critique.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AttractionInterface } from '../Interface/attraction.interface';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.scss']
})
export class CritiqueComponent implements OnInit {
  critiques: CritiqueInterface[] = [];
  attractionId: number = 0;
  attraction: AttractionInterface | null = null;
  newCritique: CritiqueInterface = { attractionId: 0, nom: '', prenom: '', texte: '', note: 1 };

  constructor(
    private critiqueService: CritiqueService,
    private attractionService: AttractionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.attractionId = +id;
        this.loadCritiques();
        this.loadAttraction();
      }
    });
  }

  loadAttraction(): void {
    this.attractionService.getAttraction(this.attractionId).subscribe(
      (attraction) => this.attraction = attraction,
      (error) => console.error("Erreur de chargement de l'attraction", error)
    );
  }

  loadCritiques(): void {
    this.critiqueService.getCritiques().subscribe(
      (data) => this.critiques = data.filter(critique => critique.attractionId === this.attractionId),
      (error) => console.error('Erreur de chargement des critiques', error)
    );
  }

  onSubmit(): void {
    if (!this.newCritique.nom.trim() || !this.newCritique.texte.trim()) return;

    this.newCritique.attractionId = this.attractionId;

    this.critiqueService.addCritique(this.newCritique).subscribe(
      (data) => {
        this.critiques.push(data);
        this.newCritique.nom = '';
        this.newCritique.prenom = '';
        this.newCritique.texte = '';
        this.newCritique.note = 1;
      },
      (error) => console.error('Erreur lors de l\'ajout', error)
    );
  }

  getStars(rating: number): string[] {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: string[] = Array(fullStars).fill('full');

    if (hasHalfStar) {
      stars.push('half');
    }

    return [...stars, ...Array(maxStars - stars.length).fill('empty')];
  }

  moyenneNotes(): number {
    if (this.critiques.length === 0) return 0;

    const totalNotes = this.critiques.reduce((sum, critique) => sum + critique.note, 0);
    return parseFloat((totalNotes / this.critiques.length).toFixed(1));
  }
}
