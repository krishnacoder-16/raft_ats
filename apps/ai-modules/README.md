# AI Modules

This directory contains standalone AI services that integrate with the main backend.

## Modules:
1. **resume_parser**: Extracts structured data from PDF/Docx resumes using LLMs/NLP.
2. **matching_engine**: Calculates match scores between candidate profiles and job descriptions.
3. **interview_analyzer**: Analyzes interview transcripts for sentiment, keywords, and competency scoring.

## Architecture
Each module can be deployed as an independent microservice (e.g., using FastAPI) or invoked as a worker process depending on load requirements. They communicate with the main ATS backend via REST or message queues.
