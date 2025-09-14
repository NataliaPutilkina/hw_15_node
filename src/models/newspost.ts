export interface Newspost {
  id: number;
  title: string; // max 50
  text: string; // max 256
  genre: "Politic" | "Business" | "Sport" | "Other";
  isPrivate: boolean;
  createDate: string;
};


