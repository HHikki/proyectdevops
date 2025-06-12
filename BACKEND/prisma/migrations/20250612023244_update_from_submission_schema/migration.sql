-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);
