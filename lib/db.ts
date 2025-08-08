import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'ai_counselor'

if (!MONGODB_URI) {
  // ไม่ throw ในที่นี้ เพื่อให้ fallback อื่นยังทำงานได้ในเครื่อง
  console.warn('MONGODB_URI is not set. MongoDB features will be disabled until you configure it.')
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null
let hasInitializedIndexes = false

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

export async function getDb(): Promise<Db> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI)
      clientPromise = client.connect()
    }
  }

  const connectedClient = await (clientPromise as Promise<MongoClient>)
  return connectedClient.db(MONGODB_DB_NAME)
}

export async function getDbAndEnsureIndexes(): Promise<Db> {
  const db = await getDb()

  if (!hasInitializedIndexes) {
    try {
      await db.collection('visits').createIndex({ counterName: 1 }, { unique: true })
      await db.collection('mood_entries').createIndex({ userId: 1, createdAt: -1 })
      hasInitializedIndexes = true
    } catch (err) {
      // ป้องกันไม่ให้ error ของ index ทำให้ระบบล้ม
      console.warn('Index initialization warning:', err)
    }
  }

  return db
}
