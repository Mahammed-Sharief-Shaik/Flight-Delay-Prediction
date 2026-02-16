import airportCodes from 'airport-codes';

const myStationCodes =
  ['SGU', 'PHX', 'MHT', 'DFW', 'ORD', 'PSP', 'LBB', 'FWA', 'DRO', 'LAX', 'SFO', 'JLN', 'SAF', 'ASE', 'HRL', 'DTW', 'GJT', 'SLC', 'FSM', 'FLG', 'GNV', 'ROW', 'SBN', 'MKE', 'DEN', 'OKC', 'YUM', 'BNA', 'BMI', 'EUG', 'SHV', 'IAH', 'MDT', 'EGE', 'TVC', 'GRR', 'IND', 'PIT', 'GRB', 'TRI', 'BUR', 'LFT', 'MFR', 'FAT', 'RDM', 'BIS', 'BRO', 'DSM', 'TLH', 'GSO', 'SBP', 'MTJ', 'BIL', 'SJT', 'MAF', 'BFL', 'MFE', 'ONT', 'COS', 'FAR', 'CID', 'LGB', 'ABQ', 'TUS', 'FSD', 'GRK', 'SYR', 'AMA', 'BTR', 'MSP', 'BHM', 'RNO', 'SEA', 'MCI', 'PDX', 'PSC', 'MSN', 'STL', 'BZN', 'GFK', 'SUN', 'SMF', 'BDL', 'SJC', 'FCA', 'BOI', 'JAC', 'LAS', 'OMA', 'GEG', 'IDA', 'GTF', 'DCA', 'OAK', 'MSO', 'RAP', 'DLH', 'AUS', 'CLE', 'HIB', 'LWS', 'CPR', 'SNA', 'CLT', 'PHL', 'EWR', 'IAD', 'CMH', 'EKO', 'SAT', 'IMT', 'HLN', 'INL', 'PIH', 'TUL', 'TWF', 'MQT', 'ESC', 'RHI', 'LSE', 'ABR', 'BJI', 'CDC', 'MEM', 'CHS', 'LAR', 'EAR', 'ATY', 'RST', 'CGI', 'SBA', 'TYS', 'ATL', 'ICT', 'LGA', 'RSW', 'AVL', 'SAV', 'PAE', 'CMX', 'EAU', 'DEC', 'RDD', 'GSP', 'BOS', 'CVG', 'ROC', 'FOD', 'SHR', 'PAH', 'HDN', 'ACV', 'SDF', 'LAN', 'JAX', 'HSV', 'SAN', 'MRY', 'MOT', 'MEI', 'ALB', 'MSY', 'SUX', 'GUC', 'XWA', 'LIT', 'MLI', 'DIK', 'ELP', 'MKG', 'LBL', 'VEL', 'JST', 'CHA', 'ABI', 'SHD', 'PBG', 'DVL', 'CYS', 'GCC', 'LWB', 'BFF', 'ALS', 'JMS', 'SLN', 'PIB', 'PRC', 'MCW', 'PIR', 'RKS', 'DDC', 'CKB', 'HYS', 'CNY', 'OGS', 'PUB', 'LBF', 'RIW', 'VCT', 'COD', 'XNA', 'LNK', 'SGF', 'OTH', 'HOB', 'LEX', 'BUF', 'PIA', 'CWA', 'PNS', 'VPS', 'ECP', 'STS', 'DAL', 'BTM', 'APN', 'CIU', 'MLU', 'RIC', 'TPA', 'PBI', 'PVD', 'BRD', 'PLN', 'FAI', 'SRQ', 'JAN', 'MOB', 'ATW', 'YKM', 'ALW', 'PUW', 'ANC', 'EAT', 'DLG', 'AKN', 'BLI', 'MIA', 'MCO', 'RDU', 'FLL', 'ORF', 'SJU', 'STT', 'LIH', 'KOA', 'OGG', 'HNL', 'BWI', 'GUM', 'ITO', 'JFK', 'SPN', 'PQI', 'MYR', 'LRD', 'LCH', 'CRP', 'ABE', 'BTV', 'MBS', 'CAK', 'GPT', 'AEX', 'CLL', 'ROA', 'SPI', 'PWM', 'COU', 'ERI', 'DAY', 'SCE', 'ILM', 'BGR', 'AVP', 'CHO', 'FNT', 'CAE', 'AZO', 'EVV', 'CRW', 'HOU', 'ISP', 'MDW', 'EYW', 'MLB', 'FAY', 'DAB', 'HVN', 'HHH', 'ACY', 'LBE', 'STX', 'TTN', 'ILG', 'PIE', 'SFB', 'PGD', 'PVU', 'USA', 'BLV', 'AZA', 'RFD', 'IAG', 'ELM', 'LCK', 'HGR', 'SWF', 'SCK', 'PSM', 'GRI', 'STC', 'OGD', 'TOL', 'HTS', 'SMX', 'OWB', 'DBQ', 'TYR', 'AGS', 'MHK', 'ACT', 'GCK', 'TXK', 'SPS', 'GGG', 'LAW', 'BPT', 'MGM', 'CMI', 'ALO', 'DRT', 'SWO', 'OAJ', 'HPN', 'EWN', 'PHF', 'VLD', 'ABY', 'DHN', 'BQK', 'CSG', 'BGM', 'GTR', 'ITH', 'SBY', 'FLO', 'LYH', 'PGV', 'IPT', 'ART', 'ADQ', 'BET', 'BRW', 'SCC', 'JNU', 'KTN', 'CDV', 'YAK', 'WRG', 'PSG', 'SIT', 'OME', 'OTZ', 'CDB', 'ADK', 'ORH', 'BQN', 'PSE', 'PPG', 'TBN', 'BIH', 'BKG', 'WYS', 'ACK', 'MVY', 'HYA', 'MKK', 'LNY', 'GST'];

// 1. Mock Data for Airlines (You can expand this list)
const rawAirlines =
  ['SkyWest Airlines Inc.',
    'Horizon Air',
    'United Air Lines Inc.',
    'Commutair Aka Champlain Enterprises, Inc.',
    'GoJet Airlines, LLC d/b/a United Express',
    'Air Wisconsin Airlines Corp',
    'Southwest Airlines Co.',
    'Mesa Airlines Inc.',
    'Republic Airlines',
    'Spirit Air Lines',
    'Delta Air Lines Inc.',
    'Frontier Airlines Inc.',
    'Allegiant Air',
    'Hawaiian Airlines Inc.',
    'Envoy Air',
    'Comair Inc.',
    'Endeavor Air Inc.',
    'American Airlines Inc.',
    'Capital Cargo International',
    'Alaska Airlines Inc.',
    'JetBlue Airways',
    'Empire Airlines Inc.'];
// [
//     'SkyWest Airlines Inc.',
//     'Horizon Air',
//     'United Air Lines Inc.',
//     'Commutair Aka Champlain Enterprises, Inc.',
//     'GoJet Airlines, LLC d/b/a United Express',
//     'Air Wisconsin Airlines Corp',
//     'Southwest Airlines Co.',
//     'Mesa Airlines Inc.',
//     'Republic Airlines',
//     'Spirit Air Lines',
//     'Delta Air Lines Inc.',
//     'Frontier Airlines Inc.',
//     'Allegiant Air',
//     'Hawaiian Airlines Inc.',
//     'Envoy Air',
//     'Comair Inc.',
//     'Endeavor Air Inc.',
//     'American Airlines Inc.',
//     'Capital Cargo International',
//     'Alaska Airlines Inc.',
//     'JetBlue Airways',
//     'Empire Airlines Inc.'
// ];

// Map them to the format the dropdown component needs
export const airlines = rawAirlines.map(airline => ({
  label: airline,
  value: airline
}));


// 3. GENERATE AIRPORTS LIST AUTOMATICALLY
// This maps your 380 codes to real names using the installed library
export const airports = myStationCodes.map((code) => {
  // Look up the code in the global database
  const airport = airportCodes.findWhere({ iata: code });

  if (airport) {
    return {
      // Create a nice label like: "Phoenix (PHX) - Sky Harbor Intl"
      label: `${airport.get('city')} (${code}) - ${airport.get('name')}`,
      value: code,
      lat: parseFloat(airport.get('latitude')),
      lon: parseFloat(airport.get('longitude')),
    };
  } else {
    // Fallback if the library misses a tiny airport (Unlikely but safe)
    console.warn(`Airport details not found for: ${code}`);
    return {
      label: `${code} - Unknown Station`,
      value: code,
      lat: 0,
      lon: 0
    };
  }
}).sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

// 4. Distance Calculation Logic
export const calculateDistance = (originCode, destCode) => {
  const origin = airports.find((a) => a.value === originCode);
  const dest = airports.find((a) => a.value === destCode);

  if (!origin || !dest) return 0;
  if (origin.lat === 0 || dest.lat === 0) return 0; // Handle missing coords

  const R = 3958.8; // Earth radius in miles
  const dLat = ((dest.lat - origin.lat) * Math.PI) / 180;
  const dLon = ((dest.lon - origin.lon) * Math.PI) / 180;
  const lat1 = (origin.lat * Math.PI) / 180;
  const lat2 = (dest.lat * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};

export const getDistanceGroup = (distance) => {
  if (distance <= 0) return 0;
  return Math.ceil(distance / 500);
};