-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('CheckedIn', 'Served');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "name" VARCHAR(75),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "regNum" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "ticketNumber" VARCHAR(50) NOT NULL,
    "ticketDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" UUID NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'CheckedIn',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_regNum_key" ON "patients"("regNum");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketDate_ticketNumber_key" ON "tickets"("ticketDate", "ticketNumber");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
