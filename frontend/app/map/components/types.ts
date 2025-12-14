export interface Report {
  _id: string;
  location: string;
  description: string;
  urgency: "low" | "medium" | "high" | "emergency";
  status: "reported" | "under_review" | "resolved";
  imageUrl?: string;
  imagePublicId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  dogCount: number;
}

export interface Stats {
  total: number;
  active: number;
  emergency: number;
  resolved: number;
  totalDogs: number;
}