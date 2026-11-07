// Communiqués de presse ACSF Assurances

export interface PressArticle {
  id: string;
  title: string;
  date: string;
  place: string;
  paragraphs: string[];
}

export const PRESS_ARTICLES: Record<string, PressArticle> = {
  'presse-campagne': {
    id: 'presse-campagne',
    title: 'L’assurance vie, l’épargne n°1 qui protège ceux que vous aimez : ACSF révèle les 8 erreurs que font les gens',
    date: '15/01/2026',
    place: 'Abidjan, le 15 janvier 2026',
    paragraphs: [
      'Abidjan, le 15 janvier 2026 – ACSF Assurances, Conseils & Services Financiers, lance une grande campagne de sensibilisation dédiée à l’assurance vie, l’épargne n°1 qui protège ceux que vous aimez.',
      'Souvent mal comprise ou mal utilisée, l’assurance vie recèle pourtant une puissance patrimoniale incomparable : protection de la famille, constitution d’épargne, préparation de la retraite et transmission optimisée du capital.',
      'À travers cette campagne, ACSF met en lumière les 8 erreurs les plus fréquentes que font les gens : se fier à son banquier, attendre pour souscrire une AV, ouvrir un seul contrat, utiliser l’AV que pour le fonds en euros, épargner uniquement un placement à court terme, désigner un seul bénéficiaire en cas de décès, racheter ses contrats quand le marché baisse, ou encore ne désigner que des membres de sa famille.',
      '« Évitez ces erreurs pour assurer les coups de la vie », résume la brochure officielle ACSF. Chaque erreur évitée, c’est une épargne sécurisée et des proches mieux protégés.',
      'Gestionnaires de risques, les experts d’ACSF accompagnent les entreprises et les particuliers dans le choix, la souscription et le pilotage de leurs contrats. ACSF est bien plus qu’un courtier : un véritable interface avec les marchés d’assurances.',
      'Nos conseils s’articulent autour de 3 axes : les assurances, la protection des capitaux et la garantie financière.',
      'ACSF : votre partenaire de confiance. Anticiper aujourd’hui, protéger demain. Pour toute question, contactez-nous au +225 07 57 97 80 80 / +225 01 53 63 93 93 ou à infos.acsf@gmail.com — Immeuble Harmonies, Plateau, Abidjan.',
    ],
  },
  'presse-partenaire': {
    id: 'presse-partenaire',
    title: 'ACSF Assurances confirme sa position de partenaire de confiance en assurances, conseils & services financiers à Abidjan',
    date: '12/11/2025',
    place: 'Abidjan, le 12 novembre 2025',
    paragraphs: [
      'Abidjan, le 12 novembre 2025 – ACSF Assurances, Conseils & Services Financiers, société de courtage spécialisée, affirme son rôle de partenaire de confiance des entreprises et des particuliers en Côte d’Ivoire.',
      'Basée au cœur du Plateau d’Abidjan, au sein de l’Immeuble Harmonies, l’équipe d’ACSF met son expertise au service de la maîtrise des risques : identification, analyse, couverture et accompagnement jusqu’au règlement des sinistres.',
      '« Nous sommes des gestionnaires de risques. Mais surtout, ACSF est bien plus qu’un courtier : un véritable interface avec les marchés d’assurances », rappelle la direction d’ACSF.',
      'Nos conseils s’organisent en 3 axes complémentaires : les assurances pour protéger les personnes et les biens ; la protection des capitaux pour sécuriser l’épargne et le patrimoine ; la garantie financière pour sécuriser les engagements contractuels.',
      'Cette approche globale permet à nos clients d’anticiper les imprévus, de protéger ceux qu’ils aiment et de développer leur activité en toute sérénité.',
      'ACSF : votre partenaire de confiance. Anticiper aujourd’hui, protéger demain.',
      'Contact : ACSF Assurances – Immeuble Harmonies, Plateau, Abidjan – +225 07 57 97 80 80 / +225 01 53 63 93 93 – infos.acsf@gmail.com.',
    ],
  },
};
