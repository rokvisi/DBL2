export type Irasas = {
  id: number;
  pavadinimas: string;
  tekstas: string;
  sukurimoData: string;
  redaguota: boolean;
  teigiamiTaskai: number;
  neigiamiTaskai: number;
  fk_Lentaid: number;
  fk_Vartotojasslapyvardis: string;
};

export type Lenta = {
  id: number,
  pavadinimas: string,
  baneris: string,
  aprasymas: string,
  dienosZinute: string,
  sriftas: string
}

export type Skelbimas = {
  id: number,
  pavadinimas: string,
  tekstas: string,
  sukurimoData: string,
  redaguota: boolean,
  fk_Lentaid: number
}

export type Vartotojas = {
  slapyvardis: string,
  vardas: string,
  pavarde: string,
  pastas: string,
  gimimoData: string,
  lytis: boolean,
  salis: string,
  parasas: string,
  paskutiniKartaMatytas: string,
  slaptazodis: string,
  taskai: number,
  ispejimai: number,
  nuotrauka: string
}