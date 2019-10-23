# Migration `watch-20191023152613`

This migration has been generated by schickling at 10/23/2019, 3:26:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."User" (
  "id" TEXT NOT NULL   ,
  PRIMARY KEY ("id")
);
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20191023152550..watch-20191023152613
--- datamodel.dml
+++ datamodel.dml
@@ -3,11 +3,15 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 model Flat {
   id   String @default(cuid()) @id
   name String
+}
+
+model User {
+  id   String @default(cuid()) @id
 }
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191023152613)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191023152613'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```