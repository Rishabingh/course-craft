import type { ApiResponse } from '../../../shared/types/ApiResponse';

interface Video {
  title: string;
  section: string;
  thumbnail: string;
  index: number;
  videoUrl: string;
  isDeleted: boolean;
}

interface Section {
  course: string;
  name: string;
  index: number;
  isDeleted: boolean;
  videos: Video[];
}

export type SectionsResponse = ApiResponse<Section[]>
