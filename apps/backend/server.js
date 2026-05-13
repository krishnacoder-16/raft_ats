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

// --- JOBS MODULE ---

// GET /jobs - Fetch all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(jobs);
  } catch (error) {
    console.error("Fetch Jobs Error:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /jobs/kpis - Fetch aggregate job statistics
app.get("/jobs/kpis", async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalJobs, pipeStats, highPriorityJobs, hiredStats] = await Promise.all([
      prisma.job.count(),
      prisma.job.aggregate({
        _sum: {
          pipelineCount: true,
        },
      }),
      prisma.job.count({
        where: {
          priorityLevel: {
            in: ["Urgent", "High"],
          },
        },
      }),
      prisma.job.aggregate({
        _sum: {
          hiredCount: true,
        },
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);

    res.json({
      totalJobs,
      candidatesInPipe: pipeStats._sum.pipelineCount || 0,
      highPriorityJobs,
      hiredThisMonth: hiredStats._sum.hiredCount || 0,
    });
  } catch (error) {
    console.error("Fetch Job KPIs Error:", error);
    res.status(500).json({ error: "Failed to fetch job statistics" });
  }
});

// POST /jobs - Create a new job
app.post("/jobs", async (req, res) => {
  try {
    const {
      jobTitle,
      clientCompany,
      employmentType,
      priorityLevel,
      assignedRecruiters,
      minExperience,
      maxExperience,
      minSalary,
      maxSalary,
      budgetCurrency,
      targetOpenings,
      educationRequirement,
      requiredSkills,
      jobDescription,
      locations,
      requisitionStatus,
    } = req.body;

    // Validation
    if (!jobTitle || !clientCompany) {
      return res.status(400).json({ error: "Job Title and Client Company are required" });
    }

    const job = await prisma.job.create({
      data: {
        jobTitle,
        clientCompany,
        employmentType,
        priorityLevel: priorityLevel || "Medium",
        assignedRecruiters: Array.isArray(assignedRecruiters) ? assignedRecruiters : [],
        minExperience: minExperience ? parseInt(minExperience) : null,
        maxExperience: maxExperience ? parseInt(maxExperience) : null,
        minSalary: minSalary ? parseFloat(minSalary) : null,
        maxSalary: maxSalary ? parseFloat(maxSalary) : null,
        budgetCurrency: budgetCurrency || "INR",
        targetOpenings: targetOpenings ? parseInt(targetOpenings) : 1,
        educationRequirement,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
        jobDescription,
        locations: locations || [],
        requisitionStatus: requisitionStatus || "Open",
        pipelineCount: 0,
        hiredCount: 0,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ error: "Failed to create job requisition" });
  }
});

// PUT /jobs/:id - Update an existing job
app.put("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      clientCompany,
      employmentType,
      priorityLevel,
      assignedRecruiters,
      minExperience,
      maxExperience,
      minSalary,
      maxSalary,
      budgetCurrency,
      targetOpenings,
      educationRequirement,
      requiredSkills,
      jobDescription,
      locations,
      requisitionStatus,
    } = req.body;

    const job = await prisma.job.update({
      where: { id },
      data: {
        jobTitle,
        clientCompany,
        employmentType,
        priorityLevel,
        assignedRecruiters: Array.isArray(assignedRecruiters) ? assignedRecruiters : undefined,
        minExperience: minExperience !== undefined ? (minExperience ? parseInt(minExperience) : null) : undefined,
        maxExperience: maxExperience !== undefined ? (maxExperience ? parseInt(maxExperience) : null) : undefined,
        minSalary: minSalary !== undefined ? (minSalary ? parseFloat(minSalary) : null) : undefined,
        maxSalary: maxSalary !== undefined ? (maxSalary ? parseFloat(maxSalary) : null) : undefined,
        budgetCurrency,
        targetOpenings: targetOpenings !== undefined ? (targetOpenings ? parseInt(targetOpenings) : 0) : undefined,
        educationRequirement,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : undefined,
        jobDescription,
        locations,
        requisitionStatus,
      },
    });

    res.json(job);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ error: "Failed to update job requisition" });
  }
});

// DELETE /jobs/:id - Delete a job
app.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.job.delete({
      where: { id },
    });
    res.json({ message: "Job requisition deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ error: "Failed to delete job requisition" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});