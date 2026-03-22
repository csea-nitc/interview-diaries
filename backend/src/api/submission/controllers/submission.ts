/**
 * submission controller — force approvalStatus to "pending" on every create
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::submission.submission',
  () => ({
    async create(ctx) {
      const userId = ctx.state.user?.id;
      
      // Sanitize the user payload to remove unexpected fields based on their role
      const sanitizedInput = await this.sanitizeInput(ctx.request.body, ctx);
      const inputData = (sanitizedInput as any).data || {};

      // Create using the internal Entity Service which ignores User Permissions payload locking
      const entry = await strapi.entityService.create('api::submission.submission', {
        data: {
          ...inputData,
          approvalStatus: 'pending',
          ...(userId ? { user: userId } : {}),
          publishedAt: new Date().toISOString()
        }
      });

      // Sanitize and return
      const sanitizedOutput = await this.sanitizeOutput(entry, ctx);
      return this.transformResponse(sanitizedOutput);
    },
  })
);
