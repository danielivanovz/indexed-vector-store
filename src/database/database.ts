import { InitDB, configdb } from '..'

const {
    database: { name, version },
    ...upgradeConfig
} = configdb

const instance = InitDB.getInstance()
instance.initialize(name, version)

export const database = instance.open(upgradeConfig).then((db) => {
    return db
})
