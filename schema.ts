import { sqliteTable, text, integer, customType } from "drizzle-orm/sqlite-core";

const Embedding = customType<{embedding: number[]}>(
    {
        dataType() {
            return 'json';
        }
    }
);

export const commonbaseEntry = sqliteTable("commonbaseEntry", {
    id: integer('id', {mode: 'number'}).primaryKey({ autoIncrement: true }),
    data: text('data', { mode: 'text' }),
    embedding: text('embedding', { mode: 'json' }),
    metadata: text('metadata', { mode: 'json' }),
    created_at: integer('created_at', { mode: 'timestamp' }),
    updated_at: integer('updated_at', { mode: 'timestamp' }),
});

