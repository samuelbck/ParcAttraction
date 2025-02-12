import { Component, OnInit } from '@angular/core';
import { CritiqueService } from '../Service/critique.service';
import { CritiqueInterface } from '../Interface/critique.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.scss']
})
export class CritiqueComponent implements OnInit {
  critiques: CritiqueInterface[] = [];
  newCritique: CritiqueInterface = { attractionId: 0, nom: '', prenom: '', texte: '', note: 1 };

  constructor(private critiqueService: CritiqueService) {}

  ngOnInit(): void {
    this.loadCritiques();
  }

  loadCritiques(): void {
    this.critiqueService.getCritiques().subscribe(
      (data) => this.critiques = data,
      (error) => console.error('Erreur de chargement des critiques', error)
    );
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
  }
}
