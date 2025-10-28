# 🔧 Dépannage du Système de Blog

## ❌ Problème: "Ça ne marche pas quand je clique sur Lire"

### Solution 1: Vérifier que blog.js est bien chargé

1. Ouvrez la page web
2. Appuyez sur **F12** (ou clic droit → Inspecter)
3. Allez dans l'onglet **Console**
4. Vous devriez voir: `🎉 Blog System Initialized`

**Si vous ne voyez pas ce message:**
- Vérifiez que `<script src="blog.js"></script>` est bien dans votre HTML
- Vérifiez que le fichier `blog.js` existe dans le même dossier
- Rechargez la page (Ctrl+R ou Cmd+R)

### Solution 2: Vérifier les titres

Les titres dans le HTML **doivent correspondre EXACTEMENT** aux titres dans blog.js.

**Titres corrects à utiliser dans index.html:**

```html
<!-- Article 1 -->
<h4 class="blog-title">Top 10 des gestionnaires de mots de passe en 2025</h4>

<!-- Article 2 -->
<h4 class="blog-title">Configuration d'un VPN pour débutants</h4>

<!-- Article 3 -->
<h4 class="blog-title">Nouvelle vague d'attaques par ransomware : Comment se protéger</h4>

<!-- Article 4 -->
<h4 class="blog-title">Sécuriser son smartphone : 15 astuces essentielles</h4>

<!-- Article 5 -->
<h4 class="blog-title">Naviguer anonymement sur Internet</h4>

<!-- Article 6 -->
<h4 class="blog-title">Cybersécurité en entreprise : Plan d'action complet</h4>
```

### Solution 3: Test rapide dans la console

Ouvrez la console (F12) et tapez:

```javascript
// Vérifier que le système est chargé
console.log(window.blogSystem);

// Voir tous les articles
console.log(blogArticles);

// Voir les titres
blogArticles.forEach(a => console.log(a.title));

// Tester l'ouverture d'un article
window.blogSystem.openArticle(blogArticles[0]);
```

Si l'article s'ouvre avec cette commande, le problème vient des titres qui ne correspondent pas.

### Solution 4: Vider le cache

Parfois, le navigateur garde une ancienne version en cache.

**Chrome/Edge:**
- Ctrl+Shift+R (Windows)
- Cmd+Shift+R (Mac)

**Safari:**
- Cmd+Option+E puis Cmd+R

**Firefox:**
- Ctrl+Shift+R (Windows)
- Cmd+Shift+R (Mac)

### Solution 5: Utiliser le fichier de test

Ouvrez `test-blog-simple.html` qui a été créé. Ce fichier vous dira exactement ce qui ne fonctionne pas.

## ❌ Problème: Le modal ne s'affiche pas

### Vérifications:

1. **La console montre-t-elle une erreur?**
   - F12 → Console
   - Recherchez des messages en rouge

2. **Le modal est-il créé?**
   Console:
   ```javascript
   document.querySelector('.blog-modal')
   ```
   Doit retourner un élément, pas `null`

3. **La classe 'active' est-elle ajoutée?**
   Console:
   ```javascript
   document.querySelector('.blog-modal').classList.contains('active')
   ```
   Doit retourner `true` quand le modal est ouvert

## ❌ Problème: Le contenu ne s'affiche pas correctement

### Cause probable: Format markdown incorrect

Les articles dans `blog.js` doivent utiliser le bon format:

```javascript
content: `
# Titre H1
## Titre H2

Paragraphe de texte.

**Texte en gras**

- Liste item 1
- Liste item 2

\`code inline\`

\`\`\`
Bloc de code
\`\`\`
`
```

**Attention aux guillemets:**
- Utilisez des backticks (\`) pour le content
- Échappez les backticks internes avec \\

## ✅ Checklist de vérification complète

```
☐ blog.js existe dans le dossier
☐ blog.js est chargé dans index.html
☐ La console montre "Blog System Initialized"
☐ Les titres correspondent EXACTEMENT
☐ La classe .blog-card existe sur les cartes
☐ La classe .blog-title existe sur les titres
☐ La classe .blog-link existe sur les liens
☐ Cache du navigateur vidé
```

## 🐛 Debug avancé

### Voir tous les événements de clic

Console:
```javascript
document.addEventListener('click', (e) => {
    console.log('Clic sur:', e.target);
    console.log('Closest blog-link:', e.target.closest('.blog-link'));
    console.log('Closest blog-card:', e.target.closest('.blog-card'));
});
```

### Forcer l'ouverture d'un article spécifique

Console:
```javascript
// Par ID
const article = blogArticles.find(a => a.id === 1);
window.blogSystem.openArticle(article);

// Par titre
const article = blogArticles.find(a => a.title.includes("VPN"));
window.blogSystem.openArticle(article);
```

### Lister toutes les cartes et leurs titres

Console:
```javascript
document.querySelectorAll('.blog-card').forEach(card => {
    const title = card.querySelector('.blog-title')?.textContent;
    console.log('Carte trouvée:', title);
});
```

## 📞 Besoin d'aide supplémentaire?

1. Ouvrez la console (F12)
2. Copiez TOUS les messages (erreurs en rouge)
3. Vérifiez les titres exacts
4. Testez avec `test-blog-simple.html`

## 🎯 Test ultime

Ouvrez la console et collez ce code:

```javascript
// Test complet du système
const testBlog = () => {
    const results = [];

    // Test 1: Chargement
    results.push({
        test: 'blog.js chargé',
        ok: typeof blogArticles !== 'undefined',
        value: typeof blogArticles !== 'undefined' ? blogArticles.length + ' articles' : 'Non chargé'
    });

    // Test 2: BlogSystem
    results.push({
        test: 'BlogSystem créé',
        ok: !!window.blogSystem,
        value: window.blogSystem ? 'OK' : 'Non créé'
    });

    // Test 3: Modal
    results.push({
        test: 'Modal existe',
        ok: !!document.querySelector('.blog-modal'),
        value: document.querySelector('.blog-modal') ? 'Trouvé' : 'Non trouvé'
    });

    // Test 4: Cartes
    const cards = document.querySelectorAll('.blog-card');
    results.push({
        test: 'Cartes blog',
        ok: cards.length > 0,
        value: cards.length + ' cartes trouvées'
    });

    // Test 5: Titres
    const titles = Array.from(document.querySelectorAll('.blog-title')).map(el => el.textContent);
    const matching = titles.filter(title =>
        blogArticles?.some(a => a.title === title)
    );
    results.push({
        test: 'Titres correspondent',
        ok: matching.length === titles.length,
        value: matching.length + '/' + titles.length + ' correspondent'
    });

    // Afficher les résultats
    console.table(results);

    // Liste des titres qui ne correspondent pas
    if (matching.length < titles.length) {
        console.group('❌ Titres qui ne correspondent pas:');
        titles.forEach(title => {
            const found = blogArticles?.find(a => a.title === title);
            if (!found) {
                console.log('HTML:', title);
                console.log('Plus proche dans blog.js:',
                    blogArticles?.reduce((best, a) => {
                        const similarity = [...title].filter((c, i) => a.title[i] === c).length;
                        return similarity > best.score ? {title: a.title, score: similarity} : best;
                    }, {title: '', score: 0}).title
                );
            }
        });
        console.groupEnd();
    }

    return results.every(r => r.ok) ? '✅ TOUT FONCTIONNE!' : '❌ Des problèmes détectés (voir ci-dessus)';
};

testBlog();
```

Ce script vous dira **exactement** ce qui ne va pas! 🎯
