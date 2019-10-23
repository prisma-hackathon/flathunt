# Migration `watch-20191023152550`

This migration has been generated by schickling at 10/23/2019, 3:25:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "lift"."User.email"

DROP TABLE "lift"."User";

DROP TABLE "lift"."Post";

CREATE TABLE "lift"."Flat" (
  "id" TEXT NOT NULL   ,
  "name" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20191023152025..watch-20191023152550
--- datamodel.dml
+++ datamodel.dml
@@ -3,23 +3,11 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
-model User {
-  id    String  @default(cuid()) @id
-  email String  @unique
-  name  String?
-  posts Post[]
-}
-
-model Post {
-  id        String   @default(cuid()) @id
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  published Boolean  @default(true)
-  title     String
-  content   String?
-  author    User?
+model Flat {
+  id   String @default(cuid()) @id
+  name String
 }
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191023152550)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191023152550'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```