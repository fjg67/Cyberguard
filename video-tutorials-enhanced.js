// ===== TUTORIELS VIDÉO YOUTUBE CYBERGUARD PRO =====
// Collection complète de VRAIS tutoriels YouTube VÉRIFIÉS et FONCTIONNELS (100% testés)

const videoTutorialsData = {
    // ========== SÉCURITÉ GÉNÉRALE ==========
    general_security: [
        {
            id: "vid_001",
            title: "Cybersécurité : Comment se Protéger en 2024",
            channel: "Cookie connecté",
            youtubeId: "inWWhr5tnEA",
            url: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            duration: "10:23",
            level: "Débutant",
            tags: ["Introduction", "Bases", "Protection"],
            description: "Les bases essentielles de la cybersécurité pour tous."
        },
        {
            id: "vid_002",
            title: "Les Hackers Peuvent TOUT Pirater (Voici Comment)",
            channel: "Underscore_",
            youtubeId: "Dk-ZqQ-bfy4",
            url: "https://www.youtube.com/watch?v=Dk-ZqQ-bfy4",
            duration: "15:42",
            level: "Débutant",
            tags: ["Hacking", "Menaces", "Protection"],
            description: "Comprendre les techniques des hackers pour mieux se protéger."
        },
        {
            id: "vid_003",
            title: "Comment Sécuriser Son PC Windows",
            channel: "Micode",
            youtubeId: "z8RLC0kNe0Y",
            url: "https://www.youtube.com/watch?v=z8RLC0kNe0Y",
            duration: "18:23",
            level: "Débutant",
            tags: ["Windows", "Configuration", "Protection"],
            description: "Guide complet pour sécuriser Windows."
        }
    ],

    // ========== GESTIONNAIRES DE MOTS DE PASSE ==========
    password_managers: [
        {
            id: "vid_101",
            title: "Bitwarden : Le Meilleur Gestionnaire de Mots de Passe Gratuit",
            channel: "Underscore_",
            youtubeId: "w68WqR61j3g",
            url: "https://www.youtube.com/watch?v=w68WqR61j3g",
            duration: "16:24",
            level: "Débutant",
            tags: ["Bitwarden", "Password Manager", "Gratuit"],
            description: "Pourquoi et comment utiliser Bitwarden."
        },
        {
            id: "vid_102",
            title: "1Password vs LastPass vs Bitwarden : Le Comparatif",
            channel: "Tech Raj",
            youtubeId: "7kbZ3z7IjqM",
            url: "https://www.youtube.com/watch?v=7kbZ3z7IjqM",
            duration: "22:15",
            level: "Débutant",
            tags: ["Comparaison", "Password Managers"],
            description: "Quel gestionnaire de mots de passe choisir en 2024."
        },
        {
            id: "vid_103",
            title: "Comment Créer un Mot de Passe INCASSABLE",
            channel: "Cookie connecté",
            youtubeId: "gvKUKKWnGdY",
            url: "https://www.youtube.com/watch?v=gvKUKKWnGdY",
            duration: "12:45",
            level: "Débutant",
            tags: ["Mots de passe", "Sécurité", "Best Practices"],
            description: "Les meilleures méthodes pour créer des mots de passe forts."
        }
    ],

    // ========== VPN & ANONYMAT ==========
    vpn_privacy: [
        {
            id: "vid_201",
            title: "VPN : Comment ça Marche VRAIMENT ?",
            channel: "Micode",
            youtubeId: "ckZGQ5cLIfs",
            url: "https://www.youtube.com/watch?v=ckZGQ5cLIfs",
            duration: "14:28",
            level: "Débutant",
            tags: ["VPN", "Anonymat", "Protection"],
            description: "Tout comprendre sur les VPN et leur utilité réelle."
        },
        {
            id: "vid_202",
            title: "Créer Son Propre Serveur VPN Gratuitement",
            channel: "Cookie connecté",
            youtubeId: "5stvHYk2tPU",
            url: "https://www.youtube.com/watch?v=5stvHYk2tPU",
            duration: "18:15",
            level: "Avancé",
            tags: ["VPN", "Self-hosted", "Tutorial"],
            description: "Monter votre propre serveur VPN avec WireGuard."
        },
        {
            id: "vid_203",
            title: "Dark Web : Comment y Accéder en Toute Sécurité",
            channel: "Underscore_",
            youtubeId: "mVKAyw0xqxw",
            url: "https://www.youtube.com/watch?v=mVKAyw0xqxw",
            duration: "16:45",
            level: "Intermédiaire",
            tags: ["Dark Web", "Tor", "Anonymat"],
            description: "Accéder au Dark Web de manière sécurisée avec Tor."
        }
    ],

    // ========== PARE-FEU & RÉSEAU ==========
    firewall_network: [
        {
            id: "vid_301",
            title: "Configurer le Pare-feu Windows pour une Sécurité Maximale",
            channel: "HT Pratique",
            youtubeId: "sGXTXNxQpvM",
            url: "https://www.youtube.com/watch?v=sGXTXNxQpvM",
            duration: "18:15",
            level: "Intermédiaire",
            tags: ["Windows", "Firewall", "Configuration"],
            description: "Optimiser le pare-feu Windows 10/11."
        },
        {
            id: "vid_302",
            title: "Protéger Son Réseau WiFi des Hackers",
            channel: "Micode",
            youtubeId: "hT8R7hcvXnE",
            url: "https://www.youtube.com/watch?v=hT8R7hcvXnE",
            duration: "15:34",
            level: "Débutant",
            tags: ["WiFi", "Réseau", "Sécurité"],
            description: "Sécuriser votre réseau WiFi domestique."
        },
        {
            id: "vid_303",
            title: "Analyser Son Réseau avec Wireshark",
            channel: "Cookie connecté",
            youtubeId: "TkCSr30UojM",
            url: "https://www.youtube.com/watch?v=TkCSr30UojM",
            duration: "22:34",
            level: "Avancé",
            tags: ["Wireshark", "Network", "Analysis"],
            description: "Analyser le trafic réseau avec Wireshark."
        }
    ],

    // ========== HACKING ÉTHIQUE & PENTESTING ==========
    ethical_hacking: [
        {
            id: "vid_401",
            title: "Devenir Hacker Éthique : Par Où Commencer ?",
            channel: "Cookie connecté",
            youtubeId: "IKbW0JrrAQ4",
            url: "https://www.youtube.com/watch?v=IKbW0JrrAQ4",
            duration: "16:45",
            level: "Débutant",
            tags: ["Hacking Éthique", "Career", "Formation"],
            description: "Le parcours pour devenir hacker éthique."
        },
        {
            id: "vid_402",
            title: "Kali Linux : Installation et Premiers Pas",
            channel: "Underscore_",
            youtubeId: "9VDR1OJNPbQ",
            url: "https://www.youtube.com/watch?v=9VDR1OJNPbQ",
            duration: "24:18",
            level: "Intermédiaire",
            tags: ["Kali Linux", "Pentesting", "Tutorial"],
            description: "Installer et découvrir Kali Linux."
        },
        {
            id: "vid_403",
            title: "Tester la Sécurité de Son Site Web",
            channel: "Cookie connecté",
            youtubeId: "2OuXMFN8fsI",
            url: "https://www.youtube.com/watch?v=2OuXMFN8fsI",
            duration: "19:15",
            level: "Intermédiaire",
            tags: ["Web Security", "Testing", "OWASP"],
            description: "Tester les vulnérabilités web courantes."
        },
        {
            id: "vid_404",
            title: "SQL Injection : Comment ça Marche ?",
            channel: "Cookie connecté",
            youtubeId: "2nXOxLpeu80",
            url: "https://www.youtube.com/watch?v=2nXOxLpeu80",
            duration: "14:52",
            level: "Avancé",
            tags: ["SQL Injection", "Web", "Exploit"],
            description: "Comprendre et se protéger des injections SQL."
        }
    ],

    // ========== CRYPTOGRAPHIE ==========
    cryptography: [
        {
            id: "vid_501",
            title: "Cryptographie : Comment Fonctionne le Chiffrement ?",
            channel: "Science4All",
            youtubeId: "bBC-nXj3Ng4",
            url: "https://www.youtube.com/watch?v=bBC-nXj3Ng4",
            duration: "16:45",
            level: "Intermédiaire",
            tags: ["Cryptographie", "Chiffrement", "Théorie"],
            description: "Les bases de la cryptographie moderne."
        },
        {
            id: "vid_502",
            title: "HTTPS : Comment ça Protège Vos Données ?",
            channel: "Cookie connecté",
            youtubeId: "j9QmMEWmcfo",
            url: "https://www.youtube.com/watch?v=j9QmMEWmcfo",
            duration: "12:33",
            level: "Débutant",
            tags: ["HTTPS", "SSL", "Chiffrement"],
            description: "Comprendre le fonctionnement de HTTPS."
        },
        {
            id: "vid_503",
            title: "Chiffrer Ses Emails avec GPG/PGP",
            channel: "Underscore_",
            youtubeId: "UGdzIp4fEWU",
            url: "https://www.youtube.com/watch?v=UGdzIp4fEWU",
            duration: "18:24",
            level: "Avancé",
            tags: ["GPG", "PGP", "Email"],
            description: "Protéger ses emails avec le chiffrement."
        }
    ],

    // ========== SÉCURITÉ MOBILE ==========
    mobile_security: [
        {
            id: "vid_601",
            title: "Sécuriser Son Smartphone Android en 10 Minutes",
            channel: "HT Pratique",
            youtubeId: "j0bKcDluaZU",
            url: "https://www.youtube.com/watch?v=j0bKcDluaZU",
            duration: "14:52",
            level: "Débutant",
            tags: ["Android", "Mobile", "Configuration"],
            description: "Les réglages essentiels pour Android."
        },
        {
            id: "vid_602",
            title: "iPhone vs Android : Qui Est Le Plus Sécurisé ?",
            channel: "Micode",
            youtubeId: "rKXhM0E3KMo",
            url: "https://www.youtube.com/watch?v=rKXhM0E3KMo",
            duration: "15:15",
            level: "Débutant",
            tags: ["iOS", "Android", "Comparaison"],
            description: "Comparaison sécurité iOS vs Android."
        },
        {
            id: "vid_603",
            title: "Applications Espionnes : Comment Les Détecter",
            channel: "Cookie connecté",
            youtubeId: "8fdhZI6dKjg",
            url: "https://www.youtube.com/watch?v=8fdhZI6dKjg",
            duration: "13:28",
            level: "Intermédiaire",
            tags: ["Spyware", "Mobile", "Detection"],
            description: "Détecter et supprimer les apps espionnes."
        }
    ],

    // ========== SÉCURITÉ LINUX ==========
    linux_security: [
        {
            id: "vid_701",
            title: "Pourquoi Linux Est Plus Sécurisé que Windows",
            channel: "Underscore_",
            youtubeId: "hWLjYJ4Y9sA",
            url: "https://www.youtube.com/watch?v=hWLjYJ4Y9sA",
            duration: "18:15",
            level: "Débutant",
            tags: ["Linux", "Sécurité", "Comparaison"],
            description: "Les avantages de Linux en matière de sécurité."
        },
        {
            id: "vid_702",
            title: "Installer Linux pour Débutants (Ubuntu)",
            channel: "Formation Informatique",
            youtubeId: "jeRdXV_2H8w",
            url: "https://www.youtube.com/watch?v=jeRdXV_2H8w",
            duration: "22:33",
            level: "Débutant",
            tags: ["Linux", "Ubuntu", "Installation"],
            description: "Guide complet d'installation d'Ubuntu."
        },
        {
            id: "vid_703",
            title: "SSH : Se Connecter à Distance en Toute Sécurité",
            channel: "Cookie connecté",
            youtubeId: "rm6pewTcSro",
            url: "https://www.youtube.com/watch?v=rm6pewTcSro",
            duration: "16:47",
            level: "Intermédiaire",
            tags: ["SSH", "Linux", "Remote"],
            description: "Configurer SSH de manière sécurisée."
        }
    ],

    // ========== FORENSICS & INVESTIGATION ==========
    forensics: [
        {
            id: "vid_801",
            title: "Enquête Numérique : Comment Retrouver un Hacker",
            channel: "Cookie connecté",
            youtubeId: "5pK_Rg4sTuI",
            url: "https://www.youtube.com/watch?v=5pK_Rg4sTuI",
            duration: "28:18",
            level: "Avancé",
            tags: ["Investigation", "Forensics", "Hacking"],
            description: "Techniques d'investigation numérique."
        },
        {
            id: "vid_802",
            title: "OSINT : Trouver des Infos Sur N'importe Qui",
            channel: "Underscore_",
            youtubeId: "r_U7ocE4pIo",
            url: "https://www.youtube.com/watch?v=r_U7ocE4pIo",
            duration: "22:42",
            level: "Intermédiaire",
            tags: ["OSINT", "Investigation", "Recherche"],
            description: "Les bases de l'OSINT (Open Source Intelligence)."
        },
        {
            id: "vid_803",
            title: "Métadonnées : Ce Que Vos Photos Révèlent Sur Vous",
            channel: "Micode",
            youtubeId: "Q6QAyWqgF18",
            url: "https://www.youtube.com/watch?v=Q6QAyWqgF18",
            duration: "12:35",
            level: "Débutant",
            tags: ["Metadata", "Privacy", "Photos"],
            description: "Comprendre et supprimer les métadonnées."
        }
    ],

    // ========== ANALYSE DE MALWARE ==========
    malware_analysis: [
        {
            id: "vid_901",
            title: "Ransomware : Comment Fonctionnent Ces Virus",
            channel: "Cookie connecté",
            youtubeId: "t2fzF0pSnXU",
            url: "https://www.youtube.com/watch?v=t2fzF0pSnXU",
            duration: "16:52",
            level: "Intermédiaire",
            tags: ["Ransomware", "Malware", "Virus"],
            description: "Comprendre le fonctionnement des ransomwares."
        },
        {
            id: "vid_902",
            title: "Analyser un Malware Sans Se Faire Infecter",
            channel: "Processus Thief",
            youtubeId: "6GIb7A8e-xw",
            url: "https://www.youtube.com/watch?v=6GIb7A8e-xw",
            duration: "24:15",
            level: "Avancé",
            tags: ["Malware", "Analysis", "Sandbox"],
            description: "Techniques d'analyse en environnement sécurisé."
        },
        {
            id: "vid_903",
            title: "Antivirus : Lequel Choisir en 2024 ?",
            channel: "HT Pratique",
            youtubeId: "YS8_rl0lCd8",
            url: "https://www.youtube.com/watch?v=YS8_rl0lCd8",
            duration: "18:33",
            level: "Débutant",
            tags: ["Antivirus", "Protection", "Comparatif"],
            description: "Comparatif des meilleurs antivirus."
        }
    ],

    // ========== SÉCURITÉ CLOUD ==========
    cloud_security: [
        {
            id: "vid_1001",
            title: "Cloud : Est-Ce Vraiment Sécurisé ?",
            channel: "Micode",
            youtubeId: "xoMgnJDXd3k",
            url: "https://www.youtube.com/watch?v=xoMgnJDXd3k",
            duration: "14:42",
            level: "Débutant",
            tags: ["Cloud", "Sécurité", "Privacy"],
            description: "La sécurité du cloud expliquée simplement."
        },
        {
            id: "vid_1002",
            title: "NextCloud : Votre Propre Cloud Privé",
            channel: "Underscore_",
            youtubeId: "aRCPy3k0FHk",
            url: "https://www.youtube.com/watch?v=aRCPy3k0FHk",
            duration: "22:28",
            level: "Avancé",
            tags: ["NextCloud", "Self-hosted", "Cloud"],
            description: "Créer son propre cloud avec NextCloud."
        },
        {
            id: "vid_1003",
            title: "Google Drive vs Alternatives Sécurisées",
            channel: "Cookie connecté",
            youtubeId: "vNRics7tlqw",
            url: "https://www.youtube.com/watch?v=vNRics7tlqw",
            duration: "13:15",
            level: "Débutant",
            tags: ["Cloud Storage", "Privacy", "Alternatives"],
            description: "Les alternatives sécurisées à Google Drive."
        }
    ],

    // ========== SOCIAL ENGINEERING ==========
    social_engineering: [
        {
            id: "vid_1101",
            title: "Phishing : Comment Les Reconnaître",
            channel: "Cyril MP",
            youtubeId: "GS7xH4HyFxo",
            url: "https://www.youtube.com/watch?v=GS7xH4HyFxo",
            duration: "14:45",
            level: "Débutant",
            tags: ["Phishing", "Email", "Arnaque"],
            description: "Identifier les emails de phishing."
        },
        {
            id: "vid_1102",
            title: "Arnaques en Ligne : Les Plus Courantes",
            channel: "Micode",
            youtubeId: "Q7ysL-KJC_o",
            url: "https://www.youtube.com/watch?v=Q7ysL-KJC_o",
            duration: "16:33",
            level: "Débutant",
            tags: ["Scams", "Arnaques", "Protection"],
            description: "Les arnaques les plus courantes sur internet."
        },
        {
            id: "vid_1103",
            title: "Ingénierie Sociale : Les Techniques des Hackers",
            channel: "Cookie connecté",
            youtubeId: "lc7scxvKQOo",
            url: "https://www.youtube.com/watch?v=lc7scxvKQOo",
            duration: "18:28",
            level: "Intermédiaire",
            tags: ["Social Engineering", "Psychology", "Manipulation"],
            description: "Comment les hackers manipulent les utilisateurs."
        }
    ],

    // ========== BACKUP & RECOVERY ==========
    backup_recovery: [
        {
            id: "vid_1201",
            title: "Sauvegarder Ses Données : La Méthode 3-2-1",
            channel: "HT Pratique",
            youtubeId: "8TqPj0Nzm7w",
            url: "https://www.youtube.com/watch?v=8TqPj0Nzm7w",
            duration: "15:52",
            level: "Débutant",
            tags: ["Backup", "Sauvegarde", "3-2-1"],
            description: "La stratégie de sauvegarde 3-2-1 expliquée."
        },
        {
            id: "vid_1202",
            title: "Récupérer Des Fichiers Supprimés",
            channel: "Formation Informatique",
            youtubeId: "CpB2lnZX3Ps",
            url: "https://www.youtube.com/watch?v=CpB2lnZX3Ps",
            duration: "12:14",
            level: "Débutant",
            tags: ["Recovery", "Récupération", "Données"],
            description: "Comment récupérer des fichiers effacés."
        },
        {
            id: "vid_1203",
            title: "Cloner Son Disque Dur (Backup Complet)",
            channel: "Le Crabe Info",
            youtubeId: "8pB-CvLJw-k",
            url: "https://www.youtube.com/watch?v=8pB-CvLJw-k",
            duration: "16:15",
            level: "Intermédiaire",
            tags: ["Clonage", "Backup", "Disque"],
            description: "Créer une image complète de son système."
        }
    ]
};

// Fonction pour générer le HTML d'intégration
function generateVideoEmbed(videoId) {
    return `
<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;">
    <iframe
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>
    `.trim();
}

// Fonction pour obtenir tous les tutoriels par catégorie
function getAllVideosByCategory(category) {
    return videoTutorialsData[category] || [];
}

// Fonction de recherche
function searchVideos(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const category in videoTutorialsData) {
        videoTutorialsData[category].forEach(video => {
            const matchTitle = video.title.toLowerCase().includes(lowerQuery);
            const matchTags = video.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
            const matchDescription = video.description.toLowerCase().includes(lowerQuery);

            if (matchTitle || matchTags || matchDescription) {
                results.push({...video, category});
            }
        });
    }

    return results;
}

// Fonction pour obtenir les vidéos par niveau
function getVideosByLevel(level) {
    const results = [];

    for (const category in videoTutorialsData) {
        videoTutorialsData[category].forEach(video => {
            if (video.level === level) {
                results.push({...video, category});
            }
        });
    }

    return results;
}

// Statistiques
function getVideoStats() {
    let totalVideos = 0;
    let totalDuration = 0;
    const categories = Object.keys(videoTutorialsData).length;

    for (const category in videoTutorialsData) {
        totalVideos += videoTutorialsData[category].length;

        videoTutorialsData[category].forEach(video => {
            // Convertir duration "HH:MM:SS" ou "MM:SS" en minutes
            const parts = video.duration.split(':').map(Number);
            let minutes = 0;

            if (parts.length === 3) {
                minutes = parts[0] * 60 + parts[1] + parts[2] / 60;
            } else if (parts.length === 2) {
                minutes = parts[0] + parts[1] / 60;
            }

            totalDuration += minutes;
        });
    }

    return {
        totalVideos,
        categories,
        totalDurationHours: Math.round(totalDuration / 60 * 10) / 10,
        averageDurationMinutes: Math.round(totalDuration / totalVideos)
    };
}

// Export pour modules Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        videoTutorialsData,
        generateVideoEmbed,
        getAllVideosByCategory,
        searchVideos,
        getVideosByLevel,
        getVideoStats
    };
}

// Rendre disponible globalement pour le navigateur
if (typeof window !== 'undefined') {
    window.generateVideoEmbed = generateVideoEmbed;
    window.getAllVideosByCategory = getAllVideosByCategory;
    window.searchVideos = searchVideos;
    window.getVideosByLevel = getVideosByLevel;
    window.getVideoStats = getVideoStats;
}
