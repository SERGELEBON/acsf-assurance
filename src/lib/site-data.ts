// Données du site ACSF Assurances — Assurances, Conseils & Services Financiers
// Contenu issu de la brochure officielle ACSF et des informations de la page

export type PageId =
  | 'accueil'
  | 'nous-connaitre'
  | 'entreprises'
  | 'particuliers'
  | 'sante'
  | 'protection-capitaux'
  | 'garantie-financiere'
  | 'medias'
  | 'carrieres'
  | 'contactez-nous'
  | 'mentions-legales'
  | 'protection-donnees'
  | 'gestion-cookies'
  | 'presse-campagne'
  | 'presse-partenaire';

// ---------------- Identité de la société ----------------

export const COMPANY = {
  name: 'ACSF Assurances',
  fullName: 'ACSF Assurances, Conseils & Services Financiers',
  shortDesc:
    'ACSF-ASSURANCES est une société de courtage spécialisée en assurances, conseils & services financiers.',
  longDesc:
    'ACSF-ASSURANCES est une société de courtage spécialisée en assurances, conseils & services financiers. Gestionnaires de risques et véritable interface avec les marchés d’assurances, nous accompagnons les entreprises et les particuliers afin d’anticiper aujourd’hui et protéger demain.',
  address: 'Immeuble Harmonies, Plateau – Abidjan, Côte d’Ivoire',
  addressLines: ['Immeuble Harmonies', 'Plateau – Abidjan', 'Côte d’Ivoire'],
  phones: ['+225 07 57 97 80 80', '+225 01 53 63 93 93'],
  phoneLinks: ['tel:+2250757978080', 'tel:+2250153639393'],
  email: 'infos.acsf@gmail.com',
  slogan: 'Anticiper aujourd’hui, protéger demain.',
  baseline: 'ACSF : votre partenaire de confiance.',
};

// ---------------- Navigation ----------------

export interface MenuItem {
  label: string;
  page?: PageId;
  anchor?: string;
  children?: MenuItem[];
  groupLabel?: string;
}

export const NAV: MenuItem[] = [
  {
    label: 'À Propos',
    children: [
      { label: 'Nous Connaître', page: 'nous-connaitre' },
      { label: 'Nos expertises', page: 'nous-connaitre', anchor: 'expertises-section' },
      { label: 'Nos valeurs', page: 'nous-connaitre', anchor: 'valeurs-section' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Entreprises', page: 'entreprises' },
      { label: 'Particuliers', page: 'particuliers' },
      { label: 'Santé & Prévoyance', page: 'sante' },
      { label: 'Protection des capitaux', page: 'protection-capitaux' },
      { label: 'Garantie financière', page: 'garantie-financiere' },
    ],
  },
  { label: 'Médias', page: 'medias' },
  { label: 'Carrières', page: 'carrieres' },
  { label: 'Contact', page: 'contactez-nous' },
];

// ---------------- Compteurs ----------------

export const COUNTERS = [
  { value: 3, suffix: '', label: 'axes de conseil' },
  { value: 8, suffix: '', label: 'erreurs à éviter' },
  { value: 100, suffix: '%', label: 'votre partenaire de confiance' },
];

// ---------------- Solutions ----------------

export interface Product { name: string; desc: string }

export const SOLUTIONS_CARDS = [
  { label: 'ENTREPRISES', page: 'entreprises' as PageId, image: '/images/acsf-entreprises.jpg', desc: 'Comprendre votre activité pour mieux protéger vos enjeux. Chez ACSF, nous concevons des solutions d’assurance sur mesure, adaptées à votre secteur, à vos besoins et à vos objectifs.' },
  { label: 'PARTICULIERS', page: 'particuliers' as PageId, image: '/images/acsf-particuliers.jpg', desc: 'L’assurance vie, l’épargne n°1 qui protège ceux que vous aimez ! Des solutions adaptées à vos besoins, votre mode de vie et votre budget, pour vous offrir sérénité et tranquillité d’esprit.' },
  { label: 'SANTÉ & PRÉVOYANCE', page: 'sante' as PageId, image: '/images/acsf-sante.jpg', desc: 'Parce que la santé de vos collaborateurs et de vos proches est un enjeu essentiel, ACSF conçoit et pilote des régimes santé performants, durables et adaptés à vos attentes.' },
  { label: 'PROTECTION DES CAPITAUX', page: 'protection-capitaux' as PageId, image: '/images/acsf-capitaux.jpg', desc: 'Préservez la valeur de votre patrimoine et sécurisez vos capitaux grâce à des solutions de protection adaptées à vos objectifs patrimoniaux et familiaux.' },
  { label: 'GARANTIE FINANCIÈRE', page: 'garantie-financiere' as PageId, image: '/images/acsf-garantie.jpg', desc: 'Facilitez vos engagements contractuels grâce à nos solutions de cautions et de garanties financières, adaptées aux entreprises comme aux particuliers.' },
];

// Les 8 erreurs à éviter (brochure officielle ACSF)
export const ERREURS_ASSURANCE_VIE: { icon: string; title: string }[] = [
  { icon: 'Landmark', title: 'Se fier à son banquier' },
  { icon: 'Hourglass', title: 'Attendre pour souscrire une AV' },
  { icon: 'FileWarning', title: 'Ouvrir un seul contrat d’AV' },
  { icon: 'Coins', title: 'Utiliser l’AV que pour le fonds en euros' },
  { icon: 'Clock', title: 'Épargner uniquement un placement à court terme' },
  { icon: 'UserX', title: 'Désigner un seul bénéficiaire en cas de décès' },
  { icon: 'TrendingDown', title: 'Racheter ses contrats quand le marché baisse' },
  { icon: 'Users', title: 'Désigner que des membres de sa famille' },
];

// Nos conseils en 3 axes (brochure officielle ACSF)
export const CONSEILS_AXES = [
  { name: 'ASSURANCES', desc: 'Protégez ce qui compte : vie, santé, auto, habitation, biens professionnels, transport… Nous vous orientons vers les contrats des meilleurs assureurs du marché.' },
  { name: 'PROTECTION DES CAPITAUX', desc: 'Sécurisez votre épargne et votre patrimoine. Nous structurons des solutions pour préserver vos capitaux et optimiser leur transmission à ceux que vous aimez.' },
  { name: 'GARANTIE FINANCIÈRE', desc: 'Cautions, garanties de paiement, assurance-crédit : nous vous accompagnons pour sécuriser vos engagements contractuels et votre trésorerie.' },
];

export const EXPERTISES = [
  { name: 'Conseil', desc: 'Transformez vos risques en opportunités grâce à un conseil personnalisé et indépendant.' },
  { name: 'Courtage', desc: 'Bénéficiez d’un accès privilégié aux meilleurs marchés d’assurances, en Côte d’Ivoire et à l’international.' },
  { name: 'Gestion des risques', desc: 'Gestionnaires de risques, nous identifions, analysons et couvrons vos risques au quotidien.' },
  { name: 'Santé & Prévoyance', desc: 'Facilitez l’accès aux soins et protégez vos proches grâce à des régimes adaptés à chaque situation.' },
];

// ---------------- Produits ----------------

export const ENTREPRISES_CATEGORIES: { cat: string; products: Product[] }[] = [
  {
    cat: 'RESPONSABILITÉ CIVILE',
    products: [
      { name: 'Générale', desc: 'Préservez votre activité face aux conséquences financières des dommages causés à des tiers grâce à des solutions adaptées à vos opérations et aux exigences de votre secteur.' },
      { name: 'Produits', desc: 'Sécurisez la mise sur le marché de vos produits grâce à des garanties conçues pour protéger votre entreprise contre les conséquences d’un défaut ou d’un vice de vos produits.' },
      { name: 'Environnementale', desc: 'Anticipez les risques environnementaux liés à vos activités grâce à des solutions couvrant les conséquences d’une pollution accidentelle et les coûts de remédiation.' },
      { name: 'Cyber assurance', desc: 'Renforcez la résilience de votre entreprise face aux cybermenaces grâce à des solutions couvrant notamment les atteintes aux données, les rançongiciels et les interruptions d’activité.' },
      { name: 'Médicale / Professionnels de santé', desc: 'Exercez votre activité en toute sérénité grâce à des solutions adaptées aux professionnels de santé, couvrant notamment la responsabilité civile professionnelle.' },
      { name: 'Construction', desc: 'Sécurisez vos projets grâce à des solutions couvrant notamment la Responsabilité Civile du maître d’ouvrage, les responsabilités professionnelles et diverses.' },
    ],
  },
  {
    cat: 'DOMMAGES AUX BIENS',
    products: [
      { name: 'Multirisque professionnelle (MRP)', desc: 'Protégez vos locaux, équipements et stocks grâce à des solutions couvrant notamment l’incendie, le dégât des eaux, le vol, le bris de machine et les catastrophes naturelles.' },
      { name: 'Bris de machine', desc: 'Préservez la continuité de vos activités grâce à des solutions couvrant les dommages accidentels affectant vos équipements industriels, techniques ou informatiques.' },
      { name: 'Tous risques informatiques', desc: 'Sécurisez vos infrastructures numériques grâce à des solutions couvrant les équipements informatiques, les pertes de données et les frais de reconstitution.' },
      { name: 'Assurance construction', desc: 'Accompagnez vos projets à chaque étape grâce à des solutions couvrant notamment les assurances Tous Risques Chantier, Tous Risques Montage et les dommages aux ouvrages.' },
    ],
  },
  {
    cat: 'PERTES FINANCIÈRES',
    products: [
      { name: 'Pertes d’exploitation', desc: 'Préservez la continuité de votre activité grâce à des solutions couvrant la perte de marge brute, les frais fixes et les surcoûts engagés à la suite d’un sinistre.' },
      { name: 'Crédit / Défaut client', desc: 'Sécurisez votre développement grâce à des solutions protégeant votre entreprise contre les impayés, l’insolvabilité et les retards de paiement.' },
      { name: 'Caution / Garantie financière', desc: 'Facilitez vos engagements contractuels grâce à des solutions de cautions et garanties financières couvrant notamment les marchés publics et les obligations contractuelles.' },
      { name: 'Fraude & malveillance interne', desc: 'Renforcez la protection de votre entreprise grâce à des solutions couvrant les détournements de fonds, les abus de confiance et les actes de fraude ou de malveillance.' },
    ],
  },
  {
    cat: 'RESSOURCES HUMAINES ET PRÉVOYANCE COLLECTIVE',
    products: [
      { name: 'Mutuelle d’entreprise', desc: 'Accompagnez le bien-être de vos collaborateurs grâce à des solutions santé collectives adaptées aux besoins de votre entreprise et de vos équipes.' },
      { name: 'Prévoyance collective', desc: 'Renforcez la protection de vos collaborateurs grâce à des solutions couvrant notamment l’arrêt de travail, l’invalidité, le décès et le maintien des revenus.' },
      { name: 'Assurance homme-clé', desc: 'Préservez la continuité de votre activité grâce à des solutions protégeant l’entreprise contre les conséquences financières liées à la perte d’un dirigeant ou collaborateur clé.' },
      { name: 'Plan d’épargne retraite collectif (PERCOL)', desc: 'Dispositif d’épargne salariale permettant aux employés de se constituer une retraite complémentaire avec abondement possible de l’employeur et avantages fiscaux.' },
    ],
  },
  {
    cat: 'TRANSPORT ET LOGISTIQUE',
    products: [
      { name: 'Marchandises transportées', desc: 'Sécurisez vos flux commerciaux grâce à des solutions couvrant les marchandises transportées par voie terrestre, maritime, aérienne ou multimodale.' },
      { name: 'Corps de navire / Aviation', desc: 'Protégez vos actifs stratégiques grâce à des solutions couvrant les dommages matériels, les pertes totales et les risques affectant les navires et aéronefs.' },
      { name: 'Responsabilité du transporteur', desc: 'Exercez votre activité en toute sérénité grâce à des solutions couvrant la responsabilité du transporteur pour les dommages causés aux marchandises.' },
      { name: 'Flotte automobile professionnelle', desc: 'Optimisez la gestion de votre parc automobile grâce à des solutions couvrant la responsabilité civile, les dommages tous accidents, le vol et l’incendie.' },
    ],
  },
  {
    cat: 'SECTEURS SPÉCIALISÉS',
    products: [
      { name: 'Agricole', desc: 'Accompagnez les exploitations agricoles grâce à des solutions couvrant notamment les aléas climatiques, les pertes de récoltes, le cheptel et les équipements.' },
      { name: 'Risques politiques', desc: 'Sécurisez vos investissements et opérations internationales grâce à des solutions couvrant notamment l’expropriation, les troubles politiques et la non-conversion.' },
      { name: 'Amont énergétique', desc: 'Accompagnez les acteurs du secteur énergétique grâce à des solutions couvrant les activités d’exploration, de production, de transport et de distribution.' },
    ],
  },
];

export const PARTICULIERS_CATEGORIES: Product[] = [
  { name: 'ASSURANCE-VIE', desc: 'L’épargne n°1 qui protège ceux que vous aimez ! Valorisez votre patrimoine, préparez vos projets et protégez vos bénéficiaires grâce à des contrats d’assurance vie adaptés à vos objectifs.' },
  { name: 'SANTÉ', desc: 'Facilitez votre accès aux soins grâce à des solutions santé conçues pour vous accompagner au quotidien et simplifier vos démarches.' },
  { name: 'AUTOMOBILE', desc: 'Roulez l’esprit tranquille grâce à des garanties adaptées à votre véhicule et à votre usage, de la responsabilité civile à la tous risques.' },
  { name: 'HABITATION', desc: 'Protégez votre logement et vos biens contre les imprévus du quotidien : incendie, dégât des eaux, vol et responsabilités.' },
  { name: 'ACCIDENTS DE LA VIE', desc: 'Protégez-vous contre les conséquences financières des accidents de la vie privée grâce à une couverture adaptée à votre situation.' },
  { name: 'PRÉVOYANCE', desc: 'Sécurisez vos revenus et ceux de votre famille en cas d’arrêt de travail, d’invalidité ou de décès, pour maintenir votre niveau de vie.' },
  { name: 'RETRAITE', desc: 'Préparez l’avenir en construisant une épargne complémentaire pour préserver votre niveau de vie au moment de la retraite.' },
  { name: 'SCOLARITÉ', desc: 'Assurez l’avenir de vos enfants grâce à des solutions d’épargne et d’assurance dédiées à leur éducation et à leurs études.' },
  { name: 'VOYAGE', desc: 'Voyagez en toute sérénité grâce à des solutions d’assurance adaptées à votre voyage et à votre destination.' },
];

export const SANTE_SERVICES: Product[] = [
  { name: 'TIERS-PAYANT', desc: 'ACSF met en place des solutions de tiers-payant permettant aux assurés d’accéder aux soins sans avance de frais dans les centres de santé éligibles.' },
  { name: 'CONTRÔLE MÉDICAL', desc: 'Nos médecins-conseils animent le réseau médical, harmonisent les tarifs, contrôlent les hospitalisations et assurent le suivi des données épidémiologiques.' },
  { name: 'PORTAIL DRH', desc: 'Un extranet dédié permet aux clients de suivre leurs contrats, consulter les statistiques et gérer en ligne les incorporations ou retraits.' },
  { name: 'IDENTIFICATION BIOMÉTRIQUE', desc: 'La carte biométrique sécurise l’identification des bénéficiaires et garantit une reconnaissance fiable des assurés.' },
  { name: 'CARTE INTERNATIONALE', desc: 'Adaptée aux assurés mobiles, la carte internationale assure la continuité du tiers-payant à l’étranger dans les centres de soins éligibles.' },
  { name: 'ANALYSE ET MAÎTRISE DES DÉPENSES', desc: 'Des outils de reporting fournissent des statistiques détaillées afin d’aider les clients à maîtriser leurs dépenses et limiter les risques de surconsommation.' },
];

// ---------------- Valeurs & engagements ----------------

export const VALEURS = [
  { name: 'Confiance', roles: ['ACSF est votre partenaire de confiance : transparence, loyauté et engagement à chaque étape de notre collaboration.'] },
  { name: 'Proximité', roles: ['Basés à Abidjan Plateau, nos experts restent à vos côtés pour vous écouter, vous conseiller et vous accompagner au quotidien.'] },
  { name: 'Expertise', roles: ['Spécialistes des assurances, conseils & services financiers, nous maîtrisons les marchés pour vous offrir les meilleures solutions.'] },
  { name: 'Engagement', roles: ['Nous nous engageons à défendre vos intérêts auprès des assureurs, de la souscription jusqu’au règlement des sinistres.'] },
];

export const ENGAGEMENTS = [
  { name: 'Gestionnaires de risques', role: 'Nous sommes des gestionnaires de risques : nous identifions, analysons et couvrons vos risques avec rigueur.' },
  { name: 'Interface avec les marchés', role: 'ACSF est bien plus qu’un courtier : un véritable interface avec les marchés d’assurances, au service de vos intérêts.' },
  { name: 'Conseil en 3 axes', role: 'Assurances, protection des capitaux, garantie financière : nos conseils couvrent tous vos enjeux patrimoniaux.' },
  { name: 'Partenaire de confiance', role: 'ACSF, votre partenaire de confiance pour anticiper aujourd’hui et protéger demain.' },
];

// ---------------- Médias ----------------

export const NEWS = [
  {
    id: 'presse-campagne',
    date: '15/01/2026',
    title: 'L’assurance vie, l’épargne n°1 : ACSF révèle les 8 erreurs que font les gens',
    image: '/images/acsf-news-1.jpg',
  },
  {
    id: 'presse-partenaire',
    date: '12/11/2025',
    title: 'ACSF, votre partenaire de confiance en assurances, conseils & services financiers',
    image: '/images/acsf-news-2.jpg',
  },
];

export const VIDEOS = [
  { title: 'ACSF Assurances — Présentation' },
  { title: 'L’assurance vie, l’épargne n°1' },
  { title: 'Les 8 erreurs que font les gens' },
  { title: 'ACSF : votre partenaire de confiance' },
  { title: 'Nos conseils en 3 axes' },
  { title: 'Anticiper aujourd’hui, protéger demain' },
];

// ---------------- Bandeau défilant ----------------

export const TICKER_ITEMS = [
  'Assurance Vie', 'Épargne', 'Prévoyance', 'Retraite', 'Santé', 'Automobile',
  'Habitation', 'Scolarité', 'Voyage', 'Multirisque Pro', 'Transport',
  'Flotte Automobile', 'Responsabilité Civile', 'Caution & Garantie',
  'Protection des Capitaux', 'Assurance Crédit', 'Homme Clé', 'Mutuelle d’Entreprise',
];

// ---------------- Contact ----------------

export const CONTACT_COUNTRIES = [
  'Côte d’Ivoire', 'Bénin', 'Burkina Faso', 'Ghana', 'Guinée', 'Mali',
  'Niger', 'Sénégal', 'Togo', 'France', 'Autre pays',
];

export const CONTACT_TYPES = [
  'Renseignement Entreprise',
  'Renseignement Particulier',
  'Assurance Vie & Épargne',
  'Santé & Prévoyance',
  'Protection des capitaux',
  'Garantie financière',
  'Réclamation',
  'Information générale',
];

export const SOCIALS = {
  facebook: 'https://www.facebook.com/acsf.assurances',
  instagram: 'https://instagram.com/acsf.assurances',
};

export const LEGAL_PAGES: { label: string; page: PageId }[] = [
  { label: 'Mentions légales', page: 'mentions-legales' },
  { label: 'Protection de données personnelles', page: 'protection-donnees' },
  { label: 'Gestion des cookies', page: 'gestion-cookies' },
];
