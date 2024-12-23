import { db } from '.';
import { users, type InsertUser } from './schema';

export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
}
