export interface Rep_NotFoundEntryError extends Error {
  source: any;
  entity: object;
  params: string;
}

export interface Rep_DuplicateEntryError extends Error {
  source: any;
  entity: object;
  params: string;
  values: any;
}
