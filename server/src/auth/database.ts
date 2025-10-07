import { db } from "../config/firebase";
import { decrypt, encrypt } from "./encription";

const userCollection = db.collection("users");

export async function saveGitHubToken(uid: string, token: string) {
    const encrypted = encrypt(token);

    await userCollection.doc(uid).set({
        token: encrypted,
        updatedAt: new Date()
    });
}

export async function getGitHubToken(uid: string): Promise<string | null> {
    const doc = await userCollection.doc(uid).get();

    if (!doc.exists) return null;

    return decrypt(doc.data()!.token);
}