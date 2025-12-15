import { Suspense } from 'react'
import UnlockClient from './client'
import { hasUserPurchased } from '@/lib/user'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

// Prompt content - You will add your actual prompts here
const PROMPT_CONTENT: Record<number, { name: string; icon: string; content: string }> = {
    1: {
        name: 'Starter Format',
        icon: '🌱',
        content: `RAW IDEA: IDEAK

INSTRUCTIONS TO LLM:
Expand this raw idea into a complete structured breakdown including:
- Clear explanation
- Feature list
- User flow
- Tech suggestions
- Steps to build
- Any missing improvements

OUTPUT FORMAT:
1. Summary
2. Core Features
3. User Interaction Flow
4. Recommended Tech Stack
5. Basic Implementation Steps
6. Notes / Improvements

Return all output in crisp, clean, simple structure.`
    },
    2: {
        name: 'Pro Builder Format',
        icon: '⚡',
        content: `PROJECT IDEA: IDEAK

TASK:
Convert this idea into a full website-builder-ready specification.

OUTPUT SECTIONS REQUIRED:
1. PRODUCT DESCRIPTION (1–2 paragraphs)
2. USER PERSONAS
3. FEATURE LIST (MVP + Future)
4. SCREEN / PAGE MAP
5. FUNCTIONAL REQUIREMENTS
6. NON-FUNCTIONAL REQUIREMENTS (speed, UX, security)
7. DATA STRUCTURE (JSON only)
8. API ENDPOINT PLAN
9. DEVELOPMENT ROADMAP (phases)
10. DEPLOYMENT FRAMEWORK (hosting, build system)

Ensure the final output can be directly used by an automated no-code/AI website builder.`
    },
    3: {
        name: 'Industry Engineer Format',
        icon: '🏭',
        content: `IDEA INPUT:
IDEAK

YOUR TASK:
Interpret the idea and produce a complete structured document for downstream AI tools.

MANDATORY OUTPUT STRUCTURE:
---CONCEPT---
Explain the idea.
---OBJECTIVES---
List primary, secondary, tertiary goals.
---FEATURES---
Numbered features with purpose.
---DATA MODEL (JSON)---
Provide clean schema.
---LOGIC FLOW---
Describe how the system works step-by-step.
---IMPLEMENTATION PLAN---
List tasks with substeps.
---RISKS & OPTIMIZATIONS---

Rules:
- No fluff
- No assumptions beyond the idea
- Use precise engineering language`
    },
    4: {
        name: 'Universal Architecture',
        icon: '🌐',
        content: `INPUT IDEA: IDEAK

OUTPUT REQUIREMENT:
Generate a universal specification that includes:

1. High-Level Summary
2. PRD (Product Requirements Document)
3. System Architecture Overview
4. Data Flow Diagram (written description)
5. API Blueprint
6. UI / UX Layout(textual, not visual)
7. Tasks & Milestones
8. Final Deliverable Specification(for handoff to builder models)
        9. Additional Insights & Recommendations


ADDITIONAL RULES:
        - Always maintain numbered lists
- Always include JSON where needed
- Keep consistent section names for easy parsing
    - Output must be comprehensive, expertly structured, and immediately actionable.
- Maintain a confident, structured tone throughout`
    },
    5: {
        name: 'Ultimate A→Z Blueprint',
        icon: '🗺️',
        content: `This one forces the LLM to output EVERYTHING needed for a full app build.
    IDEA: IDEAK

TASK:
Expand this idea into a complete A→Z system blueprint ready for automated development.

OUTPUT REQUIRED(MANDATORY):

1. EXECUTIVE SUMMARY
2. FULL PRD
3. USER STORIES(detailed)
4. FEATURE SPECIFICATIONS(each with acceptance criteria)
5. DATA MODEL
    - JSON schema
        - Relations explained
6. SYSTEM ARCHITECTURE
    - frontend
    - backend
    - DB
    - integration points
7. API DESIGN
    - endpoints
    - request / response examples
8. WORKFLOWS
    - user flows
        - system flows
9. COMPLETE IMPLEMENTATION PLAN
    - sprint - wise tasks
        - Git branch naming
            - commit messages
10. DEPLOYMENT GUIDE
    - environment setup
        - hosting steps
            - CI / CD pipeline
11. TEST PLAN
    - unit test list
        - integration test list
12. SECURITY + PERFORMANCE RULES
13. FINAL HANDOFF PACKAGE
    - list of files the automated builder must generate

Output everything in clean structured text.No missing sections.`
    },
    6: {
        name: 'Master Super Pack',
        icon: '💎',
        content: `RAW IDEA: “IDEAK”

INSTRUCTIONS TO LLM:
Expand the RAW IDEA into a full, combined, multi - layer specification that merges:
- Simple expansion clarity(Format 1)
    - Industry website - builder style(Format 2)
        - Engineering interpretation style(Format 3)
            - Universal LLM structure(Format 4)
                - Ultimate deep A→Z system design(Format 5)

Your output MUST include ALL SECTIONS BELOW.
Do NOT remove or merge sections.  
Do NOT shorten.  
Do NOT skip any part.  
Produce the FULL expanded version.

------------------------------------------------------------------
    1. HIGH - LEVEL SUMMARY(Format 1)
------------------------------------------------------------------

------------------------------------------------------------------
    2. CORE FEATURES(Simple + Industry + Deep Acceptance Criteria)
------------------------------------------------------------------

------------------------------------------------------------------
    3. PRODUCT DESCRIPTION(Industry Standard)
------------------------------------------------------------------

------------------------------------------------------------------
    4. USER PERSONAS
------------------------------------------------------------------

------------------------------------------------------------------
    5. USER STORIES(Basic + Detailed)
------------------------------------------------------------------

------------------------------------------------------------------
    6. SCREEN / PAGE MAP(Website Builder Format)
------------------------------------------------------------------`

------------------------------------------------------------------
    7. USER FLOW(Simple) + SYSTEM FLOW(Advanced)
------------------------------------------------------------------

------------------------------------------------------------------
    8. OBJECTIVES(Primary, Secondary, Tertiary)
------------------------------------------------------------------

------------------------------------------------------------------
    9. FULL FEATURE SPECIFICATIONS(With Acceptance Criteria)
------------------------------------------------------------------

------------------------------------------------------------------
    10. DATA MODEL(JSON + Relationships)
------------------------------------------------------------------

------------------------------------------------------------------
    11. API BLUEPRINT
        - Endpoints
        - Request / Response
        - Auth flows
------------------------------------------------------------------

------------------------------------------------------------------
    12. SYSTEM ARCHITECTURE(Frontend + Backend + DB + Integrations)
------------------------------------------------------------------

------------------------------------------------------------------
    13. LOGIC FLOW(Engineering Format)
------------------------------------------------------------------

------------------------------------------------------------------
    14. PRD(Product Requirements Document)
        - Problem
        - Solution
        - Constraints
        - KPIs
------------------------------------------------------------------

------------------------------------------------------------------
    15. TECH STACK RECOMMENDATIONS
------------------------------------------------------------------

------------------------------------------------------------------
    16. IMPLEMENTATION PLAN(Phases + Sprints + Tasks)
------------------------------------------------------------------

------------------------------------------------------------------
    17. GIT BRANCH PLAN + COMMIT MESSAGE PLAN
------------------------------------------------------------------

------------------------------------------------------------------
    18. DEVELOPMENT ROADMAP(Timeline)
------------------------------------------------------------------

------------------------------------------------------------------
    19. DEPLOYMENT & HOSTING PLAN(with CI / CD)
------------------------------------------------------------------

------------------------------------------------------------------
    20. TEST PLAN(Unit + Integration + End - to - end)
------------------------------------------------------------------

------------------------------------------------------------------
    21. SECURITY GUIDELINES + PERFORMANCE OPTIMIZATION
------------------------------------------------------------------

------------------------------------------------------------------
    22. NON - FUNCTIONAL REQUIREMENTS(Speed, UX, Privacy)
------------------------------------------------------------------

------------------------------------------------------------------
    23. RISKS & MITIGATION STRATEGIES
------------------------------------------------------------------

------------------------------------------------------------------
    24. FINAL HANDOFF PACKAGE
        - All files / components the builder must generate
            - Folder structure
                - Key deliverables
------------------------------------------------------------------

    OUTPUT RULES:
- Follow the exact order above.
- Use clear headings.
- Use numbered lists where they are logical.
- Provide detailed content under every section.
- Never shorten or summarise unless asked.
- The output should be complete enough for an automated website - building LLM to generate the entire application end - to - end.


---

# BONUS: MARKDOWN MASTER SUPER - PROMPT(Format 6.1)
    (Perfect for human readability + most dev tools)

# MASTER SUPER FORMAT(Markdown Output)
Raw Idea: “IDEAK”

## INSTRUCTIONS TO LLM
Expand the raw idea into a complete multi - layer specification containing ALL sections below.  
Output MUST be in ** Markdown format only **.  
Do NOT skip any section.

---

# 1. High - Level Summary

# 2. Core Features
    - With basic description
        - With acceptance criteria

# 3. Product Description

# 4. User Personas

# 5. User Stories
    - Simple
    - Detailed

# 6. Screen / Page Map

# 7. User Flow & System Flow

# 8. Objectives
    - Primary
    - Secondary
    - Tertiary

# 9. Full Feature Specifications
    - With acceptance criteria

# 10. Data Model
\`\`\`json
{ }
\`\`\`

(Relationships explained in text)
11. API Blueprint
Endpoints
Request/Response examples
Auth
12. System Architecture
Frontend
Backend
Database
Integrations
13. Logic Flow
14. PRD (Product Requirements Document)
15. Tech Stack Recommendations
16. Implementation Plan
Phases
Sprints
Tasks
17. Git Branch Plan & Commit Messages
18. Development Roadmap
19. Deployment & Hosting Plan (CI/CD included)
20. Test Plan
Unit tests
Integration tests
End-to-end
21. Security & Performance Guidelines
22. Non-Functional Requirements
23. Risks & Mitigation
24. Final Handoff Package
Required files
Folder structure
Deliverables


---

# BONUS: JSON MASTER SUPER-PROMPT (Format 6.2)
(Fits perfectly into LLMs that parse JSON or structured builders)

\`\`\`json
{
"raw_idea": "IDEAK",
"instructions": "Expand into the full combined blueprint. Output MUST be valid JSON.",
"high_level_summary": "",
"core_features": [],
"product_description": "",
"user_personas": [],
"user_stories": {
"simple": [],
"detailed": []
},
"screen_map": [],
"flows": {
"user_flow": "",
"system_flow": ""
},
"objectives": {
"primary": [],
"secondary": [],
"tertiary": []
},
"feature_specifications": [],
"data_model": {
"schema_json": {},
"relations_explained": ""
},
"api_blueprint": {
"endpoints": [],
"examples": {}
},
"system_architecture": {
"frontend": "",
"backend": "",
"database": "",
"integrations": ""
},
"logic_flow": "",
"prd": {
"problem": "",
"solution": "",
"constraints": "",
"kpis": ""
},
"tech_stack_recommendations": [],
"implementation_plan": {
"phases": [],
"sprints": [],
"tasks": []
},
"git_plan": {
"branches": [],
"commit_messages": []
},
"development_roadmap": [],
"deployment_plan": {
"environment": "",
"hosting": "",
"ci_cd": ""
},
"test_plan": {
"unit_tests": [],
"integration_tests": [],
"e2e_tests": []
},
"security_guidelines": "",
"performance_guidelines": "",
"non_functional_requirements": [],
"risks_and_mitigations": [],
"final_handoff_package": {
"files": [],
"folder_structure": "",
"deliverables": []
}
}
\`\`\``
    },
7: {
    name: 'Debug & Optimize',
        icon: '🔧',
            content: `# DEBUG & OPTIMIZE PROMPT
        
🚧 COMING SOON 🚧

This prompt is currently under development. 
Stay tuned for updates!

---
© PromptOS`
},
8: {
    name: 'UI/UX Designer',
        icon: '🎨',
            content: `# UI/UX DESIGNER PROMPT

🚧 COMING SOON 🚧

This prompt is currently under development. 
Stay tuned for updates!

---
© PromptOS`
},
9: {
    name: 'Launch & Scale',
        icon: '🚀',
            content: `# LAUNCH & SCALE PROMPT

🚧 COMING SOON 🚧

This prompt is currently under development. 
Stay tuned for updates!

---
© PromptOS`
},
}

interface PageProps {
    searchParams: {
        prompt?: string
        email?: string
        paid?: string
    }
}

import { cookies } from 'next/headers'

async function UnlockContent({ searchParams }: PageProps) {
    const promptId = parseInt(searchParams.prompt || '1')

    // Try to get email from URL, then from cookie
    let email = searchParams.email || ''
    if (!email) {
        const cookieStore = cookies()
        email = cookieStore.get('promptos-email')?.value || ''
    }

    // 1. Verify Purchase
    let hasAccess = false

    // Allow free prompt (ID 1) without verification if desired, 
    // OR enforce verification for all. 
    // For now, let's say Prompt 1 is free but we still track it? 
    // Actually, the landing page says "First Prompt is FREE!".
    // So if promptId === 1, we might allow it.
    // BUT, the goal is to capture email.
    // So we check if they "purchased" (registered) it.

    // Check for "paid" flag from UPI flow (simulated)
    const isPaid = searchParams.paid === 'true'

    if (promptId === 1 || promptId === 2) {
        hasAccess = true // Tier 1 and Tier 2 are free/instant
    } else if (isPaid) {
        hasAccess = true // Simulated payment success
    } else if (email) {
        hasAccess = await hasUserPurchased(email, promptId)
    }

    // Fallback for demo/testing if needed (remove in production)
    // if (process.env.NODE_ENV === 'development') hasAccess = true

    if (!hasAccess) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                    <p className="text-gray-400 mb-6">
                        You don't have access to this prompt yet. Please purchase it to unlock.
                    </p>
                    <Link href="/#prompts" className="btn btn-primary w-full">
                        View Pricing
                    </Link>
                    <div className="mt-4">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    const prompt = PROMPT_CONTENT[promptId] || PROMPT_CONTENT[1]

    return <UnlockClient prompt={prompt} email={email} promptId={promptId} />
}

export default function UnlockPage(props: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-400">Verifying access...</p>
                </div>
            </div>
        }>
            <UnlockContent {...props} />
        </Suspense>
    )
}
