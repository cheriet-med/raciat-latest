// propertiesFilterReduce.ts
export interface Listing {
  id: number;
  user: any;
  name: string | null;
  description: string | null;
  category: string | null;
  types: string | null;
  price: any;
  currency: string | null;
  video_link: string | null;
  rooms_number: string | null;
  badrooms_number: string | null;
  image: string | null;
  latitude: string | null;
  longtitude: string | null;
  location: string | null;
  created_at_meta: string | null;
  updated_at_meta: string | null;
  size: string | null;
  capacity: string | null;
  established: string | null;
  garages: string | null;
  region: string | null;
  is_featured: boolean;
  is_visible: boolean;
}

export interface InitialState {
    bedrooms: string;
    bathrooms: string;
    garages: string;
    city: string;
    budget: string;
    type: string;
    minSize: string;
    maxSize: string;
    features: string[];
    filtered: Listing[];
    sortingOption: string;
    sorted: Listing[];
    currentPage: number;
    itemPerPage: number;
}

export const initialState: InitialState = {
    bedrooms: "Any Bedrooms",
    bathrooms: "Any Bathrooms",
    garages: "Any Garages",
    city: "All Cities",
    budget: "Max. Price",
    type: "Any Type",
    minSize: "Min (SqFt)",
    maxSize: "Max (SqFt)",
    features: [],
    filtered: [],
    sortingOption: "فرز حسب (الافتراضي)",
    sorted: [],
    currentPage: 1,
    itemPerPage: 9,
};

export type Action =
    | { type: "SET_BEDROOMS"; payload: string }
    | { type: "SET_BATHROOMS"; payload: string }
    | { type: "SET_GARAGES"; payload: string }
    | { type: "SET_CITY"; payload: string }
    | { type: "SET_TYPE"; payload: string }
    | { type: "SET_BUDGET"; payload: string }
    | { type: "SET_MINSIZE"; payload: string }
    | { type: "SET_MAXSIZE"; payload: string }
    | { type: "SET_FEATURES"; payload: string[] }
    | { type: "SET_FILTERED"; payload: Listing[] }
    | { type: "SET_SORTING_OPTION"; payload: string }
    | { type: "SET_SORTED"; payload: Listing[] }
    | { type: "SET_CURRENT_PAGE"; payload: number }
    | { type: "SET_ITEM_PER_PAGE"; payload: number }
    | { type: "CLEAR_FILTER" };

export function reducer(state: InitialState, action: Action): InitialState {
    switch (action.type) {
        case "SET_BEDROOMS":
            return { ...state, bedrooms: action.payload };
        case "SET_BATHROOMS":
            return { ...state, bathrooms: action.payload };
        case "SET_GARAGES":
            return { ...state, garages: action.payload };
        case "SET_TYPE":
            return { ...state, type: action.payload };
        case "SET_CITY":
            return { ...state, city: action.payload };
        case "SET_BUDGET":
            return { ...state, budget: action.payload };
        case "SET_MINSIZE":
            return { ...state, minSize: action.payload };
        case "SET_MAXSIZE":
            return { ...state, maxSize: action.payload };
        case "SET_FEATURES":
            return { ...state, features: action.payload };
        case "SET_FILTERED":
            return { ...state, filtered: action.payload };
        case "SET_SORTING_OPTION":
            return { ...state, sortingOption: action.payload };
        case "SET_SORTED":
            return { ...state, sorted: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_ITEM_PER_PAGE":
            return { ...state, itemPerPage: action.payload };
        case "CLEAR_FILTER":
            return { 
                ...state, 
                bedrooms: "Any Bedrooms",
                bathrooms: "Any Bathrooms",
                garages: "Any Garages",
                city: "All Cities",
                budget: "Max. Price",
                type: "Any Type",
                minSize: "Min (SqFt)",
                maxSize: "Max (SqFt)",
                features: [],
                currentPage: 1,
            };
        default:
            return state;
    }
}

// Export as default for backward compatibility
const propertiesFilterReduce = {
    initialState,
    reducer,
    // Don't export Listing here as it's a type, not a value
};

export default propertiesFilterReduce;