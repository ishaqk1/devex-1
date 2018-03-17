{{#markdown this}}
![GC Dev Exchange](https://gcdevexchange-carrefourproggc.org/modules/core/client/img/logo/new-logo-220px.png)

*Le français suit*

### Hi {{data.username}}!

We've just posted a new GC Developers Exchange opportunity:

### {{ data.name }}

- Posted: **{{ data.datePublished }}**
- Fixed Price: **{{ data.earn }}** (incl. taxes)
- Required Skills: **{{ data.skills }}**
- Closing Date: **{{ data.deadline_format_date }}**

### [See the details]({{ data.domain }}/en/opportunities/{{ data.code }})

[Follow this opportunity]({{ data.domain }}/api/subscribe/{{ data.subscriptionId }}/{{ data.updatenotification }}) to get alerts.

---

### Bonjour {{data.username}}!

Nous venons de publier une nouvelle opportunité de Carrefour des programmeurs du gouvernement du Canada:

### {{ data.name_fr }}

- Publié : **{{ data.datePublished_fr }}**
- Prix fixe : **{{ data.earn }}** (taxes incl.)
- Compétences requises : **{{ data.skills_fr }}**
- Date de clôture : **{{ data.deadline_format_date_fr }}**

### [Voir les détails]({{ data.domain }}/fr/opportunities/{{ data.code }})

[Suivez cette possibilité]({{ data.domain }}/api/subscribe/{{ data.subscriptionId }}/{{ data.updatenotification }}) pour recevoir des alertes.

---

### Use your skills to make a difference! | Utilisez vos compétences pour faire la difference!

---

**Want to stop receiving these emails? | Voulez-vous arrêter de recevoir ces couriels?**

[Unsubscribe now]({{ data.domain }}/api/unsubscribe/{{ data.subscriptionId }}) from notifications of new opportunities or manage notification preferences in your profile at [gcdevexchange-carrefourproggc.org](https://gcdevexchange-carrefourproggc.org/en). | [Désabonnez-vous maintenant]({{ data.domain }}/api/unsubscribe/{{ data.subscriptionId }}) des notifications de nouvelle possibilités ou gérez les préférences de notification dans votre profil à [gcdevexchange-carrefourproggc.org](https://gcdevexchange-carrefourproggc.org/fr).
{{/markdown}}
