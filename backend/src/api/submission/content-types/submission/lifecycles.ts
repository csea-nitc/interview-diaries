import slugify from 'slugify';

export default {
  async afterUpdate(event: any) {
    const { result, params } = event;
    const strapi = (globalThis as any).strapi;

    if (!params?.data?.approvalStatus || params.data.approvalStatus !== 'approved') {
      return;
    }

    if (result.isProcessed) {
      strapi.log.info('[submission lifecycle] Already processed, skipping');
      return;
    }

    try {
      const submission = await strapi
        .documents('api::submission.submission')
        .findOne({
          documentId: result.documentId,
          populate: ['company', 'rounds'],
        });

      if (!submission) {
        strapi.log.error('[submission lifecycle] Submission not found:', result.documentId);
        return;
      }

      let companyId: string | undefined;

      if (submission.company?.documentId) {
        companyId = submission.company.documentId;
      } else if (submission.newCompanyName?.trim()) {
        const rawName: string = submission.newCompanyName.trim();
        const existing = await strapi
          .documents('api::company.company')
          .findMany({ filters: { name: { $eqi: rawName } }, limit: 1 });

        if (existing.length > 0) {
          companyId = existing[0].documentId;
        } else {
          const newCompany = await strapi
            .documents('api::company.company')
            .create({
              data: {
                name: rawName,
                slug: slugify(rawName, { lower: true, strict: true }),
              },
              status: 'published',
            });
          companyId = newCompany.documentId;
        }
      }

      if (!companyId) return;

      const existingDiary = await strapi
        .documents('api::interview-diary.interview-diary')
        .findMany({
          filters: {
            candidateName: submission.candidateName,
            year: submission.year,
            company: companyId,
          },
          limit: 1,
        });

      if (existingDiary.length > 0) {
        strapi.log.warn('[submission lifecycle] Diary already exists, marking as processed');
        await strapi.documents('api::submission.submission').update({
          documentId: result.documentId,
          data: { isProcessed: true },
        });
        return;
      }

      const rounds = (submission.rounds ?? []).map((r: any) => ({
        name: r.name,
        descriptions: r.descriptions,
      }));

      await strapi
        .documents('api::interview-diary.interview-diary')
        .create({
          data: {
            candidateName: submission.candidateName,
            roleType: submission.roleType,
            jobTitle: submission.jobTitle,
            year: submission.year,
            stipend: submission.stipend,
            ctc: submission.ctc,
            isPPO: submission.isPPO,
            totalRounds: submission.totalRounds,
            writtenTests: submission.writtenTests,
            interviews: submission.interviews,
            tips: submission.tips,
            company: companyId,
            rounds,
          },
          status: 'published',
        });

      await strapi.documents('api::submission.submission').update({
        documentId: result.documentId,
        data: { isProcessed: true },
      });

      strapi.log.info(`[submission lifecycle] Created diary for: ${submission.candidateName}`);
    } catch (err) {
      strapi.log.error('[submission lifecycle] Error processing approval:', err);
    }
  },
};
