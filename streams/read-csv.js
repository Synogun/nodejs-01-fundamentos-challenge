import fs from "node:fs";
import { parse } from "csv-parse";

export async function parseCSV() {
    const csvPath = new URL("./tasks.csv", import.meta.url);
    const records = [];
    const parser = fs
        .createReadStream(csvPath)
        .pipe(parse({
            trim: true,
            from_line: 2,
            delimiter: ',',
            skip_empty_lines: true
        }));

    for await (const record of parser) {
        const body = JSON.stringify({
            title: record[0],
            description: record[1]
        });

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: body,
            duplex: 'half'
        });
        records.push(record);
    }
    return records;
};

// (async () => {
//     const records = await parseCSV();
//     console.info(records);
// })();