import type { Dict } from '.'

const de = {
  title: 'Mach mit',
  lead: 'Du willst ein Event auf die Beine stellen oder eine Rolle übernehmen? So geht es – ohne Formular-Marathon.',
  guideTitle: 'In 6 Schritten zum eigenen Event',
  time: 'Zeitaufwand',
  steps: [
    ['Idee und Zielgruppe festlegen', 'Für wen ist das Event – Studierende, Young Professionals oder alle? Was sollen die Leute mitnehmen: Horizont erweitern, Networking oder Onboarding?', 'ca. 30 Min.'],
    ['Termin und Ort klären', 'Prüfe im Event-Kalender, dass es keine Überschneidung gibt. Raum anfragen (Hochschule, Firma, Kneipe) oder Online-Link vorbereiten.', '1–2 Std.'],
    ['Budget und Partner', 'Brauchst du Geld? Die Sponsoring-Brief-Vorlage im Toolkit der Hochschulgruppen hilft. Für einen Stammtisch reicht oft: nichts.', '0–3 Std.'],
    ['Event einreichen', 'Kurzes Formular, Cover-Vorlage auswählen, fertig. Das Layout erzeugt das System – keine Branding-Regeln zu lernen.', 'ca. 5 Min.'],
    ['Freigabe und Bewerbung', 'Nach der Freigabe erscheint das Event bundesweit, im Kalender-Abo und im Newsletter der passenden Zielgruppe.', 'Minuten statt einer Woche'],
    ['Durchführen und Rückblick', 'Nach dem Event ein paar Sätze, Fotos und die Teilnehmerzahl als Rückblick einstellen – das hilft dem nächsten Orga-Team.', 'ca. 20 Min.'],
  ] as [string, string, string][],
  cta: 'Jetzt Event einreichen',
  rolesTitle: 'Rollen zum Mitmachen',
  rolesLead: 'Richtwerte. Jede Rolle lässt sich teilen, und niemand muss alles allein machen.',
  perMonth: 'pro Monat',
  roles: [
    ['Stammtisch-Host', 'Einmal im Monat einen Ort reservieren, Leute begrüßen, Neue vorstellen.', '2–3 Std.'],
    ['HSG-Leitung', 'Die Hochschulgruppe koordinieren, Kontakt zu Lehrstühlen und BV halten, Events planen.', '4–8 Std.'],
    ['Social Media', 'Events ankündigen, Rückblicke teilen, Fotos sammeln.', '2–4 Std.'],
    ['Event-Orga-Team', 'Bei einem größeren Event (Meetup, Hackathon, Exkursion) mitplanen – zeitlich begrenzt.', '3–6 Std.'],
    ['Mentor:in', 'Eine Person beim Einstieg begleiten, ein Gespräch pro Monat.', 'ca. 1 Std.'],
  ] as [string, string, string][],
  contactTitle: 'Wie steige ich ein?',
  contactText: 'Sprich die Ansprechperson deiner Region an oder schau, ob es an deiner Hochschule schon eine Gruppe gibt.',
  contacts: 'Ansprechpartner:innen',
  hsg: 'Hochschulgruppen',
  mentoring: 'Mentoring',
}

const en: typeof de = {
  title: 'Get involved',
  lead: 'Want to run an event or take on a role? Here is how – without endless forms.',
  guideTitle: 'Your own event in 6 steps',
  time: 'Time needed',
  steps: [
    ['Decide on the idea and audience', 'Who is it for – students, young professionals or everyone? What should people take away: broader horizons, networking or onboarding?', 'approx. 30 min'],
    ['Fix the date and venue', 'Check the event calendar for clashes. Book a room (university, company, pub) or prepare an online link.', '1–2 h'],
    ['Budget and partners', 'Need money? The sponsor letter template in the student group toolkit helps. For a meetup you often need nothing.', '0–3 h'],
    ['Submit the event', 'Short form, pick a cover template, done. The system creates the layout – no branding rules to learn.', 'approx. 5 min'],
    ['Approval and promotion', 'Once approved, the event appears nationwide, in the calendar feed and in the newsletter for the right audience.', 'minutes instead of a week'],
    ['Run it and write a recap', 'After the event, add a few sentences, photos and the participant count as a recap – it helps the next team.', 'approx. 20 min'],
  ],
  cta: 'Submit an event now',
  rolesTitle: 'Roles to take on',
  rolesLead: 'Rough estimates. Every role can be shared, and nobody has to do everything alone.',
  perMonth: 'per month',
  roles: [
    ['Meetup host', 'Book a place once a month, welcome people, introduce newcomers.', '2–3 h'],
    ['Student group lead', 'Coordinate the student group, stay in touch with chairs and the district, plan events.', '4–8 h'],
    ['Social media', 'Announce events, share recaps, collect photos.', '2–4 h'],
    ['Event team', 'Help plan a larger event (meetup, hackathon, excursion) – for a limited time.', '3–6 h'],
    ['Mentor', 'Support one person getting started, one conversation a month.', 'approx. 1 h'],
  ],
  contactTitle: 'How do I start?',
  contactText: 'Talk to the contact person for your region, or check whether your university already has a group.',
  contacts: 'Contact persons',
  hsg: 'Student groups',
  mentoring: 'Mentoring',
}

export const machmit: Dict<typeof de> = { de, en }
