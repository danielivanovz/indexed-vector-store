import { InitDB, configdb } from '..'

export async function initializeDB() {
    try {
        const {
            database: { name, version },
            ...upgradeConfig
        } = configdb

        const instance = InitDB.getInstance()
        instance.initialize(name, version)

        return await instance.open(upgradeConfig)
    } catch (err) {
        console.error('Failed to initialize the database:', err)
        throw err
    }
}
