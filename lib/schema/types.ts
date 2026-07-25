/** Minimal JSON-LD node typing for schema builders. */
export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue = JsonLdPrimitive | JsonLdNode | JsonLdValue[] | readonly JsonLdValue[];
export type JsonLdNode = { [key: string]: JsonLdValue | undefined };

export type FaqItem = { question: string; answer: string };
export type BreadcrumbCrumb = { name: string; path: string };

export type GraphDocument = {
  '@context': 'https://schema.org';
  '@graph': JsonLdNode[];
};
