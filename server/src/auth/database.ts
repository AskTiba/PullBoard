import { db } from "../config/firebase";
import { decrypt, encrypt } from "./encription";

const userCollection = db.collection("users");

export async function saveGitHubToken(uid: string, token: string, username: string, avatarUrl: string) {
    const encrypted = encrypt(token);

    await userCollection.doc(uid).set({
        token: encrypted,
        username: username,
        avatarUrl: avatarUrl,
        updatedAt: new Date()
    });
}

export async function getGitHubToken(uid: string): Promise<any> {
    const doc = await userCollection.doc(uid).get();

    if (!doc.exists) return null;

    const token = decrypt(doc.data()!.token);
    return { token: token, username: doc.data()?.username, avatarUrl: doc.data()?.avatarUrl };
}