import { v4 as UUID } from 'uuid';

export abstract class Entity<TInitProps> {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id || UUID();
  }
} 