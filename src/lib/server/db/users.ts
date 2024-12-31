import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import {
	users,
	insertUserSchema,
	selectUserSchema,
	type InsertUser,
	type SelectUser,
	type UpdateUser
} from './schema/users';

export async function createUser(data: InsertUser) {
	const parsed = Value.Parse(insertUserSchema, data);
	return await db.insert(users).values(parsed);
}

export async function getUserById(id: string) {
	return await db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getUserByUsername(username: string) {
	return await db.query.users.findFirst({ where: eq(users.username, username) });
}

export async function deleteUser(id: string) {
	return await db.delete(users).where(eq(users.id, id));
}
