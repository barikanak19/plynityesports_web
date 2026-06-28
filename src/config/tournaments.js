/**
 * Plynity Tournament Configuration
 *
 * All sensitive values are sourced from environment variables.
 * Set values in the root .env file using the VITE_ prefix.
 */

const getEnvVar = (key) => {
  const value = import.meta.env[key];
  if (!value) {
    console.error(`[Plynity] Missing environment variable: ${key}. Please set it in your .env file.`);
  }
  return value || '';
};

export const GOOGLE_SHEET_URLS = {
  BGMI_SOLO_FRIDAY:     getEnvVar('VITE_BGMI_SOLO_FRIDAY'),
  BGMI_DUO_FRIDAY:      getEnvVar('VITE_BGMI_DUO_FRIDAY'),
  BGMI_SOLO_SATURDAY:   getEnvVar('VITE_BGMI_SOLO_SATURDAY'),
  BGMI_SQUAD_SATURDAY:  getEnvVar('VITE_BGMI_SQUAD_SATURDAY'),
  BGMI_SOLO_SUNDAY:     getEnvVar('VITE_BGMI_SOLO_SUNDAY'),
  BGMI_SQUAD_SUNDAY:    getEnvVar('VITE_BGMI_SQUAD_SUNDAY'),
  FF_SOLO_FRIDAY:       getEnvVar('VITE_FF_SOLO_FRIDAY'),
  FF_DUO_FRIDAY:        getEnvVar('VITE_FF_DUO_FRIDAY'),
  FF_SOLO_SATURDAY:     getEnvVar('VITE_FF_SOLO_SATURDAY'),
  FF_SQUAD_SATURDAY:    getEnvVar('VITE_FF_SQUAD_SATURDAY'),
  FF_SOLO_SUNDAY:       getEnvVar('VITE_FF_SOLO_SUNDAY'),
  FF_SQUAD_SUNDAY:      getEnvVar('VITE_FF_SQUAD_SUNDAY'),
};

/**
 * Razorpay Configuration
 * Replace with your actual Razorpay Key ID from https://dashboard.razorpay.com
 */
export const RAZORPAY_KEY_ID = getEnvVar('VITE_RAZORPAY_KEY_ID');

/**
 * Tournament data — matches the Flutter app exactly
 */
export const TOURNAMENTS = {
  BGMI: {
    id: 'bgmi',
    name: 'BGMI',
    fullName: 'Battlegrounds Mobile India',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    headerGradient: 'linear-gradient(135deg, #ea6a00, #f97316, #fb923c)',
    days: [
      {
        day: 'Friday',
        matches: [
          {
            id: 'bgmi_solo_friday',
            sheetKey: 'BGMI_SOLO_FRIDAY',
            type: 'SOLO',
            time: '9:30 PM',
            entryFee: 10,
            maxSlots: 100,
            prizePool: 800,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
              { place: '6th Place', amount: 100, medal: 'trophy' },
              { place: '7th Place', amount: 100, medal: 'trophy' },
            ],
          },
          {
            id: 'bgmi_duo_friday',
            sheetKey: 'BGMI_DUO_FRIDAY',
            type: 'DUO',
            time: '10:30 PM',
            entryFee: 20,
            maxSlots: 50,
            prizePool: 800,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
              { place: '6th Place', amount: 100, medal: 'trophy' },
              { place: '7th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
      {
        day: 'Saturday',
        matches: [
          {
            id: 'bgmi_solo_saturday',
            sheetKey: 'BGMI_SOLO_SATURDAY',
            type: 'SOLO',
            time: '9:30 PM',
            entryFee: 20,
            maxSlots: 100,
            prizePool: 1650,
            prizes: [
              { place: '1st Place', amount: 300, medal: 'gold' },
              { place: '2nd Place', amount: 150, medal: 'silver' },
              { place: '3rd Place', amount: 150, medal: 'bronze' },
              { place: '4th Place', amount: 150, medal: 'trophy' },
              { place: '5th Place', amount: 150, medal: 'trophy' },
              { place: '6th Place', amount: 150, medal: 'trophy' },
              { place: '7th Place', amount: 150, medal: 'trophy' },
              { place: '8th Place', amount: 150, medal: 'trophy' },
              { place: '9th Place', amount: 150, medal: 'trophy' },
              { place: '10th Place', amount: 150, medal: 'trophy' },
            ],
          },
          {
            id: 'bgmi_squad_saturday',
            sheetKey: 'BGMI_SQUAD_SATURDAY',
            type: 'SQUAD',
            time: '10:30 PM',
            entryFee: 50,
            maxSlots: 25,
            prizePool: 1000,
            prizes: [
              { place: '1st Place', amount: 300, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
              { place: '6th Place', amount: 100, medal: 'trophy' },
              { place: '7th Place', amount: 100, medal: 'trophy' },
              { place: '8th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
      {
        day: 'Sunday',
        matches: [
          {
            id: 'bgmi_solo_sunday',
            sheetKey: 'BGMI_SOLO_SUNDAY',
            type: 'SOLO',
            time: '2:30 PM',
            entryFee: 10,
            maxSlots: 100,
            prizePool: 800,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
              { place: '6th Place', amount: 100, medal: 'trophy' },
              { place: '7th Place', amount: 100, medal: 'trophy' },
            ],
          },
          {
            id: 'bgmi_squad_sunday',
            sheetKey: 'BGMI_SQUAD_SUNDAY',
            type: 'SQUAD',
            time: '3:30 PM',
            entryFee: 50,
            maxSlots: 25,
            prizePool: 1000,
            prizes: [
              { place: '1st Place', amount: 300, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
              { place: '6th Place', amount: 100, medal: 'trophy' },
              { place: '7th Place', amount: 100, medal: 'trophy' },
              { place: '8th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
    ],
  },

  FF: {
    id: 'ff',
    name: 'FF MAX',
    fullName: 'Free Fire Max',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    headerGradient: 'linear-gradient(135deg, #e11d48, #f43f5e, #fb7185)',
    days: [
      {
        day: 'Friday',
        matches: [
          {
            id: 'ff_solo_friday',
            sheetKey: 'FF_SOLO_FRIDAY',
            type: 'SOLO',
            time: '8:00 PM',
            entryFee: 10,
            maxSlots: 50,
            prizePool: 400,
            prizes: [
              { place: '1st Place', amount: 100, medal: 'gold' },
              { place: '2nd Place', amount: 50, medal: 'silver' },
              { place: '3rd Place', amount: 50, medal: 'bronze' },
              { place: '4th Place', amount: 50, medal: 'trophy' },
              { place: '5th Place', amount: 50, medal: 'trophy' },
              { place: '6th Place', amount: 50, medal: 'trophy' },
              { place: '7th Place', amount: 50, medal: 'trophy' },
            ],
          },
          {
            id: 'ff_duo_friday',
            sheetKey: 'FF_DUO_FRIDAY',
            type: 'DUO',
            time: '8:30 PM',
            entryFee: 30,
            maxSlots: 25,
            prizePool: 550,
            prizes: [
              { place: '1st Place', amount: 150, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
              { place: '5th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
      {
        day: 'Saturday',
        matches: [
          {
            id: 'ff_solo_saturday',
            sheetKey: 'FF_SOLO_SATURDAY',
            type: 'SOLO',
            time: '8:00 PM',
            entryFee: 20,
            maxSlots: 50,
            prizePool: 750,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 50, medal: 'silver' },
              { place: '3rd Place', amount: 50, medal: 'bronze' },
              { place: '4th Place', amount: 50, medal: 'trophy' },
              { place: '5th Place', amount: 50, medal: 'trophy' },
              { place: '6th Place', amount: 50, medal: 'trophy' },
              { place: '7th Place', amount: 50, medal: 'trophy' },
              { place: '8th Place', amount: 50, medal: 'trophy' },
              { place: '9th Place', amount: 50, medal: 'trophy' },
              { place: '10th Place', amount: 50, medal: 'trophy' },
              { place: '11th Place', amount: 50, medal: 'trophy' },
              { place: '12th Place', amount: 50, medal: 'trophy' },
            ],
          },
          {
            id: 'ff_squad_saturday',
            sheetKey: 'FF_SQUAD_SATURDAY',
            type: 'SQUAD',
            time: '8:30 PM',
            entryFee: 50,
            maxSlots: 12,
            prizePool: 500,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
      {
        day: 'Sunday',
        matches: [
          {
            id: 'ff_solo_sunday',
            sheetKey: 'FF_SOLO_SUNDAY',
            type: 'SOLO',
            time: '1:00 PM',
            entryFee: 10,
            maxSlots: 50,
            prizePool: 400,
            prizes: [
              { place: '1st Place', amount: 100, medal: 'gold' },
              { place: '2nd Place', amount: 50, medal: 'silver' },
              { place: '3rd Place', amount: 50, medal: 'bronze' },
              { place: '4th Place', amount: 50, medal: 'trophy' },
              { place: '5th Place', amount: 50, medal: 'trophy' },
              { place: '6th Place', amount: 50, medal: 'trophy' },
              { place: '7th Place', amount: 50, medal: 'trophy' },
            ],
          },
          {
            id: 'ff_squad_sunday',
            sheetKey: 'FF_SQUAD_SUNDAY',
            type: 'SQUAD',
            time: '1:30 PM',
            entryFee: 50,
            maxSlots: 12,
            prizePool: 500,
            prizes: [
              { place: '1st Place', amount: 200, medal: 'gold' },
              { place: '2nd Place', amount: 100, medal: 'silver' },
              { place: '3rd Place', amount: 100, medal: 'bronze' },
              { place: '4th Place', amount: 100, medal: 'trophy' },
            ],
          },
        ],
      },
    ],
  },
};

/** Helper to get sheet URL by key */
export const getSheetUrl = (key) => GOOGLE_SHEET_URLS[key] || null;

/** Helper to get all matches flat */
export const getAllMatches = () => {
  const matches = [];
  Object.values(TOURNAMENTS).forEach((game) => {
    game.days.forEach((dayData) => {
      dayData.matches.forEach((match) => {
        matches.push({ ...match, game: game.id, gameName: game.name, day: dayData.day, gameColor: game.color });
      });
    });
  });
  return matches;
};