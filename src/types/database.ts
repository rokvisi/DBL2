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
export const IrasasDefaults: Irasas = {
  id: 0,
  pavadinimas: "",
  tekstas: "",
  sukurimoData: "0001-01-01",
  redaguota: false,
  teigiamiTaskai: 0,
  neigiamiTaskai: 0,
  fk_Lentaid: 0,
  fk_Vartotojasslapyvardis: ""
}

export type Lenta = {
  id: number,
  pavadinimas: string,
  baneris: string,
  aprasymas: string,
  dienosZinute: string,
  sriftas: string
}
export const LentaDefaults: Lenta = {
  id: 0,
  pavadinimas: "",
  baneris: "",
  aprasymas: "",
  dienosZinute: "",
  sriftas: ""
}

export type Skelbimas = {
  id: number,
  pavadinimas: string,
  tekstas: string,
  sukurimoData: string,
  redaguota: boolean,
  fk_Lentaid: number
}
export const SkelbimasDefaults: Skelbimas = {
  id: 0,
  pavadinimas: "",
  tekstas: "",
  sukurimoData: "",
  redaguota: false,
  fk_Lentaid: 0
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
export const VartotojasDefaults: Vartotojas = {
  slapyvardis: "",
  vardas: "",
  pavarde: "",
  pastas: "",
  gimimoData: "",
  lytis: false,
  salis: "",
  parasas: "",
  paskutiniKartaMatytas: "",
  slaptazodis: "",
  taskai: 0,
  ispejimai: 0,
  nuotrauka: ""
}

export type Saukimas = {
  id: number,
  tekstas: string,
  fk_Vartotojasslapyvardis: string,
}
export const SaukimasDefaults: Saukimas = {
  id: 0,
  tekstas: "",
  fk_Vartotojasslapyvardis: "",
}

export type Komentaras = {
  id: number,
  tekstas: string,
  teigiamiTaskai: number,
  neigiamiTaskai: number,
  redaguota: boolean,
  fk_Irasasid: number | null,
  fk_Vartotojasslapyvardis: string,
  fk_Skelbimasid: number | null,
}
export const KomentarasDefaults: Komentaras = {
  id: 0,
  tekstas: "",
  teigiamiTaskai: 0,
  neigiamiTaskai: 0,
  redaguota: false,
  fk_Irasasid: null,
  fk_Vartotojasslapyvardis: "",
  fk_Skelbimasid: null,
}

//* Extended types. (Used for dynamic insert forms)

export type VartotojasSuSaukimais = Vartotojas & {
  saukimai: Saukimas[]
}
export const VartotojasSuSaukimaisDefaults: VartotojasSuSaukimais = {
  ...VartotojasDefaults,
  saukimai: []
}

export type IrasasSuKomentarais = Irasas & {
  komentarai: Komentaras[]
}
export const IrasasSuKomentaraisDefaults: IrasasSuKomentarais = {
  ...IrasasDefaults,
  komentarai: []
}