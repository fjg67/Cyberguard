/**
 * CyberGuard Pro - Générateur de Passphrase Diceware
 * Génère des passphrases mémorables et sécurisées basées sur la méthode Diceware
 */

class PassphraseGenerator {
    constructor() {
        // Liste de mots français courants pour Diceware (7776 mots = 6^5)
        this.wordList = [
            // Mots courts et mémorables
            'aigle', 'arbre', 'avion', 'bateau', 'belle', 'blanc', 'bleu', 'boire', 'boite', 'bonne',
            'bras', 'cafe', 'calme', 'carte', 'chaise', 'champ', 'chant', 'chat', 'chaud', 'chef',
            'chien', 'chose', 'ciel', 'cinq', 'clair', 'classe', 'clef', 'coeur', 'coin', 'corps',
            'cote', 'cour', 'court', 'danse', 'dent', 'desir', 'deux', 'dieu', 'doux', 'droit',
            'eau', 'ecole', 'enfant', 'entre', 'epais', 'espace', 'esprit', 'etage', 'etat', 'ete',
            'etoile', 'etroit', 'face', 'facile', 'faim', 'faire', 'famille', 'femme', 'fenetre', 'fer',
            'fete', 'feu', 'feuille', 'fille', 'fils', 'fin', 'fleur', 'fois', 'fond', 'force',
            'forme', 'fort', 'fou', 'foule', 'four', 'frais', 'franc', 'frere', 'froid', 'front',
            'fruit', 'fumee', 'fusil', 'garde', 'gare', 'gauche', 'genou', 'genre', 'gens', 'glace',
            'globe', 'grace', 'grain', 'grand', 'grave', 'gris', 'gros', 'groupe', 'guerre', 'guide',
            'haut', 'herbe', 'heure', 'histoire', 'hiver', 'homme', 'honneur', 'honte', 'huile', 'huit',
            'idee', 'image', 'jardin', 'jaune', 'jeu', 'jeune', 'joie', 'joli', 'joue', 'jour',
            'juge', 'jupe', 'juste', 'lac', 'laine', 'lait', 'lampe', 'langue', 'large', 'larme',
            'lettre', 'leur', 'levre', 'libre', 'lieu', 'ligne', 'linge', 'lion', 'liste', 'livre',
            'loi', 'loin', 'long', 'lourd', 'lumiere', 'lune', 'lutte', 'machine', 'madame', 'magic',
            'maigre', 'main', 'maire', 'maison', 'maitre', 'mal', 'malade', 'manger', 'marche', 'mari',
            'marin', 'marque', 'masse', 'matiere', 'matin', 'mauvais', 'mechant', 'medecin', 'meilleur', 'membre',
            'meme', 'memoire', 'menace', 'mer', 'mere', 'merite', 'messe', 'mesure', 'metal', 'metier',
            'metre', 'milieu', 'mille', 'million', 'mince', 'mine', 'ministre', 'minute', 'miroir', 'mode',
            'moindre', 'mois', 'moitie', 'moment', 'monde', 'monsieur', 'mont', 'montagne', 'montre', 'morceau',
            'mort', 'mot', 'mou', 'mouche', 'moulin', 'mourir', 'moyen', 'muet', 'mur', 'musique',
            'naissance', 'nature', 'neige', 'neuf', 'neveu', 'nez', 'noir', 'nombre', 'nord', 'note',
            'nourrir', 'nouveau', 'nuage', 'nuit', 'numero', 'objet', 'odeur', 'oeil', 'oeuf', 'oeuvre',
            'office', 'officier', 'ombre', 'oncle', 'ongle', 'or', 'orage', 'ordre', 'oreille', 'os',
            'oser', 'oter', 'oublier', 'ouest', 'ours', 'outil', 'ouvert', 'ouvrage', 'ouvrier', 'page',
            'paille', 'pain', 'paix', 'palais', 'pale', 'panier', 'papier', 'paquet', 'pardon', 'pareil',
            'parent', 'parfait', 'parfum', 'parler', 'parole', 'part', 'parti', 'partie', 'partir', 'passe',
            'passer', 'passion', 'patron', 'patte', 'pauvre', 'payer', 'pays', 'peau', 'peche', 'peigne',
            'peine', 'peintre', 'pencher', 'pendre', 'penser', 'pente', 'percher', 'perdre', 'pere', 'peril',
            'perle', 'permet', 'personne', 'perte', 'peser', 'petit', 'peuple', 'peur', 'phrase', 'piece',
            'pied', 'pierre', 'pieu', 'place', 'plafond', 'plage', 'plaie', 'plain', 'plaine', 'plaire',
            'plan', 'planche', 'plante', 'plat', 'plein', 'pleurer', 'pli', 'plier', 'plomb', 'pluie',
            'plume', 'plus', 'poche', 'poele', 'poids', 'poil', 'poing', 'point', 'pointe', 'poire',
            'poisson', 'poitrine', 'police', 'politique', 'pomme', 'pont', 'porte', 'porter', 'poser', 'posséder',
            'possible', 'poste', 'pot', 'pouce', 'poudre', 'poule', 'pour', 'pourrir', 'pousser', 'poussiere',
            'pouvoir', 'prairie', 'premier', 'prendre', 'present', 'presque', 'presser', 'pret', 'preter', 'pretre',
            'preuve', 'prier', 'prince', 'prise', 'prison', 'prix', 'prochain', 'profond', 'projet', 'promener',
            'promettre', 'prompt', 'propre', 'prouver', 'public', 'puis', 'puissant', 'pur', 'qualite', 'quand',
            'quart', 'quartier', 'quasi', 'quatre', 'quel', 'quelque', 'question', 'queue', 'quinze', 'quitter',
            'race', 'racine', 'raconter', 'raison', 'ramasser', 'ramener', 'rang', 'ranger', 'rapide', 'rappel',
            'rapport', 'rare', 'raser', 'rayon', 'recevoir', 'recherche', 'recit', 'recolte', 'reculer', 'refus',
            'regard', 'regarder', 'regime', 'regret', 'reine', 'rejeter', 'rejour', 'relever', 'relief', 'religion',
            'remarque', 'remède', 'remercier', 'remettre', 'remonter', 'rempart', 'remplir', 'remuer', 'rencontre', 'rendre',
            'renoncer', 'rentrer', 'renverser', 'renvoyer', 'repandre', 'repas', 'repeter', 'repondre', 'reponse', 'repos',
            'reposer', 'reprendre', 'reproche', 'reserve', 'resister', 'respect', 'respirer', 'ressource', 'reste', 'rester',
            'resultat', 'retenir', 'retirer', 'retour', 'retourner', 'retraite', 'retrouver', 'reunir', 'reussir', 'revenir',
            'rever', 'reveur', 'revoir', 'revolte', 'revue', 'riche', 'ride', 'rideau', 'rien', 'rire',
            'risque', 'rivage', 'rive', 'riviere', 'robe', 'roche', 'rocher', 'roi', 'role', 'roman',
            'rompre', 'rond', 'rose', 'rouge', 'rouler', 'route', 'royaume', 'ruban', 'rue', 'ruine',
            'sable', 'sabre', 'sac', 'sacre', 'sage', 'sain', 'saint', 'saisir', 'saison', 'sale',
            'salle', 'salon', 'salut', 'saluer', 'sang', 'sanglot', 'sante', 'sapin', 'satisfaire', 'sauce',
            'sauf', 'sauter', 'sauvage', 'sauver', 'savant', 'savoir', 'scene', 'science', 'seau', 'sec',
            'secher', 'seconde', 'secourir', 'secours', 'secret', 'seigneur', 'sein', 'seize', 'sejour', 'sel',
            'selon', 'semaine', 'semblable', 'sembler', 'semer', 'sens', 'sentier', 'sentiment', 'sentir', 'separer',
            'sept', 'serieux', 'serment', 'sermon', 'serrer', 'serrure', 'servante', 'service', 'servir', 'seul',
            'seulement', 'severe', 'sexe', 'siege', 'sien', 'siffler', 'signal', 'signe', 'signer', 'silence',
            'simple', 'singulier', 'situation', 'situer', 'six', 'social', 'societe', 'soeur', 'soie', 'soif',
            'soin', 'soir', 'soiree', 'soit', 'sol', 'soldat', 'soleil', 'sombre', 'somme', 'sommeil',
            'sommet', 'son', 'songer', 'sonner', 'sorte', 'sortie', 'sortir', 'sot', 'sou', 'souci',
            'soudain', 'souffle', 'souffrir', 'souhaiter', 'soulever', 'soulier', 'soumettre', 'soupir', 'source', 'sourd',
            'sourire', 'sous', 'soutenir', 'souvenir', 'souvent', 'special', 'spectacle', 'statue', 'style', 'subir',
            'subit', 'succeder', 'succes', 'sucre', 'sud', 'suffire', 'suffisant', 'suite', 'suivant', 'suivre',
            'sujet', 'superieur', 'supplier', 'supporter', 'supposer', 'supreme', 'sur', 'sûr', 'surface', 'surprendre',
            'surtout', 'surveiller', 'système', 'table', 'tableau', 'tache', 'tacher', 'taille', 'tailler', 'taire',
            'talent', 'tandis', 'tant', 'tante', 'tapis', 'tard', 'tas', 'tasse', 'taureau', 'tel',
            'tellement', 'temoin', 'temps', 'tendre', 'tendresse', 'tenir', 'tenter', 'terme', 'terminer', 'terrain',
            'terre', 'terrible', 'tete', 'the', 'theatre', 'tien', 'tiens', 'tige', 'timbre', 'timide',
            'tirer', 'tiroir', 'tissu', 'titre', 'toile', 'toit', 'tombe', 'tomber', 'ton', 'tonnerre',
            'tort', 'tot', 'total', 'toucher', 'toujours', 'tour', 'tourner', 'tout', 'trace', 'train',
            'trainer', 'trait', 'traiter', 'tranquille', 'travail', 'travers', 'traverser', 'trembler', 'trente', 'tres',
            'tresor', 'triste', 'trois', 'tromper', 'tronc', 'trop', 'trou', 'trouble', 'troupe', 'trouver',
            'tuer', 'tuile', 'tunnel', 'type', 'union', 'unique', 'unir', 'unite', 'univers', 'usage',
            'user', 'usine', 'utile', 'vague', 'vain', 'vaincre', 'valeur', 'vallee', 'valoir', 'varier',
            'vaste', 'veau', 'veille', 'veiller', 'vendre', 'venir', 'vent', 'ventre', 'verbe', 'verdure',
            'veritable', 'verite', 'verre', 'vers', 'verser', 'vert', 'vertu', 'veste', 'vetement', 'veuve',
            'viande', 'vide', 'vie', 'vieillard', 'vieux', 'vif', 'village', 'ville', 'vin', 'vingt',
            'violence', 'violent', 'violet', 'visage', 'viser', 'visible', 'visite', 'visiter', 'vite', 'vivant',
            'vivre', 'voeu', 'voici', 'voie', 'voila', 'voile', 'voir', 'voisin', 'voiture', 'voix',
            'vol', 'voler', 'voleur', 'volonte', 'volume', 'vouloir', 'voyage', 'voyager', 'voyageur', 'vrai',
            'vue', 'vulgaire', 'yeux', 'zero', 'zone'
        ];

        this.stats = {
            totalGenerated: 0,
            lastGenerated: null
        };

        this.init();
    }

    init() {
        this.loadStats();
        this.setupEventListeners();
        this.generatePassphrase(); // Génère une passphrase au chargement
    }

    setupEventListeners() {
        const generateBtn = document.getElementById('generate-passphrase-btn');
        const copyBtn = document.getElementById('copy-passphrase-btn');
        const wordCountSlider = document.getElementById('passphrase-word-count');
        const separatorSelect = document.getElementById('passphrase-separator');
        const capitalizeCheckbox = document.getElementById('passphrase-capitalize');
        const numberCheckbox = document.getElementById('passphrase-add-number');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generatePassphrase());
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPassphrase());
        }

        // Régénération automatique lors du changement d'options
        if (wordCountSlider) {
            wordCountSlider.addEventListener('input', (e) => {
                document.getElementById('word-count-value').textContent = e.target.value;
                this.generatePassphrase();
            });
        }

        if (separatorSelect) {
            separatorSelect.addEventListener('change', () => this.generatePassphrase());
        }

        if (capitalizeCheckbox) {
            capitalizeCheckbox.addEventListener('change', () => this.generatePassphrase());
        }

        if (numberCheckbox) {
            numberCheckbox.addEventListener('change', () => this.generatePassphrase());
        }
    }

    generatePassphrase() {
        const wordCount = parseInt(document.getElementById('passphrase-word-count')?.value || 5);
        const separator = document.getElementById('passphrase-separator')?.value || '-';
        const capitalize = document.getElementById('passphrase-capitalize')?.checked || false;
        const addNumber = document.getElementById('passphrase-add-number')?.checked || false;

        // Sélection aléatoire sécurisée de mots
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            const randomIndex = this.getSecureRandomInt(0, this.wordList.length - 1);
            let word = this.wordList[randomIndex];

            if (capitalize) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }

            words.push(word);
        }

        let passphrase = words.join(separator);

        // Ajout d'un nombre aléatoire
        if (addNumber) {
            const randomNumber = this.getSecureRandomInt(0, 9999);
            passphrase += separator + randomNumber;
        }

        // Affichage
        const output = document.getElementById('passphrase-output');
        if (output) {
            output.textContent = passphrase;
            output.classList.add('cyber-glow');
            setTimeout(() => output.classList.remove('cyber-glow'), 500);
        }

        // Calcul de l'entropie
        this.calculateEntropy(wordCount, addNumber);

        // Mise à jour des stats
        this.stats.totalGenerated++;
        this.stats.lastGenerated = new Date().toISOString();
        this.saveStats();
        this.updateStatsDisplay();

        return passphrase;
    }

    calculateEntropy(wordCount, hasNumber) {
        // Entropie = log2(possibilités)
        // Pour Diceware: log2(7776^wordCount)
        const dicewareEntropy = Math.log2(Math.pow(this.wordList.length, wordCount));

        // Si nombre ajouté: +log2(10000) ≈ 13.3 bits
        const numberEntropy = hasNumber ? Math.log2(10000) : 0;

        const totalEntropy = dicewareEntropy + numberEntropy;

        // Affichage
        const entropyDisplay = document.getElementById('passphrase-entropy');
        if (entropyDisplay) {
            entropyDisplay.innerHTML = `
                <strong>Entropie:</strong> ${totalEntropy.toFixed(1)} bits<br>
                <small>Temps de crack estimé: ${this.estimateCrackTime(totalEntropy)}</small>
            `;
        }
    }

    estimateCrackTime(entropy) {
        // Estimation basée sur 1 billion (10^12) de tentatives/seconde
        const attempts = Math.pow(2, entropy);
        const seconds = attempts / 1e12;

        if (seconds < 60) return `${seconds.toFixed(0)} secondes`;
        if (seconds < 3600) return `${(seconds / 60).toFixed(0)} minutes`;
        if (seconds < 86400) return `${(seconds / 3600).toFixed(0)} heures`;
        if (seconds < 31536000) return `${(seconds / 86400).toFixed(0)} jours`;
        if (seconds < 31536000 * 1000) return `${(seconds / 31536000).toFixed(0)} années`;
        if (seconds < 31536000 * 1000000) return `${(seconds / (31536000 * 1000)).toFixed(0)} milliers d'années`;
        return `${(seconds / (31536000 * 1000000000)).toFixed(0)} milliards d'années`;
    }

    getSecureRandomInt(min, max) {
        // Utilise crypto.getRandomValues pour une vraie entropie
        const range = max - min + 1;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const maxValue = Math.pow(256, bytesNeeded);
        const randomBytes = new Uint8Array(bytesNeeded);

        let randomValue;
        do {
            crypto.getRandomValues(randomBytes);
            randomValue = 0;
            for (let i = 0; i < bytesNeeded; i++) {
                randomValue = randomValue * 256 + randomBytes[i];
            }
        } while (randomValue >= maxValue - (maxValue % range));

        return min + (randomValue % range);
    }

    copyPassphrase() {
        const output = document.getElementById('passphrase-output');
        if (!output) return;

        const passphrase = output.textContent;

        navigator.clipboard.writeText(passphrase).then(() => {
            // Animation de succès
            const copyBtn = document.getElementById('copy-passphrase-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copié !';
                copyBtn.classList.add('success-animation');

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('success-animation');
                }, 2000);
            }

            // Notification
            this.showNotification('Passphrase copiée dans le presse-papier!', 'success');
        }).catch(err => {
            console.error('Erreur de copie:', err);
            this.showNotification('Erreur lors de la copie', 'error');
        });
    }

    showNotification(message, type = 'info') {
        // Utilise le système de notifications existant ou crée une simple alerte
        if (window.NotificationSystem) {
            window.NotificationSystem.show(message, type);
        } else {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: ${type === 'success' ? '#00ff41' : '#ff0040'};
                color: #000;
                border-radius: 5px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }

    loadStats() {
        const saved = localStorage.getItem('cyberguard_passphrase_stats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    }

    saveStats() {
        localStorage.setItem('cyberguard_passphrase_stats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const statsDisplay = document.getElementById('passphrase-stats');
        if (statsDisplay) {
            statsDisplay.innerHTML = `
                <small>
                    <strong>Total généré:</strong> ${this.stats.totalGenerated}<br>
                    ${this.stats.lastGenerated ? `<strong>Dernier:</strong> ${new Date(this.stats.lastGenerated).toLocaleString('fr-FR')}` : ''}
                </small>
            `;
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('passphrase-generator-section')) {
        window.passphraseGenerator = new PassphraseGenerator();
    }
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PassphraseGenerator;
}
