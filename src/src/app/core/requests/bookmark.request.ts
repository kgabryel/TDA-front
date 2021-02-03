export interface BookmarkRequest {
  title: string;
  href: string;
  backgroundColor: string;
  textColor: string;
  icon: string | null;
  assignedToDashboard: boolean;
}

export interface IconRequest {
  href: string;
}

export interface IconResult {
  icon: string;
}
