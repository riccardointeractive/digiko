/**
 * Updates Types
 */

export interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  type: 'release' | 'feature' | 'fix' | 'improvement';
  changes: string[];
}

export interface TypeStyle {
  bg: string;
  border: string;
  text: string;
  label: string;
}

export type TypeStyles = Record<UpdateEntry['type'], TypeStyle>;
