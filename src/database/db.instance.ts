import { IDBPDatabase, StoreNames, openDB } from 'idb'

import { DBSchema } from './db.types'
import { UpgradeStrategy } from './db.strategy'

export class InitDB {
    private static _instance: InitDB
    private name: string
    private version: number

    private constructor() {
        this.name = undefined!
        this.version = undefined!
    }

    public static getInstance(): InitDB {
        if (!InitDB._instance) {
            InitDB._instance = new InitDB()
        }
        return InitDB._instance
    }

    public initialize(name: string, version: number): void {
        this.name = name
        this.version = version
    }

    public open<DBSchemaType extends DBSchema>(config: {
        storeName: StoreNames<DBSchemaType>[]
        keyPath: string
        options?: IDBObjectStoreParameters
        strategy: UpgradeStrategy<DBSchemaType>
        uniqueIndexes: string[]
    }): Promise<IDBPDatabase<DBSchemaType>> {
        const { storeName, keyPath, options, uniqueIndexes } = config

        return openDB<DBSchemaType>(this.name, this.version, {
            upgrade: (db) =>
                config.strategy.upgrade(db, { storeName, keyPath, options, uniqueIndexes }),
        })
    }
}
