/**
 * interview-diary controller — default core, no overrides needed.
 * Every entry in this collection is approved by definition
 * (created only via the submission lifecycle on approval).
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::interview-diary.interview-diary');
