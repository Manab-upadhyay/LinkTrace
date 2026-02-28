export type PerLinkStat = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  ip: string;
  linkId: string;
  location: {
    regionName: string | null;
    countryName: string | null;
    city: string | null;
  };
  userAgent: string;
  __v: number;
};
export type PerLinkResponse = {
  LinkDetails: PerLinkStat[];
};
