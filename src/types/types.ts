import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

export interface IArticle {
  id: string,
  createdAt: Date,
  title: string,
  content: string,
  published: boolean
}

export interface IArticleFromApi extends IArticle {
  updatedAt: string,
  authorId: string
}

export interface PostCreateButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
      published?: boolean;
    }
