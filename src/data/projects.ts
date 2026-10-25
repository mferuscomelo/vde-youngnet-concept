// Student and young-professional projects for the showcase.
export type Project = {
  id: string
  title_de: string
  title_en: string
  text_de: string
  text_en: string
  team: string
  tags: string[]
  audience: 'students' | 'young-professionals'
  cover: number
}

export const PROJECTS: Project[] = [
  { id: 'p1', title_de: 'Linienfolger-Roboter für Erstis', title_en: 'Line-following robot for first-years', team: 'Team: Lena, Tom, Aylin', tags: ['robotik', 'embedded'], audience: 'students', cover: 1,
    text_de: 'Günstiger Bausatz mit Mikrocontroller und zwei IR-Sensoren, als Einstiegsprojekt für neue HSG-Mitglieder.', text_en: 'Low-cost kit with a microcontroller and two IR sensors, used as a starter project for new student group members.' },
  { id: 'p2', title_de: 'Open-Source-Firmware für einen Lötkolben', title_en: 'Open-source firmware for a soldering iron', team: 'Team: Jonas, Mira', tags: ['firmware', 'embedded'], audience: 'young-professionals', cover: 2,
    text_de: 'Temperaturregelung mit PID, Bootloader und USB-Update. Entstanden als Feierabendprojekt.', text_en: 'PID temperature control, bootloader and USB update. Built as an after-work project.' },
  { id: 'p3', title_de: 'Hackathon-Sieger: Low-Power-Sensorknoten', title_en: 'Hackathon winner: low-power sensor node', team: 'Team: „Die Stromsparer“', tags: ['hackathon', 'embedded', 'iot'], audience: 'students', cover: 3,
    text_de: 'Misst CO₂ und Belegung in Hörsälen, läuft zwei Jahre mit einer Batterie.', text_en: 'Measures CO₂ and occupancy in lecture halls, runs two years on one battery.' },
  { id: 'p4', title_de: 'Balkonkraftwerk-Monitor', title_en: 'Balcony solar monitor', team: 'Team: Sven, Ida', tags: ['energie', 'iot'], audience: 'young-professionals', cover: 4,
    text_de: 'Liest Wechselrichterdaten lokal aus und zeigt sie auf einem E-Paper-Display.', text_en: 'Reads inverter data locally and shows it on an e-paper display.' },
  { id: 'p5', title_de: 'Robotik-Wettbewerb: Greifarm', title_en: 'Robotics competition: gripper arm', team: 'Team: HSG-Robotik', tags: ['robotik', 'hackathon'], audience: 'students', cover: 1,
    text_de: '3D-gedruckter Greifarm mit Kamera-Objekterkennung, Platz 3 im regionalen Wettbewerb.', text_en: '3D-printed gripper arm with camera object detection, 3rd place in a regional competition.' },
  { id: 'p6', title_de: 'FPGA-Audioeffektgerät', title_en: 'FPGA audio effects unit', team: 'Team: Noah', tags: ['fpga', 'embedded'], audience: 'students', cover: 2,
    text_de: 'Echtzeit-Hall und -Delay auf einem Einsteiger-FPGA-Board, mit Schaltplan und Quellcode.', text_en: 'Real-time reverb and delay on an entry-level FPGA board, with schematics and source code.' },
]
