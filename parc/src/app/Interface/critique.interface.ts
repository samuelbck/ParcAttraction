// src/app/Interface/critique.interface.ts

export interface CritiqueInterface {
  id?: number; // Optionnel, pour l'identifiant de la critique
  attractionId: number; // L'identifiant de l'attraction concernée
  nom: string; // Nom de la personne (peut être "Anonyme")
  prenom: string; // Prénom de la personne (peut être "Anonyme")
  texte: string; // Le texte de la critique
  note: number; // La note donnée à l'attraction
}