/**
 * ═══════════════════════════════════════════════════════════════
 * CYBERGUARD AI ASSISTANT - Intelligent Chatbot
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Natural language processing
 * - Cybersecurity knowledge base
 * - Context-aware responses
 * - Multi-language support (FR/EN)
 * - Tool recommendations
 * - Product suggestions
 * - Threat information
 * - Security tips & advice
 */

class CyberGuardAI {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = this.loadUserProfile();
        this.knowledgeBase = this.buildKnowledgeBase();
        this.isOpen = false;
        this.isTyping = false;

        this.init();
    }

    init() {
        // Create chatbot UI
        this.createChatbotUI();

        // Load conversation history
        this.loadConversationHistory();

        // Send welcome message
        if (this.conversationHistory.length === 0) {
            setTimeout(() => {
                this.addMessage('ai', this.getWelcomeMessage());
            }, 1000);
        }

        console.log('🤖 CyberGuard AI Assistant initialized');
    }

    buildKnowledgeBase() {
        return {
            // Greetings & General
            greetings: {
                patterns: ['bonjour', 'salut', 'hello', 'hi', 'hey', 'bonsoir'],
                responses: [
                    "Bonjour ! Je suis l'Assistant CyberGuard, votre expert en cybersécurité. Comment puis-je vous aider aujourd'hui ?",
                    "Salut ! Prêt à renforcer votre sécurité numérique ? Posez-moi vos questions !",
                    "Hello ! Bienvenue sur CyberGuard. Je suis là pour répondre à toutes vos questions de cybersécurité."
                ]
            },

            // About CyberGuard
            about: {
                patterns: ['qu\'est-ce que cyberguard', 'cyberguard c\'est quoi', 'what is cyberguard', 'présentation'],
                responses: [
                    "CyberGuard Pro est une solution de cybersécurité de nouvelle génération qui combine protection quantique, intelligence artificielle et surveillance 24/7 pour protéger vos données contre toutes les menaces. Nous offrons des antivirus, VPN, suites de sécurité et des outils interactifs pour tester votre niveau de protection."
                ]
            },

            // Passwords
            passwords: {
                patterns: ['mot de passe', 'password', 'mdp', 'sécuriser mot de passe', 'créer mot de passe fort'],
                responses: [
                    "🔐 Un mot de passe sûr doit contenir au moins 16 caractères avec des majuscules, minuscules, chiffres et symboles. Évitez les mots du dictionnaire et les informations personnelles.\n\nConseils :\n• Utilisez un gestionnaire de mots de passe\n• Activez l'authentification à 2 facteurs\n• Ne réutilisez jamais le même mot de passe\n\nVoulez-vous tester la force de votre mot de passe avec notre outil d'analyse ?"
                ]
            },

            // Phishing
            phishing: {
                patterns: ['phishing', 'hameçonnage', 'email suspect', 'lien dangereux', 'arnaque email'],
                responses: [
                    "🎣 Le phishing est une technique où des pirates se font passer pour des entités légitimes pour voler vos données.\n\nComment vous protéger :\n• Vérifiez l'adresse email de l'expéditeur\n• Ne cliquez pas sur les liens suspects\n• Vérifiez l'URL avant de saisir des données\n• Activez les filtres anti-spam\n\nUtilisez notre Scanner Anti-Phishing pour vérifier la sécurité d'un site web !"
                ]
            },

            // Ransomware
            ransomware: {
                patterns: ['ransomware', 'rançongiciel', 'fichiers cryptés', 'virus cryptage'],
                responses: [
                    "🔒 Les ransomwares chiffrent vos fichiers et demandent une rançon pour les débloquer.\n\nProtection :\n• Sauvegardez régulièrement vos données (3-2-1 rule)\n• Maintenez vos logiciels à jour\n• Utilisez un antivirus avec protection temps réel\n• Ne payez JAMAIS la rançon\n\nNos solutions Pro et Enterprise incluent une protection anti-ransomware avancée avec détection comportementale IA."
                ]
            },

            // VPN
            vpn: {
                patterns: ['vpn', 'réseau privé', 'cacher ip', 'anonymat', 'vie privée en ligne'],
                responses: [
                    "🌐 Un VPN (Virtual Private Network) chiffre votre connexion Internet et masque votre adresse IP.\n\nAvantages :\n• Navigation anonyme\n• Protection sur WiFi public\n• Accès aux contenus géo-bloqués\n• Chiffrement de vos données\n\nNos VPN recommandés : NordVPN, ExpressVPN, Surfshark. Consultez notre comparateur pour trouver l'offre adaptée à vos besoins !"
                ]
            },

            // Antivirus
            antivirus: {
                patterns: ['antivirus', 'antimalware', 'protection virus', 'quel antivirus choisir'],
                responses: [
                    "🛡️ Un bon antivirus détecte et neutralise les malwares, virus, trojans et spywares.\n\nFonctionnalités essentielles :\n• Scan en temps réel\n• Protection web\n• Pare-feu intégré\n• Mises à jour automatiques\n\nTop 3 recommandations :\n1. Bitdefender - Protection IA la plus avancée\n2. Norton 360 - Suite complète\n3. Kaspersky - Meilleur détection\n\nUtilisez notre quiz personnalisé pour trouver l'antivirus parfait pour vous !"
                ]
            },

            // Threats
            threats: {
                patterns: ['menaces', 'cyberattaque', 'threats', 'dangers internet', 'risques'],
                responses: [
                    "⚠️ Principales cybermenaces en 2025 :\n\n1. 🎯 Ransomware - Chiffrement de données\n2. 🎣 Phishing - Vol d'identifiants\n3. 💉 Malware - Logiciels malveillants\n4. 🌊 DDoS - Saturation de serveurs\n5. 📊 Data Breach - Vol de données\n\nConsultez notre carte interactive des menaces en temps réel pour voir les attaques actuelles dans le monde !"
                ]
            },

            // Data breach
            databreach: {
                patterns: ['fuite de données', 'data breach', 'violation données', 'données compromises'],
                responses: [
                    "🚨 Une fuite de données expose vos informations personnelles (emails, mots de passe, coordonnées bancaires).\n\nQue faire :\n1. Changez immédiatement vos mots de passe\n2. Activez l'authentification 2FA\n3. Surveillez vos comptes bancaires\n4. Vérifiez si vous êtes concerné\n\nUtilisez notre Détecteur de Fuites pour vérifier si votre email a été compromis dans une fuite de données !"
                ]
            },

            // WiFi Security
            wifi: {
                patterns: ['wifi public', 'sécurité wifi', 'wifi sécurisé', 'hotspot'],
                responses: [
                    "📡 Les WiFi publics sont des cibles privilégiées des hackers.\n\nRègles de sécurité :\n• Utilisez TOUJOURS un VPN\n• Évitez les transactions bancaires\n• Désactivez le partage de fichiers\n• Oubliez le réseau après utilisation\n• Vérifiez le nom exact du WiFi\n\nUn VPN chiffre toutes vos données, même sur WiFi public. Nous recommandons NordVPN ou ExpressVPN."
                ]
            },

            // 2FA / MFA
            twofa: {
                patterns: ['2fa', 'mfa', 'double authentification', 'authentification deux facteurs'],
                responses: [
                    "🔐 L'authentification à deux facteurs (2FA) ajoute une couche de sécurité supplémentaire.\n\nMéthodes 2FA :\n• SMS (moins sûr)\n• Applications (Google Auth, Authy)\n• Clés physiques (YubiKey) - le plus sûr\n• Biométrie (empreinte, Face ID)\n\nActivez la 2FA sur TOUS vos comptes importants : emails, banque, réseaux sociaux, cloud."
                ]
            },

            // Tools
            tools: {
                patterns: ['outils', 'tools', 'tester sécurité', 'vérifier', 'scanner'],
                responses: [
                    "🛠️ CyberGuard met à votre disposition 4 outils interactifs :\n\n1. 🔐 Analyseur de Mots de Passe\n   Testez la force de vos mots de passe\n\n2. 💧 Détecteur de Fuites\n   Vérifiez si votre email a été compromis\n\n3. 🔍 Scanner Anti-Phishing\n   Analysez la sécurité d'une URL\n\n4. 🚨 Vérificateur de Violations\n   Découvrez les fuites de données\n\nQuel outil souhaitez-vous utiliser ?"
                ]
            },

            // Comparator
            comparator: {
                patterns: ['comparateur', 'comparer', 'choisir', 'recommandation', 'meilleur antivirus'],
                responses: [
                    "⚖️ Notre comparateur intelligent vous aide à choisir la solution parfaite !\n\nDeux options :\n\n1. 🎯 Quiz Personnalisé (1 min)\n   Répondez à 5 questions et obtenez les 3 meilleurs produits pour votre profil\n\n2. 📊 Tableau Comparatif\n   Comparez manuellement toutes les solutions avec filtres par type, budget et plateforme\n\nQue préférez-vous ?"
                ]
            },

            // Pricing
            pricing: {
                patterns: ['prix', 'tarif', 'coût', 'abonnement', 'pricing', 'combien'],
                responses: [
                    "💰 Nos solutions s'adaptent à tous les budgets :\n\n🔹 BASIQUE - 9.99€/mois\n   Protection essentielle, 1 appareil\n\n🔸 PRO - 19.99€/mois (⭐ POPULAIRE)\n   Sécurité avancée, 5 appareils, VPN\n\n🔶 ENTERPRISE - 49.99€/mois\n   Suite complète, appareils illimités, support prioritaire\n\nTous les forfaits incluent : pare-feu quantique, détection IA, monitoring 24/7 et chiffrement AES-256."
                ]
            },

            // Help
            help: {
                patterns: ['aide', 'help', 'comment', 'que peux-tu faire', 'fonctionnalités'],
                responses: [
                    "🤖 Je suis votre Assistant CyberGuard ! Je peux vous aider avec :\n\n• 💬 Questions cybersécurité (phishing, ransomware, VPN...)\n• 🛡️ Conseils de protection personnalisés\n• 🛠️ Guide d'utilisation des outils\n• 📊 Recommandations de produits\n• 🌍 Informations sur les menaces actuelles\n• 💡 Astuces et bonnes pratiques\n\nPosez-moi n'importe quelle question sur la cybersécurité !"
                ]
            },

            // Thanks
            thanks: {
                patterns: ['merci', 'thanks', 'thank you', 'super', 'parfait', 'excellent'],
                responses: [
                    "De rien ! N'hésitez pas si vous avez d'autres questions sur la cybersécurité. 🛡️",
                    "Avec plaisir ! Restez protégé et sécurisé ! 🔐",
                    "Content d'avoir pu vous aider ! Votre sécurité est notre priorité. ⚡"
                ]
            },

            // Blog
            blog: {
                patterns: ['blog', 'article', 'actualités', 'news', 'guides'],
                responses: [
                    "📚 Notre blog contient des articles, guides et analyses sur :\n\n• Actualités cybersécurité\n• Tutoriels pas-à-pas\n• Analyses de menaces\n• Tests de produits\n• Alertes sécurité\n\nConsultez la section Blog pour rester informé des dernières menaces et meilleures pratiques !"
                ]
            }
        };
    }

    getWelcomeMessage() {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) greeting = "Bonjour";
        else if (hour < 18) greeting = "Bon après-midi";
        else greeting = "Bonsoir";

        return `${greeting} ! 👋\n\nJe suis l'**Assistant CyberGuard**, votre expert en cybersécurité disponible 24/7.\n\nJe peux vous aider avec :\n• Conseils de sécurité personnalisés\n• Questions sur les menaces\n• Recommandations de produits\n• Utilisation des outils\n\n**Comment puis-je vous aider aujourd'hui ?**`;
    }

    createChatbotUI() {
        // Create floating chat button
        const chatButton = document.createElement('button');
        chatButton.id = 'cyberguard-chat-btn';
        chatButton.className = 'cyberguard-chat-btn';
        chatButton.innerHTML = `
            <div class="chat-btn-icon">🤖</div>
            <div class="chat-btn-pulse"></div>
            <span class="chat-btn-badge" id="chat-unread-badge">1</span>
        `;
        chatButton.setAttribute('aria-label', 'Open CyberGuard AI Assistant');
        document.body.appendChild(chatButton);

        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'cyberguard-chat-window';
        chatWindow.className = 'cyberguard-chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-left">
                    <div class="chat-avatar">
                        <span>🤖</span>
                        <div class="chat-status-indicator"></div>
                    </div>
                    <div class="chat-header-info">
                        <h3>Assistant CyberGuard</h3>
                        <p class="chat-status">En ligne</p>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button class="chat-action-btn" id="chat-minimize-btn" title="Minimize">
                        <span>─</span>
                    </button>
                    <button class="chat-action-btn" id="chat-close-btn" title="Close">
                        <span>✖</span>
                    </button>
                </div>
            </div>

            <div class="chat-body" id="chat-body">
                <!-- Messages will be added here -->
            </div>

            <div class="chat-quick-actions" id="chat-quick-actions">
                <button class="quick-action-btn" data-message="Comment créer un mot de passe sûr ?">
                    🔐 Mots de passe
                </button>
                <button class="quick-action-btn" data-message="Comment me protéger du phishing ?">
                    🎣 Phishing
                </button>
                <button class="quick-action-btn" data-message="Quel antivirus choisir ?">
                    🛡️ Antivirus
                </button>
                <button class="quick-action-btn" data-message="Comment utiliser vos outils ?">
                    🛠️ Outils
                </button>
            </div>

            <div class="chat-input-container">
                <div class="chat-typing-indicator" id="chat-typing-indicator">
                    <span></span><span></span><span></span>
                </div>
                <form class="chat-input-form" id="chat-input-form">
                    <input
                        type="text"
                        class="chat-input"
                        id="chat-input"
                        placeholder="Posez votre question..."
                        autocomplete="off"
                    />
                    <button type="submit" class="chat-send-btn" id="chat-send-btn">
                        <span class="send-icon">▶</span>
                    </button>
                </form>
                <div class="chat-input-footer">
                    Propulsé par CyberGuard AI • <span class="chat-footer-link" id="clear-history">Effacer historique</span>
                </div>
            </div>
        `;
        document.body.appendChild(chatWindow);

        // Event listeners
        chatButton.addEventListener('click', () => this.toggleChat());
        document.getElementById('chat-close-btn').addEventListener('click', () => this.closeChat());
        document.getElementById('chat-minimize-btn').addEventListener('click', () => this.minimizeChat());
        document.getElementById('chat-input-form').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('clear-history').addEventListener('click', () => this.clearHistory());

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendMessage(message);
            });
        });

        // Auto-focus input when opened
        chatWindow.addEventListener('transitionend', () => {
            if (this.isOpen) {
                document.getElementById('chat-input').focus();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('cyberguard-chat-window');
        const chatBtn = document.getElementById('cyberguard-chat-btn');
        const badge = document.getElementById('chat-unread-badge');

        if (this.isOpen) {
            chatWindow.classList.add('open');
            chatBtn.classList.add('active');
            badge.style.display = 'none';
        } else {
            chatWindow.classList.remove('open');
            chatBtn.classList.remove('active');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('cyberguard-chat-window').classList.remove('open');
        document.getElementById('cyberguard-chat-btn').classList.remove('active');
    }

    minimizeChat() {
        this.closeChat();
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (message) {
            this.sendMessage(message);
            input.value = '';
        }
    }

    sendMessage(message) {
        // Add user message
        this.addMessage('user', message);

        // Save to history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: Date.now()
        });
        this.saveConversationHistory();

        // Track achievement
        if (window.achievementSystem) {
            window.achievementSystem.trackAction('chatMessage');
        }

        // Process and respond
        setTimeout(() => {
            const response = this.processMessage(message);
            this.addMessage('ai', response);

            this.conversationHistory.push({
                type: 'ai',
                message: response,
                timestamp: Date.now()
            });
            this.saveConversationHistory();
        }, 800 + Math.random() * 1200);
    }

    processMessage(message) {
        const messageLower = message.toLowerCase();

        // Check each category in knowledge base
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            for (const pattern of data.patterns) {
                if (messageLower.includes(pattern)) {
                    // Return random response from category
                    const responses = data.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }

        // Default response if no match found
        return this.getDefaultResponse();
    }

    getDefaultResponse() {
        const responses = [
            "🤔 Intéressante question ! Pour une réponse plus précise, pouvez-vous reformuler ou préciser votre demande ?\n\nJe suis expert en :\n• Cybersécurité générale\n• Antivirus et VPN\n• Protection contre les menaces\n• Outils de sécurité\n\nQue voulez-vous savoir exactement ?",
            "Je ne suis pas sûr d'avoir bien compris votre question. Pouvez-vous la reformuler ?\n\nVous pouvez me demander :\n• Des conseils de sécurité\n• Des infos sur nos produits\n• Comment utiliser nos outils\n• Des explications sur les menaces",
            "🔍 Je n'ai pas trouvé de réponse précise à votre question. Essayez de me demander :\n\n• 'Comment créer un mot de passe sûr ?'\n• 'Qu'est-ce que le phishing ?'\n• 'Quel antivirus choisir ?'\n• 'Comment utiliser vos outils ?'\n\nOu consultez notre blog pour plus d'informations !"
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(type, message) {
        const chatBody = document.getElementById('chat-body');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message chat-message-${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'chat-message-avatar';
        avatar.innerHTML = type === 'ai' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'chat-message-content';

        const bubble = document.createElement('div');
        bubble.className = 'chat-message-bubble';

        // Convert markdown-like syntax to HTML
        const formattedMessage = this.formatMessage(message);
        bubble.innerHTML = formattedMessage;

        const time = document.createElement('div');
        time.className = 'chat-message-time';
        time.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        content.appendChild(bubble);
        content.appendChild(time);

        if (type === 'ai') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(content);
            messageDiv.appendChild(avatar);
        }

        chatBody.appendChild(messageDiv);

        // Scroll to bottom with animation
        setTimeout(() => {
            chatBody.scrollTo({
                top: chatBody.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);

        // Show typing indicator before AI message
        if (type === 'user') {
            this.showTypingIndicator();
        } else {
            this.hideTypingIndicator();
        }
    }

    formatMessage(message) {
        return message
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/•/g, '<span class="bullet">•</span>'); // Bullets
    }

    showTypingIndicator() {
        this.isTyping = true;
        document.getElementById('chat-typing-indicator').classList.add('show');
    }

    hideTypingIndicator() {
        this.isTyping = false;
        document.getElementById('chat-typing-indicator').classList.remove('show');
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('cyberguard-chat-history');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);

            // Render messages (limit to last 50)
            const recentMessages = this.conversationHistory.slice(-50);
            recentMessages.forEach(msg => {
                this.addMessage(msg.type, msg.message);
            });
        }
    }

    saveConversationHistory() {
        // Keep only last 100 messages
        if (this.conversationHistory.length > 100) {
            this.conversationHistory = this.conversationHistory.slice(-100);
        }
        localStorage.setItem('cyberguard-chat-history', JSON.stringify(this.conversationHistory));
    }

    clearHistory() {
        if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique de conversation ?')) {
            this.conversationHistory = [];
            localStorage.removeItem('cyberguard-chat-history');
            document.getElementById('chat-body').innerHTML = '';

            // Send welcome message again
            setTimeout(() => {
                this.addMessage('ai', this.getWelcomeMessage());
            }, 500);
        }
    }

    loadUserProfile() {
        const saved = localStorage.getItem('cyberguard-user-profile');
        return saved ? JSON.parse(saved) : {
            name: null,
            interests: [],
            previousQuestions: []
        };
    }
}

// Initialize CyberGuard AI Assistant when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cyberGuardAI = new CyberGuardAI();
    });
} else {
    window.cyberGuardAI = new CyberGuardAI();
}
