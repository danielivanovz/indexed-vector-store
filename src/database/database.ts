import { configdb } from './db.config'
import { InitDB } from './db.instance'

const {
    database: { name, version },
    ...upgradeConfig
} = configdb

const instance = InitDB.getInstance()
instance.initialize(name, version)

export const database = instance.open(upgradeConfig).then((db) => {
    return db
})
