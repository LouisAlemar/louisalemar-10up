// Define the Post type
export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  acf: {
    alias: string;
    real_name: string;
  }
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: number[];
  tags: any[];
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    author: LinkEmbeddable[];
    replies: LinkEmbeddable[];
    "version-history": VersionHistory[];
    "wp:attachment": Link[];
    "wp:term": WpTerm[];
    curies: Curies[];
  };
}

interface Link {
  href: string;
}

interface LinkEmbeddable {
  embeddable: boolean;
  href: string;
}

interface VersionHistory {
  count: number;
  href: string;
}

interface WpTerm {
  taxonomy: string;
  embeddable: true;
  href: string;
}

interface Curies {
  name: string;
  href: string;
  templated: true;
}