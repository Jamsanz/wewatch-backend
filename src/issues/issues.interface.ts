export interface Issue {
  _id?: string;
  user_id: string;
  media: {
    type: string;
    uri: string;
  };
  ward?: string;
  state?: string;
  lga?: string;
  pollingUnit?: string;
  consent: boolean;
  title: string;
  description: string;
}