import { DataSource } from 'typeorm';
import { IEntitiesDB } from '@shared/types/entitiesDB';

export class DBTestHelper {
  constructor(public entities: IEntitiesDB) { }

  public dbConnect!: DataSource;

  async setupTestDB() {
    this.dbConnect = new DataSource({
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: this.entities,
      synchronize: true
    });
    await this.dbConnect.initialize()
    return this
  }

  teardownTestDB() {
    this.dbConnect.close();
  }

}