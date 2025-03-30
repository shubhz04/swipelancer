// sample profile interface
export interface ProfileData {
    id: number;
    UID: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    bgColor: string;
    tagline?: string;
    requests?: [String];
    isFreelancer : boolean;
  }
  

  export interface ContractData {
    id:number;
    contractID : string;
    name: string;
    owner: string;
    description: string;
    pricing: number;
    currency: string;
    pricingType: string;
    images: string[];
    videos: string[];
  }
  