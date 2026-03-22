import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::company.company', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);
    if (!response || !response.data) return response;

    const enrichedData = await Promise.all(
      response.data.map(async (company: any) => {
        const companyId = company.documentId;
        
        const fullTime = await strapi.db.query('api::interview-diary.interview-diary').count({
          where: { company: { documentId: companyId }, roleType: 'Full Time', publishedAt: { $notNull: true } },
        });
        
        const interns = await strapi.db.query('api::interview-diary.interview-diary').count({
          where: { company: { documentId: companyId }, roleType: 'Internship', publishedAt: { $notNull: true } },
        });
        
        const ppo = await strapi.db.query('api::interview-diary.interview-diary').count({
          where: { company: { documentId: companyId }, isPPO: true, publishedAt: { $notNull: true } },
        });
        
        const latestFullTime = await strapi.db.query('api::interview-diary.interview-diary').findOne({
          where: { company: { documentId: companyId }, roleType: 'Full Time', publishedAt: { $notNull: true } },
          orderBy: { publishedAt: 'desc' },
          select: ['ctc'],
        });
        
        const highestCtc = latestFullTime ? Number(latestFullTime.ctc) || 0 : 0;

        const latestInternship = await strapi.db.query('api::interview-diary.interview-diary').findOne({
          where: { company: { documentId: companyId }, roleType: 'Internship', publishedAt: { $notNull: true } },
          orderBy: { publishedAt: 'desc' },
          select: ['stipend'],
        });
        
        const recentStipend = latestInternship?.stipend || null;

        return {
          ...company,
          fullTime,
          interns,
          ppo,
          highestCtc,
          recentStipend
        };
      })
    );

    return { ...response, data: enrichedData };
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (!response || !response.data) return response;

    const company = response.data;
    const companyId = company.documentId;

    const fullTime = await strapi.db.query('api::interview-diary.interview-diary').count({
      where: { company: { documentId: companyId }, roleType: 'Full Time', publishedAt: { $notNull: true } },
    });
    
    const interns = await strapi.db.query('api::interview-diary.interview-diary').count({
      where: { company: { documentId: companyId }, roleType: 'Internship', publishedAt: { $notNull: true } },
    });
    
    const ppo = await strapi.db.query('api::interview-diary.interview-diary').count({
      where: { company: { documentId: companyId }, isPPO: true, publishedAt: { $notNull: true } },
    });
    
    const latestFullTime = await strapi.db.query('api::interview-diary.interview-diary').findOne({
      where: { company: { documentId: companyId }, roleType: 'Full Time', publishedAt: { $notNull: true } },
      orderBy: { publishedAt: 'desc' },
      select: ['ctc'],
    });
    
    const highestCtc = latestFullTime ? Number(latestFullTime.ctc) || 0 : 0;

    const latestInternship = await strapi.db.query('api::interview-diary.interview-diary').findOne({
      where: { company: { documentId: companyId }, roleType: 'Internship', publishedAt: { $notNull: true } },
      orderBy: { publishedAt: 'desc' },
      select: ['stipend'],
    });
    
    const recentStipend = latestInternship?.stipend || null;

    return {
      ...response,
      data: {
        ...company,
        fullTime,
        interns,
        ppo,
        highestCtc,
        recentStipend
      }
    };
  }
}));
