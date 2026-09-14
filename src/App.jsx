import { useState } from 'react'
import './styles.css'

import logo from './assets/logo.png'
import accueil from './assets/accueil.jpg'
import One from './assets/One.jpg'
import Two from './assets/Two.jpg'
import Three from './assets/Three.jpg'
import Four from './assets/Four.jpg'
import Five from './assets/Five.jpg'
import Six from './assets/Six.jpg'
import Seven from './assets/Seven.jpg'
import Eight from './assets/Eight.jpg'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzculpkO9QZSbC0WtSlJET8xSZE9TjZZcc2ds0sIyvRz866Wv6aGQ9kvznipGAdTNZ1Zg/exec'

/* =========================================================
   DONNÉES ÉCOLES
========================================================= */

const schoolData = {
  CPGE: {
    cycles: null,
    filieres: ['MPSI', 'BCPST', 'PCSI', 'MP2I', 'ECS'],
    years: ['1ère année', '2ème année'],
  },

  ESI: {
    cycles: {
      Ingénieur: ['ISEM', 'STIC', 'STGI'],
      TS: ['STIC', 'STGI'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESA: {
    cycles: {
      Ingénieur: ['IA', 'ITA'],
      TS: ['TSA'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESAS: {
    cycles: {
      Autre: null,
      TS: ['AERO'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESCAE: {
    cycles: {
      Ingénieur: ['ESAD', 'ESCA', 'HEA', 'ECS', 'ESCM'],
      TS: ['FCA', 'GAE'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESCPE: {
    cycles: {
      Ingénieur: ['TCCGP', 'PE'],
      TS: ['CGG', 'PME'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESMG: {
    cycles: {
      Ingénieur: ['ETE', 'MC'],
      TS: ['MG'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },

  ESTP: {
    cycles: {
      Ingénieur: ['HE', 'IT', 'BU', 'Topographie'],
      TS: ['HE', 'RT', 'BU', 'Topographie'],
    },
    years: ['1ère année', '2ème année', '3ème année'],
  },
};
const interestsList = [
  'Mangas & Animés',
  'Jeux vidéo',
  'Culture japonaise & langue',
  'Dessin / Manga',
  'J-Pop / K-Pop',
  'Quiz & concours',
  'Création de contenu',
  'Autre',
]

const polesList = [
  'Communication & Médias',
  'Culture japonaise & Langue',
  'Organisation & Événementiel',
]

/* =========================================================
   IMAGES
========================================================= */

const stepImages = {
  0: accueil,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
}

/* =========================================================
   COMPOSANT PRINCIPAL
========================================================= */

function App() {
  const [step, setStep] = useState(0)
  const [chargement, setChargement] = useState(false)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')

  const [form, setForm] = useState({
    nom: '',
    matricule: '',
    ecole: '',
    cycle: '',
    filiere: '',
    annee: '',
    whatsapp: '',
    email: '',

    interests: [],

    typeMembre: '',

    poles: [],

    engagement: false,

    cotisation: false,
  })

  /* =======================================================
     MODIFICATION DES CHAMPS
  ======================================================= */

  const modifierChamp = (champ, valeur) => {
    setForm((ancien) => ({
      ...ancien,
      [champ]: valeur,
    }))

    setErreur('')
    setMessage('')
  }

  /* =======================================================
     ÉCOLE
  ======================================================= */

  const changerEcole = (ecole) => {
    setForm((ancien) => ({
      ...ancien,
      ecole,
      cycle: '',
      filiere: '',
      annee: '',
    }))

    setErreur('')
  }

  /* =======================================================
     CYCLE
  ======================================================= */

  const changerCycle = (cycle) => {
    setForm((ancien) => ({
      ...ancien,
      cycle,
      filiere: '',
      annee: '',
    }))

    setErreur('')
  }

  /* =======================================================
     FILIÈRE
  ======================================================= */

  const changerFiliere = (filiere) => {
    setForm((ancien) => ({
      ...ancien,
      filiere,
      annee: '',
    }))

    setErreur('')
  }

  /* =======================================================
     CENTRES D'INTÉRÊT
  ======================================================= */

  const toggleInterest = (interest) => {
    setForm((ancien) => {
      const existe = ancien.interests.includes(interest)

      return {
        ...ancien,
        interests: existe
          ? ancien.interests.filter((item) => item !== interest)
          : [...ancien.interests, interest],
      }
    })

    setErreur('')
  }

  /* =======================================================
     PÔLES
  ======================================================= */

  const togglePole = (pole) => {
    setForm((ancien) => {
      const existe = ancien.poles.includes(pole)

      if (existe) {
        return {
          ...ancien,
          poles: ancien.poles.filter((item) => item !== pole),
        }
      }

      if (ancien.poles.length >= 2) {
        return ancien
      }

      return {
        ...ancien,
        poles: [...ancien.poles, pole],
      }
    })

    setErreur('')
  }

  /* =======================================================
     TYPE DE MEMBRE
  ======================================================= */

  const changerTypeMembre = (type) => {
    setForm((ancien) => ({
      ...ancien,
      typeMembre: type,
      poles: type === 'actif' ? ancien.poles : [],
    }))

    setErreur('')
  }

  /* =======================================================
     VALIDATION NOM
  ======================================================= */

  const nomValide = (nom) => {
    return /^\s*\S+(?:\s+\S+)+\s*$/.test(nom.trim())
  }

  /* =======================================================
     VALIDATION MATRICULE
     Format : 25INP12345
======================================================= */

  const matriculeValide = (matricule) => {
    return /^\d{2}INP\d{5}$/i.test(matricule.trim())
  }

  /* =======================================================
     VALIDATION WHATSAPP
     Exactement 10 chiffres
======================================================= */

  const whatsappValide = (whatsapp) => {
    return /^\d{10}$/.test(whatsapp.replace(/\s/g, ''))
  }

  /* =======================================================
     VALIDATION ÉCOLE / CYCLE / FILIÈRE / ANNÉE
  ======================================================= */

  const formationValide = () => {
    if (!form.ecole) {
      return false
    }

    const data = schoolData[form.ecole]

    if (!data) {
      return false
    }

    /* CPGE : pas de cycle */
    if (form.ecole === 'CPGE') {
      return (
        form.filiere !== '' &&
        form.annee !== ''
      )
    }

    /* Autres écoles */
    if (!form.cycle || !form.annee) {
      return false
    }

    const filieres = data.cycles[form.cycle]

    /* Cycle sans filière */
    if (filieres === null) {
      return true
    }

    /* Cycle avec filière */
    return form.filiere !== ''
  }

  /* =======================================================
     VALIDATION DE CHAQUE ÉTAPE
  ======================================================= */

  const etapeValide = () => {
  if (step === 1) {
    return (
      nomValide(form.nom) &&
      matriculeValide(form.matricule) &&
      formationValide() &&
      whatsappValide(form.whatsapp)
    )
  }

  if (step === 2) {
    return form.interests.length > 0
  }

  if (step === 3) {
    return form.typeMembre !== ''
  }

  if (step === 4) {
    return form.engagement
  }

  if (step === 5) {
    return form.cotisation
  }

  return true
}

  const validerEtape = () => {
    setErreur('')

    /* -----------------------------------------
       ÉTAPE 1 : Informations personnelles
    ----------------------------------------- */

    if (step === 1) {
      if (!nomValide(form.nom)) {
        setErreur(
          'Veuillez entrer votre nom et prénom(s). Un seul nom n’est pas suffisant.'
        )
        return false
      }

      const matricule = form.matricule.trim().toUpperCase()

      if (!matriculeValide(matricule)) {
        setErreur(
          'Le matricule doit respecter le format 25INP12345.'
        )
        return false
      }

      if (!formationValide()) {
        setErreur(
          'Veuillez compléter correctement votre école, cycle, filière et année.'
        )
        return false
      }

      if (!whatsappValide(form.whatsapp)) {
        setErreur(
          'Le numéro WhatsApp doit contenir exactement 10 chiffres.'
        )
        return false
      }

      return true
    }

    /* -----------------------------------------
       ÉTAPE 2 : Centres d'intérêt
    ----------------------------------------- */

    if (step === 2) {
      if (form.interests.length === 0) {
        setErreur(
          'Sélectionnez au moins un centre d’intérêt.'
        )
        return false
      }

      return true
    }

    /* -----------------------------------------
       ÉTAPE 3 : Participation
    ----------------------------------------- */

    if (step === 3) {
      if (!form.typeMembre) {
        setErreur(
          'Veuillez choisir votre type de membre.'
        )
        return false
      }

      if (
        form.typeMembre === 'actif' &&
        form.poles.length > 2
      ) {
        setErreur(
          'Vous pouvez sélectionner au maximum deux pôles.'
        )
        return false
      }

      return true
    }

    /* -----------------------------------------
       ÉTAPE 4 : Engagement
    ----------------------------------------- */

    if (step === 4) {
      if (!form.engagement) {
        setErreur(
          'Vous devez accepter les engagements du club pour continuer.'
        )
        return false
      }

      return true
    }

    /* -----------------------------------------
       ÉTAPE 5 : Cotisation
    ----------------------------------------- */

    if (step === 5) {
      if (!form.cotisation) {
        setErreur(
          'Veuillez confirmer que vous avez pris connaissance de la cotisation.'
        )
        return false
      }

      return true
    }

    return true
  }

  /* =======================================================
     ENVOI GOOGLE SHEETS
  ======================================================= */

  const envoyerInscription = async () => {
    setChargement(true)
    setErreur('')
    setMessage('')

    const donnees = {
      nomPrenom: form.nom.trim(),

      matricule: form.matricule
        .trim()
        .toUpperCase(),

      ecole: form.ecole,

      cycle: form.cycle,

      filiere: form.filiere,

      annee: form.annee,

      whatsapp: form.whatsapp.replace(/\s/g, '').trim(),

      email: form.email.trim(),

      centresInteret: form.interests.join(' ; '),

      typeMembre:
        form.typeMembre === 'actif'
          ? 'Membre actif'
          : 'Membre',

      poles:
        form.poles.length > 0
          ? form.poles.join(' ; ')
          : 'Aucun pour le moment',
    }

    try {
      const reponse = await fetch(SCRIPT_URL, {
        method: 'POST',

        headers: {
          'Content-Type':
            'text/plain;charset=utf-8',
        },

        body: JSON.stringify(donnees),
      })

      const resultat = await reponse.json()

      if (!resultat.succes) {
        setErreur(
          resultat.message ||
            'Une erreur est survenue lors de l’inscription.'
        )

        return false
      }

      setMessage(
        'Inscription enregistrée avec succès.'
      )

      return true
    } catch (error) {
      console.error(error)

      setErreur(
        'Impossible de contacter le serveur. Vérifiez votre connexion Internet puis réessayez.'
      )

      return false
    } finally {
      setChargement(false)
    }
  }

  /* =======================================================
     BOUTON SUIVANT
  ======================================================= */

  const suivant = async () => {
    if (!validerEtape()) {
      return
    }

    /*
      ÉTAPE 5 = dernière étape avant confirmation.
      On enregistre donc l'inscription ici.
    */

    if (step === 5) {
      const succes = await envoyerInscription()

      if (succes) {
        setStep(6)
      }

      return
    }

    setStep((ancien) => ancien + 1)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     BOUTON RETOUR
  ======================================================= */

  const precedent = () => {
    setErreur('')
    setMessage('')

    setStep((ancien) =>
      Math.max(ancien - 1, 0)
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     DONNÉES FORMATION
  ======================================================= */

  const currentSchool = schoolData[form.ecole]

  const cycles =
    currentSchool?.cycles
      ? Object.keys(currentSchool.cycles)
      : []

  const filieres =
    form.ecole === 'CPGE'
      ? currentSchool?.filieres || []
      : form.cycle &&
        currentSchool?.cycles?.[form.cycle]
      ? currentSchool.cycles[form.cycle]
      : []

  const annees =
    currentSchool?.years || []

  /* =======================================================
     AFFICHAGE
  ======================================================= */

  return (
    <div className="app">

      {/* =================================================
          EN-TÊTE
      ================================================= */}

      <header className="header">
        <img
          src={logo}
          alt="Logo Otaku No Kai INP-HB"
          className="logo"
        />

        <div className="header-title">
          <h1>OTAKU NO KAI INP-HB</h1>
        </div>
      </header>

      {/* =================================================
          CONTENU PRINCIPAL
      ================================================= */}

            <main className="container">

        <div
          className="form-background"
          style={{
            backgroundImage: `url(${stepImages[step]})`,
          }}
        >
          <div className="background-overlay"></div>

          <div className="form-content">

        {/* =================================================
            PAGE D'ACCUEIL
        ================================================= */}

        {step === 0 && (
    
          <section className="card welcome">

            <h2>
              Bienvenue dans Otaku No Kai INP-HB 🎌
            </h2>

            <p>
              Bienvenue dans l’espace d’inscription
              officiel du club <strong>Otaku No Kai INP-HB</strong>.
            </p>

            <p>
              Le club rassemble les étudiants passionnés
              de mangas, d’animés, de jeux vidéo, de dessin,
              de musique et de culture japonaise.
            </p>

            <p>
              Ici, la passion devient un moyen de partager,
              d’apprendre, de créer et de relever des défis
              ensemble.
            </p>

            <div className="welcome-motto">
              <strong>
                « La passion nous lie, le défi nous forge. »
              </strong>
            </div>

            <button
              className="primary-button"
              onClick={suivant}
            >
              🚀 Je rejoins le club
            </button>

          </section>
        )}

        {/* =================================================
            ÉTAPE 1 : INFORMATIONS PERSONNELLES
        ================================================= */}

        {step === 1 && (
          <section className="card">

            <h2>👤 Informations personnelles</h2>

            <div className="form-group">

              <label>
                Nom et prénom(s) *
              </label>

              <input
                type="text"
                value={form.nom}
                onChange={(e) =>
                  modifierChamp(
                    'nom',
                    e.target.value
                  )
                }
                placeholder="Ex. Konaté Yaya"
              />

            </div>

            <div className="form-group">

              <label>
                Matricule *
              </label>

              <input
                type="text"
                value={form.matricule}
                onChange={(e) =>
                  modifierChamp(
                    'matricule',
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Ex. 25INP00345"
                maxLength={10}
              />

              <small>
                Matricule INPHB.
              </small>

            </div>

            {/* ÉCOLE */}

            <div className="form-group">

              <label>
                École *
              </label>

              <select
                value={form.ecole}
                onChange={(e) =>
                  changerEcole(e.target.value)
                }
              >
                <option value="">
                  -- Sélectionner votre école --
                </option>

                {Object.keys(schoolData).map(
                  (ecole) => (
                    <option
                      key={ecole}
                      value={ecole}
                    >
                      {ecole}
                    </option>
                  )
                )}
              </select>

            </div>

            {/* CYCLE */}

            {form.ecole &&
              form.ecole !== 'CPGE' && (
                <div className="form-group">

                  <label>
                    Cycle *
                  </label>

                  <select
                    value={form.cycle}
                    onChange={(e) =>
                      changerCycle(e.target.value)
                    }
                  >

                    <option value="">
                      -- Sélectionner votre cycle --
                    </option>

                    {cycles.map((cycle) => (
                      <option
                        key={cycle}
                        value={cycle}
                      >
                        {cycle}
                      </option>
                    ))}

                  </select>

                </div>
              )}

            {/* FILIÈRE */}

            {form.ecole &&
              (
                form.ecole === 'CPGE' ||
                (form.cycle &&
                  filieres.length > 0)
              ) && (
                <div className="form-group">

                  <label>
                    Filière *
                  </label>

                  <select
                    value={form.filiere}
                    onChange={(e) =>
                      changerFiliere(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      -- Sélectionner votre filière --
                    </option>

                    {filieres.map((filiere) => (
                      <option
                        key={filiere}
                        value={filiere}
                      >
                        {filiere}
                      </option>
                    ))}

                  </select>

                </div>
              )}

            {/* ANNÉE */}

            {form.ecole && (
              <div className="form-group">

                <label>
                  Année *
                </label>

                <select
                  value={form.annee}
                  onChange={(e) =>
                    modifierChamp(
                      'annee',
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    -- Sélectionner votre année --
                  </option>

                  {annees.map((annee) => (
                    <option
                      key={annee}
                      value={annee}
                    >
                      {annee}
                    </option>
                  ))}

                </select>

              </div>
            )}

            {/* WHATSAPP */}

            <div className="form-group">

              <label>
                WhatsApp *
              </label>

              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => {
                  const chiffres = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 10)

                  const whatsappFormate = chiffres.replace(
                    /(.{2})(?=.)/g,
                    '$1 '
                  )

                  modifierChamp('whatsapp', whatsappFormate)
                }}
                placeholder="Ex. 01 73 10 28 95"
                maxLength={14}
              />

              <small>
                Le numéro doit contenir exactement 10 chiffres.
              </small>

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                E-mail <span className="optional">(Facultatif)</span>
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  modifierChamp(
                    'email',
                    e.target.value
                  )
                }
                placeholder="Ex. exemple@email.com"
              />

            </div>

          </section>
        )}

        {/* =================================================
            ÉTAPE 2 : PASSIONS
        ================================================= */}

        {step === 2 && (
          <section className="card">

            <h2>🔥 Tes passions</h2>

            <p>
              Sélectionne les domaines qui t’intéressent.
            </p>

            <div className="checkbox-list">

              {interestsList.map(
                (interest) => (
                  <label
                    className="checkbox-item"
                    key={interest}
                  >

                    <input
                      type="checkbox"
                      checked={form.interests.includes(
                        interest
                      )}
                      onChange={() =>
                        toggleInterest(
                          interest
                        )
                      }
                    />

                    <span>
                      {interest}
                    </span>

                  </label>
                )
              )}

            </div>

          </section>
        )}

        {/* =================================================
            ÉTAPE 3 : PARTICIPATION
        ================================================= */}

        {step === 3 && (
          <section className="card">

            <h2>🤝 Participation au club</h2>

            <div className="member-choice">

              <button
                type="button"
                className={
                  form.typeMembre === 'membre'
                    ? 'choice selected'
                    : 'choice'
                }
                onClick={() =>
                  changerTypeMembre(
                    'membre'
                  )
                }
              >

                <strong>
                  🔵 Membre
                </strong>

                <span>
                  Je souhaite principalement participer
                  aux activités et événements du club.
                </span>

              </button>

              <button
                type="button"
                className={
                  form.typeMembre === 'actif'
                    ? 'choice selected'
                    : 'choice'
                }
                onClick={() =>
                  changerTypeMembre(
                    'actif'
                  )
                }
              >

                <strong>
                  🟣 Membre actif
                </strong>

                <span>
                  Je souhaite contribuer à l’organisation
                  et aux projets du club.
                </span>

              </button>

            </div>

            {/* PÔLES */}

            {form.typeMembre === 'actif' && (
              <div className="poles-section">

                <h3>
                  Intégration à un pôle
                </h3>

                <p>
                  Tu peux choisir jusqu’à deux pôles.
                </p>

                <div className="checkbox-list">

                  {polesList.map(
  (pole) => {
    const poleIndisponible =
      pole === 'Culture japonaise & Langue'

    return (
      <label
        className={`checkbox-item ${
          poleIndisponible ? 'pole-disabled' : ''
        }`}
        key={pole}
      >

        <input
          type="checkbox"
          checked={form.poles.includes(pole)}
          onChange={() => {
            if (!poleIndisponible) {
              togglePole(pole)
            }
          }}
          disabled={
            poleIndisponible ||
            (
              !form.poles.includes(pole) &&
              form.poles.length >= 2
            )
          }
        />

        <span>
          {pole}

          {poleIndisponible && (
            <small className="pole-indisponible">
              Indisponible pour le moment
            </small>
          )}
        </span>

      </label>
    )
  }
)}

                </div>

                <p className="pole-note">
                  Sélection actuelle :{' '}
                  <strong>
                    {form.poles.length}/2
                  </strong>
                </p>

              </div>
            )}

          </section>
        )}

        {/* =================================================
            ÉTAPE 4 : ENGAGEMENT
        ================================================= */}

        {step === 4 && (
          <section className="card">

            <h2>📜 Engagement</h2>

            <p>
              En rejoignant Otaku No Kai INP-HB,
              chaque membre s’engage à :
            </p>

            <ul className="engagement-list">

              <li>
                Respecter les membres et les responsables.
              </li>

              <li>
                Respecter les Statuts et le Règlement Intérieur.
              </li>

              <li>
                Adopter un comportement respectueux
                pendant les activités.
              </li>

              <li>
                Préserver les biens du club et de l’INP-HB.
              </li>

              <li>
                Contribuer à la bonne image du club
                et de l’INP-HB.
              </li>

            </ul>

            <label className="agreement">

              <input
                type="checkbox"
                checked={form.engagement}
                onChange={(e) =>
                  modifierChamp(
                    'engagement',
                    e.target.checked
                  )
                }
              />

              <span>
                J’ai pris connaissance de ces engagements
                et je les accepte.
              </span>

            </label>

            <a
              className="reglement"
              href="/reglement-interieur.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 Consulter le Règlement Intérieur
            </a>

          </section>
        )}

        {/* =================================================
            ÉTAPE 5 : COTISATION
        ================================================= */}

        {step === 5 && (
          <section className="card">

            <h2>💰 Cotisation</h2>

            <div className="cotisation-box">

              <strong>
                1 000 F CFA / mois
              </strong>

              <p>
                La cotisation mensuelle contribue au
                fonctionnement du club et à la réalisation
                de ses activités.
              </p>

              <p>
                Des contributions exceptionnelles peuvent
                éventuellement être demandées pour certaines
                activités, après information des membres.
              </p>

            </div>

            <label className="agreement">

              <input
                type="checkbox"
                checked={form.cotisation}
                onChange={(e) =>
                  modifierChamp(
                    'cotisation',
                    e.target.checked
                  )
                }
              />

              <span>
                Oui, j’ai pris connaissance de la cotisation
                de 1 000 F CFA / mois.
              </span>

            </label>

            <p className="payment-note">
              ℹ️ Aucun paiement n’est effectué sur ce formulaire.
            </p>

          </section>
        )}

        {/* =================================================
            ÉTAPE 6 : CONFIRMATION
        ================================================= */}

        {step === 6 && (
          <section className="card confirmation">

            <div className="success-icon">
              🎌
            </div>

            <h2>
              Bienvenue dans Otaku No Kai INP-HB !
            </h2>

            <p>
              Ton inscription a bien été enregistrée.
            </p>

            <p>
              La participation aux activités du club est
              ouverte à tous les membres à jour de leur
              cotisation.
            </p>

            <p>
              Pense donc à maintenir ta cotisation à jour
              afin de profiter pleinement des activités
              et événements du club.
            </p>

          </section>
        )}

        {/* =================================================
            MESSAGE D'ERREUR
        ================================================= */}

        {erreur && (
          <div className="error-message">
            ⚠️ {erreur}
          </div>
        )}

        {/* =================================================
            MESSAGE
        ================================================= */}

        {message && (
          <div className="success-message">
            ✅ {message}
          </div>
        )}

        {/* =================================================
            NAVIGATION
        ================================================= */}

                {step > 0 && step < 6 && (
          <div className="navigation">

            <button
              type="button"
              className="secondary-button"
              onClick={precedent}
              disabled={chargement}
            >
              ← Retour
            </button>

            <button
  type="button"
  className="primary-button"
  onClick={suivant}
  disabled={chargement || !etapeValide()}
>
  {chargement
    ? '⏳ Enregistrement...'
    : step === 5
      ? '🎌 Valider mon inscription'
      : 'Continuer →'}
</button>

          </div>
        )}

          </div>
        </div>

      </main>

      {/* =================================================
          PIED DE PAGE
      ================================================= */}

      <footer className="footer">

        <p>
          OTAKU NO KAI INP-HB
        </p>

      </footer>

    </div>
  )
}
export default App