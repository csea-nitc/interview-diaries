export default {
  register() { },

  async bootstrap({ strapi }) {
    try {
      // =========================
      // 1. AUTHENTICATED PERMISSIONS
      // =========================
      const authRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      if (authRole) {
        const permissions = [
          'api::company.company.find',
          'api::company.company.findOne',
          'api::interview-diary.interview-diary.find',
          'api::interview-diary.interview-diary.findOne',
          'api::submission.submission.create',
        ];

        for (const action of permissions) {
          const exists = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({
              where: { role: authRole.id, action },
            });

          if (!exists) {
            await strapi.db
              .query('plugin::users-permissions.permission')
              .create({
                data: { role: authRole.id, action },
              });
          }
        }

        console.log('✅ Authenticated permissions applied');
      }


      // =========================
      // 2. ENABLE GOOGLE PROVIDER
      // =========================
      try {
        await strapi
          .plugin('users-permissions')
          .service('providers')
          .update('google', {
            enabled: true,
          });

        console.log('✅ Google provider enabled');
      } catch (err) {
        console.log('⚠️ Google provider setup skipped:', err.message);
      }


      // =========================
      // 3. SEED DATA (ONLY IF EMPTY)
      // =========================
      const companies = await strapi.db
        .query('api::company.company')
        .findMany();

      if (companies.length === 0) {
        console.log('🌱 Seeding dummy data...');

        const oracle = await strapi.documents('api::company.company').create({
          data: {
            name: 'Oracle',
            slug: 'oracle',
            logoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
            highestCtc: 2000000,
            fullTime: 2,
            ppo: 1,
            interns: 1,
          },
          status: 'published',
        });

        const amazon = await strapi.documents('api::company.company').create({
          data: {
            name: 'Amazon',
            slug: 'amazon',
            logoUrl:
              'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
            highestCtc: 4500000,
            fullTime: 5,
            ppo: 3,
            interns: 2,
          },
          status: 'published',
        });

        await strapi.documents('api::interview-diary.interview-diary').create({
          data: {
            candidateName: 'Demo User',
            roleType: 'Full Time',
            jobTitle: 'SDE',
            year: 2025,
            stipend: 'CTC-34 LPA',
            totalRounds: 3,
            writtenTests: 1,
            interviews: 2,
            tips: 'Focus on fundamentals + clear communication.',
            company: oracle.documentId,
            rounds: [
              {
                __component: 'interview.round',
                name: 'Round 1',
                descriptions: 'Coding + basics',
              },
              {
                __component: 'interview.round',
                name: 'Round 2',
                descriptions: 'Core CS + projects',
              },
              {
                __component: 'interview.round',
                name: 'Round 3',
                descriptions: 'System design',
              },
            ],
          },
          status: 'published',
        });

        console.log('✅ Dummy data seeded');
      }
    } catch (err) {
      console.error('❌ Bootstrap error:', err);
    }
  },
};