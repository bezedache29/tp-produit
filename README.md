# Tp-produit

## Contraintes :

- Il faut qu'il y est du post, du delete, du get et de l'update
- L'usage de routes multiples et vuex est obligatoire
- Vous devrez utiliser un logiciel de gestion de tâches pour vous organisez
- Utilisez git afin de ne pas vous marcher dessus également

Commencez par faire des wireframes, même très simples, avant de partir trop loin dans le code

Le visuel sera noté, même si moins important que le reste.

> Vous avez jusqu'à vendredi 28 mai, 12h30

## Le projet :

L'idée serait d'avoir : 

- Une navbar avec un lien pointant vers la liste des produits
- l'index affichera tous les produits
- Un lien dans la navbar permettera d'ajouter un produit
- Un bouton sur chaque produit permettera de l'update
- Un autre bouton sur chaque produit permettera de le delete
- Un dernier bouton sur le produit permettra de voir le produit en detail

## Options : 

- Ajout d'un formulaire de contact. Les informations du formulaire seront stockées en bdd et on pourra les checks sur une page dédiée
- Ajouter des commentaires sur un produit dans les détails de ce dernier et voir tous les commentaires qui concerne ce produit en dessous de ses caractéristiques (relation produit / commentaire)

## Fonctionnement :

Un produit contient :
- Une image,
- Un titre,
- Un prix,
- Une petite description,
- Une description plus détaillé (caractéristique technique ?)

Le formulaire contient :
- Un champ pour l'email,
- Un champ pour l'objet,
- Un champ pour le texte,
- Un bouton submit

Le commentaire contient :
- Un nom/email,
- Un texte

### ✅ Listes des tâches à faire :

- [x]  Installation de Vue
- [x]  Installation de Vue router + Mise en place
- [x]  Installation de Sass + Mise en place
- [x]  Composant NavbarApp qui s'affichera sur toutes les pages + Installation des routes
- [x]  Composant HomeApp qui sera la page d'accueil du site
- [x]  Composant ProductList qui affichera tous les produits
- [x]  Composant ProductCard qui sera appelé dans dans ProductList pour afficher les infos d'un produit
- [x]  Installation de Vuex + Mise en place du store
- [x]  Composant Bouton custom pour être réutilisable
- [x]  Composant Modal custom pour être réutilisable
- [x]  Installation d'axios pour les requêtes vers firebase
- [x]  Composant AlertMsg qui s'affichera avec un message personnalisé lors d'une action avec succès
- [x]  Ajout d'un nouveau produit en BDD via la modal
- [x]  Récupération de la liste des produits en BDD pour les afficher dans ProductList
- [x]  Passage des props du produit dans ProductCard
- [x]  Début style ProductList + ProductCard + ModalApp
- [x]  Modifier un produit avec gestion des erreurs
- [x]  Composant ProductDetails permet de voir les détails du produit sélectionné. (Détails + Commentaires du produit)
- [x]  Composant ProductDetails permet d'ajouter et de voir les commentaires du produit
- [x]  Composant ProductComment qui permet de voir les détaisl d'un commentaire
- [x]  Supprimer un produit + supprimer les commentaires ratachés au produit
- [x]  Composant ContactForm qui affichera un formulaire de contact + Style
- [x]  Composant MailBox qui affichera toutes les résultats de tous les envoies de formulaire + Style
- [x]  Composant MailBox ne sera accessible que si la personne est connecté au site
- [x]  Connexion au site avec un user présent en BDD

### Identifiants connexion :
User : tophe
Pwd : azerty