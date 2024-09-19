import { Field } from "payload";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MyCode } from "@/payload/fields/content/my-code";

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
          blocks: [MyCode],
          inlineBlocks: [MyCode],
        }),

        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HorizontalRuleFeature(),
      ];
    },
  }),
  label: false,
};
