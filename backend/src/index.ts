export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * @param {Object} { strapi }
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * @param {Object} { strapi }
   */
  async bootstrap({ strapi }) {
    // 1. Enable Public Permissions
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
      if (publicRole) {
        const permissions = [
          'api::company.company.find',
          'api::company.company.findOne',
          'api::interview-diary.interview-diary.find',
          'api::interview-diary.interview-diary.findOne',
          // Submissions: public can create (submit), not read
          'api::submission.submission.create',
        ];
        for (const action of permissions) {
          const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { role: publicRole.id, action } });
          if (!exists) {
            await strapi.db.query('plugin::users-permissions.permission').create({ data: { role: publicRole.id, action } });
          }
        }
        console.log('Public permissions verified and applied.');
      }
    } catch (err) {
      console.log('Permission setting failed:', err);
    }

    // 2. Seed Dummy Data
    try {
      const companies = await strapi.db.query('api::company.company').findMany();
      if (companies.length === 0) {
        console.log('Seeding dummy data using Documents Service...');
        
        const oracle = await strapi.documents('api::company.company').create({
          data: {
            name: 'Oracle',
            slug: 'oracle',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
            highestCtc: 2000000,
            fullTime: 2,
            ppo: 1,
            interns: 1,
          },
          status: 'published'
        });

        const amazon = await strapi.documents('api::company.company').create({
          data: {
            name: 'Amazon',
            slug: 'amazon',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
            highestCtc: 4500000,
            fullTime: 5,
            ppo: 3,
            interns: 2,
          },
          status: 'published'
        });

        await strapi.documents('api::interview-diary.interview-diary').create({
          data: {
            candidateName: 'Gautham Sunil',
            roleType: 'Full Time',
            jobTitle: 'Application Development Engineer',
            year: 2025,
            stipend: 'CTC-34.1 LPA, Base 12,77,000',
            totalRounds: 4,
            writtenTests: 1,
            interviews: 3,
            tips: 'Know your fundamentals and explain why you made design choices — not just what you built.',
            company: oracle.documentId,
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
            ],
          },
          status: 'published'
        });
        
        console.log('Dummy data seeded via Documents API!');
      }
    } catch (err) {
      console.error('Data seeding failed:', err);
    }
  },
};
