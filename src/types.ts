import { ReactNode } from 'react';

export interface CardItem {
  id: string;
  label: string;
  description: string;
  iconName: string; // The Lucide icon name to dynamically render
  previewText: string;
}
