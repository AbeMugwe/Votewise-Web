export type PortraitLicence = "public-domain" | "cc-by" | "cc-by-sa" | "government-work" | "fair-use-editorial";

export interface PortraitRecord {
  personId: string;
  src: string;
  thumbSrc: string;
  width: number;
  height: number;
  credit: string;
  licence: PortraitLicence;
  licenceUrl: string;
  sourceUrl: string;
  asOf: string;
}

/** Empty until each source and licence has been checked. Initials remain the safe fallback. */
export const PORTRAITS: PortraitRecord[] = [];
