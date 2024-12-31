import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { userInsertSchema, users, type InsertUser } from './schema/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(data: InsertUser) {
	const parsed = Value.Parse(userInsertSchema, data);
	const hashedPassword = await bcrypt.hash(parsed.password, 10);
	parsed.password = hashedPassword;

	return await db.insert(users).values(parsed);
}

export async function getUserByUsername(username: string) {
	return await db.query.users.findFirst({
		where: eq(users.username, username)
	});
}

export async function authenticateUser(username: string, password: string) {
	const user = await getUserByUsername(username);
	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error('Invalid password');
	}

	const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION
	});

	return token;
}
