(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider', '$logProvider', '$uiViewScrollProvider', '$translateProvider'];

  function bootstrapConfig($compileProvider, $locationProvider, $httpProvider, $logProvider, $uiViewScrollProvider, $translateProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');

    // Disable debug data for production environment
    // @link https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
    $logProvider.debugEnabled(app.applicationEnvironment !== 'production');

    $uiViewScrollProvider.useAnchorScroll();

    $translateProvider.translations('en', {
      TEAMS: 'Teams',
      PROJECTS: 'Projects',
      OPPORTUNITIES: 'Opportunities',
      SIGNUP: 'Sign Up',
      SIGNIN: 'Sign In',
      HOME: 'Home',
      BETA: 'Beta',
      BETA_DESC: 'The term “beta” in software development refers to a development phase within its lifecycle that provides opportunities to conduct proofing and testing often with users from outside of the project team (general public).  This allows the project team to adjust the product according to new test data. The distribution of a beta release can be as limiting or vast as project resources allow. The goal of a beta release is to garner feedback on, but not exclusively to, the design, process, and demand by collecting user experience comments and statistics. A beta is ephemeral in nature, and moves into official production status once the proofing and testing is successful.',
      CHANGE_LANGUAGE: 'Français',
      HEADER_FIP: '<object type="image/svg+xml" tabindex="-1" data="/modules/core/client/img/wet/sig-blk-en.svg"></object><span class="wb-inv"> Government of Canada / <span lang="fr">Gouvernement du Canada</span></span>',
      TITLE: 'Government of Canada Developers Exchange',
      ABOUT_TITLE: 'About GC DevEx Beta',
      ABOUT_P1: 'The Government of Canada Developers Exchange (GC Dev Ex Beta) is a micro-procurement platform where teams within the Government of Canada can post <a href="/en/opportunities">opportunities</a> to developers who are eligible to work in Canada. The dollar value of these contracts cannot exceed $10,000 CAD, including GST. This is one of several initiatives underway to make it easier for government and developers to work together.',
      ABOUT_P2: '<a href="/en/authentication/government">Register now</a> to be notified of future opportunities!',
      DEPTS_TITLE: 'Participating government departments',
      DEPTS_P1: 'GC Dev Ex Beta was started by Privy Council Office (PCO) and Treasury Board of Canada Secretariat (TBS), in collaboration with Public Services and Procurement Canada (PSPC). These departments are responsible for managing the beta site and evaluating the initiative.',
      DEPTS_P2: 'Other federal departments who wish to use the GC Dev Ex Beta can contact <a href="mailto:consultation@pco-bcp.gc.ca">consultation@pco-bcp.gc.ca</a>. Once evaluated, the initiative may be expanded.',
      CODE_TITLE: 'Re-use this code',
      CODE_P1: 'The code for the GC Dev Ex Beta platform was first developed by the Government of British Columbia for its <a href="https://bcdevexchange.org/">British Columbia Developers\' Exchange</a>. It was then modified to meet Treasury Board of Canada Secretariat (TBS) Web Standards and the <em>Official Languages Act</em>.',
      CODE_P2: 'Other governments can re-use this modified code. With the exception of the federal identifier (AKA Canada logo), all parts of the platform are licensed for re-use through the <a href="http://www.apache.org/licenses/">Apache License</a>.',
      CODE_P3: 'Whether you are part of a provincial, municipal, or national government elsewhere, you can fork the code on GitHub and set-up your own micro-procurement platform to work with developers in your community.',
      IMG_CAP1: '',
      IMG_CAP2: '',
      IMG_CAP3: '',
      VID_TITLE: 'Government collaboration at CodeFest',
      VID_P1: 'Highlights from the 2<sup>nd</sup> CodeFest held in August 2013.',
      LINKS_TITLE1: 'Work With Us',
      LINKS_A1: '<a href="https://github.com/canada-ca/welcome">Canada on GitHub</a>',
      LINKS_A2: '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/government-communications.html">Web Standards Policies</a>',
      LINKS_TITLE2: 'Open Source in Canada\'s Governments',
      LINKS_B1: '<a href="http://wet-boew.github.io/wet-boew/index.html">Web Experience Toolkit</a>',
      LINKS_B2: '<a href="https://github.com/gctools-outilsgc">GC 2.0 Tools on GitHub</a>',
      LINKS_B3: '<a href="https://bcdevexchange.org">B.C. Developers Exchange</a>',
      LINKS_B4: '<a href="https://government.github.com/community#canada">Canadian Government Accounts on GitHub</a>',
      SUBFOOTER_TITLE: 'About government',
      SUBFOOTER_LINK1: '<a href="https://www.canada.ca/en/contact.html">Contact us</a>',
      SUBFOOTER_LINK2: '<a href="https://www.canada.ca/en/government/dept.html">Departments and agencies</a>',
      SUBFOOTER_LINK3: '<a href="https://www.canada.ca/en/government/publicservice.html">Public service and military</a>',
      SUBFOOTER_LINK4: '<a href="https://www.canada.ca/en/news.html">News</a>',
      SUBFOOTER_LINK5: '<a href="https://www.canada.ca/en/government/system/laws.html">Treaties, laws and regulations</a>',
      SUBFOOTER_LINK6: '<a href="https://www.canada.ca/en/transparency/reporting.html">Government-wide reporting</a>',
      SUBFOOTER_LINK7: '<a href="http://pm.gc.ca/eng">Prime Minister</a>',
      SUBFOOTER_LINK8: '<a href="https://www.canada.ca/en/government/system.html">How government works</a>',
      SUBFOOTER_LINK9: '<a href="http://open.canada.ca/en/">Open government</a>',
      FOOTER_TITLE: 'About this site',
      FOOTER_LINK1: '<a href="https://www.canada.ca/en/social.html">Social media</a>',
      FOOTER_LINK2: '<a href="https://www.canada.ca/en/mobile.html">Mobile applications</a>',
      FOOTER_LINK3: '<a href="https://www1.canada.ca/en/newsite.html">About Canada.ca</a>',
      FOOTER_LINK4: '<a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a>',
      FOOTER_LINK5: '<a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a>',
      FOOTER_TOP: 'Top of Page <span class="glyphicon glyphicon-chevron-up"></span>',
      FOOTER_FIP: 'Symbol of the Government of Canada',
      TEAMS_TITLE: 'All Teams',
      TEAMS_P1: 'The following table contains a list of all programs participating in GC DevEx beta. Filter the list by typing the name of a team or organization or sort a column using the arrows.',
      TEAMS_P2: 'This is not a full list of all GC programs. A full list of all GC services or information is available on <a href="https://www.canada.ca/en/services.html">canada.ca</a>.',
      TEAMS_TH1: 'Team Title',
      TEAMS_TH2: 'Description',
      TEAMS_TH3: 'Department',
      PROG_TITLE: 'Teams List',
      PROG_ALL: 'All teams',
      PROJ_TITLE: 'Projects List',
      PROJ_ALL: 'All projects',
      OPP_TITLE: 'Opportunities List',
      OPP_ALL: 'All opportunities',
      OPP_CTA: 'Want to get notified when new opportunities are posted?',
      OPP_FOR: 'Opportunities for ',
    })
    .translations('fr', {
      TEAMS: 'Équipes',
      PROJECTS: 'Projets',
      OPPORTUNITIES: 'Possibilités',
      SIGNUP: 'S\'inscrire',
      SIGNIN: 'Se connecter',
      HOME: 'Accueil',
      BETA: 'Bêta',
      BETA_DESC: 'Dans le cadre du développement de logiciels, le terme « bêta » renvoie à une étape de son cycle de vie qui offre la possibilité de faire des examens et des essais, souvent auprès d\'utilisateurs de l\'extérieur de l\'équipe de projet (le grand public). L\'équipe de projet peut ainsi rajuster le projet en fonction des nouvelles données mises à l\'essai. La diffusion d\'une version bêta peut être aussi restreinte ou aussi vaste que le permettent les ressources du projet. La version bêta vise à obtenir de la rétroaction sur notamment la conception, le processus et la demande en recueillant des commentaires sur l\'expérience des utilisateurs ainsi que des statistiques. Une version bêta est de nature éphémère et arrive à l\'étape de production officielle une fois que les examens et les essais sont concluants.',
      CHANGE_LANGUAGE: 'English',
      HEADER_FIP: '<object type="image/svg+xml" tabindex="-1" data="/modules/core/client/img/wet/sig-blk-fr.svg"></object><span class="wb-inv"> Gouvernement du Canada / <span lang="en">Government of Canada</span></span>',
      TITLE: 'Le Carrefour des développeurs du gouvernement du Canada',
      ABOUT_TITLE: 'À propos de CarrefourProgGC bêta',
      ABOUT_P1: 'Le Carrefour des développeurs du gouvernement du Canada (CarrefourProgGC bêta) est une plateforme de micro-approvisionnement où des équipes du gouvernement du Canada peuvent afficher des <a href="/fr/opportunities">possibilités de travail contractuel</a> à l\'intention des développeurs qui ont le droit de travailler au Canada. La valeur des contrats ne doit pas dépasser 10 000 $ CA, TPS comprise. Le Carrefour fait partie de plusieurs initiatives en cours visant à aider le gouvernement et les développeurs à travailler ensemble.',
      ABOUT_P2: '<a href="/fr/authentication/government">Inscrivez-vous</a> maintenant pour être avisé des futures possibilités!',
      DEPTS_TITLE: 'Ministères participants',
      DEPTS_P1: 'Le CarrefourProgGC bêta a été lancé par le Bureau du Conseil privé (BCP) et le Secrétariat du Conseil du Trésor du Canada (SCT) en collaboration avec Services publics et Approvisionnement Canada (SPAC). Ces ministères sont responsables de la gestion du site bêta et de l\'évaluation de l\'initiative.',
      DEPTS_P2: 'Les autres ministères fédéraux qui souhaitent utiliser le CarrefourProgGC bêta peuvent communiquer avec <a href="mailto:consultation@pco-bcp.gc.ca">consultation@pco-bcp.gc.ca</a>. L\'initiative pourrait être étendue, une fois l\'évaluation nécessaire effectuée.',
      CODE_TITLE: 'Réutilisation du code',
      CODE_P1: 'Le code pour la plateforme CarrefourProgGC bêta a d\'abord été développé par le gouvernement de la Colombie-Britannique pour sa plateforme <a href="https://bcdevexchange.org/">British Columbia Developers\' Exchange</a>, puis modifié pour satisfaire aux normes Web du Secrétariat du Conseil du Trésor (SCT) et à la <em>Loi sur les langues officielles</em>.',
      CODE_P2: 'Les autres gouvernements peuvent réutiliser ce code modifié. En effet, il est possible de réutiliser tous les éléments de la plateforme, sauf l\'identificateur fédéral (c.‑à‑d. le logo du Canada), grâce à la <a href="http://www.apache.org/licenses/">licence Apache</a>.',
      CODE_P3: 'Que vous fassiez partie d\'un gouvernement provincial, d\'une administration municipale ou d\'un gouvernement national à l\'étranger, vous pouvez copier le code sur GitHub et établir votre propre plateforme de micro-approvisionnement afin de travailler avec les développeurs de votre communauté.',
      IMG_CAP1: '',
      IMG_CAP2: '',
      IMG_CAP3: '',
      VID_TITLE: 'Collaboration gouvernementale à CodeFest',
      VID_P1: 'Faits saillants de la 2<sup>ème</sup> CodeFest tenue en août 2013.',
      LINKS_TITLE1: 'Travailler avec nous',
      LINKS_A1: '<a href="https://github.com/canada-ca/welcome">Le Canada et GitHub</a>',
      LINKS_A2: '<a href="https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/communications-gouvernementales.html">Politiques sur les normes Web</a>',
      LINKS_TITLE2: 'Source ouverte des gouvernements du Canada',
      LINKS_B1: '<a href="http://wet-boew.github.io/wet-boew/index.html">Boîte à outils de l\'expérience Web</a>',
      LINKS_B2: '<a href="https://github.com/gctools-outilsgc">Outils GC 2.0 sur GitHub</a>',
      LINKS_B3: '<a href="https://bcdevexchange.org">B.C. Developers Exchange</a>',
      LINKS_B4: '<a href="https://government.github.com/community#canada">Comptes du gouvernement canadien sur GitHub</a>',
      SUBFOOTER_TITLE: 'Au sujet du gouvernement',
      SUBFOOTER_LINK1: '<a href="https://www.canada.ca/fr/contact.html">Contactez-nous</a>',
      SUBFOOTER_LINK2: '<a href="https://www.canada.ca/fr/gouvernement/min.html">Ministères et organismes</a>',
      SUBFOOTER_LINK3: '<a href="https://www.canada.ca/fr/gouvernement/fonctionpublique.html">Fonction publique et force militaire</a>',
      SUBFOOTER_LINK4: '<a href="https://www.canada.ca/fr/nouvelles.html">Nouvelles</a>',
      SUBFOOTER_LINK5: '<a href="https://www.canada.ca/fr/gouvernement/systeme/lois.html">Traités, lois et règlements</a>',
      SUBFOOTER_LINK6: '<a href="https://www.canada.ca/fr/transparence/rapports.html">Rapports à l\'échelle du gouvernement</a>',
      SUBFOOTER_LINK7: '<a href="http://pm.gc.ca/fra">Premier ministre</a>',
      SUBFOOTER_LINK8: '<a href="https://www.canada.ca/fr/gouvernement/systeme.html">Comment le gouvernement fonctionne</a>',
      SUBFOOTER_LINK9: '<a href="http://ouvert.canada.ca/">Gouvernement ouvert</a>',
      FOOTER_TITLE: 'À propos du site',
      FOOTER_LINK1: '<a href="https://www.canada.ca/fr/sociaux.html">Médias sociaux</a>',
      FOOTER_LINK2: '<a href="https://www.canada.ca/fr/mobile.html">Applications mobiles</a>',
      FOOTER_LINK3: '<a href="https://www1.canada.ca/fr/nouveausite.html">À propos de Canada.ca</a>',
      FOOTER_LINK4: '<a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a>',
      FOOTER_LINK5: '<a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialité</a>',
      FOOTER_TOP: 'Haut de la page <span class="glyphicon glyphicon-chevron-up"></span>',
      FOOTER_FIP: 'Symbole du gouvernement du Canada',
      TEAMS_TITLE: 'Toutes les équipes',
      TEAMS_P1: 'Le tableau suivant contient une liste de tous les programmes qui participent à CarrefourProgGC bêta. Filtrez la liste en inscrivant le nom d\'une équipe ou d\'une organisation ou triez une colonne au moyen des flèches.',
      TEAMS_P2: 'Ceci n\'est pas une liste complète de tous les programmes du gouvernement du Canada. Pour obtenir la liste complète de tous les services du gouvernement du Canada ou des renseignements à ce sujet, allez à canada.ca.',
      TEAMS_TH1: 'Nom de l\'équipe',
      TEAMS_TH2: 'Description',
      TEAMS_TH3: 'Ministère',
      PROG_TITLE: 'Liste des équipes',
      PROG_ALL: 'Toutes les équipes',
      PROJ_TITLE: 'Liste des projets',
      PROJ_ALL: 'Toutes les projets',
      OPP_TITLE: 'Liste des possibilités',
      OPP_ALL: 'Toutes les possibilités',
      OPP_CTA: 'Voulez-vous recevoir un avis quand de nouvelles possibilités sont affichées?',
      OPP_FOR: 'Possibilités pour ',
    })
    .preferredLanguage('en');
  }


  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        // var scroll = {
        //   top: document.body.scrollTop,
        //   left: document.body.scrollLeft
        // };
        // window.location.hash = '';
        // // Restore the scroll offset, should be flicker free
        // document.body.scrollTop = scroll.top;
        // document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));
