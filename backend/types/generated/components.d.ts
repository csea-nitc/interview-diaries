import type { Schema, Struct } from '@strapi/strapi';

export interface InterviewRound extends Struct.ComponentSchema {
  collectionName: 'components_interview_rounds';
  info: {
    displayName: 'Round';
    icon: 'layer';
  };
  attributes: {
    descriptions: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'interview.round': InterviewRound;
    }
  }
}
