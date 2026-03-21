async function seed() {
  console.log("Seeding companies...");
  
  const c1Res = await fetch('http://localhost:1337/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { name: 'Oracle', slug: 'oracle', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', highestCtc: 2000000, fullTime: 2, ppo: 1, interns: 1 } })
  });
  const c1 = await c1Res.json();
  console.log("Oracle:", c1);

  const c2Res = await fetch('http://localhost:1337/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { name: 'Amazon', slug: 'amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', highestCtc: 4500000, fullTime: 5, ppo: 3, interns: 2 } })
  });
  const c2 = await c2Res.json();
  console.log("Amazon:", c2);

  if (!c1.data) return;

  console.log("Seeding interview diaries...");
  const d1Res = await fetch('http://localhost:1337/api/interview-diaries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: {
      candidateName: 'Gautham Sunil',
      roleType: 'Full Time',
      jobTitle: 'Application Development Engineer',
      year: 2025,
      stipend: 'CTC-34.1 LPA, Base 12,77,000',
      totalRounds: 4,
      writtenTests: 1,
      interviews: 3,
      tips: 'Know your fundamentals and explain why you made design choices — not just what you built.',
      company: c1.data.documentId,
      rounds: [
        {
          __component: 'interview.round',
          name: 'Round 1 (Online Test)',
          descriptions: 'Coding (Arrays, Strings), DBMS, OS, CN, Web basics. 15 Aptitude MCQs.'
        },
        {
          __component: 'interview.round',
          name: 'Round 2 (Interview 1)',
          descriptions: 'Resume discussion, OOPS + examples, SQL and normalization'
        },
        {
          __component: 'interview.round',
          name: 'Round 3 (Interview 2)',
          descriptions: 'Deep dive into projects, design decisions, tradeoffs, and edge cases.'
        },
        {
          __component: 'interview.round',
          name: 'Round 4 (Interview 3)',
          descriptions: 'System design fundamentals, Scaling discussions, Backend tradeoffs'
        }
      ]
    }})
  });
  const d1 = await d1Res.json();
  console.log("Diary 1:", d1);
}

seed().catch(console.error);
