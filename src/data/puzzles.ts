import type { Milestone, DailyPuzzle } from '../types/game';

export const ALL_MILESTONES: Milestone[] = [
  {
    id: 'steam-engine',
    title: 'James Watt Patents the Steam Engine Condenser',
    year: 1769,
    category: 'technology',
    description: 'Watt radically improved the Newcomen engine, powering the Industrial Revolution.',
    hint: 'Late 18th century dawn of steam',
  },
  {
    id: 'frankenstein',
    title: 'Mary Shelley Publishes Frankenstein',
    year: 1818,
    category: 'culture',
    description: 'Written when Shelley was just 18, pioneering science fiction literature.',
    hint: 'Regency era gothic literature',
  },
  {
    id: 'telegraph-cable',
    title: 'First Transatlantic Telegraph Cable Laid',
    year: 1858,
    category: 'technology',
    description: 'Reduced transatlantic communication time from ten days to minutes.',
    hint: 'Mid-19th century Victorian communications',
  },
  {
    id: 'periodic-table',
    title: 'Dmitri Mendeleev Formulates the Periodic Table',
    year: 1869,
    category: 'science',
    description: 'Organized elements by atomic weight, predicting properties of undiscovered elements.',
    hint: 'Late 19th century Russian chemistry',
  },
  {
    id: 'eiffel-tower',
    title: 'Eiffel Tower Opens at Paris Exposition Universelle',
    year: 1889,
    category: 'history',
    description: 'Constructed as the centerpiece entrance arch for the 1889 World’s Fair.',
    hint: 'Centennial of the French Revolution',
  },
  {
    id: 'wright-brothers',
    title: 'Wright Brothers Make First Powered Airplane Flight',
    year: 1903,
    category: 'technology',
    description: 'Orville and Wilbur achieved four sustained flights at Kitty Hawk, NC.',
    hint: 'Dawn of the 20th century aviation',
  },
  {
    id: 'titanic',
    title: 'RMS Titanic Sinks in North Atlantic',
    year: 1912,
    category: 'history',
    description: 'The largest passenger ocean liner of its time struck an iceberg on its maiden voyage.',
    hint: 'Two years before World War I',
  },
  {
    id: 'penicillin',
    title: 'Alexander Fleming Discovers Penicillin',
    year: 1928,
    category: 'science',
    description: 'Discovered antibacterial mold in an untidy petri dish, revolutionizing modern medicine.',
    hint: 'Roaring twenties antibiotic miracle',
  },
  {
    id: 'pluto-discovered',
    title: 'Clyde Tombaugh Discovers Pluto',
    year: 1930,
    category: 'space',
    description: 'Identified at the Lowell Observatory in Flagstaff, Arizona.',
    hint: 'Early Great Depression astronomy',
  },
  {
    id: 'eniac-computer',
    title: 'ENIAC Turing-Complete Electronic Computer Unveiled',
    year: 1945,
    category: 'technology',
    description: 'The first programmable, electronic, general-purpose digital computer.',
    hint: 'Conclusion of World War II',
  },
  {
    id: 'dna-double-helix',
    title: 'Watson and Crick Publish DNA Double Helix Model',
    year: 1953,
    category: 'science',
    description: 'Deciphered molecular structure of nucleic acids using Rosalind Franklin’s Photo 51.',
    hint: 'Coronation year of Queen Elizabeth II',
  },
  {
    id: 'sputnik-1',
    title: 'Soviet Union Launches Sputnik 1',
    year: 1957,
    category: 'space',
    description: 'The first artificial Earth satellite, initiating the Space Race.',
    hint: 'Late 1950s space age kickoff',
  },
  {
    id: 'moon-landing',
    title: 'Apollo 11 Crew Lands on the Moon',
    year: 1969,
    category: 'space',
    description: 'Neil Armstrong and Buzz Aldrin stepped onto the lunar surface at Tranquility Base.',
    hint: 'Summer of 1969 milestone',
  },
  {
    id: 'arpanet-first-message',
    title: 'First Message Sent Across ARPANET ("LO")',
    year: 1969,
    category: 'technology',
    description: 'Connection between UCLA and Stanford crashed after typing "LOGIN" letters L and O.',
    hint: 'Birth of the internet architecture',
  },
  {
    id: 'voyager-1',
    title: 'NASA Launches Voyager 1 Spacecraft',
    year: 1977,
    category: 'space',
    description: 'Carrying the Golden Record, now the farthest human-made object in interstellar space.',
    hint: 'The year Star Wars released',
  },
  {
    id: 'chernobyl',
    title: 'Chernobyl Nuclear Power Plant Disaster',
    year: 1986,
    category: 'history',
    description: 'Catastrophic reactor explosion at the Chernobyl plant in Soviet Ukraine.',
    hint: 'Mid-1980s Cold War era',
  },
  {
    id: 'berlin-wall-fall',
    title: 'Fall of the Berlin Wall',
    year: 1989,
    category: 'history',
    description: 'Border crossings opened between East and West Berlin, heralding German reunification.',
    hint: 'Autumn of nations at the end of the 80s',
  },
  {
    id: 'hubble-launch',
    title: 'Hubble Space Telescope Deployed into Orbit',
    year: 1990,
    category: 'space',
    description: 'Launched aboard Space Shuttle Discovery, revolutionizing optical astronomy.',
    hint: 'Start of the 1990s astrophysics boom',
  },
  {
    id: 'world-wide-web',
    title: 'Tim Berners-Lee Publishes First World Wide Web Page',
    year: 1991,
    category: 'technology',
    description: 'Hosted on a NeXT computer at CERN, explaining the hypertext concept.',
    hint: 'Early 90s Swiss research lab creation',
  },
  {
    id: 'dolly-the-sheep',
    title: 'Dolly the Sheep Cloned from Adult Somatic Cell',
    year: 1996,
    category: 'science',
    description: 'Roslin Institute announced the first mammal successfully cloned from an adult cell.',
    hint: 'Mid-90s genetics breakthrough',
  },
  {
    id: 'wikipedia-launch',
    title: 'Wikipedia Officially Launches Online',
    year: 2001,
    category: 'culture',
    description: 'Jimmy Wales and Larry Sanger launched the free, crowdsourced encyclopedia.',
    hint: 'The dawn of Web 2.0 collaboration',
  },
  {
    id: 'human-genome-project',
    title: 'Human Genome Project Declared 99% Complete',
    year: 2003,
    category: 'science',
    description: 'Identified all approximately 20,000–25,000 genes in human DNA.',
    hint: 'Early 2000s international genetics effort',
  },
  {
    id: 'first-iphone',
    title: 'Steve Jobs Unveils the First Apple iPhone',
    year: 2007,
    category: 'technology',
    description: 'Combined an iPod, mobile phone, and breakthrough internet communicator.',
    hint: 'Pre-financial crisis mobile revolution',
  },
  {
    id: 'large-hadron-collider',
    title: 'Higgs Boson Particle Discovered at CERN LHC',
    year: 2012,
    category: 'science',
    description: 'Confirmed the mechanism that gives mass to fundamental particles.',
    hint: 'London Olympics year physics triumph',
  },
  {
    id: 'curiosity-rover',
    title: 'NASA Curiosity Rover Touches Down on Mars',
    year: 2012,
    category: 'space',
    description: 'Executed the complex Sky Crane descent maneuver inside Gale Crater.',
    hint: 'Seven Minutes of Terror landing',
  },
  {
    id: 'gravitational-waves',
    title: 'LIGO Detects Gravitational Waves from Black Hole Merger',
    year: 2015,
    category: 'science',
    description: 'Proved Einstein’s 1916 General Relativity prediction 100 years later.',
    hint: 'Twin laser interferometers in Washington and Louisiana',
  },
  {
    id: 'james-webb-telescope',
    title: 'James Webb Space Telescope Transmits First Deep Field Images',
    year: 2022,
    category: 'space',
    description: 'Captured the deepest, sharpest infrared image of the distant universe to date.',
    hint: 'Orbiting the Sun-Earth L2 Lagrange point',
  },
];

/**
 * Returns a deterministic 5-milestone daily puzzle for any given date string (YYYY-MM-DD).
 */
export function getDailyPuzzle(dateString: string): DailyPuzzle {
  // Epoch reference: Nov 1, 2026 = Puzzle #1
  const epoch = new Date('2026-11-01T00:00:00Z').getTime();
  const current = new Date(`${dateString}T00:00:00Z`).getTime();
  const dayIndex = Math.max(0, Math.floor((current - epoch) / (1000 * 60 * 60 * 24))) + 1;

  // Pick 5 distinct milestones deterministically based on day index
  const poolSize = ALL_MILESTONES.length;
  const selected: Milestone[] = [];
  const pickedIndices = new Set<number>();

  let offset = (dayIndex * 7) % poolSize;
  while (selected.length < 5) {
    if (!pickedIndices.has(offset)) {
      pickedIndices.add(offset);
      selected.push(ALL_MILESTONES[offset]);
    }
    offset = (offset + 11) % poolSize;
  }

  // Sort them chronologically as the ground truth
  const sortedMilestones = [...selected].sort((a, b) => a.year - b.year);

  return {
    date: dateString,
    puzzleNumber: dayIndex,
    milestones: sortedMilestones,
  };
}
