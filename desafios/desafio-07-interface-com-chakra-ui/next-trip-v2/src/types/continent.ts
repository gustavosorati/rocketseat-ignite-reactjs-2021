export type ContinentData = {
  id: string;
  title: string;
  banner: string;
  description: string;
  info: {
    amountCountries: string;
    amountLanguages: string;
    amountCities: string;
  };
  cities: {
    city: string;
    country: string;
    flag: string;
    picture: string;
  }[]
}