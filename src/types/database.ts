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
