const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ATS Backend Running 🚀");
});

app.get("/candidates", async (req, res) => {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch candidates",
    });
  }
});

app.post("/candidates", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      state,
      zip,
      currentCompany,
      currentRole,
      totalExperience,
      noticePeriod,
      assignedRecruiter,
      currentCTC,
      expectedCTC,
      technicalSkills,
      resumeUrl,
      candidateNotes,
      status,
    } = req.body;

    // Validation
    if (!fullName || !email) {
      return res.status(400).json({
        error: "Full Name and Email are required",
      });
    }

    const candidate = await prisma.candidate.create({
      data: {
        fullName,
        email,
        phone,
        city,
        state,
        zip,
        currentCompany,
        currentRole,
        totalExperience: totalExperience ? parseInt(totalExperience) : null,
        noticePeriod: noticePeriod ? parseInt(noticePeriod) : null,
        assignedRecruiter,
        currentCTC: currentCTC ? parseFloat(currentCTC) : null,
        expectedCTC: expectedCTC ? parseFloat(expectedCTC) : null,
        technicalSkills: Array.isArray(technicalSkills) ? technicalSkills : [],
        resumeUrl,
        candidateNotes,
        status: status || "ACTIVE",
      },
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);

    // Handle Prisma unique constraint error for email
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "A candidate with this email already exists",
      });
    }

    res.status(500).json({
      error: "Failed to create candidate",
    });
  }
});

app.delete("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.candidate.delete({
      where: { id },
    });

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to delete candidate",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});