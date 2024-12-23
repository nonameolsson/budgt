import { db } from '.';
import { usersTable, type InsertUser } from './schema';

export async function createUser(data: InsertUser) {
	await db.insert(usersTable).values(data);
}
