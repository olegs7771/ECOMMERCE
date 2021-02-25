//This component returns select city field according to choosen province

import React from 'react';

const alberta_cities = [
  'Airdrie',
  'Grande Prairie',
  'Red Deer',
  'Beaumont',
  'Hanna',
  'St. Albert',
  'Bonnyville',
  'Hinton',
  'Spruce Grove',
  'Brazeau',
  'Irricana',
  'Strathcona County',
  'Breton',
  'Lacombe',
  'Strathmore',
  'Calgary',
  'Leduc',
  'Sylvan Lake',
  'Camrose',
  'Lethbridge',
  'Swan Hills',
  'Canmore',
  'McLennan',
  'Taber',
  'Didzbury',
  'Medicine Hat',
  'Turner Valley',
  'Drayton Valley',
  'Olds',
  'Vermillion',
  'Edmonton',
  'Onoway',
  'Wood Buffalo',
  'Ft. Saskatchewan',
  'Provost',
];

const bc_cities = [
  'Burnaby',
  'Lumby',
  'City of Port Moody',
  'Cache Creek',
  'Maple Ridge',
  'Prince George',
  'Castlegar',
  'Merritt',
  'Prince Rupert',
  'Chemainus',
  'Mission',
  'Richmond',
  'Chilliwack',
  'Nanaimo',
  'Saanich',
  'Clearwater',
  'Nelson',
  'Sooke',
  'Colwood',
  'New Westminster',
  'Sparwood',
  'Coquitlam',
  'North Cowichan',
  'Surrey',
  'Cranbrook',
  'North Vancouver',
  'Terrace',
  'Dawson Creek',
  'North Vancouver',
  'Tumbler',
  'Delta',
  'Osoyoos',
  'Vancouver',
  'Fernie',
  'Parksville',
  'Vancouver',
  'Invermere',
  'Peace River',
  'Vernon',
  'Kamloops',
  'Penticton',
  'Victoria',
  'Kaslo',
  'Port Alberni',
  'Whistler',
  'Langley',
  'Port Hardy',
];

const manitoba_cities = [
  'Birtle',
  'Flin Flon',
  'Swan River',
  'Brandon',
  'Snow Lake',
  'The Pas',
  'Cranberry Portage',
  'Steinbach',
  'Thompson',
  'Dauphin',
  'Stonewall',
  'Winnipeg',
  'Portage la Prairie',
  'Winkler',
  'Morden',
  'Gimli',
  'Neepawa',
];
const New_Brunswick_cities = [
  ,
  'Cap-Pele',
  'Miramichi',
  'Saint John',
  'Fredericton',
  'Moncton',
  'Saint Stephen',
  'Grand Bay-Westfield',
  'Oromocto',
  'Shippagan',
  'Grand Falls',
  'Port Elgin',
  'Sussex',
  'Memramcook',
  'Sackville',
  'Tracadie-Sheila',
];

const Newfoundland_And_Labrador_cities = [
  'Argentia',
  'Corner Brook',
  'Paradise',
  "Bishop's Falls",
  'Labrador City',
  'Portaux Basques',
  'Botwood',
  'Mount Pearl',
  "St. John's",
  'Brigus',
];

const Northwest_Territories_cities = [
  'Town of Hay River',
  'Town of Inuvik',
  'Yellowknife',
];
const Nova_Scotia_cities = [
  'Amherst',
  'Hants County',
  'Pictou',
  'Annapolis',
  'Inverness County',
  'Pictou County',
  'Argyle',
  'Kentville',
  'Queens',
  'Baddeck',
  'County of Kings',
  'Richmond',
  'Bridgewater',
  'Lunenburg',
  'Shelburne',
  'Cape Breton',
  'Lunenburg County',
  'Stellarton',
  'Chester',
  'Mahone Bay',
  'Truro',
  'Cumberland County',
  'New Glasgow',
  'Windsor',
  'East Hants',
  'New Minas',
  'Yarmouth',
  'Halifax',
  'Parrsboro',
];

const Ontario_cities = [
  'Ajax',
  'Halton',
  'Peterborough',
  'Atikokan',
  'Halton Hills',
  'Pickering',
  'Barrie',
  'Hamilton',
  'Port Bruce',
  'Belleville',
  'Hamilton-Wentworth',
  'Port Burwell',
  'Blandford-Blenheim',
  'Hearst',
  'Port Colborne',
  'Blind River',
  'Huntsville',
  'Port Hope',
  'Brampton',
  'Ingersoll',
  'Prince Edward',
  'Brant',
  'James',
  'Quinte West',
  'Brantford',
  'Kanata',
  'Renfrew',
  'Brock',
  'Kincardine',
  'Richmond Hill',
  'Brockville',
  'King',
  'Sarnia',
  'Burlington',
  'Kingston',
  'Sault Ste. Marie',
  'Caledon',
  'Kirkland Lake',
  'Scarborough',
  'Cambridge',
  'Kitchener',
  'Scugog',
  'Chatham-Kent',
  'Larder Lake',
  'Souix Lookout CoC Sioux Lookout',
  'Chesterville',
  'Leamington',
  'Smiths Falls',
  'Clarington',
  'Lennox-Addington',
  'South-West Oxford',
  'Cobourg',
  'Lincoln',
  'St. Catharines',
  'Cochrane',
  'Lindsay',
  'St. Thomas',
  'Collingwood',
  'London',
  'Stoney Creek',
  'Cornwall',
  'Loyalist Township',
  'Stratford',
  'Cumberland',
  'Markham',
  'Sudbury',
  'Deep River',
  'Metro Toronto',
  'Temagami',
  'Dundas',
  'Merrickville',
  'Thorold',
  'Durham',
  'Milton',
  'Thunder Bay',
  'Dymond',
  'Nepean',
  'Tillsonburg',
  'Ear Falls',
  'Newmarket',
  'Timmins',
  'East Gwillimbury',
  'Niagara',
  'Toronto',
  'East Zorra-Tavistock',
  'Niagara Falls',
  'Uxbridge',
  'Elgin',
  'Niagara-on-the-Lake',
  'Vaughan',
  'Elliot Lake',
  'North Bay',
  'Wainfleet',
  'Flamborough',
  'North Dorchester',
  'Wasaga Beach',
  'Fort Erie',
  'North Dumfries',
  'Waterloo',
  'Fort Frances',
  'North York',
  'Waterloo',
  'Gananoque',
  'Norwich',
  'Welland',
  'Georgina',
  'Oakville',
  'Wellesley',
  'Glanbrook',
  'Orangeville',
  'West Carleton',
  'Gloucester',
  'Orillia',
  'West Lincoln',
  'Goulbourn',
  'Osgoode',
  'Whitby',
  'Gravenhurst',
  'Oshawa',
  'Wilmot',
  'Grimsby',
  'Ottawa',
  'Windsor',
  'Guelph',
  'Ottawa-Carleton',
  'Woolwich',
  'Haldimand-Norfork',
  'Owen Sound',
  'York',
];

const Prince_Edward_Island_cities = [
  'Alberton',
  'Montague',
  'Stratford',
  'Charlottetown',
  'Souris',
  'Summerside',
  'Cornwall',
];

const Quebec_cities = [
  'Alma',
  'Fleurimont',
  'Longueuil',
  'Amos',
  'Gaspe',
  'Marieville',
  'Anjou',
  'Gatineau',
  'Mount Royal',
  'Aylmer',
  'Hull',
  'Montreal',
  'Beauport',
  'Joliette',
  'Montreal Region',
  'Bromptonville',
  'Jonquiere',
  'Montreal-Est',
  'Brosssard',
  'Lachine',
  'Quebec',
  'Chateauguay',
  'Lasalle',
  'Saint-Leonard',
  'Chicoutimi',
  'Laurentides',
  'Sherbrooke',
  'Coaticook',
  'LaSalle',
  'Sorel',
  'Coaticook',
  'Laval',
  'Thetford Mines',
  'Dorval',
  'Lennoxville',
  'Victoriaville',
  'Drummondville',
  'Levis',
];
const Saskatchewan_cities = [
  'Avonlea',
  'Melfort',
  'Swift Current',
  'Colonsay',
  'Nipawin',
  'Tisdale',
  'Craik',
  'Prince Albert',
  'Unity',
  'Creighton',
  'Regina',
  'Weyburn',
  'Eastend',
  'Saskatoon',
  'Wynyard',
  'Esterhazy',
  'Shell Lake',
  'Yorkton',
  'Gravelbourg',
];
const Yukon_cities = [, 'Carcross', 'Whitehorse'];
const Nunavut_cities = ['Arviant', 'Rankin Inlet'];

const getCitiesArray = (province) => {
  let array = [];
  switch (province) {
    case 'Ontario':
      return Ontario_cities;

    case 'Quebec':
      return Quebec_cities;

    case 'New Brunswick':
      return New_Brunswick_cities;

    case 'Manitoba':
      return manitoba_cities;

    case 'British Columbia':
      return bc_cities;

    case 'Prince Edward Island':
      return Prince_Edward_Island_cities;

    case 'Saskatchewan':
      return Saskatchewan_cities;

    case 'Alberta':
      return alberta_cities;

    case 'Newfoundland and Labrador':
      return Newfoundland_And_Labrador_cities;

    case 'Northwest Territories':
      return Northwest_Territories_cities;

    case 'Yukon':
      return Yukon_cities;
    case 'Nova Scotia':
      return Nova_Scotia_cities;
    case 'Nunavut':
      return Nunavut_cities;

    default:
      return array;
  }
};

export default function CanadianCitiesFieldForm({
  province,
  styles,
  _onChange,
  value,
  name,
  label,
  select,
}) {
  const array = getCitiesArray(province);
  return (
    <div className="form-group">
      <div className={styles.title}>{label}</div>
      <select
        name={name}
        value={value}
        onChange={_onChange}
        className={styles.form_input}
        required
      >
        <option>{select}</option>
        {array.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
