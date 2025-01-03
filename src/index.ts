import * as fs from 'node:fs/promises';
import path from 'node:path';
import { User, UserObject } from "./types";

// Constants
const JSON_TYPICODE_API = 'https://jsonplaceholder.typicode.com/users';
const README_PATH = "../README.md"

async function main(): Promise<void> {
    const markdown = await readReadmeFile();

    if (markdown) {
        const users = await fetchUsers();
        const newContent = generateUserContent(users);

        const START_MARKER = '<!-- DATA:START -->';
        const END_MARKER = '<!-- DATA:END -->';
        const updatedMarkdown = replaceContentBetweenMarkers(
            markdown,
            START_MARKER,
            END_MARKER,
            newContent
        );

        await saveFile(updatedMarkdown);
    }
}

async function fetchUsers(): Promise<UserObject[]> {
    const response = await fetch(JSON_TYPICODE_API);
    const data: User[] = await response.json();
    return data?.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        website: user.website
    }));
}

function generateUserContent(
    users: UserObject[]
): string {
    let markdown = '';

    users?.forEach((user) => {
        markdown += `- [${user.id}](${user.name})\n`;
        markdown += `\t*${user.email} - ${user.website}\n`
    });

    return markdown;
}

async function readReadmeFile(): Promise<string | null> {
    try {
        const absolute = path.resolve(import.meta.dirname, README_PATH);
        console.log('Reading from:', absolute);
        return await fs.readFile(absolute, 'utf-8');
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

function replaceContentBetweenMarkers(
    markdown: string,
    startMarker: string,
    endMarker: string,
    newContent: string
): string {
    const regex = new RegExp(`(${startMarker})([\\s\\S]*?)(${endMarker})`, 'g');
    return markdown.replace(regex, `$1\n${newContent}$3`);
}

async function saveFile(content: string): Promise<void> {
    try {
        const absolute = path.resolve(import.meta.dirname, README_PATH);
        await fs.writeFile(absolute, content, 'utf-8');
        console.log('Updated README');
    } catch (err) {
        console.error('Error updating README:', err);
    }
}

main();