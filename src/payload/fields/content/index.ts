import { MyCode } from "@/payload/fields/content/my-code";
import { MyProjects } from "@/payload/fields/content/projects-overview-field";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Field } from "payload";
import { MyHorizontalLine } from "@/payload/fields/content/horizontal-line";

export const ThijmenContent: Field = {
  name: "dynamiccontent",
  type: "richText",
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({
          enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
        }),
        BlocksFeature({
          blocks: [MyCode, MyProjects, MyHorizontalLine],
        }),

        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HorizontalRuleFeature(),
      ];
    },
  }),
  label: false,
};
