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

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYKZOnXtuzpo3Gzg6MsrFHJM24v9hFJg9ubP8ZStr7rWDbEmlaoFwT4YLehr5V_vt5/exec"
/* =========================================================
   DONNÉES ÉCOLES INP-HB
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
}

/* =========================================================
   CENTRES D'INTÉRÊT & PÔLES
========================================================= */

const interestsList = [
  { label: 'Mangas & Animés', icon: '🎌', desc: 'Shonen, Seinen, Isekai, discussions' },
  { label: 'Jeux vidéo', icon: '🎮', desc: 'Tournois, casual, rétro, e-sport' },
  { label: 'Culture japonaise & langue', icon: '⛩️', desc: 'Traditions, calligraphie, Nihongo' },
  { label: 'Dessin / Manga', icon: '🎨', desc: 'Illustration, fanarts, création de planches' },
  { label: 'J-Pop / K-Pop', icon: '🎵', desc: 'Openings, blind tests, musique asiatique' },
  { label: 'Quiz & concours', icon: '🏆', desc: 'Défis de culture otaku et anime trivia' },
  { label: 'Création de contenu', icon: '🎬', desc: 'Vidéos, AMV, montages, rédaction' },
  { label: 'Autre', icon: '✨', desc: 'Cosplay, figurines, nouvelles idées' },
]

const polesList = [
  {
    name: 'Communication & Médias',
    icon: '📢',
    desc: 'Création de visuels, gestion des réseaux sociaux (Instagram, WhatsApp, TikTok) et couverture médiatique.',
    disabled: false,
  },
  {
    name: 'Culture japonaise & Langue',
    icon: '⛩️',
    desc: 'Animation d’ateliers d’apprentissage de la langue japonaise et partage de la culture traditionnelle.',
    disabled: true,
  },
  {
    name: 'Organisation & Événementiel',
    icon: '🎪',
    desc: 'Coordination des projections, tournois gaming, soirées à thèmes, logistique et accueil des participants.',
    disabled: false,
  },
]

/* =========================================================
   ÉTAPES DU STEPPER
========================================================= */

const STEPS = [
  { id: 1, label: 'Profil', icon: '👤' },
  { id: 2, label: 'Règles', icon: '📜' },
  { id: 3, label: 'Cotisation', icon: '💰' },
]

/* =========================================================
   IMAGES D'ARRIÈRE-PLAN
========================================================= */

const stepImages = {
  0: accueil,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Six,
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

  const initialForm = {
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
  }

  const [form, setForm] = useState(initialForm)

  /* Modification générique */
  const modifierChamp = (champ, valeur) => {
    setForm((ancien) => ({
      ...ancien,
      [champ]: valeur,
    }))
    setErreur('')
    setMessage('')
  }

  /* Gestion hiérarchique école / cycle / filière */
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

  const changerCycle = (cycle) => {
    setForm((ancien) => ({
      ...ancien,
      cycle,
      filiere: '',
      annee: '',
    }))
    setErreur('')
  }

  const changerFiliere = (filiere) => {
    setForm((ancien) => ({
      ...ancien,
      filiere,
      annee: '',
    }))
    setErreur('')
  }

  /* Sélection des centres d'intérêt */
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

  /* Choix des pôles (max 2) */
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

  /* Type de membre */
  const changerTypeMembre = (type) => {
    setForm((ancien) => ({
      ...ancien,
      typeMembre: type,
      poles: type === 'actif' ? ancien.poles : [],
    }))
    setErreur('')
  }

  /* Règles de validation */
  const nomValide = (nom) => /^\s*\S+(?:\s+\S+)+\s*$/.test(nom.trim())
  const matriculeValide = (matricule) => /^\d{2}INP\d{5}$/i.test(matricule.trim())
  const whatsappValide = (whatsapp) => /^\d{10}$/.test(whatsapp.replace(/\s/g, ''))

  const formationValide = () => {
    // Pour le moment, seul le choix de l'école est demandé.
    return form.ecole !== '' && !!schoolData[form.ecole]
  }

  /* Contrôle de validité pour activer le bouton Suivant */
  const etapeValide = () => {
    if (step === 1) {
      return (
        nomValide(form.nom) &&
        matriculeValide(form.matricule) &&
        formationValide() &&
        whatsappValide(form.whatsapp)
      )
    }
    if (step === 2) return form.engagement
    if (step === 3) return form.cotisation
    return true
  }

  /* Validation explicite avec affichage des messages d'erreur */
  const validerEtape = () => {
    setErreur('')

    if (step === 1) {
      if (!nomValide(form.nom)) {
        setErreur('Veuillez entrer votre nom et prénom(s) complets (au moins 2 mots).')
        return false
      }
      const matricule = form.matricule.trim().toUpperCase()
      if (!matriculeValide(matricule)) {
        setErreur('Le matricule doit respecter le format officiel (Ex. 25INP12345).')
        return false
      }
      if (!formationValide()) {
        setErreur('Veuillez sélectionner votre école.')
        return false
      }
      if (!whatsappValide(form.whatsapp)) {
        setErreur('Le numéro WhatsApp doit comporter exactement 10 chiffres.')
        return false
      }
      return true
    }

    if (step === 2) {
      if (!form.engagement) {
        setErreur('Vous devez accepter les engagements du club pour poursuivre.')
        return false
      }
      return true
    }

    if (step === 3) {
      if (!form.cotisation) {
        setErreur('Veuillez confirmer que vous avez pris connaissance de la cotisation.')
        return false
      }
      return true
    }

    return true
  }

  /* Envoi vers Google Sheets via Apps Script */
  const envoyerInscription = async () => {
    setChargement(true)
    setErreur('')
    setMessage('')

    const donnees = {
      nomPrenom: form.nom.trim(),
      matricule: form.matricule.trim().toUpperCase(),
      ecole: form.ecole,
      whatsapp: form.whatsapp.replace(/\s/g, '').trim(),
      email: form.email ? form.email.trim() : 'Non renseigné',
    }

    try {
      const reponse = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(donnees),
      })

      const resultat = await reponse.json()

      if (!resultat.succes) {
        setErreur(resultat.message || 'Une erreur est survenue lors de l’inscription.')
        return false
      }

      setMessage('Inscription enregistrée avec succès.')
      return true
    } catch (error) {
      console.error(error)
      setErreur('Impossible de contacter le serveur. Vérifiez votre connexion Internet puis réessayez.')
      return false
    } finally {
      setChargement(false)
    }
  }

  /* Navigation Suivant */
  const suivant = async () => {
    if (!validerEtape()) return

    if (step === 3) {
      const succes = await envoyerInscription()
      if (succes) {
        setStep(4)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    setStep((ancien) => ancien + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Navigation Précédent */
  const precedent = () => {
    setErreur('')
    setMessage('')
    setStep((ancien) => Math.max(ancien - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const recommencer = () => {
    setForm(initialForm)
    setStep(0)
    setErreur('')
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Données dérivées pour l'école sélectionnée */
  const currentSchool = schoolData[form.ecole]
  const cycles = currentSchool?.cycles ? Object.keys(currentSchool.cycles) : []
  const filieres =
    form.ecole === 'CPGE'
      ? currentSchool?.filieres || []
      : form.cycle && currentSchool?.cycles?.[form.cycle]
        ? currentSchool.cycles[form.cycle]
        : []
  const annees = currentSchool?.years || []

  return (
    <div className="app">
      {/* =================================================
          EN-TÊTE IMMERSIF
      ================================================= */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-badge">
            <img src={logo} alt="Logo Otaku No Kai INP-HB" className="logo" />
          </div>
          <div className="header-title">
            <span className="header-tag">INP-HB • Club Officiel</span>
            <h1>OTAKU NO KAI</h1>
          </div>
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
                STEPPER DE PROGRESSION (ÉTAPES 1 À 3)
            ================================================= */}
            {step >= 1 && step <= 3 && (
              <div className="stepper-wrapper">
                <div className="stepper-header-info">
                  <span className="step-badge">Étape {step} sur 3</span>
                  <span className="step-percentage">{Math.round(((step) / 3) * 100)}% complété</span>
                </div>

                <div className="stepper-track-bar">
                  <div
                    className="stepper-progress-fill"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>

                <div className="stepper-nodes">
                  {STEPS.map((s) => {
                    const isPassed = step > s.id
                    const isCurrent = step === s.id
                    return (
                      <div
                        key={s.id}
                        className={`stepper-node ${isCurrent ? 'current' : ''} ${isPassed ? 'passed' : ''}`}
                      >
                        <div className="node-circle">
                          {isPassed ? '✓' : s.id}
                        </div>
                        <span className="node-label">
                          <span className="node-icon">{s.icon}</span>
                          <span className="node-text">{s.label}</span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* =================================================
                ÉTAPE 0 : ACCUEIL
            ================================================= */}
            {step === 0 && (
              <section className="card welcome-card">
                <div className="hero-pill">🎌 Saison 2026-2027 • Adhésions Ouvertes</div>

                <h2 className="welcome-title">
                  Rejoins l'élite des passionnés de culture geek & manga !
                </h2>

                <p className="welcome-lead">
                  Bienvenue dans l’espace d’inscription officiel d’<strong>Otaku No Kai INP-HB</strong>.
                  Le rassemblement des étudiants passionnés d’animés, jeux vidéo, dessin, cosplay, musique et culture japonaise.
                </p>

                <div className="welcome-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">🎮</span>
                    <strong>Tournois Gaming</strong>
                    <span>Tournois FIFA, Naruto Storm, Dragon Ball FighterZ & gaming</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🎌</span>
                    <strong>Projections & Débats</strong>
                    <span>Scènes iconiques, débats thématiques et discussions</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">⛩️</span>
                    <strong>Culture & Langue</strong>
                    <span>Initiation au japonais, calligraphie et découvertes culturelles</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🎨</span>
                    <strong>Création Artistique</strong>
                    <span>Concours de dessin, manga, fanarts et création</span>
                  </div>
                </div>

                <div className="welcome-motto-box">
                  <span className="motto-quote">«</span>
                  <p className="motto-text">La passion nous lie, le défi nous forge.</p>
                  <span className="motto-quote">»</span>
                </div>

                <button
                  type="button"
                  className="primary-button cta-hero-btn"
                  onClick={suivant}
                >
                  <span>🚀 Commencer mon inscription</span>
                  <span className="btn-glow"></span>
                </button>
              </section>
            )}

            {/* =================================================
                ÉTAPE 1 : PROFIL & ÉTUDES
            ================================================= */}
            {step === 1 && (
              <section className="card step-card">
                <div className="card-header">
                  <div className="card-header-icon">👤</div>
                  <div>
                    <h2>Informations personnelles</h2>
                    <p className="card-header-subtitle">
                      Renseigne tes informations pour rejoindre le club.
                    </p>
                  </div>
                </div>

                <div className="form-section-title">
                  <span>🪪 Identification</span>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="nom">
                      Nom et prénom(s) <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="field-icon">👤</span>
                      <input
                        id="nom"
                        type="text"
                        value={form.nom}
                        onChange={(e) => modifierChamp('nom', e.target.value)}
                        placeholder="Ex. Konaté Yaya"
                        required
                      />
                    </div>
                    <small className="field-hint">Nom de famille suivi de tes prénom(s).</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="matricule">
                      Matricule INP-HB <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="field-icon">🪪</span>
                      <input
                        id="matricule"
                        type="text"
                        value={form.matricule}
                        onChange={(e) => modifierChamp('matricule', e.target.value.toUpperCase())}
                        placeholder="Ex. 25INP12345"
                        maxLength={10}
                        required
                      />
                    </div>
                    <small className="field-hint">Format officiel 10 caractères (ex: 25INP12345).</small>
                  </div>
                </div>

                <div className="form-section-title">
                  <span>🏛️ Établissement</span>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="ecole">
                      École INP-HB <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="field-icon">🏫</span>
                      <select
                        id="ecole"
                        value={form.ecole}
                        onChange={(e) => changerEcole(e.target.value)}
                        required
                      >
                        <option value="">-- Choisis ton école --</option>
                        {Object.keys(schoolData).map((ecole) => (
                          <option key={ecole} value={ecole}>
                            {ecole}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Champs académiques masqués temporairement — à réactiver plus tard.
                  {form.ecole && form.ecole !== 'CPGE' && (
                    <div className="form-group">
                      <label htmlFor="cycle">
                        Cycle d'études <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <span className="field-icon">🎓</span>
                        <select
                          id="cycle"
                          value={form.cycle}
                          onChange={(e) => changerCycle(e.target.value)}
                          required
                        >
                          <option value="">-- Sélectionne ton cycle --</option>
                          {cycles.map((cycle) => (
                            <option key={cycle} value={cycle}>
                              {cycle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {form.ecole && (form.ecole === 'CPGE' || (form.cycle && filieres.length > 0)) && (
                    <div className="form-group">
                      <label htmlFor="filiere">
                        Filière <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <span className="field-icon">📚</span>
                        <select
                          id="filiere"
                          value={form.filiere}
                          onChange={(e) => changerFiliere(e.target.value)}
                          required
                        >
                          <option value="">-- Sélectionne ta filière --</option>
                          {filieres.map((filiere) => (
                            <option key={filiere} value={filiere}>
                              {filiere}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {form.ecole && (
                    <div className="form-group">
                      <label htmlFor="annee">
                        Année d'études <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <span className="field-icon">📅</span>
                        <select
                          id="annee"
                          value={form.annee}
                          onChange={(e) => modifierChamp('annee', e.target.value)}
                          required
                        >
                          <option value="">-- Sélectionne ton année --</option>
                          {annees.map((annee) => (
                            <option key={annee} value={annee}>
                              {annee}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                  */}

                </div>

                <div className="form-section-title">
                  <span>📱 Coordonnées & Contact</span>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="whatsapp">
                      Numéro WhatsApp <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="field-icon">💬</span>
                      <input
                        id="whatsapp"
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => {
                          const chiffres = e.target.value.replace(/\D/g, '').slice(0, 10)
                          const whatsappFormate = chiffres.replace(/(.{2})(?=.)/g, '$1 ')
                          modifierChamp('whatsapp', whatsappFormate)
                        }}
                        placeholder="Ex. 01 73 10 28 95"
                        maxLength={14}
                        required
                      />
                    </div>
                    <small className="field-hint">Format 10 chiffres (requis pour rejoindre le groupe officiel).</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Adresse E-mail <span className="optional">(Facultatif)</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="field-icon">✉️</span>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => modifierChamp('email', e.target.value)}
                        placeholder="Ex. exemple@inphb.ci"
                      />
                    </div>
                    <small className="field-hint">Pour recevoir les comptes-rendus et invitations.</small>
                  </div>
                </div>
              </section>
            )}

            {/*
            Étape Passions masquée temporairement — à réactiver plus tard.
            {step === 2 && (
              <section className="card step-card">
                <div className="card-header">
                  <div className="card-header-icon">🔥</div>
                  <div>
                    <h2>Tes passions & centres d'intérêt</h2>
                    <p className="card-header-subtitle">
                      Coche tout ce qui te passionne. Cela nous aidera à adapter les activités du club !
                    </p>
                  </div>
                </div>

                <div className="interests-grid">
                  {interestsList.map((item) => {
                    const isSelected = form.interests.includes(item.label)
                    return (
                      <button
                        type="button"
                        key={item.label}
                        className={`interest-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleInterest(item.label)}
                      >
                        <div className="interest-top">
                          <span className="interest-icon">{item.icon}</span>
                          <div className={`checkbox-chip ${isSelected ? 'checked' : ''}`}>
                            {isSelected ? '✓' : ''}
                          </div>
                        </div>
                        <span className="interest-title">{item.label}</span>
                        <span className="interest-desc">{item.desc}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="selection-counter">
                  <span>Centres d'intérêt choisis : </span>
                  <strong>{form.interests.length} sélectionné(s)</strong>
                </div>
              </section>
            )}

            */}

            {/*
            {step === 3 && (
              <section className="card step-card">
                <div className="card-header">
                  <div className="card-header-icon">🤝</div>
                  <div>
                    <h2>Participation au club</h2>
                    <p className="card-header-subtitle">
                      Définis ton niveau d'implication au sein de la communauté Otaku No Kai.
                    </p>
                  </div>
                </div>

                <div className="membership-options">
                  <div
                    className={`membership-card ${form.typeMembre === 'membre' ? 'active' : ''}`}
                    onClick={() => changerTypeMembre('membre')}
                  >
                    <div className="membership-header">
                      <div className="membership-icon-wrapper blue">🔵</div>
                      <span className="membership-badge">Membre Adhérent</span>
                    </div>
                    <h3>Membre Simple</h3>
                    <p className="membership-desc">
                      Idéal pour profiter des activités, participer aux tournois gaming, aux projections et échanger avec la communauté.
                    </p>
                    <ul className="membership-perks">
                      <li>✓ Accès aux projections et tournois</li>
                      <li>✓ Participation aux quiz et concours</li>
                      <li>✓ Intégration au groupe WhatsApp général</li>
                    </ul>
                    <div className="membership-radio">
                      <div className={`radio-dot ${form.typeMembre === 'membre' ? 'checked' : ''}`}></div>
                      <span>{form.typeMembre === 'membre' ? 'Option sélectionnée' : 'Choisir cette option'}</span>
                    </div>
                  </div>

                  <div
                    className={`membership-card ${form.typeMembre === 'actif' ? 'active' : ''}`}
                    onClick={() => changerTypeMembre('actif')}
                  >
                    <div className="membership-header">
                      <div className="membership-icon-wrapper purple">🟣</div>
                      <span className="membership-badge purple-badge">Membre d'Équipe</span>
                    </div>
                    <h3>Membre Actif</h3>
                    <p className="membership-desc">
                      Idéal pour t’investir, développer tes compétences, organiser les événements et participer aux décisions du club.
                    </p>
                    <ul className="membership-perks">
                      <li>✓ Intégration à un ou deux pôles au choix</li>
                      <li>✓ Co-organisation des événements majeurs</li>
                      <li>✓ Valorisation de ton engagement associatif</li>
                    </ul>
                    <div className="membership-radio">
                      <div className={`radio-dot ${form.typeMembre === 'actif' ? 'checked' : ''}`}></div>
                      <span>{form.typeMembre === 'actif' ? 'Option sélectionnée' : 'Choisir cette option'}</span>
                    </div>
                  </div>
                </div>

                {form.typeMembre === 'actif' && (
                  <div className="poles-block">
                    <div className="poles-block-header">
                      <h3>🎯 Intégration à un pôle d'activité</h3>
                      <p>
                        Tu peux sélectionner jusqu’à <strong>2 pôles</strong> selon tes talents et motivations.
                      </p>
                    </div>

                    <div className="poles-grid">
                      {polesList.map((pole) => {
                        const isSelected = form.poles.includes(pole.name)
                        const isDisabled = pole.disabled || (!isSelected && form.poles.length >= 2)

                        return (
                          <div
                            key={pole.name}
                            className={`pole-card ${isSelected ? 'selected' : ''} ${pole.disabled ? 'pole-unavailable' : ''}`}
                            onClick={() => {
                              if (!pole.disabled) {
                                togglePole(pole.name)
                              }
                            }}
                          >
                            <div className="pole-top">
                              <span className="pole-icon">{pole.icon}</span>
                              <div className={`pole-checkbox ${isSelected ? 'checked' : ''} ${pole.disabled ? 'disabled' : ''}`}>
                                {isSelected ? '✓' : ''}
                              </div>
                            </div>
                            <strong className="pole-title">{pole.name}</strong>
                            <p className="pole-desc">{pole.desc}</p>
                            {pole.disabled && (
                              <span className="pole-status-tag">⚠️ Indisponible pour le moment</span>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="pole-summary-counter">
                      Pôles choisis : <strong>{form.poles.length} / 2 maximum</strong>
                    </div>
                  </div>
                )}
              </section>
            )}

            */}
            {/* =================================================
                ÉTAPE 2 : ENGAGEMENT
            ================================================= */}
            {step === 2 && (
              <section className="card step-card">
                <div className="card-header">
                  <div className="card-header-icon">📜</div>
                  <div>
                    <h2>Charte d'engagement du club</h2>
                    <p className="card-header-subtitle">
                      En rejoignant Otaku No Kai INP-HB, tu t'engages à respecter nos valeurs de bienveillance et d'excellence.
                    </p>
                  </div>
                </div>

                <div className="rules-container">
                  <div className="rule-box">
                    <span className="rule-num">01</span>
                    <div>
                      <strong>Respect mutuel & fraternité</strong>
                      <p>Traiter l'ensemble des membres, invités et responsables avec courtoisie et esprit de camaraderie.</p>
                    </div>
                  </div>

                  <div className="rule-box">
                    <span className="rule-num">02</span>
                    <div>
                      <strong>Respect des Statuts & Règlement</strong>
                      <p>Observer scrupuleusement les textes régissant la vie associative au sein de l'INP-HB.</p>
                    </div>
                  </div>

                  <div className="rule-box">
                    <span className="rule-num">03</span>
                    <div>
                      <strong>Comportement exemplaire</strong>
                      <p>Adopter une attitude constructive et responsable lors de toutes les séances et sorties du club.</p>
                    </div>
                  </div>

                  <div className="rule-box">
                    <span className="rule-num">04</span>
                    <div>
                      <strong>Préservation du matériel</strong>
                      <p>Prendre le plus grand soin des équipements (consoles, manettes, câbles, projecteurs) et des locaux mis à disposition.</p>
                    </div>
                  </div>

                  <div className="rule-box">
                    <span className="rule-num">05</span>
                    <div>
                      <strong>Rayonnement de l'INP-HB</strong>
                      <p>Préserver la bonne image du club et de l'INP-HB par un comportement responsable.</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`agreement-box ${form.engagement ? 'checked' : ''}`}
                  onClick={() => modifierChamp('engagement', !form.engagement)}
                >
                  <div className={`custom-checkbox ${form.engagement ? 'checked' : ''}`}>
                    {form.engagement ? '✓' : ''}
                  </div>
                  <div className="agreement-text">
                    <strong>J'ai pris connaissance de ces engagements et je les accepte sans réserve.</strong>
                    <span>Je m'engage à respecter les règles et l'esprit du club.</span>
                  </div>
                </div>

                {/* Option « Consulter le Règlement Intérieur » masquée temporairement — à réactiver plus tard.
                <div className="download-rules-wrap">
                  <a
                    href="/reglement-interieur.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reglement-link-btn"
                  >
                    <span>📖 Consulter le Règlement Intérieur officiel (PDF)</span>
                    <span className="link-ext">↗</span>
                  </a>
                </div>
                */}
              </section>
            )}

            {/* =================================================
                ÉTAPE 3 : COTISATION & FINALISATION
            ================================================= */}
            {step === 3 && (
              <section className="card step-card">
                <div className="card-header">
                  <div className="card-header-icon">💰</div>
                  <div>
                    <h2>Cotisation d'adhésion</h2>
                    <p className="card-header-subtitle">
                      Dernière étape avant la validation finale de ton inscription.
                    </p>
                  </div>
                </div>

                <div className="fee-card">
                  <div className="fee-badge">Tarif Associatif Étudiant</div>
                  <div className="fee-amount">
                    <span className="fee-val">1 000</span>
                    <span className="fee-curr">F CFA / mois</span>
                  </div>
                  <p className="fee-explanation">
                    La cotisation mensuelle contribue au fonctionnement du club et à la réalisation de ses activités.
                  </p>
                  <div className="fee-perks-grid">
                    <div className="fee-perk">🎮 Participation aux activités</div>
                    <div className="fee-perk">🎌 Activités et événements du club</div>
                    <div className="fee-perk">🏆 Concours et tournois</div>
                    <div className="fee-perk">🤝 Soutien aux projets du club</div>
                  </div>
                </div>

                <div
                  className={`agreement-box ${form.cotisation ? 'checked' : ''}`}
                  onClick={() => modifierChamp('cotisation', !form.cotisation)}
                >
                  <div className={`custom-checkbox ${form.cotisation ? 'checked' : ''}`}>
                    {form.cotisation ? '✓' : ''}
                  </div>
                  <div className="agreement-text">
                    <strong>J'ai bien pris connaissance de la cotisation mensuelle de 1 000 F CFA.</strong>
                    <span>Je confirme avoir pris connaissance de cette cotisation.</span>
                  </div>
                </div>

                <div className="payment-security-notice">
                  <span className="notice-icon">ℹ️</span>
                  <div>
                    <strong>Aucun paiement en ligne immédiat n'est requis sur cette page.</strong>
                    <p>Les modalités de paiement seront communiquées directement par le bureau du club.</p>
                  </div>
                </div>
              </section>
            )}

            {/* =================================================
                ÉTAPE 4 : CONFIRMATION & SUCCÈS
            ================================================= */}
            {step === 4 && (
              <section className="card confirmation-card">
                <div className="conf-icon-pulse">🎌</div>

                <span className="conf-tag">Inscription Enregistrée</span>

                <h2 className="conf-title">Bienvenue dans Otaku No Kai INP-HB !</h2>

                <p className="conf-text">
                  Ton inscription a bien été enregistrée.
                </p>

                <p className="conf-text">
                  La participation aux activités du club est ouverte à tous les membres à jour de leur cotisation.
                </p>

                <p className="conf-text">
                  Pense donc à maintenir ta cotisation à jour afin de profiter pleinement des activités et événements du club.
                </p>

                <div className="conf-steps-box">
                  <h3>Prochaine étape</h3>
                  <div className="conf-step-item">
                    <span className="conf-step-num">1</span>
                    <div>
                      <strong>Rejoins le groupe WhatsApp officiel</strong>
                      <p>Retrouve les autres membres et reçois les informations sur les activités du club.</p>
                    </div>
                  </div>
                </div>

                <div className="conf-actions">
                  <a
                    className="primary-button whatsapp-join-button"
                    href="https://chat.whatsapp.com/Cwnl8aZPyrc8HFEIi7tctv?s=cl&p=a&mlu=4&ilr=4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>💬 Rejoindre le groupe WhatsApp</span>
                  </a>

                </div>
              </section>
            )}

            {/* =================================================
                MESSAGES D'ALERTE / ERREUR
            ================================================= */}
            {erreur && (
              <div className="alert-box error-alert">
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">{erreur}</span>
              </div>
            )}

            {message && (
              <div className="alert-box success-alert">
                <span className="alert-icon">✅</span>
                <span className="alert-text">{message}</span>
              </div>
            )}

            {/* =================================================
                BARRE DE NAVIGATION DU FORMULAIRE
            ================================================= */}
            {step > 0 && step < 4 && (
              <div className="navigation-bar">
                <button
                  type="button"
                  className="nav-btn secondary-btn"
                  onClick={precedent}
                  disabled={chargement}
                >
                  <span>← Retour</span>
                </button>

                <div className="nav-step-indicator">
                  <span>Étape {step} sur 3</span>
                </div>

                <button
                  type="button"
                  className={`nav-btn primary-btn ${!etapeValide() ? 'btn-disabled' : ''}`}
                  onClick={suivant}
                  disabled={chargement || !etapeValide()}
                >
                  {chargement ? (
                    <span className="loading-state">
                      <span className="spinner"></span>
                      <span>Enregistrement...</span>
                    </span>
                  ) : step === 3 ? (
                    <span>🎌 Valider mon inscription</span>
                  ) : (
                    <span>Continuer →</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* =================================================
          PIED DE PAGE MODERNE
      ================================================= */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-brand">
            <strong>OTAKU NO KAI</strong> — INP-HB Yamoussoukro
          </p>
          <p className="footer-copy">
            Association étudiante officielle • Passion, Culture & Partage
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App