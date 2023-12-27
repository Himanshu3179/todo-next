import { z } from 'zod'
/* 
model Todo {
  id          String   @id @default(uuid())
  title       String
  description String?
  createdAt   DateTime @default(now()) @db.Timestamp
  updatedAt   DateTime @updatedAt @db.Timestamp
  status      Status   @default(Open)
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
enum Status {
  Open
  InProgress
  Done
}
*/

export const todoSchema = z.object({

  title: z.string().min(3,
    "title must contain 3 letters"
  ).max(100),
  description: z.string().min(3).max(1000).optional(),
  status: z.enum(["Open", "InProgress", "Done"]).optional(),
  userId: z.string().min(3).max(100),
  id: z.string().min(3).max(100).optional(),
  createdAt: z.string().min(3).max(100).optional(),
  updatedAt: z.string().min(3).max(100).optional(),

})