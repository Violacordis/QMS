/*
  Warnings:

  - A unique constraint covering the columns `[ticketDate,status,ticketNumber]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tickets_ticketDate_ticketNumber_key";

-- CreateIndex
CREATE INDEX "tickets_patientId_idx" ON "tickets"("patientId");

-- CreateIndex
CREATE INDEX "tickets_ticketNumber_idx" ON "tickets"("ticketNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketDate_status_ticketNumber_key" ON "tickets"("ticketDate", "status", "ticketNumber");
