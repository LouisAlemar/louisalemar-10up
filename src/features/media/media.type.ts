export interface Media {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  title: {
    rendered: string;
  };
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: 'image' | 'video' | 'audio' | 'application' | string;
  mime_type: string;
  source_url: string;
  width: number;
  height: number;
  media_details: {
    sizes: {
      thumbnail: {
        source_url: string;
        width: number;
        height: number;
      };
      medium?: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  }
}
