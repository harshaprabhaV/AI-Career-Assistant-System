from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import fitz

app = FastAPI()

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Load Model ----------------

model = SentenceTransformer("all-MiniLM-L6-v2")

# ---------------- Load Jobs Dataset ----------------

jobs_df = pd.read_csv("LinkedIn_RDB_three.csv")
jobs_df = jobs_df.fillna("")

jobs_df["job_text"] = (
    jobs_df["title"].astype(str)
    + " "
    + jobs_df["description"].astype(str)
    + " "
    + jobs_df["job_domain"].astype(str)
)

job_embeddings = model.encode(
    jobs_df["job_text"].tolist(),
    show_progress_bar=True
)

# ---------------- Load Questions Dataset ----------------

questions_df = pd.read_csv(
    "Software Questions.csv",
    encoding="latin1"
)

# ---------------- Skills Mapping ----------------

SKILLS_MAP = {
    "Full Stack Engineer": [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Docker",
        "AWS"
    ],
    "Frontend Developer": [
        "React.js",
        "Redux",
        "TypeScript",
        "Bootstrap",
        "Next.js"
    ],
    "Machine Learning Engineer": [
        "Scikit-Learn",
        "TensorFlow",
        "PyTorch",
        "MLOps",
        "Docker"
    ],
    "Data Scientist": [
        "Pandas",
        "NumPy",
        "Matplotlib",
        "SQL",
        "Machine Learning"
    ]
}

# ---------------- Helper Function ----------------

def extract_resume_text(contents):
    with open("temp_resume.pdf", "wb") as f:
        f.write(contents)

    doc = fitz.open("temp_resume.pdf")
    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()
    return text

# ---------------- Home ----------------

@app.get("/")
def home():
    return {
        "message": "AI Career Assistant Backend Running"
    }

# ---------------- Upload Resume ----------------

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()

    resume_text = extract_resume_text(contents)

    return {
        "resume_text": resume_text
    }

# ---------------- ATS Score ----------------

@app.post("/ats-score")
async def ats_score(file: UploadFile = File(...)):
    contents = await file.read()

    resume_text = extract_resume_text(contents)

    resume_embedding = model.encode([resume_text])

    scores = cosine_similarity(
        resume_embedding,
        job_embeddings
    )[0]

    best_job_index = int(scores.argmax())
    best_job = jobs_df.iloc[best_job_index]
    best_score = round(float(scores[best_job_index]) * 100, 2)

    return {
        "ats_score": best_score,
        "job_title": str(best_job["title"]),
        "location": str(best_job["job_location"]),
        "domain": str(best_job["job_domain"])
    }

# ---------------- Suggested Skills ----------------

@app.post("/suggested-skills")
async def suggested_skills(file: UploadFile = File(...)):
    contents = await file.read()

    resume_text = extract_resume_text(contents)

    resume_embedding = model.encode([resume_text])

    scores = cosine_similarity(
        resume_embedding,
        job_embeddings
    )[0]

    best_job_index = int(scores.argmax())
    best_job = str(jobs_df.iloc[best_job_index]["title"])

    skills = SKILLS_MAP.get(
        best_job,
        [
            "Communication",
            "Problem Solving",
            "Git",
            "SQL",
            "Cloud Basics"
        ]
    )

    return {
        "job_title": best_job,
        "suggested_skills": skills
    }

# ---------------- Top Jobs ----------------

@app.post("/top-jobs")
async def top_jobs(file: UploadFile = File(...)):
    contents = await file.read()

    resume_text = extract_resume_text(contents)

    resume_embedding = model.encode([resume_text])

    scores = cosine_similarity(
        resume_embedding,
        job_embeddings
    )[0]

    top_indices = scores.argsort()[-5:][::-1]

    top_jobs_list = []

    for i in top_indices:
        top_jobs_list.append({
            "job_title": str(jobs_df.iloc[i]["title"]),
            "location": str(jobs_df.iloc[i]["job_location"]),
            "domain": str(jobs_df.iloc[i]["job_domain"]),
            "score": round(float(scores[i]) * 100, 2)
        })

    return {
        "top_jobs": top_jobs_list
    }

# ---------------- Mock Interview ----------------

@app.post("/mock-interview")
async def mock_interview(file: UploadFile = File(...)):
    contents = await file.read()

    resume_text = extract_resume_text(contents)

    resume_embedding = model.encode([resume_text])

    scores = cosine_similarity(
        resume_embedding,
        job_embeddings
    )[0]

    best_job_index = int(scores.argmax())
    best_job = str(jobs_df.iloc[best_job_index]["title"])

    if "Full Stack" in best_job:
        categories = [
            "Front-end",
            "Back-end",
            "Full-stack",
            "Database and SQL",
            "Web Development"
        ]
    elif "Machine Learning" in best_job:
        categories = [
            "Machine Learning",
            "Artificial Intelligence",
            "Data Structures",
            "Algorithms"
        ]
    else:
        categories = [
            "General Programming",
            "Data Structures",
            "System Design",
            "Database Systems"
        ]

    filtered = questions_df[
        questions_df["Category"].isin(categories)
    ]

    questions = (
        filtered["Question"]
        .sample(min(5, len(filtered)))
        .tolist()
    )

    return {
        "job_title": best_job,
        "questions": questions
    }